##Poker Hand Evaluator

Poker hand evaluator using the Two Plus Two alogorithm and lookup table.
The lookup table HandRanks.dat is included in the module.

Hands can be evaluated by comparing the handType then the handRank to determine the better hand.

#to install:

npm install poker-evaluator

#Usage:

```js
var PokerEvaluator = require("poker-evaluator");
var evaluator = new PokerEvaluator("./node_modules/poker-evaluator/HandRanks.dat");

var res = evaluator.evalHand(["As", "Ks", "Qs", "Js", "Ts", "3c", "5h"]);

//  res = {
//    handType: 9,
//    handRank: 10,
//    handName: 'straight flush'
//  }

```
