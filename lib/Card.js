var Card = function(num, suit) {
  this.num = num;
  this.suit = suit;
}

Card.TWO = 0;
Card.THREE = 1;
Card.FOUR = 2;
Card.FIVE = 3;
Card.SIX = 4;
Card.SEVEN = 5;
Card.EIGHT = 6;
Card.NINE = 7;
Card.TEN = 8;
Card.JACK = 9;
Card.QUEEN = 10;
Card.KING = 11;
Card.ACE = 12;
Card.SPADE = 0;
Card.HEART = 1;
Card.CLUB = 2;
Card.DIAMOND = 3;

module.exports = Card;