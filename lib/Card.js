var Card = function(num, suit) {
  this.num = num;
  this.suit = suit;
}

Card.makeCard = function(str) {
	var num = str[0].toLowerCase();
	var suit = str[1].toLowerCase();

	return new Card(Card.NUMS[num], Card.SUITS[suit]);
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

Card.NUMS = {
	"a": Card.ACE,
	"2": Card.TWO,
	"3": Card.THREE,
	"4": Card.FOUR,
	"5": Card.FIVE,
	"6": Card.SIX,
	"7": Card.SEVEN,
	"8": Card.EIGHT,
	"9": Card.NINE,
	"t": Card.TEN,
	"j": Card.JACK,
	"q": Card.QUEEN,
	"k": Card.KING
}

Card.SUITS = {
	"s": Card.SPADE,
	"h": Card.HEART,
	"d": Card.DIAMOND,
	"c": Card.CLUB
}

module.exports = Card;
