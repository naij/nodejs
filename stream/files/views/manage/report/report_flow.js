KISSY.add("app/views/manage/report/report_flow", function (S, View, MM, VOM, Node, Util) {
    var $ = Node.all;

    return View.extend({
        render: function () {
            var me = this;

            me.setViewPagelet({
                siteId: cnzzId,
                password: cnzzPass
            }, function () {
                
            });
        }
    });
},{
    requires:['mxext/view', 'app/models/modelmanager', 'magix/vom', 'node', 'app/util/util']
});