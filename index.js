/*  Main Calculator App */
const state = {
  firstOperand: null,
  secondOperand: null,
  operator: null,
  display() {
    return `${this.firstOperand || ""}${this.operator || ""}${
      this.secondOperand || ""
    }`;
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
    const result = operate(
      state.operator,
      parseFloat(state.firstOperand),
      parseFloat(state.secondOperand)
    );
    state.firstOperand = result;
    state.secondOperand = null;
  }
  state.operator = value;
  updateDisplay();
}

function handleEqual() {
  if (
    state.firstOperand === null ||
    state.secondOperand === null ||
    !state.operator
  )
    return; // Incomplete operation
  const result = operate(
    state.operator,
    parseFloat(state.firstOperand),
    parseFloat(state.secondOperand)
  );
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

/**
 * Handles the backspace action for a calculator state.
 * Removes the last character from the current operand or operator,
 * and updates the display accordingly.
 */
function handleBack() {
  const removeLastChar = (val) => {
    const str = String(val).slice(0, -1);
    return str === "" ? null : str;
  };

  if (state.secondOperand !== null) {
    state.secondOperand = removeLastChar(state.secondOperand);
  } else if (state.operator) {
    state.operator = null;
  } else if (state.firstOperand !== null) {
    state.firstOperand = removeLastChar(state.firstOperand);
  }
  updateDisplay();
}

function handleDecimal() {
  const operandKey = state.operator ? "secondOperand" : "firstOperand";
  if (!state[operandKey]) {
    state[operandKey] = "0.";
  } else if (!state[operandKey].includes(".")) {
    state[operandKey] += ".";
  }
  updateDisplay();
}

function toggleSign(value) {
  const numValue = parseFloat(value);
  return Number.isFinite(numValue) ? String(numValue * -1) : value;
}

function handleSign() {
  const operandKey = state.operator ? "secondOperand" : "firstOperand";
  if (state[operandKey] !== null) {
    state[operandKey] = toggleSign(state[operandKey]);
    updateDisplay();
  }
}

// Event listeners for number buttons
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

sign.addEventListener("click", handleSign);
