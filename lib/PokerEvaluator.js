var fs = require("fs");

var HANDTYPES = [
  "invalid hand",
  "high card",
  "one pair",
  "two pairs",
  "three of a kind",
  "straight",
  "flush",
  "full house",
  "four of a kind",
  "straight flush"
];

var CARDS = {
  "2c": 1,
  "2d": 2,
  "2h": 3,
  "2s": 4,
  "3c": 5,
  "3d": 6,
  "3h": 7,
  "3s": 8,
  "4c": 9,
  "4d": 10,
  "4h": 11,
  "4s": 12,
  "5c": 13,
  "5d": 14,
  "5h": 15,
  "5s": 16,
  "6c": 17,
  "6d": 18,
  "6h": 19,
  "6s": 20,
  "7c": 21,
  "7d": 22,
  "7h": 23,
  "7s": 24,
  "8c": 25,
  "8d": 26,
  "8h": 27,
  "8s": 28,
  "9c": 29,
  "9d": 30,
  "9h": 31,
  "9s": 32,
  "tc": 33,
  "td": 34,
  "th": 35,
  "ts": 36,
  "jc": 37,
  "jd": 38,
  "jh": 39,
  "js": 40,
  "qc": 41,
  "qd": 42,
  "qh": 43,
  "qs": 44,
  "kc": 45,
  "kd": 46,
  "kh": 47,
  "ks": 48,
  "ac": 49,
  "ad": 50,
  "ah": 51,
  "as": 52
};


var PokerEvaluator = function(handRankFile) {
  this.init(handRankFile);  
};

PokerEvaluator.prototype.init = function(handRankFile) {
  console.log('trying to load ', handRankFile);
  this.ranks = fs.readFileSync(handRankFile);
};

PokerEvaluator.prototype.evalHand = function(cards) {
  if (!this.ranks) {
    throw new Error("HandRanks.dat not loaded");
  }

  if (cards.length != 7) {
    throw new Error("Hand must be 7 cards");
  }

  //if passing in string formatted hand, convert first
  if (typeof cards[0] == "string") { 
    cards = cards.map(function(card) {
      return CARDS[card.toLowerCase()];
    });
  }

  return this.eval(cards);
};

PokerEvaluator.prototype.eval = function(cards) {
  var p = this.ranks.slice((53 + cards[0]) * 4, (53 + cards[0]) * 4 + 4).readUInt32LE(0);
  p = this.ranks.slice((p + cards[1]) * 4, (p + cards[1]) * 4 + 4).readUInt32LE(0);
  p = this.ranks.slice((p + cards[2]) * 4, (p + cards[2]) * 4 + 4).readUInt32LE(0);
  p = this.ranks.slice((p + cards[3]) * 4, (p + cards[3]) * 4 + 4).readUInt32LE(0);
  p = this.ranks.slice((p + cards[4]) * 4, (p + cards[4]) * 4 + 4).readUInt32LE(0);
  p = this.ranks.slice((p + cards[5]) * 4, (p + cards[5]) * 4 + 4).readUInt32LE(0);
  var res = this.ranks.slice((p + cards[6]) * 4, (p + cards[6]) * 4 + 4).readUInt32LE(0);

  var handType = res >> 12;
  var handRank = res & 0x00000fff;

  return {
    handType: res >> 12,
    handRank: res & 0x00000fff,
    handName: HANDTYPES[res >> 12]
  }
};

module.exports = PokerEvaluator;