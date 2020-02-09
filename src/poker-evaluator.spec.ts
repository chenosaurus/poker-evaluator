import { PokerEvaluator } from './poker-evaluator';

describe('PokerEvaluator', () => {
  const pokerEvaluator = new PokerEvaluator();

  describe('throws on invalid input when', () => {
    it('4 cards', () => {
      expect(() => pokerEvaluator.evalHand(['As', 'Ac', 'Ad', '5s'])).toThrow();
    });

    it('8 cards', () => {
      expect(() => pokerEvaluator.evalHand(['As', 'Ac', 'Ad', '5s', 'Ad', 'Ah', '5c', '5s'])).toThrow();
    });

    it('non-card strings', () => {
      expect(() => pokerEvaluator.evalHand(['not', 'valid', 'cards'])).toThrow();
    });

    it('includes empty strings', () => {
      expect(() => pokerEvaluator.evalHand(['', '5d', '8c'])).toThrow();
    });

    it('includes undefined', () => {
      expect(() => pokerEvaluator.evalHand([undefined, 'As', 'Ks'])).toThrow();
    });
  });

  describe('7 cards', () => {
    it('straight flush', () => {
      expect(
        pokerEvaluator.evalHand(['As', 'Ks', 'Qs', 'Js', 'Ts', '3c', '5h'])
      ).toEqual({
        handType: 9,
        handRank: 10,
        value: 36874,
        handName: 'straight flush',
      });
    });

    it('quads', () => {
      expect(
        pokerEvaluator.evalHand(['As', 'Ac', 'Ah', 'Ad', '2c', '3c', '4c'])
      ).toEqual({
        handType: 8,
        handRank: 147,
        value: 32915,
        handName: 'four of a kind'
      });
    });

    it('flush', () => {
      expect(
        pokerEvaluator.evalHand(['8c', '2c', '3c', 'Tc', 'Jc', '4s', '4d'])
      ).toEqual({
        handType: 6,
        handRank: 212,
        value: 24788,
        handName: 'flush',
      });
    });

    it('straight', () => {
      expect(
        pokerEvaluator.evalHand(['Ah', '2d', '3c', '4h', '5d', 'Tc', 'Td'])
      ).toEqual({
        handType: 5,
        handRank: 1,
        value: 20481,
        handName: 'straight',
      });
    });
  });

  describe('5 cards', () => {
    it('full house', () => {
      expect(pokerEvaluator.evalHand(['As', 'Ac', 'Ad', '5d', '5s'])).toEqual({
        handType: 7,
        handRank: 148,
        value: 28820,
        handName: 'full house',
      });
    });

    it('invalid hand', () => {
      expect(pokerEvaluator.evalHand(['2c', '2c', '2c', '2c', '2c'])).toEqual({
        handType: 0,
        handRank: 0,
        value: 0,
        handName: 'invalid hand',
      });
    });
  });

  describe('3 cards', () => {
    it('one pair', () => {
      expect(pokerEvaluator.evalHand(['As', 'Ac', 'Qs'])).toEqual({
        handType: 2,
        handRank: 2761,
        value: 10953,
        handName: 'one pair',
      });
    });

    it('trips', () => {
      expect(pokerEvaluator.evalHand(['Qs', 'Qc', 'Qh'])).toEqual({
        handType: 4,
        handRank: 661,
        value: 17045,
        handName: 'three of a kind',
      });
    });

    it('high card', () => {
      expect(pokerEvaluator.evalHand(['2c', '7d', '9h'])).toEqual({
        handType: 1,
        handRank: 24,
        value: 4120,
        handName: 'high card',
      });
    });
  });
});
