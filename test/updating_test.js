const assert = require('assert');
const MarioChar = require('../models/mariochar');

// Describe our tests
describe('Updating records', function(){

    var char;

    // I still need that because, in connection.js before every test I drop me collection, i will delete this
    beforeEach(function(done){

        char = new MarioChar({ //automatic return id of this char which will be save
            name: 'Mario',
            weight: 23
        });

        char.save().then(function(){
            assert(!char.isNew);
            done();
        });

    })

    // Create tests
    it('Updates one record in the database', function(done){

        MarioChar.findOneAndUpdate({name:'Mario'},{name:'Maros'}).then(function(){

            MarioChar.findOne({_id:char._id}).then(function(result){

              assert(result.name === 'Maros');
              done();

            });

        });

    });

    it('Increments age up 1', function(done){

      MarioChar.update({}, { $inc: { weight:1 } }).then(function(){

        MarioChar.findOne({ name: 'Mario' }).then(function(result){

          assert(result.weight === char.weight + 1);
          done();

        });

      });

    });



});

