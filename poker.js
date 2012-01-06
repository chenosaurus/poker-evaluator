function fac(n) {
  if ((n == 0) || (n == 1))
    return 1
   else {
      result = (n * fac(n-1) )
      return result
   }
}

var Cards = {
  TWO: 0,
  THREE: 1,
  FOUR: 2,
  FIVE: 3,
  SIX: 4,
  SEVEN: 5,
  EIGHT: 6,
  NINE: 7,
  TEN: 8,
  JACK: 9,
  QUEEN: 10,
  KING: 11,
  ACE: 12
}

var CardsPosition = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];

var CardsBinary = {
  1: "TWO",
  2: "THREE",
  4: "FOUR",
  8: "FIVE",
  16: "SIX",
  32: "SEVEN",
  64: "EIGHT",
  128: "NINE",
  256: "TEN",
  512: "JACK",
  1024: "QUEEN",
  2048: "KING",
  4096: "ACE"
}

var Suits = {
  SPADE: 0,
  HEART: 1,
  DIAMOND: 2,
  CLUB: 3
}

var SuitsPosition = [1, 2, 4, 8];

var SuitsBinary = {
  1: "SPADE",
  2: "HEART",
  4: "DIAMOND",
  8: "CLUB"
}

function padSuit(suit) {
  return ("000000000000000000000000000000000000" + suit.toString(2)).slice(-28);
}

function padNum(num) {
  return ("0000000000000" + num.toString(2)).slice(-13);
}

function Card(num, suit) {
  this.num = num;
  this.suit = suit;
}

function Hand(cards) {
  this.nums = 0; //13 bits for cards
  this.suits = 0; // 28 bits for card suits
  if (cards.length != 7) {
    throw new Error("must have 7 cards");
  }

  this.parseHand(cards);

}

Hand.prototype.parseHand = function(cards) {

  var hasNum = {};

  for (var i = 0; i < cards.length; i ++) {
    var cardStr = "1";
    for (var j = 0; j < cards[i].num; j++) {
      cardStr = cardStr + "0";
    }

    this.nums = this.nums | parseInt(cardStr, 2);

    var suitIndex = i;
    if (hasNum[cards[i].num] != undefined) {
      suitIndex = hasNum[cards[i].num];
    } else {
      hasNum[cards[i].num] = i;
    }

    console.log(suitIndex);

    var suitStr = "1";
    for (var k = 0; k < cards[i].suit; k++) {
      suitStr = suitStr + "0";
    }

    var suit = parseInt(suitStr, 2);

    suit = suit << (suitIndex * 4);

    this.suits = this.suits | suit;

  }

}

Hand.prototype.getHand = function() {
  var out = [];
  var index = 0;

  console.log(padSuit(this.suits));

  for (var i = 0; i < 13; i++) {
    var valid = 1 & (this.nums >> i);
    if (!valid) {
      continue;
    }
    console.log(i);
    var suit = 15 & (this.suits >> (index * 4));

    while (suit == 0) {
      index++;
      suit = 15 & (this.suits >> (index * 4));
    }


    var num = CardsBinary[CardsPosition[i]];

    for (var j = 0; j < 4; j++) {
      //console.log(suit.toString(2), j, (suit >> j).toString(2), (1& suit >> j).toString(2));
      if (1 & (suit >> j)) {
        //console.log(num, SuitsBinary[SuitsPosition[j]]);
        out.push({
          num: num,
          suit: SuitsBinary[SuitsPosition[j]]
        });
      }
    }

    index++;
  }
  console.log(out);
  return out;
}

var c1 = new Card(7, 0);
var c2 = new Card(2, 1);
var c3 = new Card(4, 0);
var c4 = new Card(7, 3);
var c5 = new Card(8, 1);
var c6 = new Card(9, 0);
var c7 = new Card(10, 2);

var cards = [c1, c2, c3, c4, c5, c6, c7];

cards.sort(function(a, b) {
  return a.num < b.num;
});

var hand = new Hand(cards);

hand.getHand();
