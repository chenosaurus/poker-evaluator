import { CARDVALS } from './constants/card-vals.const';
import { CARDS } from './constants/cards.const';

// TODO remove implicit any param types + add return types
// TODO add tests
class ThreeCardConverter {

  fillHand(cards) {
  	var cardsUsed = [0,0,0,0,0,0,0,0,0,0,0,0,0];

  	//convert each card to vals 0-12, strip suit
  	cards.forEach(function(card) {
  		var i = Math.floor((CARDS[card.toLowerCase()]-1)/4);
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
        var card = CARDVALS[i] + suit[0];
        suit.splice(0, 1);
        cards.push(card);
      }
    }
    return cards;
  }

  private makesStraight(cardsUsed, rank) {
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
  }
}

export = ThreeCardConverter;
