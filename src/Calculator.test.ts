import "jest-extended";
import { Calculator, Op } from "./Calculator";

const negativeInts = [-50, -3, -2, -1];
const positiveInts = [50, 3, 2, 1];
const nonzeroInts = negativeInts.concat(positiveInts);
const ints = nonzeroInts.concat(0);
const positiveFloats = [50.0, 50., 49.9, 3.10, 2.09, 1.];
const negativeFloats = [-50.0, -50., -49.9, -3.10, -2.09, -1.];
const nonzeroFloats = positiveFloats.concat(negativeFloats);
const numbers = ints.concat(nonzeroFloats);

test('input a single non-zero digit in overwrite mode', () => {
  for (let i = 1; i <= 9; i++) {
    let calc = new Calculator();
    calc.lcd = '0';
    calc.overwrite = true;
    calc.digit(i);
    expect(calc.lcd).toBe(i.toString());
  }
});

test('input a single zero in overwrite mode', () => {
  let calc = new Calculator();
  calc.lcd = '0';
  calc.overwrite = true;
  calc.digit(0);
  expect(calc.lcd).toBe('0');
});

test('input a single non-zero digit in append mode with integer on screen', () => {
  for (let x of ['-50', '-3', '-2', '-1', '50', '3', '2', '1'])
    for (let i = 1; i <= 9; i++) {
      let calc = new Calculator();
      calc.lcd = x;
      calc.overwrite = false;
      calc.digit(i);
      expect(calc.lcd).toBe(x + i);
    }
});

test('input a single non-zero digit in append mode with float on screen', () => {
  for (let x of ['-50.0', '-50.', '-49.9', '-3.10', '-2.09', '-1.', '50.0', '50.', '49.9', '3.10', '2.09', '1.'])
    for (let i = 1; i <= 9; i++) {
      let calc = new Calculator();
      calc.lcd = x;
      calc.overwrite = false;
      calc.digit(i);
      expect(calc.lcd).toBe(x + i);
    }
});

test('input three digits (starting with a non-zero digit) in overwrite mode', () => {
  for (let i = 1; i <= 9; i++)
    for (let j = 1; j <= 9; j++)
      for (let k = 1; k <= 9; k++) {
        let calc = new Calculator();
        calc.lcd = '0';
        calc.overwrite = true;
        calc.digit(i);
        calc.digit(j);
        calc.digit(k);
        expect(calc.lcd).toBe(i.toString() + j + k);
      }
});

test('input three digits (starting with a non-zero digit) in append mode with integer on screen', () => {
  for (let x of ['-50', '-3', '-2', '-1', '50', '3', '2', '1'])
    for (let i = 1; i <= 9; i++)
      for (let j = 0; j <= 9; j++)
        for (let k = 0; k <= 9; k++) {
          let calc = new Calculator();
          calc.lcd = x;
          calc.overwrite = false;
          calc.digit(i);
          calc.digit(j);
          calc.digit(k);
          expect(calc.lcd).toBe(x + i + j + k);
        }
});

test('input three non-zero digits (starting with a non-zero digit) in append mode with float on screen', () => {
  for (let x of ['-50.0', '-50.', '-49.9', '-3.10', '-2.09', '-1.', '50.0', '50.', '49.9', '3.10', '2.09', '1.'])
    for (let i = 1; i <= 9; i++)
      for (let j = 0; j <= 9; j++)
        for (let k = 0; k <= 9; k++) {
          let calc = new Calculator();
          calc.lcd = x;
          calc.overwrite = false;
          calc.digit(i);
          calc.digit(j);
          calc.digit(k);
          expect(calc.lcd).toBe(x + i + j + k);
        }
});

test('input decimal point in overwrite mode', () => {
  let calc = new Calculator();
  calc.lcd = '0';
  calc.decimal();
  expect(calc.lcd).toBe('0.');
});

test('input decimal point in append mode with integer on screen', () => {
  for (let x of ['-50', '-3', '-2', '-1', '50', '3', '2', '1']) {
    let calc = new Calculator();
    calc.lcd = x;
    calc.overwrite = false;
    calc.decimal();
    expect(calc.lcd).toBe(x + '.');
  }
});

test('input decimal point in append mode with float on screen', () => {
  for (let x of ['-50.0', '-50.', '-49.9', '-3.10', '-2.09', '-1.', '50.0', '50.', '49.9', '3.10', '2.09', '1.']) {
    let calc = new Calculator();
    calc.lcd = x;
    calc.overwrite = false;
    calc.decimal();
    expect(calc.lcd).toBe(x);
  }
});

test('negate in overwrite mode', () => {
  let calc = new Calculator();
  calc.lcd = '0';
  calc.overwrite = true;
  calc.negate();
  expect(calc.lcd).toBe('0');
});

test('negate in append mode with positive integer on screen', () => {
  for (let x of ['50', '3', '2', '1']) {
    let calc = new Calculator();
    calc.lcd = x;
    calc.overwrite = false;
    calc.negate();
    expect(calc.lcd).toBe('-' + x);
  }
});

test('negate whin append mode with negative integer on screen', () => {
  for (let x of ['-50', '-3', '-2', '-1']) {
    let calc = new Calculator();
    calc.lcd = x;
    calc.overwrite = false;
    calc.negate();
    expect(calc.lcd).toBe(x.substring(1));
  }
});

test('negate in append mode with positive float on screen', () => {
  for (let x of ['50.0', '50.', '49.9', '3.10', '2.09', '1.']) {
    let calc = new Calculator();
    calc.lcd = x;
    calc.overwrite = false;
    calc.negate();
    expect(calc.lcd).toBe('-' + x);
  }
});

test('negate in append mode with negative float on screen', () => {
  for (let x of ['-50.0', '-50.', '-49.9', '-3.10', '-2.09', '-1.']) {
    let calc = new Calculator();
    calc.lcd = x;
    calc.overwrite = false;
    calc.negate();
    expect(calc.lcd).toBe(x.substring(1));
  }
});

test('add two numbers', () => {
  for (let i of numbers)
    for (let j of numbers) {
      let calc = new Calculator();
      calc.lcd = i.toString();
      calc.op(Op.Add);
      calc.lcd = j.toString();
      calc.equals();
      expect(calc.lcd).toBe((i + j).toString());
    }
});

test('multiply two numbers', () => {
  for (let i of numbers)
    for (let j of numbers) {
      let calc = new Calculator();
      calc.lcd = i.toString();
      calc.op(Op.Mul);
      calc.lcd = j.toString();
      calc.equals();
      expect(calc.lcd).toBe((i * j).toString());
    }
});

test('subtract two numbers', () => {
  for (let i of numbers)
    for (let j of numbers) {
      let calc = new Calculator();
      calc.lcd = i.toString();
      calc.op(Op.Sub);
      calc.lcd = j.toString();
      calc.equals();
      expect(calc.lcd).toBe((i - j).toString());
    }
});

test('divide two numbers', () => {
  for (let i of numbers)
    for (let j of numbers) {
      let calc = new Calculator();
      calc.lcd = i.toString();
      calc.op(Op.Div);
      calc.lcd = j.toString();
      calc.equals();
      if (j === 0)
        expect(parseFloat(calc.lcd)).not.toBeFinite();
      else
        expect(calc.lcd).toBe((i / j).toString());
    }
});

test('repeated addition three times', () => {
  for (let i of numbers)
    for (let j of numbers) {
      let calc = new Calculator();
      calc.lcd = i.toString();
      calc.op(Op.Add);
      calc.lcd = j.toString();
      calc.equals();
      calc.equals();
      calc.equals();
      expect(calc.lcd).toBe((((i + j) + j) + j).toString());
    }
});

test('repeated multiplication three times', () => {
  for (let i of numbers)
    for (let j of numbers) {
      let calc = new Calculator();
      calc.lcd = i.toString();
      calc.op(Op.Mul);
      calc.lcd = j.toString();
      calc.equals();
      calc.equals();
      calc.equals();
      expect(calc.lcd).toBe((((i * j) * j) * j).toString());
    }
});

test('repeated subtraction three times', () => {
  for (let i of numbers)
    for (let j of numbers) {
      let calc = new Calculator();
      calc.lcd = i.toString();
      calc.op(Op.Sub);
      calc.lcd = j.toString();
      calc.equals();
      calc.equals();
      calc.equals();
      expect(calc.lcd).toBe((((i - j) - j) - j).toString());
    }
});

test('repeated division three times', () => {
  for (let i of numbers)
    for (let j of numbers) {
      let calc = new Calculator();
      calc.lcd = i.toString();
      calc.op(Op.Div);
      calc.lcd = j.toString();
      calc.equals();
      calc.equals();
      calc.equals();
      if (j === 0)
        expect(parseFloat(calc.lcd)).not.toBeFinite();
      else
        expect(calc.lcd).toBe((((i / j) / j) / j).toString());
    }
});

test('add three different numbers', () => {
  for (let i of numbers)
    for (let j of numbers)
      for (let k of numbers) {
        let calc = new Calculator();
        calc.lcd = i.toString();
        calc.op(Op.Add)
        calc.lcd = j.toString();
        calc.op(Op.Add)
        calc.lcd = k.toString();
        calc.equals();
        expect(calc.lcd).toBe(((i + j) + k).toString());
      }
});

test('multiply three different numbers', () => {
  for (let i of numbers)
    for (let j of numbers)
      for (let k of numbers) {
        let calc = new Calculator();
        calc.lcd = i.toString();
        calc.op(Op.Mul)
        calc.lcd = j.toString();
        calc.op(Op.Mul)
        calc.lcd = k.toString();
        calc.equals();
        expect(calc.lcd).toBe(((i * j) * k).toString());
      }
});

test('subtract three different numbers', () => {
  for (let i of numbers)
    for (let j of numbers)
      for (let k of numbers) {
        let calc = new Calculator();
        calc.lcd = i.toString();
        calc.op(Op.Sub)
        calc.lcd = j.toString();
        calc.op(Op.Sub)
        calc.lcd = k.toString();
        calc.equals();
        expect(calc.lcd).toBe(((i - j) - k).toString());
      }
});

test('divide three different numbers', () => {
  for (let i of numbers)
    for (let j of numbers)
      for (let k of numbers) {
        let calc = new Calculator();
        calc.lcd = i.toString();
        calc.op(Op.Div)
        calc.lcd = j.toString();
        calc.op(Op.Div)
        calc.lcd = k.toString();
        calc.equals();
        if (j === 0 || k === 0)
          expect(parseFloat(calc.lcd)).not.toBeFinite();
        else
          expect(calc.lcd).toBe(((i / j) / k).toString());
      }
});

test('square the input', () => {
  for (let x of numbers) {
    let calc = new Calculator();
    calc.lcd = x.toString();
    calc.square();
    expect(calc.lcd).toBe((x * x).toString());
  }
});

test('percent the input', () => {
  for (let x of numbers) {
    let calc = new Calculator();
    calc.lcd = x.toString();
    calc.percent();
    expect(calc.lcd).toBe((x /100).toString());
  }
});