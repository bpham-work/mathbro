import { RandomNumberGenerator } from '../services/randomnumbergenerator';

export class Operators {
  public static operators = ['+', '-', 'x', '/'];

  public static getRandomOperator(allowDivision = false): string {
    const index: number = allowDivision ? RandomNumberGenerator.getRandomInt(0, 3) :
      RandomNumberGenerator.getRandomInt(0, 2);
    return Operators.operators[index];
  }
}
