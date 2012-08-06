/*
 * site index controller.
 * Copyright(c) 2012
 */

/**
 * Module dependencies.
 */

exports.index = function (req, res, next) {
    res.render('index', {
    	title:'My Blog',
    	article : [
	    	{
	    		title : "一个工程师跟一个美工的故事",
	    		update : "2012-08-04",
	    		content : "十年前，女：“对不起，我不会喜欢你的，你不要再坚持了，我们是两个世界的人，就好比前端和后端是两个世界，你让服务器跑JS代码，可能伐？”男生听后默默走开，十年后，在一次node.js发布会上，我听到一名node.js开发攻城狮给我讲述了这个故事"
	    	},
	    	{
	    		title : "用 npm 安装浏览器里用的 package?",
	    		update : "2012-08-04",
	    		content : "没看懂.. 在浏览器里用了 require() , 不是应该没有这个函数的吗?Tip component. Inspired by tipsy without the weird jQuery API.https://github.com/component/tip这是怎么回事?"
	    	},
	    	{
	    		title : "用 npm 安装浏览器里用的 package?",
	    		update : "2012-08-04",
	    		content : "没看懂.. 在浏览器里用了 require() , 不是应该没有这个函数的吗?Tip component. Inspired by tipsy without the weird jQuery API.https://github.com/component/tip这是怎么回事?"
	    	},
	    	{
	    		title : "用 npm 安装浏览器里用的 package?",
	    		update : "2012-08-04",
	    		content : "没看懂.. 在浏览器里用了 require() , 不是应该没有这个函数的吗?Tip component. Inspired by tipsy without the weird jQuery API.https://github.com/component/tip这是怎么回事?"
	    	},
	    	{
	    		title : "用 npm 安装浏览器里用的 package?",
	    		update : "2012-08-04",
	    		content : "没看懂.. 在浏览器里用了 require() , 不是应该没有这个函数的吗?Tip component. Inspired by tipsy without the weird jQuery API.https://github.com/component/tip这是怎么回事?"
	    	},
	    	{
	    		title : "用 npm 安装浏览器里用的 package?",
	    		update : "2012-08-04",
	    		content : "没看懂.. 在浏览器里用了 require() , 不是应该没有这个函数的吗?Tip component. Inspired by tipsy without the weird jQuery API.https://github.com/component/tip这是怎么回事?"
	    	},
	    	{
	    		title : "用 npm 安装浏览器里用的 package?",
	    		update : "2012-08-04",
	    		content : "没看懂.. 在浏览器里用了 require() , 不是应该没有这个函数的吗?Tip component. Inspired by tipsy without the weird jQuery API.https://github.com/component/tip这是怎么回事?"
	    	},
	    	{
	    		title : "用 npm 安装浏览器里用的 package?",
	    		update : "2012-08-04",
	    		content : "没看懂.. 在浏览器里用了 require() , 不是应该没有这个函数的吗?Tip component. Inspired by tipsy without the weird jQuery API.https://github.com/component/tip这是怎么回事?"
	    	},
	    	{
	    		title : "用 npm 安装浏览器里用的 package?",
	    		update : "2012-08-04",
	    		content : "没看懂.. 在浏览器里用了 require() , 不是应该没有这个函数的吗?Tip component. Inspired by tipsy without the weird jQuery API.https://github.com/component/tip这是怎么回事?"
	    	}
    	]
    });
};
