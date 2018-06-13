import {
  Component, HostListener,
  OnInit
} from '@angular/core';
import { Equation } from '../datamodels/equation';
import { EquationGenerator } from '../services/equationgenerator';

@Component({
  selector: 'home',
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public p1Score: number = 0;
  public p2Score: number = 0;
  public timer: number;

  public timerInput: number = 5;
  public minInt: number = 0;
  public maxInt: number = 10;
  public allowNegatives: boolean = false;

  public p1Equation: Equation;
  public p2Equation: Equation;
  public p1Input: string = '';
  public p2Input: string = '';
  public winner: string;
  public isEndOfGame: boolean = false;
  public isGameStarted: boolean = false;

  constructor(private equationGen: EquationGenerator) {}

  public ngOnInit(): void {
    this.timer = this.timerInput;
  }

  @HostListener('document:keypress', ['$event'])
  public handleKeypressEvent(event: KeyboardEvent): void {
    console.log(event);
    if (this.isGameStarted) {
      if (event.keyCode >= 48 && event.keyCode <= 57) {
        this.p1Input += event.key;
        if (this.p1Equation.isCorrect(+this.p1Input)) {
          this.p1Score++;
          this.p1Equation = this.equationGen
            .generate(this.minInt, this.maxInt, this.allowNegatives);
          this.clearP1Input();
        }
      } else if (event.keyCode >= 96 && event.keyCode <= 105) {
        this.p2Input += event.key;
        if (this.p1Equation.isCorrect(+this.p1Input)) {
          this.p2Score++;
          this.p2Equation = this.equationGen
            .generate(this.minInt, this.maxInt, this.allowNegatives);
          this.clearP2Input();
        }
      }
    }
  }

  public clearP1Input(): void {
    this.p1Input = '';
  }

  public clearP2Input(): void {
    this.p2Input = '';
  }

  public timerChange(): void {
    this.timer = this.timerInput;
  }

  public reset(): void {
    this.p1Score = 0;
    this.p2Score = 0;
    this.p1Input = '';
    this.p2Input = '';
    this.timer = this.timerInput;
    this.isEndOfGame = false;
  }

  public start(): void {
    this.reset();
    this.isGameStarted = true;
    this.p1Equation = this.equationGen.generate(this.minInt, this.maxInt, this.allowNegatives);
    this.p2Equation = this.equationGen.generate(this.minInt, this.maxInt, this.allowNegatives);
    const intervalId = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.determineWinner();
        clearInterval(intervalId);
      }
    }, 1000);
  }

  public determineWinner(): void {
    this.isEndOfGame = true;
    this.isGameStarted = false;
    if (this.p1Score === this.p2Score) {
      this.winner = 'It\'s a tie!';
    } else if (this.p1Score > this.p2Score) {
      this.winner = 'Player 1 wins!';
    } else {
      this.winner = 'Player 2 wins!';
    }
  }
}
