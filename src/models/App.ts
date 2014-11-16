/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="../collections/Deck.ts" />

class App extends Backbone.Model{
    constructor() {
        super();
        this.set('deck', new Deck());
        this.newGame();
    }

    newGame() {
        var deck = this.get('deck');
        deck.maybeShuffle();
        this.set('playerHand', deck.dealPlayer());
        this.set('dealerHand', deck.dealDealer());
    }

    getWinner(){
        var playerScore = this.get('playerHand').bestScore();
        var dealerScore = this.get('dealerHand').bestScore();
        if (playerScore <= 21) {
            if (playerScore === dealerScore){
                return 'push';
            } else if (playerScore > dealerScore || dealerScore > 21) {
                return "win"
            }
        }
        return "lose";
    }
}