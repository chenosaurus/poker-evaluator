var Masks = require("./Masks");
var microtime = require("microtime");

var PokerUtil = {

  suitMasks: {
    SPADE:    parseInt("0001000100010001000100010001", 2),
    HEART:    parseInt("0010001000100010001000100010", 2),
    CLUB:     parseInt("0100010001000100010001000100", 2),
    DIAMOND:  parseInt("1000100010001000100010001000", 2)
  },

  numBits4: {
    "0000": 0,
    "0001": 1,
    "0010": 1,
    "0011": 2,
    "0100": 1,
    "0101": 2,
    "0110": 2,
    "0111": 3,
    "1000": 1,
    "1001": 2,
    "1010": 2,
    "1011": 3,
    "1100": 2,
    "1101": 3,
    "1110": 3,
    "1111": 4
  },

  numBits5: {
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
    //return (num | 8192).toString(2).substr(1);
    return ("0000000000000" + num.toString(2)).slice(-13);
  },

  padSingleSuit: function(suit) {
    return ("0000" + suit.toString(2)).slice(-4);
  },

  countNums: function(nums) {
    nums = PokerUtil.padNum(nums);

    var a = nums.substr(0, 5),
        b = nums.substr(5, 5),
        c = "00" + nums.substr(10, 3);

    return PokerUtil.numBits5[a]
         + PokerUtil.numBits5[b]
         + PokerUtil.numBits5[c];
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

    return PokerUtil.numBits5[a]
         + PokerUtil.numBits5[b]
         + PokerUtil.numBits5[c]
         + PokerUtil.numBits5[d]
         + PokerUtil.numBits5[e]
         + PokerUtil.numBits5[f];
  },

  testStraight: function(nums) {
    for (var i = Masks.straights.length - 1; i >= 0; i--) {
      if ((Masks.straights[i] & nums) == Masks.straights[i]) {
        return true;
      }
    }
    return false;
  },

  test4k: function(suits) {
    for (var i = 0; i < 7; i++) {
      var mask = 15 << (i * 4);
      return (mask & suits == mask);
    }
  },

  test3k: function(suits) {
    for (var i = 0; i < 7; i++) {
      var curSuit = ((15 << (i * 4)) & suits) >> (i * 4);
      if (PokerUtil.numBits4[PokerUtil.padSingleSuit(curSuit.toString(2))] > 2) {
        return true;
      }
    }
    return false;
  },

  test2p: function(suits) {
    var pairsFound = 0;
    for (var i = 0; i < 7; i++) {
      var curSuit = ((15 << (i * 4)) & suits) >> (i * 4);
      if (PokerUtil.numBits4[PokerUtil.padSingleSuit(curSuit.toString(2))] > 1) {
        pairsFound++;
      }
      if (pairsFound >= 2) {
        return 2;
      }
    }
    return pairsFound;
  },


  evalHand: function(hand) {
    var timeStart = microtime.now();

    var sf = false;
    var k4 = false;
    var fh = false;
    var fl = false;
    var st = false;
    var k3 = false;
    var p2 = false;
    var p1 = false;
    var hc = true;

    var suitCount = PokerUtil.countSuits(hand.suits);


    //distinct numbers
    var numCount = PokerUtil.countNums(hand.nums);

    console.log('after count nums', microtime.now() - timeStart);

    //check for possible flush
    if (suitCount.spades > 4 || suitCount.hearts > 4 || suitCount.clubs > 4 || suitCount.diamonds > 4) {
      fl = true;
    }

    //check for 4 of a kind
    k4 = PokerUtil.test4k(hand.suits);

    //check for straight
    st = PokerUtil.testStraight(hand.nums);

    //if also fl, then sf
    if (st && fl) {
      sf = true;
    }

    //check for 3 of a kind
    k3 = PokerUtil.test3k(hand.suits);

    //check for full house, must have 3 of a kind && less than 4 distinct nums
    fh = k3 && numCount <= 4;

    //check for 2 pairs
    var pairsFound = PokerUtil.test2p(hand.suits);


    p2 = pairsFound == 2;

    //has a pair?
    p1 = pairsFound > 0;

    if (sf) {

      console.log("sf");
    } else if (k4) {

      console.log("4k");
    } else if (fh) {

      console.log("fh");
    } else if (fl) {

      console.log("fl");
    } else if (st) {

      console.log("st");
    } else if (k3) {

      console.log("3k");
    } else if (p2) {

      console.log("2p");
    } else if (p1) {

      console.log("1p");
    } else {

      console.log("hc");
    }

    var timeEnd = microtime.now();

    console.log(timeStart, timeEnd, timeEnd - timeStart);
  }


}

module.exports = PokerUtil;
