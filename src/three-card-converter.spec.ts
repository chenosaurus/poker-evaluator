import ThreeCardConverter = require('./three-card-converter');

fdescribe('ThreeCardConverter', () => {
  const threeCardConverter = new ThreeCardConverter();

  test('fills a 3 card hand', () => {
    const threeCardInput = ['As', 'Ks', 'Qs'];
    const result = threeCardConverter.fillHand(threeCardInput);
    expect(result).toEqual([...threeCardInput, '2s', '3d']);
  });

  test('avoids making a straight when filling the 3 card hand', () => {
    const threeCardInput = ['4s', '5d', '6c'];
    const result = threeCardConverter.fillHand(threeCardInput);
    expect(result).toEqual([...threeCardInput, '2s', '7d']);
  });

});
