import { Injectable } from '@angular/core';
import { RandomNumberGenerator } from './randomnumbergenerator';
import { Equation } from '../datamodels/equation';
import { Operators } from '../datamodels/operators';

@Injectable()
export class EquationGenerator {
  public generate(min: number, max: number,
                  allowDivision = false, allowNegativeDifference = false): Equation {
    const operator = Operators.getRandomOperator(allowDivision);
    const operand1 = RandomNumberGenerator.getRandomInt(min, max);
    let operand2;
    if (!allowNegativeDifference && operator === '-') {
      operand2 = RandomNumberGenerator.getRandomInt(min, operand1);
    } else if (allowDivision && operator === '/') {
      if (operand1 === 0) {
        operand2 = RandomNumberGenerator.getRandomInt(min, max);
      } else {
        operand2 = RandomNumberGenerator.getRandomMultipleUpTo(operand1);
      }
    } else {
      operand2 = RandomNumberGenerator.getRandomInt(min, max);
    }
    return new Equation(operand1, operand2, operator);
  }
}
