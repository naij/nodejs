KISSY.add("app/views/manage/item/item_list", function (S, View, MM, Node, Util, FixedHead) {
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
                name: "content_list",
                urlParams: params
            }], function (errs, MesModel) {
                var data = MesModel.get('data').result;
                var list = data.list;

                me.setViewPagelet({
                    list: list,
                    pageCount: data.paginator.total,
                    pageNo: params.page,
                    pageSize: params.perpage
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
                });
            }));
        },
        components: function () {
            var me = this;
            var pagelet = me.getManaged('pagelet');

            // 浮动表头
            new FixedHead({
                el: $('#J_item_list')
            });

            // 分页
            var pagination = pagelet.getBrick('J_item_pagination');
            if(pagination){
                pagination.on('gotoPage',function(ev){
                    me.navigate('page=' + ev.index);
                });
                pagination.on('sizeChange',function(ev){
                    me.navigate('page=1&perpage=' + ev.size);
                });
            }
        },
        resetPage: function (params) {
            var me = this;
            var pagelet = me.getManaged('pagelet');
            var pagination = pagelet.getBrick('J_item_pagination');
            var pageparam = {};

            if(pagination){
                if(pagination.get('index') != params.pageNo) {
                    pageparam['index'] = params.pageNo;
                }
                if(pagination.get('size') != params.pageSize) {
                    pageparam['size'] = params.pageSize;
                }
                if(pagination.get('count') != params.pageCount) {
                    pageparam['count'] = params.pageCount;
                }
                if(!S.isEmptyObject(pageparam)) {
                    pagination.setConfig(pageparam);
                }
            }
        },
        'del<click>': function (e) {
            e.halt();
            var me = this;
            var curNode = $('#' + e.currentId);
            var top = curNode.parent('tr').offset().top;
            var dialogConfig = Util.getDefaultDialogConfig({
                width: 300, 
                top: top
            });
            var viewName = 'app/views/util/confirm';
            var viewOptions = {
                confirmFn: function(){
                    me.manage(MM.fetchAll([{
                        name: "delete_item",
                        type: "post",
                        postParams: {
                            id: e.params.id,
                            bizType: bizType
                        }
                    }], function (errs, MesModel) {
                        var data = MesModel.get('data');
                        if (data.status) {
                            Util.hideDialog();
                            me.render();
                        } else {
                            Util.showGlobalTip(data.message);
                        }
                    }), function () {
                        
                    });
                },
                cancelFn: function(){
                    Util.hideDialog();
                },
                confirmTitle: '删除内容',
                confirmContent: '您确定要删除此内容吗？'
            };
            Util.showDialog(dialogConfig, viewName, viewOptions);

        },
        renderer: {
            list: {
                status: function (self) {
                    switch (this.status) {
                        case 0:
                            return '<span class="color-orange">草稿</span>';
                            break;
                        case 1:
                            return '<span class="color-orange">审核中</span>';
                            break;
                        case 2:
                            return '<div class="table-more">' + 
                                '<span class="color-red">审核拒绝</span>' + 
                                    '<i class="icon-horn-tilt"></i>' + 
                                    '<span class="table-info">' + this.refuseReason + '</span>' + 
                                '</div>';
                            break;
                        case 3:
                            return '<span class="color-green">审核通过</span>';
                            break;
                        case 4:
                            return '<div class="table-more">' + 
                                '<span class="color-red">运营下线</span>' + 
                                    '<i class="icon-horn-tilt"></i>' + 
                                    '<span class="table-info">' + this.refuseReason + '</span>' + 
                                '</div>';
                            break;
                    }
                }
            }
        }
    });
},{
    requires:['mxext/view', 'app/models/modelmanager', 'node', 'app/util/util', 'components/fixed_head/index']
});