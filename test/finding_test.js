const assert = require('assert');
const MarioChar = require('../models/mariochar');

// Describe our tests
describe('Finding records', function(){

  var char;

  // I still need that because, in connection.js before every test I drop me collection, i will find this
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
  it('Findong one record from the database', function(done){

      MarioChar.findOne({name:'Mario'}).then(function(result){
        assert(result.name === 'Mario');
        done();
      })

  });

  it('Findong one record by ID from the database', function(done){

      MarioChar.findOne({_id:char._id}).then(function(result){
        assert(result._id.toString() === char._id.toString());
        done();
      })

  });

});

