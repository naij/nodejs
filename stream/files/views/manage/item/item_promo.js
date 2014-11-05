KISSY.add("app/views/manage/item/item_promo", function (S, View, MM, VOM, Node, Util) {
    var $ = Node.all;

    return View.extend({
        render: function () {
            var me = this;
            var params = this.location.params;
            var contentId = params.id;
            var title = '';

            if (contentId) {
                title = '编辑内容';
            } else {
                title = '新增内容';
            }

            me.setViewPagelet({
                title: title
            }, function () {
                me.mountSubFrame();
            });
        },
        mountSubFrame: function () {
            var me = this;
            var vframe = VOM.get('magix_vf_addItem');
            var viewPath = 'app/views/manage/item/item_set';
            var viewOptions = {
                callback: (function () {
                    me.mountAddItem.apply(me, arguments);
                })
            };

            vframe.mountView(viewPath, viewOptions);
        },
        mountAddItem: function (id, title) {
            var me = this;
            var vframe = VOM.get('magix_vf_addItem');
            var viewPath = 'app/views/manage/item/item_add';

            var viewOptions = {
                'contentId': id,
                'title': title,
                callback: me.mountFinishItem
            };

            vframe.mountView(viewPath, viewOptions);

        },
        mountFinishItem: function (title) {
            var me = this;
            var vframe = VOM.get('magix_vf_addItem');
            var viewPath = 'app/views/manage/item/item_finish';

            var viewOptions = {
                'title': title
            };

            vframe.mountView(viewPath, viewOptions);
        }
    });
},{
    requires:['mxext/view', 'app/models/modelmanager', 'magix/vom', 'node', 'app/util/util']
});