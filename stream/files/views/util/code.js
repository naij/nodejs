KISSY.add("app/views/util/code", function(S, View, MM, VOM, Node, Util) {
    var $ = Node.all;

    return View.extend({
        init: function(e) {
            this.manage('data', e);
        },
        render: function() {
            var me = this;
            var data = me.getManaged('data');

            me.setViewPagelet({
                title: data.title || '获取代码',
                hideBtn: data.hideBtn || false,
                clickUrl: data.url
            }, function() {
                // me.mountCodeFrame();
            });
        },
        'close<click>': function (e) {
            Util.hideDialog();
        }
    });
}, {
    requires: ['mxext/view', 'app/models/modelmanager', 'magix/vom', 'node', 'app/util/util']
});