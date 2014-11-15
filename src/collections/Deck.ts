
/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="../models/Card.ts" />
/// <reference path="Hand.ts" />
class Deck extends Backbone.Collection<Card>{
    public model = Card;
    constructor() {
        super();
        var deckArray = _.range(52);
        var mappedDeck = _(deckArray).shuffle().map(function(card){
            return new Card({rank: card%13, suit: Math.floor(card/13)})
        });
        this.add(mappedDeck);
        return this;
    }

    dealPlayer(){
        return new Hand([this.pop(), this.pop()], this);
    }

    dealDealer(){
        return new Hand([this.pop().flip(), this.pop()],this, true);
    }
}