import fs = require('fs');
import path = require('path');

import { DECK, HANDTYPES } from './constants';
import ThreeCardConverter = require('./three-card-converter');
import { EvaluatedHand } from './types';

export class PokerEvaluator {
  private ranks: Buffer;
  private threeCardConverter: ThreeCardConverter;

  constructor() {
    this.ranks = fs.readFileSync(path.join(__dirname, '../data/HandRanks.dat'));

    this.threeCardConverter = new ThreeCardConverter();
  }

  evalHand(cards: string[]): EvaluatedHand {
    if (!this.ranks) {
      throw new Error('HandRanks.dat not loaded.');
    }

    if (cards.length !== 7 && cards.length !== 6 && cards.length !== 5 && cards.length !== 3) {
      throw new Error(`Hand must be 3, 5, 6, or 7 cards, but got ${cards.length}`);
    }

    cards = this.convertInputToLowerCase(cards);
    if (!this.deckContainsInput(cards)) {
      throw new Error(`Please supply input as a valid string[] of "cards".
        See src/constants/cards.const.ts for the deck's card values`
      );
    }

    // If a 3 card hand, fill in to make 5 card
    if (cards.length === 3) {
      cards = this.threeCardConverter.fillHand(cards);
    }

    return this.evaluate(cards);
  }

  private convertInputToLowerCase(cards: string[]): string[] {
    return cards.map(card => card && card.toLowerCase())
  }

  private deckContainsInput(cards: string[]): boolean {
    return cards.every(card => Object.keys(DECK).includes(card));
  }

  private evaluate(cards: string[]): EvaluatedHand {
    const cardValues = cards.map(card => DECK[card]);

    let p = 53;
    for (let i = 0; i < cardValues.length; i++) {
      p = this.evalCard(p + cardValues[i]);
    }

    if (cardValues.length === 5 || cardValues.length === 6) {
      p = this.evalCard(p)
    }

    return {
      handType: p >> 12,
      handRank: p & 0x00000fff,
      value: p,
      handName: HANDTYPES[p >> 12]
    }
  }

  private evalCard(card: number): number {
    return this.ranks.readUInt32LE(card * 4);
  }
}
