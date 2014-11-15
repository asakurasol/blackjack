/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="../collections/Hand.ts" />
/// <reference path="CardView.ts" />

class HandView extends Backbone.View<Card> {
    //static className = 'hand';
    collection: Hand;

    template = _.template(
            '<h2><% if(isDealer){ %>Dealer<% }else{ %>You<% } %> (' +
            '<span class="score"></span>)</h2>'
        );

    constructor(params) {
        super(params);
        this.collection.on('add remove change', () => {
            this.render();
        });
        this.template = _.template(
          '<h2><% if(isDealer){ %>Dealer<% }else{ %>You<% } %> (' +
          '<span class="score"></span>)</h2>'
        );
        return this.render();
    }
    render(){
        var self = this;
        this.$el.addClass('hand');
        this.$el.children().detach();
        this.$el.html(this.template(this.collection));
        this.$el.append(this.collection.map(function(card, index): any {
            return (new CardView({model: card})).$el;
        }));
        this.$('.score').text(self.collection.bestScore());
        return this;
    }
}
