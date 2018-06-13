import { RandomNumberGenerator } from '../services/randomnumbergenerator';

export class Operators {
  public static operators = ['+', '-', 'x', '/'];

  public static getRandomOperator(divisionAllowed = false): string {
    const index: number = divisionAllowed ? RandomNumberGenerator.getRandomInt(0, 2) :
      RandomNumberGenerator.getRandomInt(0, 3);
    return Operators.operators[index];
  }
}
