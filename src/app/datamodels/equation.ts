export class Equation {
  private answer: number;

  constructor(private operand1: number, private operand2: number, private operator: string) {
    this.answer = this.calculateAnswer();
  }

  public calculateAnswer(): number {
    let result: number = 0;
    switch (this.operator) {
      case '+':
        result = this.operand1 + this.operand2;
        break;
      case '-':
        result = this.operand1 - this.operand2;
        break;
      case 'x':
        result = this.operand1 * this.operand2;
        break;
      case '/':
        result = this.operand1 / this.operand2;
        break;
    }
    return result;
  }

  public isCorrect(userAnswer: number): boolean {
    return userAnswer === this.answer;
  }

  public toString(): string {
    return `${this.operand1} ${this.operator} ${this.operand2}`;
  }

  public toFullEquationString(): string {
    return `${this.operand1} ${this.operator} ${this.operand2} = ${this.answer}`;
  }
}
