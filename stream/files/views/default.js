KISSY.add("app/views/default", function (S, View, VOM, UA, Node, R, Util) {
    var $ = Node.all;
    return View.extend({
        init: function () {
            var me = this;
            //me.on('__PAHTNAME__',)
            //observePathname
            //ovserveParams

            //me.observeLocation('',PATHNAME);

            //me.observeLocation(['name','page']);
            //1 数据预读取
            //2.事件绑定
            //3. observe
            //4. context 当前view所需的template已准备好（如果有）
            me.observeLocation({
                pathname: true
            });
            if (UA.ie < 8) {
                me.fixLowerIE();
                me.on('destroy', function () {
                    me.unfixLowerIE();
                });
            }
        },
        /**
         * 兼容低版本的IE
         * @param  {String|HTMLElement} zone 修正的区块
         */
        fixLowerIE: function () {
            var zone = $(document.body);
            var focus = function (e) {
                $(e.target).addClass('focus');
            };
            var blur = function (e) {
                $(e.target).removeClass('focus');
            };

            zone.delegate('focusin', 'input,textarea', this.$ieFocus = focus);
            zone.delegate('focusout', 'input,textarea', this.$ieBlur = blur);
        },
        unfixLowerIE: function () {
            var zone = $(document.body);
            zone.undelegate('focusin', 'input,textarea', this.$ieFocus);
            zone.undelegate('focusout', 'input,textarea', this.$ieBlur);
        },
        render: function () {
            var me = this;
            me.setViewPagelet({
                //数据对象
            }, function () {
                me.mountMainFrame();
                // me.animateLoading();
            });
        },
        mountMainFrame: function () {
            var me = this;
            var loc = me.location;
            var pathname = loc.pathname;
            var vframe = VOM.get('magix_vf_main');
            if (vframe) {
                var pns = pathname.split('/');
                pns.shift();
                var folder = pns.shift() || 'home';
                var view = pns.join('/') || 'index';
                if (S.endsWith(view, '/')) {
                    view += 'index';
                }
                var viewPath = 'app/views/' + folder + '/' + view;
                vframe.mountView(viewPath);
            }
        },
        locationChange: function (e) {
            this.mountMainFrame();
            // this.animateLoading();
            Util.hideDialog();
            Util.hideToolTip();
        },
        // 模拟的加载进度条
        animateLoading: function () {
            var uxloading = $('.switch-loading');
            S.Anim.stop(uxloading, true);
            uxloading.css({
                opacity: 1,
                width: 0
            });
            uxloading.animate({
                width: '100%'
            }, 0.2, 'easeNone', function () {
                var _this = this;
                setTimeout(function () {
                    uxloading.animate({
                        opacity: 0
                    }, 0.25);
                }, 250)
            });
        }
    });
}, {
    requires: ['mxext/view', 'magix/vom', 'ua', 'node', 'magix/router', 'app/util/util']
});