/**
 * Created by Derek on 11/14/14.
 */
/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="HandView.ts" />
/// <reference path="../models/App.ts" />

class AppView extends Backbone.View<App> {
  template() {
    return _.template(
      '<button class="hit-button">Hit</button> ' +
      '<button class="stand-button">Stand</button> ' +
      '<div class="player-hand-container"></div> ' +
      '<div class="dealer-hand-container"></div>'
    );
  }

  constructor(options?) {
    super(options);
    this.events = <any>{
      'click .hit-button': 'playerHit',
      'click .stand-button': 'playerStand'
    };
    this.render();
    debugger;
  }

  render() {
    console.log("***rendering appview");
    this.$el.children().detach();
    this.$el.html(this.template());
    this.$('.player-hand-container').html(
      new HandView({
        collection: this.model.get('playerHand')
    }).el);
    this.$('.dealer-hand-container').html(
      new HandView({
        collection: this.model.get('dealerHand')
    }).el);
    console.log("app $el", this.$el);
    return this;
  }

  playerHit() {
    return this.model.get('playerHand').hit();
  }

  playerStand() {
    return this.model.get('playerHand').stand();
  }
}