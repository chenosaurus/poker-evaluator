var PokerUtil = {

  suitMasks: {
    SPADE:    parseInt("0001000100010001000100010001", 2),
    HEART:    parseInt("0010001000100010001000100010", 2),
    CLUB:     parseInt("0100010001000100010001000100", 2),
    DIAMOND:  parseInt("1000100010001000100010001000", 2)
  },

  numBits: {
    "00000": 0,
    "00001": 1,
    "00010": 1,
    "00011": 2,
    "00100": 1,
    "00101": 2,
    "00110": 2,
    "00111": 3,
    "01000": 1,
    "01001": 2,
    "01010": 2,
    "01011": 3,
    "01100": 2,
    "01101": 3,
    "01110": 3,
    "01111": 4,
    "10000": 1,
    "10001": 2,
    "10010": 2,
    "10011": 3,
    "10100": 2,
    "10101": 3,
    "10110": 3,
    "10111": 4,
    "11000": 2,
    "11001": 3,
    "11010": 3,
    "11011": 4,
    "11100": 3,
    "11101": 4,
    "11110": 4,
    "11111": 5
  },

  suitBits: [1, 2, 4, 8],

  cardBits: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096],

  padSuit: function(suit) {
    return ("000000000000000000000000000000000000" + suit.toString(2)).slice(-28);
  },

  padNum: function(num) {
    return ("0000000000000" + num.toString(2)).slice(-13);
  },

  countNums: function(nums) {
    nums = PokerUtil.padNum(nums);

    var a = nums.substr(0, 5),
        b = nums.substr(5, 5),
        c = "00" + nums.substr(10, 3);

    return PokerUtil.numBits[a]
         + PokerUtil.numBits[b]
         + PokerUtil.numBits[c];
  },

  countSuits: function(suits) {

    var spades    = PokerUtil.suitMasks.SPADE & suits,
        hearts    = PokerUtil.suitMasks.HEART & suits,
        clubs     = PokerUtil.suitMasks.CLUB & suits,
        diamonds  = PokerUtil.suitMasks.DIAMOND & suits;

    return {
      spades:   PokerUtil.countSuit(spades),
      hearts:   PokerUtil.countSuit(hearts),
      clubs:    PokerUtil.countSuit(clubs),
      diamonds: PokerUtil.countSuit(diamonds)
    }
  },

  countSuit: function(suit) {
    suit = PokerUtil.padSuit(suit);

    var a = suit.substr(0, 5),
        b = suit.substr(5, 5),
        c = suit.substr(10, 5),
        d = suit.substr(15, 5),
        e = suit.substr(20, 5),
        f = "00" + suit.substr(25, 3);

    return PokerUtil.numBits[a]
         + PokerUtil.numBits[b]
         + PokerUtil.numBits[c]
         + PokerUtil.numBits[d]
         + PokerUtil.numBits[e]
         + PokerUtil.numBits[f];
  },

  evalHand: function(hand) {

    var sf = true;
    var 4k = true;
    var fh = true;
    var fl = true;
    var 3k = true;
    var 2p = true;
    var 1p = true;
    var hc = true;


  }

}

module.exports = PokerUtil;