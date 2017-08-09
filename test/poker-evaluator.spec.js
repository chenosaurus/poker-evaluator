const PokerEvaluator = require('../lib/PokerEvaluator');

describe('evalHand', () => {
  it('5 cards, full house', () => {
    expect(PokerEvaluator.evalHand(['As', 'Ac', 'Ad', '5d', '5s'])).toEqual({
      handType: 7,
      handRank: 148,
      value: 28820,
      handName: 'full house'
    });
  });
  it('3 cards, one pair', () => {
    expect(PokerEvaluator.evalHand(['As', 'Ac', 'Qs'])).toEqual({
      handType: 2,
      handRank: 2761,
      value: 10953,
      handName: 'one pair'
    });
  });
  it('7 cards, straight flush', () => {
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
