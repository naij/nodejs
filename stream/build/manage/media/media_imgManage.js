KISSY.add("app/views/manage/media/media_imgManage",function(e,t,a,i,n,l,s,o,c){var r=n.all;return function(e){return e.prototype.template='<div class="wrap-hd image-zoom"> <a href="http://tadget.taobao.com/picture/pictureIndex.htm" target=_blank class=title-bar-return>\u56fe\u7247\u7a7a\u95f4<span class="icon iconfont">&#402;</span></a> </div> <div class=table-container bx-name="checkall" bx-path="components/checkall/" id=J_item_list> <div class=table-head-fix> <div class="toolbar clearfix"> <label class=all-check> <input type=checkbox class=check-trigger  /> <span class="valign-m ml10">\u5168\u9009</span> </label> <span bx-tmpl="nid" bx-datakey="nid" class=delete-btn> <label class=del-wrap {{^nid}}style="display: none;"{{/nid}}> <span class=divide></span><a href="#" class=delete mx-click="del{id:{{nid}}}">\u5220\u9664</a> </label> </span> <button class="btn btn-size25 ml10" id=J_UploaderBtn>\u65b0\u589e\u56fe\u7247</button> </div> <table class=table bx-tmpl="sort" bx-datakey="list"> <thead> <tr {{^list}}class=no-data{{/list}}> <th class=left width=15></th> <th class=left>\u56fe\u7247\u4fe1\u606f</th> <th class=left width=80>\u7c7b\u578b</th> <th class=left width=80>\u5c3a\u5bf8</th> <th class=left width=120>\u5927\u5c0f</th> <th class=left width=120>\u4e0a\u4f20\u65e5\u671f</th> <th class=center width=200>\u64cd\u4f5c</th> </tr> </thead> </table> </div> <table class=table bx-name="tables" bx-tmpl="list" bx-datakey="list"> <tbody> {{#list}} <tr> <td class=left width=15> <input type=checkbox value="{{id}}" class=check-item  /> </td> <td> <div class=list-group> <div class=img> <img src="{{url}}_80x80.jpg" class=preview mx-mouseover=show mx-mouseout=hide> </div> <div class=title>{{name}}</div> </div> </td> <td class=left width=80>{{type}}</td> <td class=left width=80>{{h_w}}</td> <td class=left width=120>{{size}}</td> <td class=left width=120>{{{list_fileModified}}}</td> <td class=center width=200> <p class=operation> <a href="#" mx-click="code{url:{{url}}}">\u83b7\u53d6\u94fe\u63a5</a> <span class=divide>|</span> <a href="#" class=del mx-click="del{id:{{id}}}">\u5220\u9664</a> </p> </td> </tr> {{/list}} {{^list}} <tr class=none> <td colspan=7>\u5bf9\u4e0d\u8d77\uff0c\u60a8\u8fd8\u6ca1\u6709\u4e0a\u4f20\u56fe\u7247\u3002</td> </tr> {{/list}} </tbody> </table> <div class=tfoot> <div id=J_item_pagination bx-name="pagination" class=pagination bx-config="{count:{{pageCount}},index:{{pageNo}},size:{{pageSize}},sizes:[10],simplify:true,statistics:true,sizeChange:true,jump:true,goTo:false}"> </div> </div>',e}(t.extend({locationChange:function(){this.render()},render:function(){var t=this,i=t.location,n=e.clone(i.params);n.page=n.page?n.page:1,n.perpage=n.perpage?n.perpage:10,e.mix(n,{bizType:bizType}),t.manage(a.fetchAll([{name:"img_list",urlParams:n}],function(e,a){var i=a.get("data");t.setViewPagelet({list:i.list,pageCount:i.paginator.total,pageNo:n.page,pageSize:n.perpage,nid:""},function(){t.components()},function(){var e={pageNo:n.page,pageSize:n.perpage,pageCount:i.paginator.total};t.resetPage(e),t.resetCheckall()})}))},components:function(){var t=this,a="",i=t.getManaged("pagelet"),n="png,jpg,gif",l=5120,o=i.getBrick("J_item_list");o.on("checkAll",function(){a=this.getData().length>0?this.getData().join("_"):"",i.setChunkData("nid",a)}),o.on("singleCheck",function(){a=this.getData().length>0?this.getData().join("_"):"",i.setChunkData("nid",a)}),t.manage("checkall",o),new c({el:r("#J_item_list")});var d="gallery/uploader/1.4/plugins/auth/auth";e.use(d,function(e,a){var i=new s("#J_UploaderBtn",{type:"flash",swfSize:{width:70,height:25},action:"http://sitemanager.jae.taobao.com/sitemanager/imageservice/upload.htm",multiple:!0}).plug(new a({allowExts:n,maxSize:l}));r(".ks-uploader-button").one(".btn-text").html("\u65b0\u589e\u56fe\u7247"),i.on("start",function(){}),i.set("filter",function(t){var a=e.JSON.parse(t);return e.JSON.stringify(a.data)}),i.on("success",function(){t.render()}),i.on("error",function(e){"allowExts"===e.rule&&alert("\u8bf7\u4e0a\u4f20"+n+"\u683c\u5f0f\u7684\u6587\u4ef6\uff01"),"maxSize"===e.rule&&alert("\u8bf7\u4e0a\u4f20"+l+"KB\u4ee5\u4e0b\u7684\u6587\u4ef6\uff01")})});var p=i.getBrick("J_item_pagination");p&&(p.on("gotoPage",function(e){t.navigate("page="+e.index)}),p.on("sizeChange",function(e){t.navigate("page=1&perpage="+e.size)}))},resetPage:function(t){var a=this,i=a.getManaged("pagelet"),n=i.getBrick("J_item_pagination"),l={};n&&(n.get("index")!=t.pageNo&&(l.index=t.pageNo),n.get("size")!=t.pageSize&&(l.size=t.pageSize),n.get("count")!=t.pageCount&&(l.count=t.pageCount),e.isEmptyObject(l)||n.setConfig(l))},"code<click>":function(e){e.halt();var t=r("#"+e.currentId),a=(t.parent("tr"),t.parent("tr").offset().top),i=l.getDefaultDialogConfig({top:a}),n="app/views/util/code",s={url:e.params.url};l.showDialog(i,n,s)},"del<click>":function(e){e.halt();var t=this,i=r("#"+e.currentId),n=i.parent("tr")||i.parent(".table-head-fix"),s=n.offset().top,o=l.getDefaultDialogConfig({width:300,top:s}),c=e.params.id.split("_");c=c.join(",");var d="app/views/util/confirm",p={confirmFn:function(){t.manage(a.fetchAll([{name:"delete_img",type:"post",postParams:{id:c,bizType:bizType}}],function(){l.hideDialog(),t.render()}),function(){})},cancelFn:function(){l.hideDialog()},confirmTitle:"\u5220\u9664\u56fe\u7247",confirmContent:"\u60a8\u786e\u5b9a\u8981\u5220\u9664\u6b64\u56fe\u7247\u5417\uff1f"};l.showDialog(o,d,p)},"show<mouseover>":function(t){var a,i=r("#"+t.currentId);if(0==i.siblings("img").length){var n=i.attr("src").replace(/_80x80\.jpg$/,"");a=e.one('<img src="'+n+'" class="clone" width="180">'),a.insertAfter(i)}i.siblings(".clone").show()},"hide<mouseout>":function(e){var t=r("#"+e.currentId),a=t.siblings(".clone");a&&a.hide()},resetCheckall:function(){var e=this,t=e.getManaged("checkall");t.bindUI()},renderer:{list:{fileModified:function(){var e=o.Date;return e.format(this.fileModified,"isoDate")}}}}))},{requires:["mxext/view","app/models/modelmanager","magix/vom","node","app/util/util","gallery/uploader/1.4/index","brix/gallery/calendar/","components/fixed_head/index"]});