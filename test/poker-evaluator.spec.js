const PokerEvaluator = require('../lib/PokerEvaluator');

describe('evalHand', function() {
  describe('should throw', function() {
    it('if 4 cards', function() {
      expect(function() {
        PokerEvaluator.evalHand(['As', 'Ac', 'Ad', '5s']);
      }).toThrow();
    });
    it('if 8 cards', function() {
      expect(function() {
        PokerEvaluator.evalHand([
          'As',
          'Ac',
          'Ad',
          '5s',
          'Ad',
          'Ah',
          '5c',
          '5s'
        ]);
      }).toThrow();
    });
  });
  it('5 cards, full house', function() {
    expect(PokerEvaluator.evalHand(['As', 'Ac', 'Ad', '5d', '5s'])).toEqual({
      handType: 7,
      handRank: 148,
      value: 28820,
      handName: 'full house'
    });
  });
  it('3 cards, one pair', function() {
    expect(PokerEvaluator.evalHand(['As', 'Ac', 'Qs'])).toEqual({
      handType: 2,
      handRank: 2761,
      value: 10953,
      handName: 'one pair'
    });
  });
  it('7 cards, straight flush', function() {
    expect(
      PokerEvaluator.evalHand(['As', 'Ks', 'Qs', 'Js', 'Ts', '3c', '5h'])
    ).toEqual({
      handType: 9,
      handRank: 10,
      value: 36874,
      handName: 'straight flush'
    });
  });
});
