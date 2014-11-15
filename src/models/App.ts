/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="../collections/Deck.ts" />

class App extends Backbone.Model{
    constructor() {
        super();
        this.newGame();
    }

    newGame() {
        var deck = new Deck();
        this.set('deck', deck);
        var playerHand = deck.dealPlayer();
        this.set('playerHand', playerHand);
        this.set('dealerHand', deck.dealDealer());
    }
}