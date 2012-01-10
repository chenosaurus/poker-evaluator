var Card = require("./lib/Card");
var Hand = require("./lib/Hand");

var cards = [
  new Card(Card.ACE, Card.HEART),
  new Card(Card.ACE, Card.SPADE),
  new Card(Card.FIVE, Card.DIAMOND),
  new Card(Card.TWO, Card.CLUB),
  new Card(Card.KING, Card.HEART),
  new Card(Card.TEN, Card.DIAMOND),
  new Card(Card.FIVE, Card.HEART)
];

var hand = new Hand(cards);