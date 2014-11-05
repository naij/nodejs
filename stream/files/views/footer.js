KISSY.add("app/views/footer", function (S,View) {
    return View.extend({
        render: function () {
            this.setViewPagelet();
        }
    });
},{
    requires:["mxext/view"]
});