KISSY.add("app/views/manage/media/medias", function (S, View, MM, VOM, Router, Node, Util) {
    var $ = Node.all;

    var ViewMap = {
        1: 'app/views/manage/media/media_imgManage',
        2: 'app/views/manage/media/media_flashManage'
    };

    return View.extend({
        locationChange: function(e) {
            this.render();
        },
        render: function () {
            var me = this;
            var params = this.location.params;
            var mediaType = params.mediaType || 1;

            me.setViewPagelet({
                mediaType: mediaType
            }, function () {
                me.mountItemsFrame(mediaType);
            }, function() {
                me.mountItemsFrame(mediaType);
            });
        },
        mountItemsFrame: function (mediaType) {
            var me = this;
            var vframeList = VOM.get('magix_vf_items_media');

            var viewOption = {
                
            };

            vframeList.mountView(ViewMap[mediaType], viewOption);
        },
        'showTab<click>': function (e) {
            e.halt();
            var node = $('#'+e.currentId);
            if (!node.hasClass('selected')) {
                Router.navigate('/manage/media/medias?mediaType=' + e.params.mediaType);
            }
        }
    });
},{
    requires:['mxext/view', 'app/models/modelmanager', 'magix/vom', 'magix/router', 'node', 'app/util/util']
});