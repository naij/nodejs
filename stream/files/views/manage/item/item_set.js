KISSY.add("app/views/manage/item/item_set", function (S, View, MM, VOM, Node, Util, Upload) {
    var $ = Node.all;

    return View.extend({
        init: function(e) {
            this.manage('data', e);
        },
        render: function () {
            var me = this;
            var params = this.location.params;
            var contentId = params.id;

            // 编辑
            if (contentId) {
                me.manage(MM.fetchAll([{
                    name: "item_edit",
                    urlParams: {
                        id: contentId,
                        bizType: bizType
                    }
                }], function (errs, MesModel) {
                    var list = MesModel.get('data').result;
                    var domain = list.domain[0];
                    var detail = list.detail;
                    var typeId = detail.typeId;
                    var channelId = detail.channelId;
                    var typeList = me.wrapTypeList(list.typeList, typeId);
                    var channelList = me.wrapTypeList(list.channelList, channelId);
                    var tagIds = detail.tagIds;
                    var tagList = list.tagList;

                    // 数据处理
                    detail.customTags = detail.customTags.join(' ');
                    detail.hasUpload = true;

                    // 标签处理
                    for (var i = 0; i < tagIds.length; i++) {
                        for (var j = 0; j < tagList.length; j++) {
                            var o = tagList[j];
                            if (tagIds[i] == o.id) {
                                o.isActive = true;
                            }
                        }
                    }
                    detail.tagIds = detail.tagIds.join(',');

                    me.manage('detail', detail);
                    me.operateUpload();

                    me.setViewPagelet({
                        detail: detail,
                        domain: domain,
                        typeList: typeList,
                        channelList: channelList,
                        tagList: tagList,
                        cover: detail.cover,
                        images: detail.images,
                        hasUpload: me.getManaged('hasUpload')
                    }, function () {
                        me.components();
                    });
                }));
            } else {

                // 新建
                me.manage(MM.fetchAll([{
                    name: "item_create",
                    urlParams: {
                        bizType: bizType,
                        id: ''
                    }
                }], function (errs, MesModel) {
                    var list = MesModel.get('data').result;
                    var domain = list.domain[0];
                    var reg = list.domain.join('|');
                    var detail = list.detail;
                    var typeList = me.wrapTypeList(list.typeList);
                    var channelList = me.wrapTypeList(list.channelList);
                    var tagList = list.tagList;

                    // 数据处理
                    detail.id = detail.id == 0 ? '' : detail.id;
                    detail.hasUpload = true;
                    me.manage('detail', detail);
                    me.operateUpload();
         
                    me.setViewPagelet({
                        detail: detail,
                        domain: domain,
                        reg: reg,
                        typeList: typeList,
                        channelList: channelList,
                        tagList: tagList,
                        cover: detail.cover,
                        images: detail.images,
                        hasUpload: me.getManaged('hasUpload')
                    }, function () {
                        me.components();
                    });
                }));
            }

        },
        wrapTypeList: function (siteTypeList, id) {
            if (id) {
                S.each(siteTypeList, function(item) {
                    if (item.id == id) {
                        item.selected = true;
                    }
                });
            } else {
                siteTypeList[0].selected = true;
            }

            return siteTypeList;
        },
        components: function () {
            var me = this;
            var pagelet = me.getManaged('pagelet');

            // 内容ID唯一性校验
            var valid = pagelet.getBrick('validatForm').valid;
            valid.add('#J_contentId', {
                trim : '内容ID两端不能含有空格',
                regex: [/^[0-9]+$/,'内容ID只能是数字'],
                func : function(value) {
                    var returnVal = '';
                    S.IO({
                        type : 'get',
                        url : '/sitemanager/content/checkContentId.htm',
                        data : {
                            id: value
                        },
                        dataType : 'json',
                        async : false,
                        success : function(data, textStatus, xhr) {
                            if (!data.data.status) {
                                returnVal = '该内容ID已经存在，请更换内容ID';
                            }
                        }
                    });

                    return returnVal;
                }
            });

            me.manage('valid', valid);

            // 频道选择
            var dropdownChannel = pagelet.getBrick('J_dropdown_channel');
            var typeId = $('#J_typeId').val();
            dropdownChannel.on('selected', function(e) {
                me.manage(MM.fetchAll([{
                    name: "get_tagList",
                    urlParams: {
                        channelId: e.value,
                        typeId: typeId,
                        bizType: bizType
                    }
                }], function (errs, MesModel) {
                    var data = MesModel.get('data').result;
                    pagelet.setChunkData('tagList', data.tagList);

                }));
            });

            // 图片上传
            var upload = new Upload({
                el: '#J_iframe_upload',
                name: 'contentImage',
                zIndex: 10000,
                action: '/sitemanager/content/uploadImage.htm',
                accept: 'image/jpeg,image/jpg,image/gif,image/png'
            });
            me.manage('upload', upload);

            var cloneImage;
            var detail = me.getManaged('detail');

            upload.on('uploadComplete', function(ev) {
                var res = ev.data;
                var mainImg = $('#J_mainImg').val();
                cloneImage = [];

                S.one('#J_mainImgMsg').one('span').html('');
                S.each(detail.images, function(v, k) {
                    v.filename && cloneImage.push(v);
                });

                if (res && res.status) {
                    if (!mainImg) {
                        detail.cover = {
                            'filename': res.result.filename,
                            'url': res.result.url
                        };
                    } else {
                        cloneImage.push({
                            'filename': res.result.filename,
                            'url': res.result.url
                        });
                    }

                    detail.images = cloneImage;
                    me.operateUpload();
                    pagelet.setChunkData('hasUpload', detail.hasUpload);
                    pagelet.setChunkData('cover', detail.cover);
                    pagelet.setChunkData('images', detail.images);

                }
                upload.reset();
                
            });

            upload.on('uploadError',function(ev) {
                upload.reset();
                S.one('#J_mainImgMsg').show();
                S.one('#J_mainImgMsg').one('span').html(ev.msg);
            });

        },
        operateUpload: function () {
            var me = this;
            var pagelet = me.getManaged('pagelet');
            var detail = me.getManaged('detail');

            // 附图处理
            var cloneImage = [];
            var images = detail.images;
            var len = 0;

            for (var i = 0; i < 4; i++) {
                if (images && images[i]) {
                    cloneImage.push(images[i]);
                    len++;
                } else {
                    cloneImage.push({});
                }
            }

            detail.images = cloneImage;
            detail.hasUpload = len >= 4 && detail.cover ? false : true;

        },
        'tagSelect<click>': function (e) {
            var me = this;
            var pagelet = me.getManaged('pagelet');
            var curNode = $('#' + e.currentId);
            var tagId = e.params.tagId;

            if (curNode.hasClass('active')) {
                return false;
            }

            curNode.addClass('active').siblings('li').removeClass('active');
            $('#J_tagId').val(tagId);
        },
        'del<click>': function (e) {
            var me = this;
            var pagelet = me.getManaged('pagelet');
            var curNode = $('#' + e.currentId);
            var detail = me.getManaged('detail');
            var upload = me.getManaged('upload');
            var index = e.params.index;

            if (index == 4) {
                detail.cover = '';
            }

            var images = S.clone(detail.images);
            S.each(images, function(v, k) {
                if (k == index) {
                    detail.images.splice(k, 1);
                } 
            });

            // debugger;
            me.operateUpload();
            pagelet.setChunkData('hasUpload', detail.hasUpload);
            pagelet.setChunkData('cover', detail.cover);
            pagelet.setChunkData('images', detail.images);
            upload.reset();

        },
        'submit<click>': function (e) {
            e.halt();
            var me = this;
            var params = {};
            var pagelet = me.getManaged('pagelet');
            var detail = me.getManaged('detail');
            var valid = me.getManaged('valid');
            var contentId = $('#J_contentId').val();
            var title = $('#J_input_title').val();

            if(valid.isValid()) {
                var disabled = $('#validatForm').all(':input:disabled').removeAttr('disabled');
                params = S.mix(params, S.unparam(S.IO.serialize('#validatForm')));
                disabled.attr('disabled', 'disabled');

                // 内容标签校验
                var tagId = $('#J_tagId').val();
                if (!tagId) {
                    var tips = $('#J_tagMsg');
                    tips.one('.estate').addClass('error');
                    tips.one('.label').text('请至少选择一个内容标签。');
                    tips.slideDown(0.1, function() {
                        S.later(function() {
                            tips && tips.slideUp();
                        }, 3000);
                    });
                    return;
                }

                // 自定义标签校验
                var customTags = $('#J_input_custags').val();
                var isStand = false;
                customTags = customTags.replace(/\s+/g, ',').split(',');

                for (var i = 0; i < customTags.length; i++) {
                    var v = customTags[i];
                    if (v.length < 2 || v.length > 5) {
                        isStand = true;
                        break;
                    }
                }

                if (isStand) {
                    var tips = $('#J_custagMsg');
                    tips.one('.estate').addClass('error');
                    tips.one('.label').text('自定义标签长度2-5个汉字。');
                    tips.slideDown(0.1);
                    return;
                }

                if (customTags.length < 2 || customTags.length >= 6) {
                    var tips = $('#J_custagMsg');
                    tips.one('.estate').addClass('error');
                    tips.one('.label').text('自定义标签个数在2-5个之间。');
                    tips.slideDown(0.1);
                    return;
                }
                params = S.mix(params, {
                    'customTags': customTags,
                    'bizType': bizType
                });

                // 描述处理
                params.desc = params.desc.replace(/\n/g, ' ');

                // 主图校验
                var mainImg = detail.cover && detail.cover.filename;
                if (!mainImg) {
                    var tips = $('#J_mainImgMsg');
                    tips.one('.estate').addClass('error');
                    tips.one('.label').text('请上传主图。');
                    tips.slideDown(0.1, function() {
                        S.later(function() {
                            tips && tips.slideUp();
                        }, 3000);
                    });
                    return;
                }

                S.mix(params, {
                    'cover': detail.cover.filename
                });

                // 附图处理
                var subImages = [];
                var images = detail.images;
                if (images.length > 0) {
                    S.each(images, function(v, k) {
                        v.filename && subImages.push(v.filename);
                    });
                }
                S.mix(params, {
                    'images': subImages
                });

                // debugger;

                // 提交进入下一步
                me.manage(MM.fetchAll([{
                    name: "submit_item",
                    type: "post",
                    postParams: params
                }], function (errs, MesModel) {
                    var data = MesModel.get('data');
                    var parentData = me.getManaged('data');

                    if (data.status) {
                        parentData.callback(contentId, title);
                    } else {
                        Util.showGlobalTip(data.message);
                    }

                }));

            }
        }
    });
},{
    requires:['mxext/view', 'app/models/modelmanager', 'magix/vom', 'node', 'app/util/util', 'components/iframeupload/index']
});