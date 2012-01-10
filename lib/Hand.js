var PokerUtil = require("./PokerUtil");

var Hand = function(cards) {
  if (cards.length != 7) {
    throw new Error("Hand must have 7 cards");
  }

  this.nums = 0;
  this.suits = 0;

  this.parseHand(cards);
}

Hand.prototype.parseHand = function(cards) {

  cards = cards.sort(Hand.sortCards);

  var suitsIndex = 0;
  var lastNum = 0;
  //parse each card
  for (var i = 0; i < cards.length; i ++) {

    var card = 1;
    for (var j = 0; j < cards[i].num; j++) {
      card = card << 1;
    }

    this.nums = this.nums | card;

    //now parse the suit
    if (cards[i].num != lastNum) {
      suitsIndex++;
      lastNum = cards[i].num;
    }

    var suit = 1;
    for (var k = 0; k < cards[i].suit; k++) {
      suit = suit << 1;
    }

    suit = suit << (suitsIndex * 4);

    this.suits = this.suits | suit;
  }

}

Hand.sortCards = function(a, b) {
  return a.num < b.num;
}

module.exports = Hand;
