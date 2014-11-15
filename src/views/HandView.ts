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
        return this.init()
    }
    init(){
        //this.collection
        var self = this;
        this.collection.on('add remove change', function(){
            self.render();
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
        console.log("el", this.$el);
        console.log("coll", this.collection);
        console.log("templ", this.template);
        this.$el.html(this.template(this.collection));

        console.log("hand el", this.collection.map(function(card, index): any {
            console.log("***************");
            //console.log("card view el", (new CardView({model: card})).$el);
            return (new CardView({model: card})).$el;
        }));

        this.$el.append(this.collection.map(function(card, index): any {
            return (new CardView({model: card})).$el;
        }));
        this.$('.score').text(self.collection.scores()[0]);
        return this;
    }
}
