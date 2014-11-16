/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="HandView.ts" />
/// <reference path="../models/App.ts" />

class AppView extends Backbone.View<App> {
  static TEMPLATE = _.template(
    '<button class="hit-button">Hit</button>' +
    '<button class="stand-button">Stand</button>' +
    '<button class="replay-button">Replay</button>' +
    '<div class="player-hand-container"></div>' +
    '<div class="dealer-hand-container"></div>'
  );

  dealerHand: Hand;
  playerHand: Hand;

  constructor(options?) {
    this.events = <any>{
      'click .hit-button': 'playerHit',
      'click .stand-button': 'playerStand',
      'click .replay-button': 'replay'
    };
    super(options);
    this.playerHand = this.model.get('playerHand');
    this.dealerHand = this.model.get('dealerHand');
    this.init();
  }

  init() {
    this.render();
    this.addListeners();
    this.checkBlackjack();
  }

  checkBlackjack() {
    if (this.playerHand.bestScore() === 21 || this.dealerHand.bestScore() === 21) {
      this.endGame();
    }
  }

  render() {
    this.$el.children().detach();
    this.$el.html(AppView.TEMPLATE);
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
    this.$('.hit-button').prop('disabled', false);
    this.model.newGame();
    this.render();

    this.playerHand = this.model.get('playerHand');
    this.dealerHand = this.model.get('dealerHand');

    this.addListeners();
  }

  addListeners() {
    this.playerHand.on('bust', () => {
      this.endGame();
    });
    this.dealerHand.on('bust', () => {
      this.endGame();
    });
  }

  endGame() {
    this.$('.hit-button').prop('disabled', true);
    this.dealerHand.reveal();
    if (this.playerHand.bestScore() <= 21) {
      this.dealerHand.autoPlay();
    }

    var winner = this.model.getWinner();
    this.renderWinner(winner);
  }
}