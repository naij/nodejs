KISSY.add("app/views/menu", function (S, View) {
    return View.extend({
        init: function () {
            this.observeLocation({
                pathname: true
            });
        },
        render: function () {
            var me = this;
            me.setViewPagelet({
                bizType: bizType,
                u: appId
            });
        }
    });
}, {
    requires: ['mxext/view']
});