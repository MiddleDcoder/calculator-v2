/*  Main Calculator App */
const state = {
  firstOperand: null,
  secondOperand: null,
  operator: null,
  display() {
    return `${this.firstOperand || ""}${this.operator || ""}${this.secondOperand || "" }`;
  },
};

const display = document.querySelector(".display");
const keys = document.querySelector(".keys");
const allClear = document.querySelector(".all-clear");
const back = document.querySelector(".back");
const decimal = document.querySelector(".decimal");
const sign = document.querySelector(".sign");
const percentage = document.querySelector(".percentage");

// Math operations
const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  x: (a, b) => a * b,
  "÷": (a, b) => a / b,
};

function operate(operator, a, b) {
  if (operator in operations) {
    return operations[operator](a, b);
  }
  return null;
}

function updateDisplay() {
  display.value = state.display() || "0";
}