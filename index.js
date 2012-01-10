var Card = require("./lib/Card");
var Hand = require("./lib/Hand");
var PokerUtil = require("./lib/PokerUtil");

var hand = Hand.makeHand("3h", "4h", "5h", "6h", "7h", "8h", "9d");
PokerUtil.evalHand(hand);
