const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema and a Model

const BooksSchema = new Schema({
    title: String,
    pages: Number
});

const AuthorSchema = new Schema({
    name: String,
    age: Number,
    books:[BooksSchema]
});

const Author = mongoose.model('author', AuthorSchema);

module.exports = Author;