/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../src/collections/deck.ts" />

var assert = chai.assert;

describe('deck constructor', function(){
  it('should create a card collection', function(){
    var collection = new Deck();
    assert.strictEqual(collection.length, 52);
  })
})

