/**
 * Created with IntelliJ IDEA.
 * User: fengxun.xdw
 * Date: 14-1-14
 * Time: 下午12:16
 * To change this template use File | Settings | File Templates.
 */
KISSY.add("app/views/manage/jifen/detail", function (S, View, MM, Node,Util,Calendar) {
    var $ = Node.all;

    return View.extend({
        locationChange: function (e) {
            this.render();
        },
        render: function (config) {
            var me = this;
            var loc = me.location;
            var params;
            if(config){
                params = config;
            }else{
                params = S.clone(loc.params);
                params.pageNum = params.pageNum ? params.pageNum : 1;
                params.nick = params.nick ? params.nick : "";
                params.reason = params.reason ? params.reason : "";
                params.time = params.time ? params.time : "";
            }

            S.mix(params, {
                bizType: bizType,
                pageSize: 10
            });

            me.manage(MM.fetchAll([{
                name: "jifen_detail_list",
                urlParams: params
            }], function (errs, MesModel) {
                var data = MesModel.get('data').result;
                var list = data.list;

                me.setViewPagelet({
                    source: data.source,
                    sitename: data.siteName,
                    list: list,
                    totalPage: data.totalPage,
                    currentPage: data.currentPage,
                    nick: decodeURI(params.nick),
                    reason: decodeURI(params.reason),
                    time: params.time
                }, function () {
                    me.components();
                }, function () {
                });

                //update page
                $('#J_item_pagination').one('.page-simply').html(data.currentPage+'/'+data.totalPage);
                $('#J_item_pagination').one('.totalPage').html(data.totalPage);
                $('#J_item_pagination').one('.totalItem').html(data.totalItem);
                $('#J_item_pagination').one('.page-num').val(data.currentPage);
                var startNum = (parseInt(data.currentPage)-1)*10,
                    endNum = startNum + data.list.length;
                $('#J_item_pagination').one('.b').html(startNum+"-"+endNum);
            }));
        },
        components: function () {
            var me = this;

            var dataHref = $('.J_export').attr('href')+encodeURI(S.param(me.location.params));
            $('.J_export').attr('href',dataHref);

            // 日历组件
            S.each($('.J_Calendar'),function(elem){
                var calendar = new Calendar({
                    trigger:elem,
                    align:{
                        points:['bl','tl'],
                        offset:[0,0]
                    },
                    popup:true,
                    triggerType:['click']
                });

                calendar.on('select', function(e) {
                    calendar.hide();
                    var Date = Calendar.Date.format(e.date,'yyyy-mm-dd');
                    $(elem).val(Date);
                });
            });
        },
        search:function(page){
            var me = this;
            var date = $('.J_Calendar').val(),
                Nick = $('.J_Nick').val(),
                ID = $('.J_ID').val()?$('.J_ID').val():"",
                page = page;
            var dataHref = $('.J_export').attr('data-href')+"time="+date+"&reason="+encodeURI(ID)+"&nick="+encodeURI(Nick)+"&pageNum="+page+"&bizType="+bizType;
            $('.J_export').attr('href',dataHref);
            me.render({
                pageNum: page,
                nick: encodeURI(Nick),
                reason: encodeURI(ID),
                time: date
            });
        },
        'search<click>': function(e){
            e.halt();
            this.search(1);
        },
        'jump<click>': function(e){
            e.halt();
            var page = parseInt($('.page-num').val()),
                totalPage = parseInt($('#J_item_pagination').one('.totalPage').html());
            if(!page || page == NaN){
                return;
            }
            if(page<=0||page>totalPage){
                return;
            }
            $('#J_item_pagination').one('.page-simply').html(page+'/'+totalPage);
            this.search(page);
        },
        renderer: {
            list: {
                status: function (self) {
                    switch (parseInt(this.number)>=0) {
                        case true:
                            return this.number ;
                            break;
                        case false:
                            return '<span class="red">'+this.number+'</span>';
                            break;
                    }
                }
            }
        }
    });
},{
    requires:['mxext/view', 'app/models/modelmanager', 'node', 'app/util/util', 'brix/gallery/calendar/']
});