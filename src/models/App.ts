/**
 * Created by Derek on 11/14/14.
 */

/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="../collections/Deck.ts" />

class App extends Backbone.Model{
    constructor() {
        debugger;
        console.log("******cons App");
        super();
        console.log("******cons App");
            var deck = new Deck();
            this.set('deck', deck);
            this.set('playerHand', deck.dealPlayer());
            this.set('dealerHand', deck.dealDealer());
    }
    //initialize(){
    //    console.log("****init App");
    //    var deck = new Deck();
    //    this.set('deck', deck);
    //    this.set('playerHand', deck.dealPlayer());
    //    this.set('dealerHand', deck.dealDealer());
    //}
}