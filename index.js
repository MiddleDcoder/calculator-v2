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

function handleNumber(num) {
  if (state.operator) {
    if (num === "0" && state.secondOperand === "0") return;
    state.secondOperand = state.secondOperand ? state.secondOperand + num : num;
  } else {
    if (num === "0" && state.firstOperand === "0") return;
    state.firstOperand = state.firstOperand ? state.firstOperand + num : num;
  }
  updateDisplay();
}

function handleOperator(value) {
  if (state.firstOperand === null) return; // No first operand yet
  if (state.secondOperand !== null) {
    const result = operate(state.operator, parseFloat(state.firstOperand), parseFloat(state.secondOperand));
    state.firstOperand = result;
    state.secondOperand = null;
  }
  state.operator = value;
  updateDisplay();
}

keys.addEventListener("click", (e) => {
  const { target } = e;
  if (!target.matches("button")) return;
  if (target.classList.contains("num")) {
    handleNumber(target.value);
  } else if (target.classList.contains("operator")) {
    handleOperator(target.value);
  } else if (target.classList.contains("equal")) {
    handleEqual();
  }
});
