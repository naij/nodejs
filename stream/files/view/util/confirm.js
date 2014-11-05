KISSY.add("app/views/util/confirm", function(S, View, MM) {
    return View.extend({
        init: function(e) {
            this.manage('data', e);
        },
        render: function() {
            var me = this;
            var data = me.getManaged('data');

            me.setViewPagelet({
                confirmTitle: data.confirmTitle,
                confirmContent: data.confirmContent
            });
        },
        'confirm<click>': function (e) {
            var me = this;
            var data = me.getManaged('data');
            var confirmFn = data.confirmFn;
            confirmFn && confirmFn();
        },
        'cancel<click>': function (e) {
            var me = this;
            var data = me.getManaged('data');
            var cancelFn = data.cancelFn;
            cancelFn && cancelFn();
        }
    });
}, {
    requires: ['mxext/view', 'app/models/modelmanager']
});
