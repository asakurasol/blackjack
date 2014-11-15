/**
 * Created by Derek on 11/14/14.
 */
/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="../models/Card.ts" />
/// <reference path="../collections/Hand.ts" />
/// <reference path="CardView.ts" />
/// <reference path="../models/Card.ts" />

class HandView extends Backbone.View<Hand> {
    className = 'hand';
    //collection: Hand;
    template = _.template('<h2><% if(isDealer){ %>Dealer<% }else{ %>You<% } %> (' +
    '<span class="score"></span>)</h2>');
    //constructor() {
    //    super();
    //}
    initialize(){
        //this.collection
        var self = this;
        this.collection.on('add remove change', function(){
            self.render();
        });
        return this.render();
    }
    render(){
        var self = this;
        this.$el.children().detach();
        this.$el.html(this.template(this.collection));
        this.$el.append(this.collection.map(function(card, index): any {
            return (new CardView({model: card})).$el;
        }));
        this.$('.score').text(self.collection.scores()[0]);
        return this;
    }
}



