import { CARDVALS, DECK } from './constants';

// The structure of this has remained largely unchanged from the original javascript
// TODO refactor + split up to make more functional
class ThreeCardConverter {

  fillHand(cards: string[]): string[] {
    cards = [...cards];

    let cardsUsed = [0,0,0,0,0,0,0,0,0,0,0,0,0];

    // Convert each card to vals 0 - 12, strip suit
    cards.forEach(card => {
      const index = Math.floor((DECK[card.toLowerCase()] - 1) / 4);
      cardsUsed[index] = 1;
    });

    let toFill = 2; // Need to fill 2 cards

    // Fill in <toFill> cards to complete 5 card hand
    for (let i = 0; i < cardsUsed.length - 1; i++) {
      if (toFill === 0) break; // Done filling

      // Prevent adding a card to finish a straight
      if (cardsUsed[i] === 0 && !this.makesStraight(cardsUsed, i)) {
        cardsUsed[i] = 2;
        toFill--;
      }
    }

    // Fill dummy cards for lowest possible hand
    let suit = ['s', 'd'];
    cardsUsed.forEach((cardUsedValue, i) => {
      if (cardUsedValue === 2) {
        const card = CARDVALS[i] + suit[0];
        suit.splice(0, 1); // remove 's' from suit (so 'd' is suit[0] next time)
        cards.push(card);
      }
    });

    return cards;
  }

  private makesStraight(cardsUsed: number[], rank: number): boolean {
    // Add ace to bottom as well
    let newCards = [cardsUsed[cardsUsed.length - 1]].concat(cardsUsed);
    // Add in new card (pushed up one by ace)
    newCards[rank + 1] = 2;
    // Determine if there are 5 cards in a row
    return 5 === newCards.reduce((prev, next) => {
      if (prev === 5) {
        return 5;
      } else {
        return next ? prev + 1 : 0;
      }
    });
  }
}

export = ThreeCardConverter;
