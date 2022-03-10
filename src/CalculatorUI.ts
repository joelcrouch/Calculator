import { Calculator, Op } from './Calculator';

/**
 * The UI logic for the calculator interface, which just updates the HTML
 * element representing the display every time the calculator's state changes.
 * Button actions are bound in {@link Main}.
 */
export class CalculatorUI extends Calculator {
  /**
   * The HTML element that shows the contents of the calculator's display.
   */
  lcdDisplay: HTMLElement;

  constructor(id: string) {
    super();
    this.lcdDisplay = document.getElementById(id);
    this.lcdDisplay.innerHTML = this.lcd;
  }

  digit(x: number): void {
    super.digit(x);
    this.lcdDisplay.innerHTML = this.lcd.toString();
  }

  decimal(): void {
    super.decimal();
    this.lcdDisplay.innerHTML = this.lcd.toString();
  }

  negate(): void {
    super.negate();
    this.lcdDisplay.innerHTML = this.lcd.toString();
  }

  op(o: Op): void {
    super.op(o);
    this.lcdDisplay.innerHTML = this.lcd.toString();
  }

  equals(): void {
    super.equals();
    this.lcdDisplay.innerHTML = this.lcd.toString();
  }

  clear(): void {
    super.clear();
    this.lcdDisplay.innerHTML = this.lcd.toString();
  }

  square() {
    super.square();
    this.lcdDisplay.innerHTML = this.lcd.toString();
  }

  percent() {
    super.percent();
    this.lcdDisplay.innerHTML = this.lcd.toString();
  }
  
}