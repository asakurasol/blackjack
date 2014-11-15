/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="../models/Card.ts" />

interface CardViewModel {
    model: Card;
}

class CardView extends Backbone.View<Card> {
    //static className = 'card';
    template;
    //template = _.template('<%= rankName %> of <%= suitName %>');
    constructor(params: CardViewModel){
        super(params);
        this.template = _.template('<%= rankName %> of <%= suitName %>');
        return this.render();
    }
    render(){
        //var temp = _.template('<%= rankName %> of <%= suitName %>');
        this.$el.addClass("card");
        this.$el.children().detach();
        this.$el.html(this.template(this.model.attributes));
        if(!this.model.get('revealed')){
            this.$el.addClass('covered')
        }
        return this;
    }
    //template(params: any) {
    //    return _.template('<%= params.rankName %> of <%= params.suitName %>')
    //}
}