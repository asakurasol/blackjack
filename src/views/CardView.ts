/**
 * Created by Derek on 11/14/14.
 */

/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="../models/Card.ts" />

class CardView extends Backbone.View<Card> {
    className = 'card';
    template = _.template('<%= rankName %> of <%= suitName %>');
    constructor(params: any){
        super();
    }
    initialize(){
        return this.render();
    }
    render(){
        this.$el.children().detach();
        this.$el.html(this.template(this.model.attributes));
        if(!this.model.get('revealed')){
            this.$el.addClass('covered')
        }
        return this;
    }
}