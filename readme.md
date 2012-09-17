##Poker Hand Evaluator

Poker hand evaluator using the Two Plus Two alogorithm and lookup table.

--to install:

npm install poker-evaluator

--Usage:

```js
var PokerEvaluator = require("poker-evaluator");
var evaluator = new PokerEvaluator("HandRanks.dat");

var res = evaluator.evalHand(["As", "Ks", "Qs", "Js", "Ts", "3c", "5h"]);

//  res = {
//    handType: 9,
//    handRank: 10,
//    handName: 'straight flush'
//  }

```
