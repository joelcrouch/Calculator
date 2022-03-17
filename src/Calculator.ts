import { Logger } from '../logger';

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

  calLog: Logger;

  /**
   * Logger for the calculator.  Default logger implementation is to set all 
   * log levels to 'true'.  Info, warning, debug and error will display their 
   * messages.
   */

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
    this.calLog = new Logger();
  }

  /**
   * Input a single digit.
   * @param x a single digit, 0-9
   */
  digit(x: number): void {
    this.debugLog();
    if (this.overwrite) {
      this.lcd = x.toString();
      this.highOrLowWarningLog();
      this.overwrite = false;
    } else {
      this.lcd += x;
      this.highOrLowWarningLog();
    }
  }

  /**
   * Input a decimal point.
   */
  decimal(): void {
    this.debugLog();
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
    this.debugLog();
    if (this.overwrite) {
      this.lcd = '0';
      this.overwrite = false;
    } else if (this.lcd !== '0') { // don't negate '0'
      if (this.lcd.charAt(0) === '-')
        this.lcd = this.lcd.substring(1);
      else
        this.lcd = '-' + this.lcd;
        this.highOrLowWarningLog();
    }
  }

  /**
   * Input a binary operator. If there is a pending operation whose result has
   * not yet been displayed, update the screen to display that result. For
   * example, when a user inputs 2 + 4 + 8, the screen is updated to display 6
   * on the second + input.
   */
  op(o: Op): void {
    this.debugLog();
    this.overwrite = true;
    if (this.arg === null || this.repeat) { // if this is the first argument
      this.lastOp = o;
      this.arg = parseFloat(this.lcd);
    } else { // if this is the second argument
      switch (this.lastOp) {
        case Op.Add: this.lcd = (this.arg + parseFloat(this.lcd)).toString(); 
        this.highOrLowWarningLog();
        break;
        case Op.Sub: this.lcd = (this.arg - parseFloat(this.lcd)).toString(); 
        this.highOrLowWarningLog();
        break;
        case Op.Mul: this.lcd = (this.arg * parseFloat(this.lcd)).toString(); 
        this.highOrLowWarningLog();
        break;
        case Op.Div: if(this.arg === 0){
          this.calLog.error("Divison by zero is not supported.");
            }
        this.lcd = (this.arg / parseFloat(this.lcd)).toString();
        this.highOrLowWarningLog(); 
        break;
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
    this.debugLog();
    // If `repeat` is disabled, this press of = will enable it. In that case,
    // the value currently on screen is the second argument, the one that's used
    // when repeating the operation.
    const oldLcd = parseFloat(this.lcd);

    // If `repeat` is disabled, then `this.arg` is the first argument to the
    // operation; if `repeat` is enabled, then it's the second argument.
    // This doesn't matter in the + and * cases because the result is the same
    // either way.
    switch (this.lastOp) {
      case Op.Add: this.lcd = (this.arg + parseFloat(this.lcd)).toString(); 
        this.highOrLowWarningLog();
        break;
      case Op.Sub:
        if (this.repeat)
          this.lcd = (parseFloat(this.lcd) - this.arg).toString();
        else
          this.lcd = (this.arg - parseFloat(this.lcd)).toString();
          this.highOrLowWarningLog();
          break;
      case Op.Mul: this.lcd = (this.arg * parseFloat(this.lcd)).toString(); 
        this.highOrLowWarningLog();
        break;
      case Op.Div:
        if(this.arg === 0){
          this.calLog.error("Divison by zero is not supported.");
          break; 
        }
        this.lcd = (this.arg / parseFloat(this.lcd)).toString(); 
        this.highOrLowWarningLog(); break;
    }

    // If `repeat` is disabled, we need to save the previous value of the screen
    // to use it as the second argument when repeating the operation.
    if (!this.repeat)
      this.arg = oldLcd;

    this.repeat = true;
    this.overwrite = true;
    this.calLog.info("Overwrite is now enabled.");
  }

  /**
   * Clear the screen, resetting it to 0. If in overwrite mode, reset the
   * entire calculator to its initial state.
   */
  clear(): void {
    this.debugLog();
    if (this.overwrite) {
      this.arg = null;
      this.lastOp = null;
      this.repeat = false;
    }
    this.lcd = '0';
    this.overwrite = true;
    this.calLog.info("Overwrite is now enabled.");
    this.highOrLowWarningLog();
  }
  /**
   * Takes the current argument and multiplies it by itself.
   */
  square() {
    this.debugLog();
    this.lcd = (parseFloat(this.lcd) * parseFloat(this.lcd)).toString();
    this.highOrLowWarningLog();
  }

  percent() {
    this.debugLog();
    this.lcd = (parseFloat(this.lcd)/100).toString();
    this.highOrLowWarningLog();
  }


  set errorLogVisibility(visibility: LogVisibility) {
    if(visibility===0){
      this.calLog.displayError();
    }
    else if(visibility===1){
      this.calLog.ignoreError();
    }
  }

  set warningLogVisibility(visibility: LogVisibility) {
    if(visibility===0){
      this.calLog.displayWarn();
    }
    else if(visibility===1){
      this.calLog.ignoreWarn();
    }
  }

  set infoLogVisibility(visibility: LogVisibility) {
    if(visibility===0){
      this.calLog.displayInfo();
    }
    else if(visibility===1){
      this.calLog.ignoreInfo();
    }
  }

  set debugLogVisibility(visibility: LogVisibility) {
    if(visibility===0){
      this.calLog.displayDebug();
    }
    else if(visibility===1){
      this.calLog.ignoreDebug();
    }
  }
  debugLog() {
    this.calLog.debug("Button pressed.");
  }

  highOrLowWarningLog(){
    if (parseFloat(this.lcd) >= Number.MAX_SAFE_INTEGER){
      this.calLog.warn("Number is greater than the maximum number");
    }
    else if (parseFloat(this.lcd)  <= Number.MIN_SAFE_INTEGER){
      this.calLog.warn("Number is less than the maximum number");
    }
  }
}
