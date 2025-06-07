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

const history = {
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
const historyDisplay = document.querySelector(".history");

// Math operations
const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  x: (a, b) => a * b,
  "÷": (a, b) => a / b,
};

function operate(operator, a, b) {
  return operations[operator] ? operations[operator](a, b) : null;
}

function updateDisplay() {
  display.value = state.display() || "0";
}

function updateHistory() {
  historyDisplay.textContent = history.display() || "";
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
    saveToHistory();

    // Filter for percentage
    convertPercentageValues();
    // If there's an existing operator, calculate the result
    const result = operate(
      state.operator,
      parseFloat(state.firstOperand),
      parseFloat(state.secondOperand)
    );
    state.firstOperand = hasMoreThanTwoDecimals(result)
      ? result.toFixed(2)
      : result;
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

  // Save the current state to history
  saveToHistory();

  // Filter for percentage
  convertPercentageValues();

  // Perform the operation
  const result = operate(
    state.operator,
    parseFloat(state.firstOperand),
    parseFloat(state.secondOperand)
  );
  state.firstOperand = hasMoreThanTwoDecimals(result)
    ? result.toFixed(2)
    : result;
  state.secondOperand = null;
  state.operator = null;
  updateDisplay();
}

function convertPercentageValues() {
  [state.firstOperand, state.secondOperand] = filterPercentage(
    String(state.firstOperand),
    String(state.secondOperand)
  );
}

function hasMoreThanTwoDecimals(value) {
  const [, decimals = ""] = String(value).split(".");
  return decimals.length > 2;
}

function handleAllClear() {
  state.firstOperand = null;
  state.secondOperand = null;
  state.operator = null;

  // Clear history
  clearHistory();

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

function addPercentage() {
  const operandKey = state.operator ? "secondOperand" : "firstOperand";
  if (state[operandKey] !== null && !state[operandKey].includes("%")) {
    state[operandKey] += "%";
    updateDisplay();
  }
}
function toPercentage(value) {
  const isSecondOperand = value === state.secondOperand;
  const firstOperandHasNoPercentage = !state.firstOperand.includes("%");

  if (isSecondOperand && firstOperandHasNoPercentage) {
    return (
      (parseFloat(value) / 100) *
      parseFloat(state.firstOperand)
    ).toString();
  }
  return (parseFloat(value) / 100).toString();
}

function filterPercentage(a, b) {
  const aIsPercentage = a.includes("%");
  const bIsPercentage = b.includes("%");

  if (aIsPercentage) a = toPercentage(a);
  if (bIsPercentage) b = toPercentage(b);

  return [a, b];
}

function saveToHistory() {
  // Save the current state to history
  history.firstOperand = state.firstOperand;
  history.secondOperand = state.secondOperand;
  history.operator = state.operator;
  updateHistory();
}

function loadHistory() {
  if (history.firstOperand === null) return;
  state.firstOperand = history.firstOperand;
  state.secondOperand = history.secondOperand;
  state.operator = history.operator;
  updateDisplay();
  clearHistory();
}

function clearHistory() {
  history.firstOperand = null;
  history.secondOperand = null;
  history.operator = null;
  updateHistory();
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

percentage.addEventListener("click", addPercentage);

historyDisplay.addEventListener("click", loadHistory);
