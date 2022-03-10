import { } from 'logger';

/**
 * The binary operations supported by the calculator.
 */
export enum Op {
  /**
   * Addition.
   */
  Add,

  /**
   * Subtraction.
   */
  Sub,

  /**
   * Multiplication.
   */
  Mul,

  /**
   * Division.
   */
  Div  
}

export enum LogVisibility {
  Display,
  Ignore
}

/**
 * A basic four-function calculator. UI logic is handled separately in
 * {@link CalculatorUI}.
 */
export class Calculator {
  /**
   * The contents of the calculator's LCD display.
   */
  lcd: string;

  /**
   * The result of the last operation if `repeat` is `false`, or the second
   * argument of the last operation if `repeat` is `true`.
   */
  arg: number;

  /**
   * The last operation that the user entered.
   */
  lastOp: Op;

  /**
   * If `true`, the calculator is in "overwrite mode"; if `false`, the
   * calculator is in "append mode". In overwrite mode, the next input replaces
   * the current screen contents; in append mode, the next input appends to the
   * current screen contents.
   */
  overwrite: boolean;

  /**
   * If `true`, the calculator is in "repeat mode". In repeat mode, when the =
   * button is pressed, the screen is updated by re-executing the previous
   * operation with the same right-hand argument as last time. For example, if
   * the previous operation was 3 + 5 and the calculator is in repeat mode,
   * pressing = will update the screen with the number 13.
   */
  repeat: boolean;

  /**
   * In its initial state, the calculator's screen shows `0`, there is no
   * previous result or operation, and overwrite mode is enabled.
   */
  constructor() {
    this.lcd = '0';
    this.arg = null;
    this.lastOp = null;
    this.overwrite = true;
    this.repeat = false;
  }

  /**
   * Input a single digit.
   * @param x a single digit, 0-9
   */
  digit(x: number): void {
    if (this.overwrite) {
      this.lcd = x.toString();
      this.overwrite = false;
    } else {
      this.lcd += x;
    }
  }

  /**
   * Input a decimal point.
   */
  decimal(): void {
    if (this.overwrite) {
      this.lcd = '0.';
      this.overwrite = false;
    } else if (this.lcd.indexOf('.') === -1) { // don't allow more than one '.'
      this.lcd += '.';
    }
  }

  /**
   * Negate the current value on the screen.
   */
  negate(): void {
    if (this.overwrite) {
      this.lcd = '0';
      this.overwrite = false;
    } else if (this.lcd !== '0') { // don't negate '0'
      if (this.lcd.charAt(0) === '-')
        this.lcd = this.lcd.substring(1);
      else
        this.lcd = '-' + this.lcd;
    }
  }

  /**
   * Input a binary operator. If there is a pending operation whose result has
   * not yet been displayed, update the screen to display that result. For
   * example, when a user inputs 2 + 4 + 8, the screen is updated to display 6
   * on the second + input.
   */
  op(o: Op): void {
    this.overwrite = true;
    if (this.arg === null || this.repeat) { // if this is the first argument
      this.lastOp = o;
      this.arg = parseFloat(this.lcd);
    } else { // if this is the second argument
      switch (this.lastOp) {
        case Op.Add: this.lcd = (this.arg + parseFloat(this.lcd)).toString(); break;
        case Op.Sub: this.lcd = (this.arg - parseFloat(this.lcd)).toString(); break;
        case Op.Mul: this.lcd = (this.arg * parseFloat(this.lcd)).toString(); break;
        case Op.Div: this.lcd = (this.arg / parseFloat(this.lcd)).toString(); break;
      }
      this.lastOp = o;
      this.arg = parseFloat(this.lcd);
    }
    this.repeat = false;
  }

  /**
   * If the calculator is not in repeat mode, compute the result of the pending
   * expression if there is one. If the calculator is in repeat mode,
   * re-execute the previous operation.
   *
   * @see {@link repeat}
   */
  equals(): void {
    // If `repeat` is disabled, this press of = will enable it. In that case,
    // the value currently on screen is the second argument, the one that's used
    // when repeating the operation.
    const oldLcd = parseFloat(this.lcd);

    // If `repeat` is disabled, then `this.arg` is the first argument to the
    // operation; if `repeat` is enabled, then it's the second argument.
    // This doesn't matter in the + and * cases because the result is the same
    // either way.
    switch (this.lastOp) {
      case Op.Add: this.lcd = (this.arg + parseFloat(this.lcd)).toString(); break;
      case Op.Sub:
        if (this.repeat)
          this.lcd = (parseFloat(this.lcd) - this.arg).toString();
        else
          this.lcd = (this.arg - parseFloat(this.lcd)).toString();
        break;
      case Op.Mul: this.lcd = (this.arg * parseFloat(this.lcd)).toString(); break;
      case Op.Div:
        if (this.repeat)
          this.lcd = (parseFloat(this.lcd) / this.arg).toString();
        else
          this.lcd = (this.arg / parseFloat(this.lcd)).toString();
        break;
    }

    // If `repeat` is disabled, we need to save the previous value of the screen
    // to use it as the second argument when repeating the operation.
    if (!this.repeat)
      this.arg = oldLcd;

    this.repeat = true;
    this.overwrite = true;
  }

  /**
   * Clear the screen, resetting it to 0. If in overwrite mode, reset the
   * entire calculator to its initial state.
   */
  clear(): void {
    if (this.overwrite) {
      this.arg = null;
      this.lastOp = null;
      this.repeat = false;
    }
    this.lcd = '0';
    this.overwrite = true;
  }
<<<<<<< HEAD
  /**
   * Takes the current argument and multiplies it by itself.
   */
  square() {
    this.lcd = (parseFloat(this.lcd) * parseFloat(this.lcd)).toString();
  }

  percent() {
    this.lcd = (parseFloat(this.lcd)/100).toString();
  }
}
=======

  set errorLogVisibility(visibility: LogVisibility) {
    // TODO
  }

  set warningLogVisibility(visibility: LogVisibility) {
    // TODO
  }

  set infoLogVisibility(visibility: LogVisibility) {
    // TODO
  }

  set debugLogVisibility(visibility: LogVisibility) {
    // TODO
  }
}
>>>>>>> 1d9cf73420145528227736a80273e6745f0230b1
