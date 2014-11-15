/// <reference path="../../typings/backbone/backbone.d.ts" />

interface PlayingCard {
    rank: number;
    suit: number;
}

class Card extends Backbone.Model {
    //constructor(params: PlayingCard) {
    //    super(params);
    //    //this.init(params);
    //    return this;
    //}
    initialize(params){
        console.log("params", params);
        this.set('revealed', true);
        if(!params.rank || params.rank > 10){
            this.set('value', 10);
        } else {
            this.set('value', params.rank);
        }
        var suitName = ['Spades', 'Diamonds', 'Clubs', 'Hearts'][params.suit];
        console.log(suitName);
        this.set('suitName', suitName);
        var rankName: any = params.rank;
        if(rankName === 0){
            rankName = 'King';
        } else if (rankName ===1){
            rankName = 'Ace';
        } else if (rankName === 11){
            rankName = 'Jack';
        } else if (rankName === 12){
            rankName = 'Queen';
        }
        if (!rankName) {
            debugger;
        }

        this.set('rankName', rankName);
//return this;
    }

    flip(): Card {
        this.set('revealed', !this.get('revealed'));
        return this;
    }
}