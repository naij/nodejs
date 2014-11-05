KISSY.add("app/views/manage/report/report_personality", function (S, View, MM, VOM, Router, Node, Util, Calendar, FixedHead) {
    var $ = Node.all;

    return View.extend({
        locationChange: function (e) {
            this.render();
        },
        render: function () {
            var me = this;
            var loc = me.location;
            var S_Date = Calendar.Date;
            var params = S.clone(loc.params);
            var defaultStart = me.showdate(-7, new Date());

            params.start = params.start ? params.start : S_Date.format(defaultStart, 'isoDate');
            params.end = params.end ? params.end : S_Date.format(new Date(), 'isoDate');

            params.page = params.page ? params.page : 1;
            params.perpage = params.perpage ? params.perpage : 10;

            S.mix(params, {
                bizType: bizType
            });

            me.manage(MM.fetchAll([{
                name: "personolity_list",
                urlParams: params
            }], function (errs, MesModel) {
                var data = MesModel.get('data').result;

                me.setViewPagelet({
                    list: data.list,
                    query: data.query,
                    pageCount: data.paginator.total,
                    pageNo: params.page,
                    pageSize: params.perpage
                }, function () {
                    me.components();
                }, function () {
                    // 第一次之后会执行
                    var pageParams = {
                        pageNo: params.page,
                        pageSize: params.perpage,
                        pageCount: site.paginator.total
                    }
                    me.resetPage(pageParams);
                });
            }));
        },
        components: function () {
            var me = this;
            var loc = me.location;
            var pagelet = me.getManaged('pagelet');
            var params = S.clone(loc.params);
            params.start = params.start ? params.start : me.showdate(-7, new Date());
            params.end = params.end ? params.end : new Date();


            // 格式化日期
            var S_Date = Calendar.Date;
            var start = S_Date.format(params.start, 'isoDate');
            var end = S_Date.format(params.end, 'isoDate');

            // 日历组件
            var calendar = new Calendar({
                minDate:me.showdate(-90,new Date()),
                maxDate:new Date(),
                trigger:'#J_calendar',
                align:{
                    points:['bl','tl'],
                    offset:[0,0]
                },
                pages:2,
                rangeSelect:true,
                popup:true,
                triggerType:['click'],
                range:{
                    start:new Date(new Date(start.replace(/-/g,'/'))),
                    end:new Date(new Date(end.replace(/-/g,'/')))
                },
                autoRender:false
            });

            calendar.on('rangeSelect', function(e) {
                calendar.hide();
                var startTime = Calendar.Date.format(e.start,'yyyy-mm-dd');
                var endTime = Calendar.Date.format(e.end,'yyyy-mm-dd');

                $('#J_calendar').text(startTime + ' 至 ' + endTime);
                me.navigate('start=' + startTime);
                me.navigate('end=' + endTime);
            });

            // 浮动表头
            new FixedHead({
                el: $('#J_item_list')
            });

            // 分页
            var pagination = pagelet.getBrick('J_item_pagination');
            if (pagination) {
                pagination.on('gotoPage',function(ev) {
                    me.navigate('page=' + ev.index);
                });
                pagination.on('sizeChange',function(ev) {
                    me.navigate('page=1&perpage=' + ev.size);
                });
            }
        },
        showdate: function(n,d) {
            // 计算d天的前几天或者后几天，返回date

            var uom = new Date(d-0+n*86400000);
            uom = uom.getFullYear() + "/" + (uom.getMonth()+1) + "/" + uom.getDate();
            return new Date(uom);
        },
        resetPage: function (params) {
            var me = this;
            var pagelet = me.getManaged('pagelet');
            var pagination = pagelet.getBrick('J_item_pagination');
            var pageparam = {};

            if (pagination) {
                if (pagination.get('index') != params.pageNo) {
                    pageparam['index'] = params.pageNo;
                }
                if (pagination.get('size') != params.pageSize) {
                    pageparam['size'] = params.pageSize;
                }
                if (pagination.get('count') != params.pageCount) {
                    pageparam['count'] = params.pageCount;
                }
                if (!S.isEmptyObject(pageparam)) {
                    pagination.setConfig(pageparam);
                }
            }
        }
    });
},{
    requires:['mxext/view', 'app/models/modelmanager', 'magix/vom', 'magix/router', 'node', 'app/util/util', 'brix/gallery/calendar/', 'components/fixed_head/index']
});