const assert = require('assert');
const MarioChar = require('../models/mariochar');

// Describe our tests
describe('Deleting records', function(){

  var char;

  // I still need that because, in connection.js before every test I drop me collection, i will delete this
  beforeEach(function(done){

      char = new MarioChar({ //automatic return id of this char which will be save
          name: 'Mario'
      });

      char.save().then(function(){
          assert(!char.isNew);
          done();
      });

  })

  // Create tests
  it('Deleting one record from the database', function(done){

      MarioChar.findOneAndRemove({name:'Mario'}).then(function(){

        MarioChar.findOne({name:'Mario'}).then(function(result){
          assert(result === null);
          done();
        });

      });

  });



});

