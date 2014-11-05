KISSY.add("app/views/manage/media/media_flashManage", function (S, View, MM, VOM, Node, Util, Uploader, Calendar, FixedHead) {
    var $ = Node.all;

    return View.extend({
        locationChange: function (e) {
            this.render();
        },
        render: function () {
            var me = this;
            var loc = me.location;
            var params = S.clone(loc.params);

            params.page = params.page ? params.page : 1;
            params.perpage = params.perpage ? params.perpage : 10;

            S.mix(params, {
                bizType: bizType
            });

            me.manage(MM.fetchAll([{
                name: "flash_list",
                urlParams: params
            }], function (errs, MesModel) {
                var data = MesModel.get('data');

                me.setViewPagelet({
                    list: data.list,
                    pageCount: data.paginator.total,
                    pageNo: params.page,
                    pageSize: params.perpage,
                    bizType: bizType,
                    nid: ''
                }, function () {
                    me.components();
                }, function () {
                    // 第一次之后会执行
                    var pageParams = {
                        pageNo: params.page,
                        pageSize: params.perpage,
                        pageCount: data.paginator.total
                    }
                    me.resetPage(pageParams);
                    me.resetCheckall();
                });
            }));
        },
        components: function () {
            var me = this;
            var nid = '';
            var pagelet = me.getManaged('pagelet');
            var allowExts = "swf";
            var allowMaxSize = 5120;

            // 全选
            var checkall = pagelet.getBrick('J_item_list');
            checkall.on('checkAll',function(ev) {
                if (this.getData().length > 0) {
                    nid = this.getData().join('_');
                } else {
                    nid = '';
                }

                pagelet.setChunkData('nid', nid);
            });
            checkall.on('singleCheck',function(ev) {
                if (this.getData().length > 0) {
                    nid = this.getData().join('_');
                } else {
                    nid = '';
                }

                pagelet.setChunkData('nid', nid);
            });
            me.manage('checkall', checkall);

            // 浮动表头
            new FixedHead({
                el: $('#J_item_list')
            });

            // 图片批量上传
            var plugins = 'gallery/uploader/1.4/plugins/auth/auth';
            S.use(plugins, function(S,Auth) {
                var uploader = new Uploader('#J_UploaderBtn', {
                    // 上传方式切成flash
                    type:"flash",
                    //手动控制flash的尺寸
                    swfSize:{"width":70, "height":25},
                    action: 'http://sitemanager.jae.taobao.com/sitemanager/flashservice/upload.htm',
                    multiple: true
                }).plug(new Auth({
                    allowExts:allowExts,
                    maxSize : allowMaxSize // 5M
                }));

                $('.ks-uploader-button').one('.btn-text').html('新增Flash');


                uploader.on("start", function(evt){
                    // console.log(evt);
                });

                uploader.set('filter',function(data) {
                    var or = S.JSON.parse(data);
                    return S.JSON.stringify(or.data);
                });

                uploader.on("success", function(evt) {
                    // debugger;
                    me.render();
                });
                uploader.on('error',function(ev) {
                    if (ev.rule === "allowExts") {
                        alert("请上传" + allowExts + "格式的文件！");
                    }
                    if (ev.rule === "maxSize") {
                        alert("请上传" + allowMaxSize + "KB以下的文件！");
                    }
                });
            });

            // 分页
            var pagination = pagelet.getBrick('J_item_pagination');
            if (pagination) {
                pagination.on('gotoPage',function(ev) {
                    me.navigate('page=' + ev.index);
                });
                pagination.on('sizeChange',function(ev) {
                    me.navigate('page=1&perpage=' + ev.size);
                });
            }
        },
        resetPage: function (params) {
            var me = this;
            var pagelet = me.getManaged('pagelet');
            var pagination = pagelet.getBrick('J_item_pagination');
            var pageparam = {};

            if (pagination) {
                if (pagination.get('index') != params.pageNo) {
                    pageparam['index'] = params.pageNo;
                }
                if (pagination.get('size') != params.pageSize) {
                    pageparam['size'] = params.pageSize;
                }
                if (pagination.get('count') != params.pageCount) {
                    pageparam['count'] = params.pageCount;
                }
                if (!S.isEmptyObject(pageparam)) {
                    pagination.setConfig(pageparam);
                }
            }
        },
        'code<click>': function (e) {
            e.halt();
            var me = this;
            var curNode = $('#' + e.currentId);
            var parent = curNode.parent('tr');
            var top = curNode.parent('tr').offset().top;
            var dialogConfig = Util.getDefaultDialogConfig({top: top});
            var viewName = 'app/views/util/code';
            var viewOptions = {
                url: e.params.url
            }
            Util.showDialog(dialogConfig, viewName, viewOptions);

        },
        'del<click>': function (e) {
            e.halt();
            var me = this;
            var curNode = $('#' + e.currentId);
            var parent = curNode.parent('tr') || curNode.parent('.table-head-fix');
            var top = parent.offset().top;
            var dialogConfig = Util.getDefaultDialogConfig({
                width: 300, 
                top: top
            });

            var ids = e.params.id.split('_');
            ids = ids.join(',');

            var viewName = 'app/views/util/confirm';
            var viewOptions = {
                confirmFn: function(){
                    me.manage(MM.fetchAll([{
                        name: "delete_flash",
                        type: "post",
                        postParams: {
                            id: ids,
                            bizType: bizType
                        }
                    }], function (errs, MesModel) {
                        Util.hideDialog();
                        me.render();
                    }), function () {
                        
                    });
                },
                cancelFn: function(){
                    Util.hideDialog();
                },
                confirmTitle: '删除Flash',
                confirmContent: '您确定要删除此Flash吗？'
            };
            Util.showDialog(dialogConfig, viewName, viewOptions);
        },
        resetCheckall: function() {
            var me = this;
            var checkall = me.getManaged('checkall');
            checkall.bindUI();
        },
        renderer: {
            list: {
                fileModified: function () {
                    var S_Date = Calendar.Date;
                    return S_Date.format(this.fileModified, 'isoDate');
                }
            }
        }
    });
},{
    requires:['mxext/view', 'app/models/modelmanager', 'magix/vom', 'node', 'app/util/util', "gallery/uploader/1.4/index", 'brix/gallery/calendar/', 'components/fixed_head/index']
});