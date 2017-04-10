const assert   = require('assert');
const mongoose = require('mongoose');
const Author   = require('../models/author');


//describe our test
describe('Nesting test', function(){

	//drop author collection before every test running
	beforeEach(function(done){

		mongoose.connection.collections.authors.drop(function(){

			done();

		});

	});

	//create author
	it("Create a author with sub-document", function(done){

		var author = new Author({
			name:'Maros',
			age: 23,
			books:[{title:'Neviem este', pages:500},{title:'Neviem este dva', pages:650}]
		});

		author.save().then(function(){

			Author.findOne({name:'Maros'}).then(function(result){
				assert(result.books.length === 2);
				done();
			});

		});

	});

	//add book to the books array of author
	it("Add a book to an author", function(done){

		var author = new Author({
			name:'Nikola',
			age: 22,
			books:[{title:'Krasa', pages:500},{title:'Laskavost', pages:650}]
		});

		author.save().then(function(){

			Author.findOne({name:'Nikola'}).then(function(result){
			
				//add book to the books array
				result.books.push({title:'Dobrota', pages:489});
				result.save().then(function(){

					Author.findOne({name:'Nikola'}).then(function(result){
						assert(result.books.length === 3);
						done();
					});

				});

			});

		});

	});


});