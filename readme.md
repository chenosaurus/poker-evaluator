# Poker Hand Evaluator

Poker hand evaluator using the Two Plus Two alogorithm and lookup table.
The lookup table HandRanks.dat is included in the module.

It is capable of evaluating 7, 6, 5, and 3 card hands.  The highest hand possible in a 3 card hand is 3 of a kind, straights & flushes do not apply to 3 cards.

Hands can be evaluated by comparing the handType then the handRank to determine the better hand.

This can evaluate about 22MM hands per second on a quad-core 2.7GHz Macbook Pro.  Run the speedtest.js file under /test to try it.

## to install:

npm install poker-evaluator

## Usage:

```js
var PokerEvaluator = require("poker-evaluator");

PokerEvaluator.evalHand(["As", "Ks", "Qs", "Js", "Ts", "3c", "5h"]);

//{ handType: 9,
//  handRank: 10,
//  value: 36874,
//  handName: 'straight flush' }

PokerEvaluator.evalHand(["As", "Ac", "Ad", "5d", "5s"]);

//{ handType: 7,
//  handRank: 148,
//  value: 28820,
//  handName: 'full house' }

PokerEvaluator.evalHand(["As", "Ac", "Qs"]);

//{ handType: 2,
//  handRank: 2761,
//  value: 10953,
//  handName: 'one pair' }

```
