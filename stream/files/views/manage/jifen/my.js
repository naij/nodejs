/**
 * Created with IntelliJ IDEA.
 * User: fengxun.xdw
 * Date: 14-1-14
 * Time: 下午12:16
 * To change this template use File | Settings | File Templates.
 */
KISSY.add("app/views/manage/jifen/my", function (S, View, MM, Node,Overlay, Util,Calendar) {
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
                var params = S.clone(loc.params);
                params.pageNum = params.pageNum ? params.pageNum : 1;
                params.startTime = params.startTime ? params.startTime : "";
                params.endTime = params.endTime ? params.endTime : "";
            }

            S.mix(params, {
                bizType: bizType,
                pageSize: 10
            });

            me.manage(MM.fetchAll([{
                name: "jifen_list",
                urlParams: params
            }], function (errs, MesModel) {
                var data = MesModel.get('data').result;
                var list = data.list;

                me.setViewPagelet({
                    source: data.source,
                    sitename: data.siteName,
                    total: data.total,
                    remainderTotal: data.remainderTotal,
                    gaveTotal: data.gaveTotal,
                    invalidTotal: data.invalidTotal,
                    list: list,
                    totalPage: data.totalPage,
                    currentPage: data.currentPage,
                    startTime: params.startTime,
                    endTime: params.endTime
                }, function () {
                    me.components();
                }, function () {

                });

                //update page
                $('#J_item_pagination').one('.page-simply').html(data.currentPage+'/'+data.totalPage);
                $('#J_item_pagination').one('.b').html(data.totalPage);
                $('#J_item_pagination').one('.page-num').val(data.currentPage);

                //update jifen detail
                $('.jifen_total').html(data.total);
                $('.jifen_remainder').html(data.remainderTotal);
                $('.jifen_gave').html(data.gaveTotal);
                $('.jifen_invalid').html(data.invalidTotal);
            }));
        },
        components: function () {
            var me = this;

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
        search: function(page){
            var me = this;
            var startTime = $('.J_start').val(),
                endTime = $('.J_end').val(),
                page = page;
            me.render({
                pageNum:page,
                startTime:startTime,
                endTime:endTime
            });
        },
        'jump<click>': function(e){
            e.halt();
            var page = parseInt($('.page-num').val()),
                totalPage = parseInt($('#J_item_pagination').one('.b').html());
            if(!page || page == NaN){
                return;
            }
            if(page<=0||page>totalPage){
                return;
            }
            $('#J_item_pagination').one('.page-simply').html(page+'/'+totalPage);
            this.search(page);
        },
        'checkInput<click>': function(e){
            var me = this;
            var evt = e.domEvent;
            if($(evt.target).hasClass('J_disable_all')){
                $('.J_check').prop('checked',$(evt.target).prop('checked'));
                if($(evt.target).prop('checked')){
                    me.disableIds = "";
                    S.each($('.jifen-id'),function(elem){
                        if($(elem).parent('tr').one('.J_check').hasClass('hidden')){
                            return;
                        }
                        me.disableIds += ','+$(elem).attr('id');
                    })
                }else{
                    me.disableIds = "";
                }
            }else{
                if($(evt.target).prop('checked')){
                    if(!me.disableIds){
                        me.disableIds = "";
                    }
                    me.disableIds = me.disableIds + ',' + e.params.id;
                    if(me.disableIds.split(',').length == $('.J_check').length - $('.J_check.hidden').length + 1){
                        $('.J_disable_all').prop('checked',true);
                    }
                }else{
                    $('.J_disable_all').prop('checked',false);
                    me.disableIds = me.disableIds.replace(','+e.params.id , '');
                }
            }
        },
        'disableAll<click>': function(e){
            e.halt();
            var me = this;
            if(!me.disableIds || me.disableIds=="" || me.disableIds==","){
                return;
            }

            var top = parseInt($(e.domEvent.target).offset().top)-180;
            var dialogConfig = Util.getDefaultDialogConfig({
                width: 300,
                top: top
            });
            var viewName = 'app/views/util/confirm';
            var viewOptions = {
                confirmFn: function(){
                    me.manage(MM.fetchAll([{
                        name: "disable_jifen",
                        urlParams: {
                            batchIds: me.disableIds.slice(1),
                            bizType: bizType
                        }
                    }], function (errs, MesModel) {
                        var data = MesModel.get('data');
                        if (data.status) {   //成功：重绘
                            Util.hideDialog();
                            me.render();
                        } else {
                            Util.showGlobalTip(data.message);  //失败：提示
                        }
                    }), function () {

                    });
                },
                cancelFn: function(){
                    Util.hideDialog();
                },
                confirmTitle: '停止发放',
                confirmContent: '您确定要停止发放吗？'
            };
            Util.showDialog(dialogConfig, viewName, viewOptions);
        },
        'search<click>': function(e){
            e.halt();
            var me = this;
            me.search(1);
        },
        'addJifen<click>': function(e){
            e.halt();
            var me = this;
            var dialog = new Overlay.Dialog({
                mask: false,
                prefixCls: "jifen-",
                headerContent:"增加积分",
                bodyContent:"<div class='jd-content'>" +
                    "<div class='jd-per'><span style='font-weight:700;color:#000;'>积分ID:"+ e.params.id +"</span></div>" +
                    "<div class='jd-per'><span>新增积分数量：</span><input placeholder='输入整数' class='jd-input'><span style='color:#fd3f00;margin-left:10px;'>*创建信息不可更改</span></div>" +
                    "<div class='jd-opt'><div class='jd-per'><button class='jd-sure' style='float:right'>确定</button></div></div>" +
                    "</div>",
                closable: true,
                closeAction: "destroy",
                with: 355
            });
            dialog.render();
            $(dialog.get('el')).one('.jifen-ext-close-x').html('X');
            dialog.center();
            dialog.show();

            $(dialog.get('el')).one('.jd-sure').on('click', function(){
                var number = $(dialog.get('el')).one('.jd-input').val();
                if(!number){
                    Util.showGlobalTip("增加积分必须填写新增积分数量！");
                    return;
                }
                if(!/^[0-9]*[1-9][0-9]*$/.test(number)){
                    Util.showGlobalTip("新增积分数量必须是正整数！");
                    return;
                }
                me.manage(MM.fetchAll([{
                    name: "add_jifen",
                    urlParams: {
                        batchId: e.params.id,
                        number: $(dialog.get('el')).one('.jd-input').val(),
                        bizType: bizType
                    }
                }], function (errs, MesModel) {
                    var data = MesModel.get('data');
                    if (data.status) {
                       // Util.hideDialog();
                        dialog.destroy();
                        me.render();
                    } else {
                        Util.showGlobalTip(data.message);
                    }
                }), function () {

                });
            });

        },
        showdate: function(n,d) {
            // 计算d天的前几天或者后几天，返回date

            var uom = new Date(d-0+n*86400000);
            uom = uom.getFullYear() + "/" + (uom.getMonth()+1) + "/" + uom.getDate();
            return new Date(uom);
        },
        'createfen<click>': function (e) {
            e.halt();
            var me = this;
            if(me.dialog){
                me.dialog.show();
            }else{
                var dialog = new Overlay.Dialog({
                    mask: false,
                    prefixCls: "jifen-",
                    headerContent:"新建积分",
                    bodyContent:"<div class='jd-content'>" +
                        "<div class='jd-per'><span>新建积分数量：</span><input placeholder='输入整数' class='jd-input jd-amount'></div>" +
                        "<div class='jd-per'><span>停止发放时间：</span><input placeholder='选择时间' class='jd-input jd-calendar'></div>" +
                        "<div class='jd-opt'><p>*创建信息不可更改</p><div class='jd-per'><span>停止发放时间是指截止该时间该批积分停止发放</span><button class='jd-sure'>确定</button></div></div>" +
                        "</div>",
                    closable: true,
                    closeAction: "hide",
                    with: 400
                });
                dialog.render();
                $(dialog.get('el')).one('.jifen-ext-close-x').html('X');
                dialog.center();
                dialog.show();
                me.dialog = dialog;

                var calendar = new Calendar({
                    minDate: me.showdate(1,new Date()),
                    trigger: $(dialog.get('el')).one('.jd-calendar'),
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
                    $(dialog.get('el')).one('.jd-calendar').val(Date);
                });

                $(dialog.get('el')).one('.jd-sure').on('click', function(){
                    var number = $(dialog.get('el')).one('.jd-amount').val(),
                        endTime = $(dialog.get('el')).one('.jd-calendar').val();
                    if(!number ||!endTime){
                        Util.showGlobalTip("新建积分必须填写新建积分数量和停止发放时间！");
                        return;
                    }
                    if(!/^[0-9]*[1-9][0-9]*$/.test(number)){
                        Util.showGlobalTip("新建积分数量必须是正整数！");
                        return;
                    }

                    me.manage(MM.fetchAll([{
                        name: "create_jifen",
                        urlParams: {
                            number: number,
                            endTime: endTime,
                            bizType: bizType
                        }
                    }], function (errs, MesModel) {
                        var data = MesModel.get('data');
                        if (data.status) {
                           // Util.hideDialog();
                            dialog.hide();
                            me.render();
                        } else {
                            Util.showGlobalTip(data.message);
                        }
                    }), function () {

                    });
                });
            }
        },
        renderer: {
            list: {
                hide: function (self){
                    switch (this.status) {
                        case "发放中":
                            return '';
                            break;
                        default:
                            return 'hidden';
                            break;
                    }
                },
                status: function (self){
                    switch (this.status) {
                        case "发放中":
                            return this.status;
                            break;
                        default:
                            return '<span class="gray">'+this.status+'</span>';
                            break;
                    }
                },
                opt: function (self){
                    switch (this.status) {
                        case "发放中":
                            return '<a mx-click="addJifen{id:'+this.id+'}">增加积分</a>';
                            break;
                        default:
                            return '';
                            break;
                    }
                }
            }
        }
    });
},{
    requires:['mxext/view', 'app/models/modelmanager', 'node', 'overlay','app/util/util', 'brix/gallery/calendar/']
});