KISSY.add("app/views/manage/item/item_add",function(a,t,e,i,l,n){var s=l.all;return function(a){return a.prototype.template='<div class=steps> <ol class=clearfix> <li class=finished>1 \u5185\u5bb9\u8bbe\u7f6e</li> <li class=ks-active>2 \u6dfb\u52a0\u5b9d\u8d1d</li> <li class=unfinished>3 \u5b8c\u6210</li> </ol> </div> <div class="item-cnt form-auth"> <form action="" id=validatForm bx-name="validation" bx-path="components/validation/index"> <ul> <li class=field bx-tmpl="url" bx-datakey="list"> <label class=field-label>\u5b9d\u8d1d\u94fe\u63a5\uff1a</label> <input type=text class="input input-url mr10" id=J_itemUrl placeholder="\u590d\u5236\u8981\u63a8\u5e7f\u7684\u5b9d\u8d1d\u94fe\u63a5" data-messagebox="#J_urlMsg" value="{{url}}">\u6700\u591a\u53ef\u6dfb\u52a030\u4e2a\u5b9d\u8d1d <div class=ux-valid id=J_urlMsg><p class="estate error"><span class=label></span></p></div> </li> </ul> <p> <a href="#" mx-click=add class="btn btn-size30 item-add-btn">\u6dfb\u52a0</a> </p> </form> <div class=item-list> <h2>\u5df2\u6dfb\u52a0\u7684\u5b9d\u8d1d</h2> <span class=divide-line></span> <ul class=clearfix bx-tmpl="list" bx-datakey="list"> {{#list}} <li> <a href="{{url}}" target=_blank> <img src="{{image}}_80x80.jpg" width=80 height=80> </a> <span class="del-btn iconfont" mx-click="del{itemId:{{itemId}}}">&#223</span> </li> {{/list}} </ul> </div> <p style="margin-top:30px;"> <a href="#" mx-click=submit class="btn btn-blue btn-size40">\u4e0b\u4e00\u6b65</a> </p> </div>',a}(t.extend({init:function(a){this.manage("data",a)},render:function(){var a=this,t=a.getManaged("data"),i=t.contentId;a.manage(e.fetchAll([{name:"item_list",urlParams:{id:i,bizType:bizType}}],function(t,e){var i=e.get("data").result,l=i.itemsList;a.manage("list",l),a.setViewPagelet({list:l,url:""},function(){a.components()},function(){a.components()})}))},components:function(){var a=this,t=a.getManaged("pagelet"),e=t.getBrick("validatForm").valid;e.add("#J_itemUrl",{trim:"\u5b9d\u8d1d\u94fe\u63a5\u4e24\u7aef\u4e0d\u80fd\u542b\u6709\u7a7a\u683c",url:!0}),a.manage("valid",e)},"add<click>":function(t){t.halt();var i=this,l=(s("#"+t.currentId),i.getManaged("data")),d=i.getManaged("valid"),r=l.contentId;if(d.isValid()){var o=s("#J_itemUrl").val(),c=a.unparam(o.split("?")[1]).id;i.manage(e.fetchAll([{name:"add_item",type:"post",postParams:{id:r,itemId:c,bizType:bizType}}],function(a,t){var e=t.get("data"),l=e.result;if(e.status){if(l.total>30){var d=s("#J_urlMsg");return d.one(".estate").addClass("error"),d.one(".label").text("\u6dfb\u52a0\u7684\u5b9d\u8d1d\u6570\u5df2\u7ecf\u8d85\u8fc730\u4e2a\u4e86\u3002"),void d.slideDown(.1)}i.render()}else n.showGlobalTip(e.message)}))}},"del<click>":function(a){a.halt();var t=this,i=s("#"+a.currentId),l=t.getManaged("data"),d=l.contentId,r=i.parent("li"),o=r.offset().top,c=n.getDefaultDialogConfig({width:300,top:o}),m="app/views/util/confirm",p={confirmFn:function(){t.manage(e.fetchAll([{name:"item_delete",type:"post",postParams:{itemId:a.params.itemId,id:d,bizType:bizType}}],function(a,e){var i=e.get("data");n.hideDialog(),i.status?t.render():n.showGlobalTip(i.message)}),function(){})},cancelFn:function(){n.hideDialog()},confirmTitle:"\u5220\u9664\u5b9d\u8d1d",confirmContent:"\u60a8\u786e\u5b9a\u8981\u5220\u9664\u6b64\u5b9d\u8d1d\u5417\uff1f"};n.showDialog(c,m,p)},"submit<click>":function(a){a.halt();var t=this,e=t.getManaged("data"),i=t.getManaged("list"),l=e.title;if(i.length>0)e.callback(l);else{var n=s("#J_urlMsg");n.one(".label").text("\u8bf7\u81f3\u5c11\u6dfb\u52a0\u4e00\u4e2a\u5b9d\u8d1d\u3002"),n.slideDown(.1)}}}))},{requires:["mxext/view","app/models/modelmanager","magix/vom","node","app/util/util"]});