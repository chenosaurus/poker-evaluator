import fs = require('fs');
import path = require('path');

import ThreeCardConverter = require('./three-card-converter');
import { HANDTYPES } from './constants/hand-types.const';
import { CARDS } from './constants/cards.const';
import { EvaluatedHand } from './types/evaluated-hand.interface';
import { Deck } from './types/deck.interface';

export type Card = keyof Deck;

// TODO add types from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/poker-evaluator/index.d.ts

// TODO remove implicit any param types + add return types
// TODO add tests
export class PokerEvaluator {
  private ranks: Buffer;
  private threeCardConverter: ThreeCardConverter;

  constructor() {
    var ranksFile = path.join(__dirname, '../data/HandRanks.dat');
    this.ranks = fs.readFileSync(ranksFile);

    this.threeCardConverter = new ThreeCardConverter();
  }

  evalHand(cards: Card[]): EvaluatedHand {
    if (!this.ranks) {
      throw new Error('HandRanks.dat not loaded');
    }

    if (cards.length != 7 && cards.length != 6 && cards.length != 5 && cards.length != 3) {
      throw new Error('Hand must be 3, 5, 6, or 7 cards, but got ' + cards.length);
    }

    // Check every card is a string && in the deck
    if (!cards.every(card => !!card && typeof card === 'string' && Object.keys(CARDS).includes(card.toLowerCase()))) {
      throw new Error('Hand is not in expected string[] format. Please see README.md for correct usage.');
    }

    // if 3 card hand, fill in to make 5 card
    if (cards.length == 3) {
      cards = this.threeCardConverter.fillHand(cards);
    }

    const cardValues = cards.map((card) => CARDS[card.toLowerCase()]);
    return this.evaluate(cardValues);
  }

  private evaluate(cards: number[]): EvaluatedHand {
    var p = 53;
    for (var i = 0; i < cards.length; i++) {
      p = this.evalCard(p + cards[i]);
    }

    if (cards.length == 5 || cards.length == 6) {
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
