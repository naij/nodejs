var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ArticleSchema = new Schema({
    title: { type: String },
    content: { type: String },
    update : { type: Date, default: Date.now }
});

mongoose.model('article', ArticleSchema, 'article');