KISSY.add("app/views/manage/report/reports", function (S, View, MM, VOM, Router, Node, Util) {
    var $ = Node.all;

    var ViewMap = {
        1: 'app/views/manage/report/report_flow',
        2: 'app/views/manage/report/report_personality'
    };

    return View.extend({
        locationChange: function(e) {
            this.render();
        },
        render: function () {
            var me = this;
            var params = this.location.params;
            var countType = params.countType || 1;

            me.setViewPagelet({
                countType: countType
            }, function () {
                me.mountItemsFrame(countType);
            }, function() {
                me.mountItemsFrame(countType);
            });
        },
        mountItemsFrame: function (countType) {
            var me = this;
            var vframeList = VOM.get('magix_vf_items_media');

            var viewOption = {
                
            };

            vframeList.mountView(ViewMap[countType], viewOption);
        },
        'showTab<click>': function (e) {
            e.halt();
            var node = $('#'+e.currentId);
            if (!node.hasClass('selected')) {
                Router.navigate('/manage/report/reports?countType=' + e.params.countType);
            }
        }
    });
},{
    requires:['mxext/view', 'app/models/modelmanager', 'magix/vom', 'magix/router', 'node', 'app/util/util']
});