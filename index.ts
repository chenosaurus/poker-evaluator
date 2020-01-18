import { PokerEvaluator } from './src/poker-evaluator';

const pk = new PokerEvaluator();

const royalFlush = pk.evalHand(['As', 'Ks', 'Qs', 'js', 'Ts', '3c', '5h']);
// const royalFlush = pk.evalHand(['As', 'Ks', 'Qs', 'Js', 'Ts', '3c', '5h']);
console.log(royalFlush);
// {
//   handType: 9,
//   handRank: 10,
//   value: 36874,
//   handName: 'straight flush'
// }

const quads = pk.evalHand(['As', 'Ac', 'Ah', 'Ad', '2c', '3c', '4c']);
console.log(quads);
// {
//   handType: 8,
//   handRank: 147,
//   value: 32915,
//   handName: 'four of a kind'
// }

const boat = pk.evalHand(['As', 'Ac', 'Ad', '5d', '5s']);
console.log(boat);
// {
//   handType: 7,
//   handRank: 148,
//   value: 28820,
//   handName: 'full house'
// }

const rockets = pk.evalHand(['As', 'Ac', 'Qs']);
console.log(rockets);
// {
//   handType: 2,
//   handRank: 2761,
//   value: 10953,
//   handName: 'one pair'
// }

const air = pk.evalHand(['2c', '7d', '9h']);
console.log(air);
// {
//   handType: 1,
//   handRank: 24,
//   value: 4120,
//   handName: 'high card'
// }

const invalidHand = pk.evalHand(['2c', '2c', '2c', '2c', '2c']);
console.log(invalidHand);
// {
//   handType: 0,
//   handRank: 0,
//   value: 0,
//   handName: 'invalid hand'
// }
