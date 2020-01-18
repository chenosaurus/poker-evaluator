import { PokerEvaluator } from './poker-evaluator';

describe('PokerEvaluator', () => {
  const pokerEvaluator = new PokerEvaluator();

  describe('invalid input', () => {
    test('throws on 4 cards', () => {
      expect(() => pokerEvaluator.evalHand(['As', 'Ac', 'Ad', '5s'])).toThrow();
    });

    test('throws on 8 cards', () => {
      expect(() => pokerEvaluator.evalHand(['As', 'Ac', 'Ad', '5s', 'Ad', 'Ah', '5c', '5s'])).toThrow();
    });

    test('throws on invalid card input: non-card strings', () => {
      expect(() => pokerEvaluator.evalHand(['not', 'valid', 'cards'])).toThrow();
    });

    // test('throws on invalid card input: undefined', () => {
    //   expect(() => pokerEvaluator.evalHand([undefined, 'As', 'Ks'])).toThrow();
    // });
  });

  describe('7 cards', () => {
    test('straight flush', () => {
      expect(
        pokerEvaluator.evalHand(['As', 'Ks', 'Qs', 'Js', 'Ts', '3c', '5h'])
      ).toEqual({
        handType: 9,
        handRank: 10,
        value: 36874,
        handName: 'straight flush',
      });
    });

    test('quads', () => {
      expect(
        pokerEvaluator.evalHand(['As', 'Ac', 'Ah', 'Ad', '2c', '3c', '4c'])
      ).toEqual({
        handType: 8,
        handRank: 147,
        value: 32915,
        handName: 'four of a kind'
      });
    });
  });

  describe('5 cards', () => {
    test('full house', () => {
      expect(pokerEvaluator.evalHand(['As', 'Ac', 'Ad', '5d', '5s'])).toEqual({
        handType: 7,
        handRank: 148,
        value: 28820,
        handName: 'full house',
      });
    });

    test('invalid hand', () => {
      expect(pokerEvaluator.evalHand(['2c', '2c', '2c', '2c', '2c'])).toEqual({
        handType: 0,
        handRank: 0,
        value: 0,
        handName: 'invalid hand',
      });
    });
  });

  describe('3 cards', () => {
    test('one pair', () => {
      expect(pokerEvaluator.evalHand(['As', 'Ac', 'Qs'])).toEqual({
        handType: 2,
        handRank: 2761,
        value: 10953,
        handName: 'one pair',
      });
    });

    test('high card', () => {
      expect(pokerEvaluator.evalHand(['2c', '7d', '9h'])).toEqual({
        handType: 1,
        handRank: 24,
        value: 4120,
        handName: 'high card',
      });
    });
  });

});
