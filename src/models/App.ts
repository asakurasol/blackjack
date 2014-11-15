/**
 * Created by Derek on 11/14/14.
 */

/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="../collections/Deck.ts" />

class App extends Backbone.Model{
    initialize(){
        var deck = new Deck();
        this.set('deck', deck);
        this.set('playerHand', deck.dealPlayer());
        this.set('dealerHand', deck.dealDealer());
    }
}