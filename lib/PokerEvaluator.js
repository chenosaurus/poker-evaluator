var fs = require("fs");
var path = require("path");

module.exports = {
  HANDTYPES: [
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
  ],

  CARDS: {
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
  },

  evalHand: function(cards) {
    if (!this.ranks) {
      throw new Error("HandRanks.dat not loaded");
    }

    if (cards.length != 7 && cards.length != 5) {
      throw new Error("Hand must be 5 or 7 cards");
    }

    //if passing in string formatted hand, convert first
    if (typeof cards[0] == "string") {
      cards = cards.map(function(card) {
        return this.CARDS[card.toLowerCase()];
      });
    }

    return this.eval(cards);
  },

  eval: function(cards) {
    var p = 53;
    for (var i = 0; i < cards.length; i++) {
      p = this.evalCard(p + cards[i]);
    }

    if (cards.length == 5) {
      p = this.evalCard(p)
    }

    return {
      handType: p >> 12,
      handRank: p & 0x00000fff,
      value: p,
      handName: this.HANDTYPES[p >> 12]
    }
  },

  evalCard: function(card) {
    return this.ranks.readUInt32LE(card * 4);
  }
}

var fn = path.join(__dirname, '../HandRanks.dat');
module.exports.ranks = fs.readFileSync(fn);
