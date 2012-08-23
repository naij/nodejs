/* notebook - v0.0.1
 * https://github.com/wolongxzg/nodejs
 * Copyright (c) 2012 wolongxzg; */

KISSY.add("brix/brick", function(S, Chunk) {
    function normFn(self, f) {
        if (S.isString(f)) {
            return self[f];
        }
        return f;
    }

    function Brick() {
        var self = this;
        self.pagelet = arguments[0].pagelet;//pagelet的引用

        var context = self.pagelet?self.pagelet:self;

        context.on('rendered',function(){
           self.initialize();
           self._bindEvent();
        });

        Brick.superclass.constructor.apply(this, arguments);

        if(context.get('rendered')){
            self.initialize();
            self._bindEvent();
        }

        var tmpler = self.get('tmpler'),id;
        if(tmpler){
            S.each(tmpler.bricks,function(o,k){
                id=k;
                return false;
            });
            tmpler.bricks[id].brick = this;
        }else{
            id = arguments[0].el.split('#')[1];
        }
        var renderer = self.constructor.RENDERER;
        if(renderer){
            context.get('dataset').setRenderer(renderer,self,id);
        }
    }
    Brick.ATTACH = {
        //组件内部的事件代理，
        /*"selector":{
            enventtype:function(e){
                //e：事件对象
                //this:指向当前实例
            }
        }*/
    };
    Brick.ATTRS = {
        events: {
            //此事件代理是KISSY选择器的事件的代理
        }
    };

    S.extend(Brick, Chunk, {
        //初始化方法，提供子类覆盖
        initialize:function(){

        },
        /**
         * 移除代理事件
         */
        _detachEvent:function(){
            var self = this;
            var defaultEvents = self.constructor.ATTACH;
            if (defaultEvents) {
                self._removeEvents(defaultEvents);
            }
            var defaultDocEvents = self.constructor.DOCATTACH;
            if (defaultDocEvents) {
                self._removeEvents(defaultDocEvents,S.one(document));
            }

            self._undelegateEvents();
            var events = self.get("events");
            if (events) {
                this._removeEvents(events);
            }
        },
        /**
         * 绑定代理事件
         */
        _bindEvent:function(){
            var self = this;
             //组件默认事件代理
            //方式一
            var defaultEvents = self.constructor.ATTACH;
            if (defaultEvents) {
                this._addEvents(defaultEvents);
            }
            //代理在全局的页面上
            var defaultDocEvents = self.constructor.DOCATTACH;
            if (defaultDocEvents) {
                this._addEvents(defaultDocEvents,S.one(document));
            }

            //方式二
            self._delegateEvents();

            //用户使用组件中的自定义事件代理
            var events = self.get("events");
            if (events) {
                this._addEvents(events);
            }
        },
        events: {
            //此事件代理是原生的页面bxclick等事件的代理
        },
        /**
         * 移除事件代理
         * @param  {object} events 事件对象，参见ATTACH属性
         */
        _removeEvents: function(events,el) {
            el = el || this.get("el");
            for (var selector in events) {
                var event = events[selector];
                for (var type in event) {
                    var callback = normFn(this, event[type]);
                    el.undelegate(type, selector, callback, this);
                }
            }
        },
        /**
         * 添加事件代理绑定
         * @param  {object} events 事件对象，参见ATTACH属性
         */
        _addEvents: function(events,el) {
            el = el || this.get("el");
            for (var selector in events) {
                var event = events[selector];
                for (var type in event) {
                    var callback = normFn(this, event[type]);
                    el.delegate(type, selector, callback, this);
                }
            }
        },
        /**
         * 原生事件代理
         */
        _delegateEvents: function() {
            var events = this.events;
            var node = this.get("el")[0];
            var that = this;
            for (var _type in events) {
                (function() {
                    var type = _type;
                    node["on" + type] = function() {
                        var event = arguments[0] || window.event;
                        var target = event.target || event.srcElement;
                        if (target.nodeType != 1) {
                            target = target.parentNode;
                        }
                        var eventinfo = target.getAttribute("bx" + type);
                        if (eventinfo) {
                            var events = eventinfo.split("|"),
                                eventArr, eventKey;
                            for (var i = 0; i < events.length; i++) {
                                eventArr = events[i].split(":");
                                eventKey = eventArr.shift();

                                // 事件代理,通过最后一个参数,决定是否阻止事件冒泡和取消默认动作
                                var evtBehavior = eventArr[eventArr.length - 1],
                                    evtArg = false;
                                if (evtBehavior == '_halt_' || evtBehavior == '_preventDefault_') {
                                    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
                                    evtArg = true;
                                }
                                if (evtBehavior == '_halt_' || evtBehavior == '_stop_') {
                                    event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
                                    evtArg = true;
                                }
                                if (evtArg) {
                                    eventArr.pop();
                                }
                                if (that.events && that.events[type] && that.events[type][eventKey]) {
                                    that.events[type][eventKey].call(that, target, eventArr); //将事件当前上下文更改成当前实例，和kissy mvc一致。
                                }
                            }
                        }
                        target = null;
                    };
                })();
            }
        },
        /**
         * 取消原生事件代理
         */
        _undelegateEvents:function(){
            var events = this.events;
            var node = this.get("el")[0];
            var that = this;
            for (var _type in events) {
                (function() {
                    var type = _type;
                    node["on" + type] = null;
                })();
            }
        }
    });
    return Brick;
}, {
    requires: ["brix/chunk"]
});

KISSY.add("brix/chunk", function(S, Node, Base, Dataset, Tmpler) {
    var $ = Node.all;
    /**
     * brick和pagelet类的基类
     */

    function Chunk() {
        Chunk.superclass.constructor.apply(this, arguments);
        var self = this;

        //现在是串行执行
        self._buildTmpler();
        var tmpler = self.get('tmpler');
        if (tmpler) {
            if (!tmpler.inDom) {
                if (self.get('autoRender')) {
                    self.render();
                }
            } else {
                self.__set('el', self.get('tmpl')); //如果已经在dom中，则把当前节点设置为模板容器节点
                self.__set("rendered", true);
                self.fire('rendered');
            }
        }
    }

    Chunk.ATTRS = {
        //组件节点
        el: {
            getter: function(s) {
                if (S.isString(s)) {
                    s = $(s);
                    //el节点考虑性能，不缓存，以免对dom节点的引用，引起内存泄漏
                    // this.__set("el", s);
                }
                return s;
            }
        },
        //容器节点
        container: {
            value: 'body',
            getter: function(s) {
                if (S.isString(s)) {
                    s = $(s);
                }
                return s;
            }
        },
        tmpl: { //模板代码，如果是已经渲染的html元素，则提供渲染html容器节点选择器
            value: false
        },
        tmpler:{
            value:false
        },
        rendered: {
            value: false
        },
        //是否自动渲染
        autoRender: {
            value: false
        },
        data:{
            value:false
        },
        //如果提供dataset，则忽略data
        dataset:{
            value:false
        }
    };

    S.extend(Chunk, Base, {
        /**
         * 构建模板解析器
         */
        _buildTmpler: function() {
            var self = this;
            var tmpler = self.get('tmpler');
            if(!tmpler&&!self.pagelet){
                var tmpl = self.get('tmpl');
                if(tmpl){
                    tmpler = new Tmpler(tmpl);
                    self.set('tmpler',tmpler);
                    self._buildDataset();
                }
            }
        },
        /**
         * 构建数据管理器
         */
        _buildDataset: function() {
            var self = this;
            var dataset = self.get('dataset');
            if(!dataset&&!self.pagelet){
                var data = self.get('data') || {};//原始数据
                data = S.clone(data); //数据深度克隆
                dataset = new Dataset({
                    data: data
                });
                self.set('dataset',dataset);//设置最新的数据集合
            }
            if(dataset){
                dataset.on('afterDataChange', function(e) {
                    self._render(e.subAttrName, e.newVal);
                });
            }
        },

        /**
         * 给brick添加模板
         * @param {string} id  brick的id
         * @param {array} arr 模板数组
         * @return {Boolen} 是否添加成功
         */
        addTmpl: function(id, arr) {
            var self = this.pagelet ? this.pagelet : this;
            return self.get('tmpler').addTmpl(id, arr);
        },

        /**
         * 设置数据，并刷新模板数据
         * @param {string} datakey 需要更新的数据对象key
         * @param {object} data    数据对象
         */
        setChunkData: function(datakey, data) {
            var self = this.pagelet ? this.pagelet : this,
                dataset = self.get('dataset');
            //可能要提供多个datakey的更新
            data = S.clone(data);
            dataset.set('data.' + datakey, data);
        },
        /**
         * 将模板渲染到页面
         */
        render: function() {
            var self = this;
            if (!self.get("rendered")) {
                self._render('data', self.get('dataset').get('data'));
                self.__set("rendered", true);
                self.fire('rendered');
            }
        },
        /**
         * 将模板渲染到页面
         * @param  {string} key     更新的数据对象key
         * @param  {object} newData 数据
         */
        _render: function(key, newData) {
            var self = this.pagelet ? this.pagelet : this,tmpler = self.get('tmpler');
            if (key.split('.').length > 1) {
                //部分数据更新
                key = key.replace(/^data\./, '');
                self._renderTmpl(tmpler.bricks, key, newData);
            } else {
                var node = new Node(tmpler.to_html(newData));
                var container = self.get('container');
                var containerNode;
                if (node.length > 1) { //如果是多个节点，则创建容器节点
                    containerNode = new Node('<div id="' + S.guid("brick_container") + '"></div>');
                    containerNode.append(node);
                } else {
                    if (!node.attr('id')) {
                        node.attr('id', S.guid('brick_container'));
                    }
                    containerNode = node;
                }
                container.append(containerNode);
                //将节点的引用设置为容器节点，为后期的destroy等方法提供引用
                self.__set('el', '#' + containerNode.attr('id'));
                node = null;
                containerNode = null;
            }
        },
        /**
         * 渲染模板
         * @param  {object} bricks  brick对象集合
         * @param  {string} key     更新的数据对象key
         * @param  {object} newData 数据
         */
        _renderTmpl: function(bricks, key, newData) {
            S.each(bricks, function(b) {
                S.each(b.tmpls, function(o, id) {
                    if (S.inArray(key, o.datakey)) {
                        //这里数据是否需要拼装，还是传入完整的数据，待考虑
                        var data = {};
                        S.each(o.datakey, function(item) {
                            var tempdata = newData,
                                temparr = item.split('.'),
                                length = temparr.length,
                                i = 0;
                            while (i != length) {
                                tempdata = tempdata[temparr[i]];
                                i++;
                            }
                            data[temparr[length - 1]] = tempdata;
                            tempdata = null;
                        });
                        S.one('#' + o.id).html(o.tmpler.to_html(data));
                        data = null;
                    }
                });
                this._renderTmpl(b.bricks, key, newData);
            }, this);
        },
        /**
         * 销毁组件或者pagelet
         */
        destroy: function() {
            var self = this;
            //todo 如果是调用的brick的destroy，需要查找移除引用
            var el = self.get('el'),id=null;
            if (self.pagelet) { //如果是pagelet实例化出来的brick调用
                id = el.attr('id');
            }
            var tmpler = self.get('tmpler');
            if (tmpler && tmpler.bricks) {
                self._destroyBricks(tmpler.bricks,id);
            }
            el.remove();
        },

        /**
         * 销毁brick引用
         * @param  {object} bricks 需要销毁的对象集合
         */
        _destroyBricks: function(bricks,id) {
            var self = this;
            S.each(bricks, function(o,k) {
                if(id){
                    if(id==k){
                        self._destroyBrick(o);
                        delete bricks[k];
                        return false;
                    }
                    else{
                        self._destroyBricks(o.bricks);
                    }
                }
                else{
                    self._destroyBrick(o);
                    delete bricks[k];
                }
            });
        },
        /**
         * 销毁brick引用
         * @param  {object} o 需要销毁的对象
         */
        _destroyBrick: function(o) {
            var self = this;
            if (o.brick) {
                o.brick._detachEvent();
                //递归调用
                self._destroyBricks(o.bricks);
                o.brick.pagelet = null;
                o.brick = null;
                delete o;
                //齐活了，对各种引用都断开了链接
            }
        }
    });
    return Chunk;
}, {
    requires: ["node", "base", "brix/dataset", "brix/tmpler"]
});
