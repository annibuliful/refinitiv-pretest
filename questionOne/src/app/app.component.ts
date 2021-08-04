import { Component } from '@angular/core';

type SelectOption = 'checkPrime' | 'checkFibonacci' | null;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'questionOne';
  inputNumber: number = 0;
  inputSelectOption: SelectOption = null;
  resultOfCalculation: boolean = false;

  checkIsPrimeNumber() {
    for (let i = 2, square = Math.sqrt(this.inputNumber); i <= square; i++) {
      if (this.inputNumber % i === 0) return false;
    }
    return this.inputNumber > 1;
  }

  isSquare(number: number) {
    const square = parseInt(Math.sqrt(number).toString());
    return square * square === number;
  }

  checkIsFibonacci() {
    const numberToCheck = this.inputNumber;

    const isFibonacci =
      this.isSquare(5 * (numberToCheck * numberToCheck) - 4) ||
      this.isSquare(5 * (numberToCheck * numberToCheck) + 4);

    return isFibonacci;
  }

  calculateByOption(option: SelectOption) {
    if (!option) return;
    if (option === 'checkPrime') {
      this.resultOfCalculation = this.checkIsPrimeNumber();
    } else {
      this.resultOfCalculation = this.checkIsFibonacci();
    }
  }

  onChangeInputNumber(changedValue: number) {
    const isLessthanOne = changedValue < 1;

    this.inputNumber = isLessthanOne ? 1 : Math.round(changedValue);
    this.calculateByOption(this.inputSelectOption);
  }

  onChangeCalculateOption(changedOption: SelectOption) {
    if (!changedOption) return;

    this.inputSelectOption = changedOption;
    this.calculateByOption(changedOption);
  }
}
