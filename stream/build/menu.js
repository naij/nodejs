KISSY.add("app/views/menu",function(e,a){return function(e){return e.prototype.template='<div class=sidebar id=sidebar bx-name="sidenav" bx-path="components/sidenav/" bx-config="{\n    navTop: 117,\n    index: \'#!/manage/item/items\',\n    pathMap: {\n        \'#!/manage/item/item_promo\': \'#!/manage/item/items\'\n    }\n}"> <ul class=nav> <li><a href="/sitemanager/manage/mysite.htm?bizType={{bizType}}" hidefocus=true>\u6211\u7684\u7ad9\u70b9</a></li> <li><a href="http://jae.cloud.taobao.com/ide/i.html?u={{u}}" target=_blank hidefocus=true>\u5e94\u7528\u7ba1\u7406</a></li> <li><a href="/sitemanager/manage/managenav.htm?bizType={{bizType}}" hidefocus=true>\u5bfc\u822a\u8bbe\u7f6e</a></li> <li><a href="#!/manage/item/items" hidefocus=true>\u5185\u5bb9\u7ba1\u7406</a></li> <li><a href="#!/manage/report/reports" hidefocus=true>\u6570\u636e\u670d\u52a1</a></li> <li><a href="#!/manage/media/medias" hidefocus=true>\u6587\u4ef6\u670d\u52a1</a></li> <li><a href="#!/manage/jifen/my" hidefocus=true>\u79ef\u5206\u7ba1\u7406</a></li> </ul> </div>',e}(a.extend({init:function(){this.observeLocation({pathname:!0})},render:function(){var e=this;e.setViewPagelet({bizType:bizType,u:appId})}}))},{requires:["mxext/view"]});