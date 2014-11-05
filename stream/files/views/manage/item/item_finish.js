KISSY.add("app/views/manage/item/item_finish", function (S, View, MM, VOM, Node, Util) {
    var $ = Node.all;

    return View.extend({
        init: function(e) {
            this.manage('data', e);
        },
        render: function () {
            var me = this;
            var data = me.getManaged('data');

            me.setViewPagelet({
                title: data.title
            }, function () {

            });
        }
    });
},{
    requires:['mxext/view', 'app/models/modelmanager', 'magix/vom', 'node', 'app/util/util']
});