KISSY.add("app/views/util/code",function(e,t,a,i,n,l){n.all;return function(e){return e.prototype.template='<div class=code-wrap> <h2 class=h2-ex> {{{title}}} </h2> <textarea class=textarea bx-name="clipboard" bx-path="components/clipboard/">{{clickUrl}}</textarea> {{^hideBtn}} <div> <a href="javascript:;" mx-click=close class="btn btn-size28">\u5173\u95ed</a> </div> {{/hideBtn}} </div>',e}(t.extend({init:function(e){this.manage("data",e)},render:function(){var e=this,t=e.getManaged("data");e.setViewPagelet({title:t.title||"\u83b7\u53d6\u4ee3\u7801",hideBtn:t.hideBtn||!1,clickUrl:t.url},function(){})},"close<click>":function(){l.hideDialog()}}))},{requires:["mxext/view","app/models/modelmanager","magix/vom","node","app/util/util"]});