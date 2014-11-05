KISSY.add("app/views/manage/item/item_add", function (S, View, MM, VOM, Node, Util) {
    var $ = Node.all;

    return View.extend({
        init: function(e) {
            this.manage('data', e);
        },
        render: function () {
            var me = this;
            var parentData = me.getManaged('data');
            var contentId = parentData.contentId;

            me.manage(MM.fetchAll([{
                name: "item_list",
                urlParams: {
                    id: contentId,
                    bizType: bizType
                }
            }], function (errs, MesModel) {
                var data = MesModel.get('data').result;
                var list = data.itemsList;
                me.manage('list', list);

                me.setViewPagelet({
                    list: list,
                    url: ''
                }, function () {
                    me.components();
                }, function() {
                    me.components();
                });
            }));
        },
        components: function () {
            var me = this;
            var pagelet = me.getManaged('pagelet');
            var valid = pagelet.getBrick('validatForm').valid;
            valid.add('#J_itemUrl', {
                trim : '宝贝链接两端不能含有空格',
                url: true
            });

            me.manage('valid', valid);
        },
        'add<click>': function (e) {
            e.halt();
            var me = this;
            var curNode = $('#' + e.currentId);
            var data = me.getManaged('data');
            var valid = me.getManaged('valid');
            var contentId = data.contentId;

            if (valid.isValid()) {
                var url = $('#J_itemUrl').val();
                var itemId = S.unparam(url.split('?')[1]).id;

                me.manage(MM.fetchAll([{
                    name: "add_item",
                    type: "post",
                    postParams: {
                        id: contentId,
                        itemId: itemId,
                        bizType: bizType
                    }
                }], function (errs, MesModel) {
                    var data = MesModel.get('data');
                    var result = data.result;
                    if (data.status) {
                        if (result.total > 30) {
                            var tips = $('#J_urlMsg');
                            tips.one('.estate').addClass('error');
                            tips.one('.label').text('添加的宝贝数已经超过30个了。');
                            tips.slideDown(0.1);
                            return;
                        } else {
                            me.render();
                        }
                    } else {
                        Util.showGlobalTip(data.message);
                    }

                }));
            }

        },
        'del<click>': function (e) {
            e.halt();
            var me = this;
            var curNode = $('#' + e.currentId);
            var data = me.getManaged('data');
            var contentId = data.contentId;
            var parent = curNode.parent('li');
            var top = parent.offset().top;
            var dialogConfig = Util.getDefaultDialogConfig({
                width: 300, 
                top: top
            });

            var viewName = 'app/views/util/confirm';
            var viewOptions = {
                confirmFn: function(){
                    me.manage(MM.fetchAll([{
                        name: "item_delete",
                        type: "post",
                        postParams: {
                            itemId: e.params.itemId,
                            id: contentId,
                            bizType: bizType
                        }
                    }], function (errs, MesModel) {
                        var data = MesModel.get('data');
                        Util.hideDialog();
                        if (data.status) {
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
                confirmTitle: '删除宝贝',
                confirmContent: '您确定要删除此宝贝吗？'
            };
            Util.showDialog(dialogConfig, viewName, viewOptions);
        },
        'submit<click>': function (e) {
            e.halt();
            var me = this;
            var parentData = me.getManaged('data');
            var list = me.getManaged('list');
            var title = parentData.title;
            if (list.length > 0) {
                parentData.callback(title);
            } else {
                var tips = $('#J_urlMsg');
                tips.one('.label').text('请至少添加一个宝贝。');
                tips.slideDown(0.1);
            }
        }
    });
},{
    requires:['mxext/view', 'app/models/modelmanager', 'magix/vom', 'node', 'app/util/util']
});