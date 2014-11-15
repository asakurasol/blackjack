/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../src/collections/deck.ts" />

var assert = chai.assert;

describe('deck', () => {
  var deck: Deck;
  var hand: Hand;

  beforeEach(() => {
    deck = new Deck();
    hand = deck.dealPlayer();
  });

  describe('hit', ()=>{
    it('should give the last card from the deck', ()=>{
      assert.strictEqual(deck.length, 50);
      assert.strictEqual(deck.last(), hand.hit());
      assert.strictEqual(deck.length, 49);
    })
  })

});