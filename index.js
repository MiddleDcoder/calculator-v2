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

function handleEqual() {
  if (state.firstOperand === null || state.secondOperand === null || !state.operator) return; // Incomplete operation
  const result = operate(state.operator, parseFloat(state.firstOperand), parseFloat(state.secondOperand));
  state.firstOperand = result;
  state.secondOperand = null;
  state.operator = null;
  updateDisplay();
}

function handleAllClear() {
  state.firstOperand = null;
  state.secondOperand = null;
  state.operator = null;
  updateDisplay();
}

function handleBack() {
   if (state.secondOperand !== null) {
    state.secondOperand = String(state.secondOperand).slice(0, -1);
     if (state.secondOperand === "") {
       state.secondOperand = null;
     }
   } else if (state.operator) {
     state.operator = null;
   } else if (state.firstOperand !== null) {
    state.firstOperand = String(state.firstOperand).slice(0, -1);
     if (state.firstOperand === "") {
       state.firstOperand = null;
     }
   }
   updateDisplay();
 }
 
function handleDecimal() {
  const operandKey = state.operator ? 'secondOperand' : 'firstOperand';
  if (!state[operandKey]) {
    state[operandKey] = "0.";
  } else if (!state[operandKey].includes(".")) {
    state[operandKey] += ".";
  }
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

// Event listeners for additional buttons
allClear.addEventListener("click", handleAllClear);

back.addEventListener("click", handleBack);

decimal.addEventListener("click", handleDecimal);