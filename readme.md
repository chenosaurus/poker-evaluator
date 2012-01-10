##Poker Hand Evaluator

Usage:

```js
var Hand = require("./index").Hand;

var PokerUtil = require("./index").PokerUtil;

var hand = Hand.makeHand("3h", "4h", "5h", "6h", "7h", "8h", "9d");

PokerUtil.evalHand(hand);
```
