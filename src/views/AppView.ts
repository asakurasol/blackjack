/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="HandView.ts" />
/// <reference path="../models/App.ts" />

class AppView extends Backbone.View<App> {
  template() {
    return _.template(
      '<button class="hit-button">Hit</button>' +
      '<button class="stand-button">Stand</button>' +
      '<button class="replay-button">Replay</button>' +
      '<div class="player-hand-container"></div>' +
      '<div class="dealer-hand-container"></div>'
    );
  }

  constructor(options?) {
    this.events = <any>{
      'click .hit-button': 'playerHit',
      'click .stand-button': 'playerStand',
      'click .replay-button': 'replay'
    };
    super(options);
    this.render();
    var playerHand: Hand = this.model.get('playerHand');
    var dealerHand: Hand = this.model.get('dealerHand');

    playerHand.on('bust', () => {
      this.endGame();

    });
    dealerHand.on('bust', () => {
      this.endGame();
    })
  }

  render() {
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
    return this;
  }

  renderWinner(winner: string) {
    $('.imageContainer').html('<img src="img/' + winner + '.gif">');
  }

  playerHit() {
    return this.model.get('playerHand').hit();
  }

  playerStand() {
    var playerHand: Hand = this.model.get('playerHand');
    playerHand.stand();
    this.endGame();
  }

  replay() {
    $('.imageContainer').children().detach();
    console.log('replaying');
    this.$('.hit-button').prop('disabled', false);
    this.model.newGame();
    this.render();

    var playerHand: Hand = this.model.get('playerHand');
    var dealerHand: Hand = this.model.get('dealerHand');

    playerHand.on('bust', () => {
      this.endGame();

    });
    dealerHand.on('bust', () => {
      this.endGame();
    })
  }

  endGame() {
    this.$('.hit-button').prop('disabled', true);
    var playerHand: Hand = this.model.get('playerHand');
    var dealerHand: Hand = this.model.get('dealerHand');
    dealerHand.reveal();
    if (playerHand.bestScore() <= 21) {
      dealerHand.autoPlay();
    }

    var winner = this.model.getWinner();
    this.renderWinner(winner);
  }
}