import { HandName } from './hand-name.type';

export interface EvaluatedHand {
  handType: number; // Index of HANDTYPES array
  handRank: number;
  value: number;
  handName: HandName;
}
