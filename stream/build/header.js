KISSY.add("app/views/header",function(e,a){return function(e){return e.prototype.template='<div class=header> <div class=ai-logo> <div class=logo> <p class="iconfont ai-icon">&#61539;</p> <p class=small><em class="iconfont tb-icon">&#512;</em>\u8d2d\u7269\u5206\u4eab\u5e73\u53f0</p> </div> <div class=center> <h1>\u5f00\u53d1\u8005\u4e2d\u5fc3</h1> </div> </div> <div class=login> <ul> <li class=menu-top-hello>\u4f60\u597d\uff0c</li> <li style="padding-left:0;">{{nick}}</li> <li><a href="{{logoutUrl}}">\u9000\u51fa</a></li> </ul> </div> <div class=site-nav> <ul class=quick-menu> <li><a href="/sitemanager/aitaobao/index.htm?bizType=14">\u9996\u9875</a></li> <li class=selected><a href="#">\u6211\u7684\u7ad9\u70b9</a></li> <li><a href="/sitemanager/aitaobao/help.htm?bizType=14">\u5e2e\u52a9\u6587\u6863</a></li> <li><a href="http://jae.taobao.com/jaedocs/docs.html" target=_blank>\u6280\u672f\u652f\u6301</a></li> </ul> </div> </div>',e}(a.extend({render:function(){var e=this,a=window.UserInfo;e.setViewPagelet(a)}}))},{requires:["mxext/view","app/models/modelmanager"]});