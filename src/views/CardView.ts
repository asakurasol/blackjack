/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="../models/Card.ts" />

interface CardViewModel {
  model: Card;
}

class CardView extends Backbone.View<Card> {
  static CARD_BACK = '<img src="img/card-back.png">';
  static TEMPLATE = _.template('<img src="img/cards/<%= rankName %>-<%= suitName %>.png">');

  constructor(params: CardViewModel) {
    super(params);
    return this.render();
  }

  render() {
    this.$el.addClass("card");
    this.$el.children().detach();
    if (this.model.get('revealed')) {
      this.$el.html(CardView.TEMPLATE(this.model.attributes));
    } else {
      this.$el.addClass('covered');
      this.$el.html(CardView.CARD_BACK);
    }
    return this;
  }
}