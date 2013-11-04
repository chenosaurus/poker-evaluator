//converts 3 card to lowest equivalent 5 card hand
module.exports = {
  CARDVALS: ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'],
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
  makesStraight: function(cardsUsed, rank) {
    //add ace to bottom as well
    var newCards = [cardsUsed[12]].concat(cardsUsed);
    //add in new card (pushed up one by ace)
    newCards[rank+1] = 2;
    //determine if there are 5 cards in a row
    return 5 === newCards.reduce(function(prev, next) {
      if (prev === 5) {
        return 5;
      } else {
        return next ? prev + 1 : 0;
      }
    });
  },

  fillHand: function(cards) {

  	var cardsUsed = [0,0,0,0,0,0,0,0,0,0,0,0,0];

  	//convert each card to vals 0-12, strip suit
  	cards.forEach(function(card) {
  		var i = Math.floor((this.CARDS[card.toLowerCase()]-1)/4);
  		cardsUsed[i] = 1;
  	}, this);

  	var toFill = 2; //need to fill 2 cards

    //fill in <toFill> cards to complete 5 card hand
  	for (var i = 0; i < 13; i++) {
  	  if (toFill == 0) break; //done filling
      //prevent adding a card to finish a straight
      if (cardsUsed[i] == 0 && !this.makesStraight(cardsUsed,i)) {
        cardsUsed[i] = 2;
        toFill--;
      }
  	}

    //fill dummy cards for lowest possible hand
    var suit = ['s', 'd'];
    for (var i = 0; i <= 13; i++) {
      if (cardsUsed[i] == 2) {
        var card = this.CARDVALS[i] + suit[0];
        suit.splice(0, 1);
        cards.push(card);
      }
    }
    return cards;
  }
};