/**
 * Created by Derek on 11/14/14.
 */

/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="../models/Card.ts" />
/// <reference path="Deck.ts" />

class Hand extends Backbone.Collection<Card>{
    public model = Card;
    public deck: Deck;
    public isDealer: boolean;
    //public scores: () => number[];
    constructor(array, deck, isDealer = false) {
        super();
        this.deck = deck;
        this.isDealer = isDealer;
    }
    //initialize(array, deck, isDealer){
    //    this.deck = deck;
    //    this.isDealer = isDealer;
    //}
    hit(){
        this.add(this.deck.pop());
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

    public scores = () => {
        return [this.minScore(), this.minScore() + 10 * this.hasAce()];
    }
}