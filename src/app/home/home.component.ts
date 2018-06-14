import {
  Component, ElementRef, HostListener,
  OnInit, ViewChild
} from '@angular/core';
import { Equation } from '../datamodels/equation';
import { EquationGenerator } from '../services/equationgenerator';

@Component({
  selector: 'home',
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  @ViewChild('startBtn') public startBtn: ElementRef;
  public p1Score: number = 0;
  public p2Score: number = 0;
  public p1CorrectList: Equation[] = [];
  public p2CorrectList: Equation[] = [];
  public timer: number;

  public timerInput: number = 60;
  public minInt: number = 0;
  public maxInt: number = 12;
  public allowNegativeDifference: boolean = false;
  public allowDivision: boolean = false;

  public p1Equation: Equation;
  public p2Equation: Equation;
  public p1Input: string = '';
  public p2Input: string = '';
  public winner: string;
  public isEndOfGame: boolean = false;
  public isGameStarted: boolean = false;
  public showSettings: boolean = false;
  public showLegend: boolean = true;

  private intervalId: any;

  constructor(private equationGen: EquationGenerator) {}

  public ngOnInit(): void {
    this.timer = this.timerInput;
  }

  @HostListener('document:keydown', ['$event'])
  public handleKeypressEvent(event: KeyboardEvent): void {
    // console.log(event);
    if (this.isGameStarted) {
      if (event.code === 'NumpadAdd') {
        this.clearP2Input();
      } else if (event.code.includes('Numpad')) {
        this.p2Input += event.key;
        this.checkP2Input();
      } else if (event.code === 'Backspace') {
        this.clearP1Input();
      } else if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 189) {
        this.p1Input += event.key;
        this.checkP1Input();
      }
    }
  }

  public checkP1Input(): void {
    if (this.p1Equation.isCorrect(+this.p1Input)) {
      this.p1Score++;
      this.p1CorrectList.push(this.p1Equation);
      this.p1Equation = this.equationGen
        .generate(this.minInt, this.maxInt, this.allowDivision, this.allowNegativeDifference);
      this.clearP1Input();
    }
  }

  public checkP2Input(): void {
    if (this.p2Equation.isCorrect(+this.p2Input)) {
      this.p2Score++;
      this.p2CorrectList.push(this.p2Equation);
      this.p2Equation = this.equationGen
        .generate(this.minInt, this.maxInt, this.allowDivision, this.allowNegativeDifference);
      this.clearP2Input();
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
    this.p1CorrectList = [];
    this.p2CorrectList = [];
  }

  public start(): void {
    this.startBtn.nativeElement.blur();
    this.reset();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.isGameStarted = true;
    this.p1Equation = this.equationGen
      .generate(this.minInt, this.maxInt, this.allowDivision, this.allowNegativeDifference);
    this.p2Equation = this.equationGen
      .generate(this.minInt, this.maxInt, this.allowDivision, this.allowNegativeDifference);
    this.intervalId = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.determineWinner();
        clearInterval(this.intervalId);
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
