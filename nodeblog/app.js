
/**
 * Module dependencies.
 */

var express = require('express'), 
	markdown = require('markdown-js'),
	routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  	app.use(express.errorHandler());
});

app.register('.md', {  
	compile: function(str, options){  
		var html = markdown.makeHtml(str);  
		return function(locals){  
			return html.replace(/\{([^}]+)\}/g, function(_, name){  
				return locals[name];  
			});  
		};  
	}  
});

// Routes

app.get('/', routes.index);


app.get('/blogs/:title.html', function(req, res, next) {  
    var path = ['blogs/', req.params.title, '.md'].join(''); 
      
    console.log(path)  
    res.render(path, {layout: false});  
})

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
