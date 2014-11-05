KISSY.add("app/views/header", function (S, View, MM) {
    return View.extend({
        render: function () {
            var self = this;
            
            var UserInfo = window.UserInfo;
            
            
            self.setViewPagelet(UserInfo);
        }
    });
}, {
    requires: ["mxext/view", "app/models/modelmanager"]
});