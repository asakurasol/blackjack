/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="Deck.ts" />

class Hand extends Backbone.Collection<Card>{
    //model = typeof Card;
    constructor(array: Card[], public deck: Deck, public isDealer = false) {
        super(array);
        return this;
    }
    hit(){
        var card = this.deck.pop();
        this.add(card);
        return card;
    }
    autoPlay(){
        //set up while loop as long as min score is less than 18
            //this.hit
        /*
        dealer hits <= hard 16 (no ace)
        dealer hits soft 17
        dealer stands on any >= 18

        if either >= 18: stand
        if m
         */
        // <= hard 16
        while(this.minScore() <17 && this.scores()[1] <= 17){
            this.hit();
        }
    }
    stand() {
        this.trigger('stand');
        // TODO
    }
    reveal() {
        this.each((card) => {
            card.reveal();
        });
        //this.trigger('reveal');
    }
    hasAce(){
        return this.reduce(function(memo,card){
            return memo || card.get('value') === 1
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
        if (scores[1] > 21) {
            return scores[0];
        } else {
            return scores[1];
        }
    }
}