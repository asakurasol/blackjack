/**
 * Created by Derek on 11/14/14.
 */

/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />

class Card extends Backbone.Model {
    initialize(params){
        this.set('revealed', true);
        if(!params.rank || params.rank > 10){
            this.set('value', 10);
        } else {
            this.set('value', params.rank);
        }

        var rankName = params.rank;
        if(params.rank === 0){
            rankName = 'King';
        } else if (params.rank ===1){
            rankName = 'Ace';
        } else if (params.rank === 11){
            rankName = 'Jack';
        } else if (params.rank === 12){
            rankName = 'Queen';
        }

        this.set('rankName', rankName);

    }

    flip(): Card {
        this.set('revealed', !this.get('revealed'));
        return this;
    }
}