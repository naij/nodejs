(function() {
	var acorn = require('./acorn.js');
	var acorn_walk = require('./acorn_walk.js');
	module.exports = {
		removeConsoleX: function(s) {
			/// <param name="s" type="String"></param>
			var ast = acorn.parse(s);
			var arr = [];

			function add(start, end) {
				for (var i = 0; i < arr.length; ++i) {
					if (arr[i][0] <= start && arr[i][1] >= end) return;
				}
				for (var i = arr.length - 1; i >= 0; --i) {
					if (arr[i][0] >= start && arr[i][1] <= end) arr.splice(i, 1);
				}
				arr.push([start, end]);
			}
			acorn_walk.simple(ast, {
				ExpressionStatement: function(node) {
					var x = node.expression;
					if (x.type == 'CallExpression' && x.callee.type == 'MemberExpression' && x.callee.object.type == 'Identifier' && x.callee.object.name == 'console') {
						add(node.start, node.end);
					}
				}
			});
			arr.sort(function(a, b) {
				return a[0] - b[0];
			});
			if (arr.length) {
				arr.push([s.length]);
				var r = '';
				if (arr[0][0] > 0) {
					r = s.slice(0, arr[0][0]);
				}
				for (var i = 1; i < arr.length; ++i) {
					r += ';' + s.slice(arr[i - 1][1], arr[i][0]);
				}
				return r;
			}
			return s;
		},
		addProp: function(s, name, value) {
			/// <param name="s" type="String"></param>
			/// <param name="name" type="String"></param>
			/// <param name="value" type="String"></param>
			var ast = acorn.parse(s);
			if (ast.body.length == 1) {
				var t = ast.body[0];
				if (t.type == 'ExpressionStatement') {
					t = t.expression;
					if (t.type == 'CallExpression' && t.callee.type == 'MemberExpression' && t.callee.object.type == 'Identifier' && t.callee.object.name == 'KISSY' && t.callee.property.type == 'Identifier' && t.callee.property.name == 'add' && t.arguments.length >= 2 && t.arguments[1].type == 'FunctionExpression') {
						t = t.arguments[1].body.body; //stmts
						for (var i = 0; i < t.length; ++i) {
							if (t[i].type == 'ReturnStatement') {
								t = t[i].argument;
								var start = t.start;
								var end = t.end;
								s = s.slice(0, start) + '(function(t){t.prototype.' + name + '=' + JSON.stringify(value).replace(/[\u2028\u2029]/g, function(a) {
									return a == '\u2028' ? '\\u2028' : '\\u2029';
								}) + ';return t;})(' + s.slice(start, end) + ')' + s.slice(end);
							}
						}
					}
				}
			}
			return s;
		}
	};

})();