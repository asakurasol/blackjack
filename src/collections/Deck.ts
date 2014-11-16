/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="Hand.ts" />
/// <reference path="../models/Card.ts" />

class Deck extends Backbone.Collection<Card>{
  static MIN_DECK_SIZE = 17;

  constructor(params?) {
    super(params);
    this.fillDeck();
    return this;
  }

  fillDeck(){
    var deckArray = _.range(52);
    var mappedDeck = _(deckArray)
      .shuffle()
      .map(function(card){
        return new Card({
          rank: card % 13,
          suit: Math.floor(card / 13)
        });
      });
    this.add(mappedDeck);
  }

  dealPlayer(){
    return new Hand([this.pop(), this.pop()], this);
  }

  dealDealer(){
    return new Hand([this.pop().flip(), this.pop()], this, true);
  }

  maybeShuffle() {
    if(this.size() < Deck.MIN_DECK_SIZE) {
      _.invoke(this.models, 'destroy');
      this.fillDeck();
    }
  }
}
