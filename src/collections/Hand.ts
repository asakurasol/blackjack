/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="Deck.ts" />

class Hand extends Backbone.Collection<Card>{
  constructor(array: Card[], public deck: Deck, public isDealer = false) {
    super(array);
    return this;
  }

  hit(){
    var card = this.deck.pop();
    this.add(card);
    if(this.bestScore()>21){
      this.trigger('bust', this.isDealer);
    }
    return card;
  }

  autoPlay(){
    while(this.minScore() <17 && this.scores()[1] <= 17){
      this.hit();
    }
  }

  stand() {
    this.trigger('stand');
  }

  reveal() {
    this.first().reveal();
  }

  hasAce(){
    return this.reduce(function(memo,card){
      return memo || (card.get('revealed') && card.get('value') === 1);
    }, false)
  }

  minScore(){
    return this.reduce(function(score, card){
      var cardValue = 0;
      if(card.get('revealed')){
        cardValue = card.get('value');
      }
      return score + cardValue;
    }, 0)
  }

  scores() {
    return [this.minScore(), this.minScore() + 10 * this.hasAce()];
  }

  bestScore() {
    var scores = this.scores();
    return scores[1] > 21 ? scores[0] : scores[1];
  }
}
