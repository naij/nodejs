KISSY.add("app/views/manage/item/items", function (S, View, MM, VOM, Node, Util) {
    var $ = Node.all;

    return View.extend({
        render: function () {
            var me = this;

            me.setViewPagelet({

            }, function () {
                me.mountSubFrame();
            });
        },
        mountSubFrame: function () {
            var me = this;
            var vframe = VOM.get('magix_vf_items');
            var viewPath = 'app/views/manage/item/item_list';
            var viewOptions = {};

            vframe.mountView(viewPath, viewOptions);
        }
    });
},{
    requires:['mxext/view', 'app/models/modelmanager', 'magix/vom', 'node', 'app/util/util']
});