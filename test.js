var Hand = require("./index").Hand;
var PokerUtil = require("./index").PokerUtil;



var hand = Hand.makeHand("3h", "4h", "5h", "6h", "7h", "8h", "9d");
PokerUtil.evalHand(hand);


function fac(n) {
  if ((n == 0) || (n == 1))
    return 1
   else {
      result = (n * fac(n-1) )
      return result
   }
}
