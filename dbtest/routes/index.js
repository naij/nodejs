var dbnews = require('../dbnews');

exports.index = function(req, res){
  	res.render('index', { title: 'NEWS' });
};

exports.insertnews = function(req, res){
	var newscnt = {
		title : req.body.newstitle,
		source : req.body.newssource,
		content : req.body.newscontent
	}

	dbnews.insertNews(newscnt,function(){
		dbnews.queryNews(function(newscollections){
			res.render('newslist', {title : 'News list', collection: newscollections });
		});
	});
};