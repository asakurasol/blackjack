/**
 * Created by Derek on 11/14/14.
 */

/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="../models/Card.ts" />

class CardView extends Backbone.View<Card> {
    className = 'card';
    template;
    //template = _.template('<%= rankName %> of <%= suitName %>');
    constructor(params: any){
        super(params);
        this.template = _.template('<%= rankName %> of <%= suitName %>');
        console.log("card view!");
        return this.render();
    }
    //initialize(){
    //    return this.render();
    //}
    render(){
        //var temp = _.template('<%= rankName %> of <%= suitName %>');
        this.$el.children().detach();
        console.log("attributes", this.model.attributes);
        this.$el.html(this.template(this.model.attributes));
        if(!this.model.get('revealed')){
            this.$el.addClass('covered')
        }
        console.log("card html", this.$el.html());
        return this;
    }
    //template(params: any) {
    //    return _.template('<%= params.rankName %> of <%= params.suitName %>')
    //}
}