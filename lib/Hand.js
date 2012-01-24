var PokerUtil = require("./PokerUtil");
var Card = require("./Card");

var Hand = function(cards) {
  if (cards.length < 5) {
    throw new Error("Hand must have at least 5");
  }

  this.nums = 0;
  this.suits = 0;
  this.numcards = 0;

  this.parseHand(cards);
}

Hand.prototype.parseHand = function(cards) {

  this.numcards = cards.length;
  cards = cards.sort(Hand.sortCards);

  var suitsIndex = 0;
  var lastNum = 0;
  //parse each card
  for (var i = 0; i < cards.length; i++) {

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
  
  this.cards = cards;
}

Hand.sortCards = function(a, b) {
  return a.num < b.num;
}

Hand.makeHand = function() {
  var cards = [];
  for (var i = 0; i < arguments.length; i++) {
    cards.push(Card.makeCard(arguments[i]));
  }

  return new Hand(cards);
}

module.exports = Hand;
