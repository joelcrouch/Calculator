import { CalculatorUI } from "./CalculatorUI"
import { Op } from "./Calculator"

window.onload = () => {
  let calcUI = new CalculatorUI('lcd');
  document.getElementById('1').onclick = () => calcUI.digit(1);
  document.getElementById('2').onclick = () => calcUI.digit(2);
  document.getElementById('3').onclick = () => calcUI.digit(3);
  document.getElementById('4').onclick = () => calcUI.digit(4);
  document.getElementById('5').onclick = () => calcUI.digit(5);
  document.getElementById('6').onclick = () => calcUI.digit(6);
  document.getElementById('7').onclick = () => calcUI.digit(7);
  document.getElementById('8').onclick = () => calcUI.digit(8);
  document.getElementById('9').onclick = () => calcUI.digit(9);
  document.getElementById('0').onclick = () => calcUI.digit(0);
  document.getElementById('+-').onclick = () => calcUI.negate();
  document.getElementById('.').onclick = () => calcUI.decimal();
  document.getElementById('+').onclick = () => calcUI.op(Op.Add);
  document.getElementById('-').onclick = () => calcUI.op(Op.Sub);
  document.getElementById('*').onclick = () => calcUI.op(Op.Mul);
  document.getElementById('/').onclick = () => calcUI.op(Op.Div);
  document.getElementById('=').onclick = () => calcUI.equals();
  document.getElementById('C').onclick = () => calcUI.clear();
  //document.getElementById('%').onclick = () => calcUI.Percent());//both need imp
  document.getElementById("^2").onclick = () => calcUI.square();
}
