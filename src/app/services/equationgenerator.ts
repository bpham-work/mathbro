import { Injectable } from '@angular/core';
import { RandomNumberGenerator } from './randomnumbergenerator';
import { Equation } from '../datamodels/equation';
import { Operators } from '../datamodels/operators';

@Injectable()
export class EquationGenerator {
  public generate(min: number, max: number,
                  divisionAllowed = false, allowNegatives = false): Equation {
    const operator = Operators.getRandomOperator(divisionAllowed);
    const operand1 = RandomNumberGenerator.getRandomInt(min, max);
    let operand2;
    if (!allowNegatives && operator === '-') {
      operand2 = RandomNumberGenerator.getRandomInt(min, operand1);
    } else {
      operand2 = RandomNumberGenerator.getRandomInt(min, max);
    }
    return new Equation(operand1, operand2, operator);
  }
}
