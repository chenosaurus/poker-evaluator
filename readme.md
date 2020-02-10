# Poker Hand Evaluator (TypeScript)

This is a TypeScript port of the JS node module written by David Chen https://github.com/chenosaurus/poker-evaluator.

Poker hand evaluator using the Two Plus Two algorithm and lookup table.
The lookup table HandRanks.dat is included in the module.

Capable of evaluating 3, 5, 6 and 7 card hands.  The highest hand possible in a 3 card hand is 3 of a kind (straights & flushes do not apply to 3 cards).

This can evaluate about 22MM hands per second on a quad-core 2.7GHz Macbook Pro. Run the speedtest.js file under /test to try it.

---

## Installation
`npm install --save poker-evaluator-ts`  
  OR  
`yarn add poker-evaluator-ts`

---

## Usage:

Call the public `evalHand` method on an instance of `PokerEvaluator` with a single argument: an array of 3, 5, 6 or 7 cards (strings in the format 'Xy' where X = rank and y = suit). This is case insensitive so xy or XY (or any other combination) work fine too.  

Ranks: A, 1, 2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K  
Suits: c, d, h, s  

_See `src/constants/deck.const.ts` for the full deck_

```ts
import { PokerEvaluator } from './poker-evaluator-ts';

const pokerEvaluator = new PokerEvaluator();

pokerEvaluator.evalHand(['As', 'Ks', 'Qs', 'Js', 'Ts', '3c', '5h']);

//{ handType: 9,
//  handRank: 10,
//  value: 36874,
//  handName: 'straight flush' }

pokerEvaluator.evalHand(['As', 'Ac', 'Ad', '5d', '5s']);

//{ handType: 7,
//  handRank: 148,
//  value: 28820,
//  handName: 'full house' }

pokerEvaluator.evalHand(['As', 'Ac', 'Qs']);

//{ handType: 2,
//  handRank: 2761,
//  value: 10953,
//  handName: 'one pair' }
```

The returned object is an `EvaluatedHand` (src/types/evaluated-hand.interface.ts). An explanation of its properties is as follows:  
```ts
handType: number; // Index of the HAND_TYPES array  
handRank: number; // Rank within the handType  
value: number; // Overall value of this hand, the higher the better. USE THIS TO DETERMINE WINNER OF A HAND  
handName: HandName; // Human readable name of the hand
```

---

## Contributing
### Installation
`npm install`

### Testing 
`npm test`
