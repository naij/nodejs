var express = require('express'), 
	mongoose = require('mongoose');

//连接mongodb数据库,test为数据库名称
mongoose.connect('mongodb://localhost/test');

//获取Schema以及ObjectId对象
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

//新闻Schema
var newsSchema = new Schema({
	title : String,
	source : String,
	content : String
});

//生成新闻的Model
var NewsModel = mongoose.model('news', newsSchema);

//查询新闻
function queryNews(callback){
	NewsModel.find({}, function(err,docs){
		if(!err){
			if(docs[0]){
				callback(docs);
			}
		}
	});
}

//插入新闻
function insertNews(newscnt,callback){
	var news = new NewsModel();
	news.title = newscnt.title;
	news.source = newscnt.source;
	news.content = newscnt.content;
	news.save(function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('插入新闻成功');
			callback();
		}
	});
}

exports.queryNews = queryNews;
exports.insertNews = insertNews;