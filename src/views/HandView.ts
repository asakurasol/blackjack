/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="../collections/Hand.ts" />
/// <reference path="CardView.ts" />

class HandView extends Backbone.View<Card> {
    collection: Hand;

    static TEMPLATE = _.template(
      '<h2><% if(isDealer){ %>Dealer<% }else{ %>You<% } %> (' +
      '<span class="score"></span>)</h2>'
    );

    constructor(params) {
        super(params);
        this.collection.on('add remove change', () => {
            this.render();
        });
        return this.render();
    }

    render() {
        var self = this;
        this.$el.addClass('hand');
        this.$el.children().detach();
        this.$el.html(HandView.TEMPLATE(this.collection));
        this.$el.append(this.collection.map(function(card, index): any {
            return (new CardView({model: card})).$el;
        }));
        this.$('.score').text(self.collection.bestScore());
        return this;
    }
}
