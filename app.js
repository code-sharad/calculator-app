// Pure calculation functions
const calculate = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b === 0 ? 'Error' : a / b,
    percent: (a) => a / 100
};

// Calculator state
const state = {
    currentOperand: '0',
    previousOperand: '',
    operation: null,
    shouldResetScreen: false
};

// DOM elements
const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

// Update display
function updateDisplay() {
    currentOperandElement.textContent = state.currentOperand;
    if (state.operation != null) {
        previousOperandElement.textContent = `${state.previousOperand} ${getOperationSymbol(state.operation)}`;
    } else {
        previousOperandElement.textContent = state.previousOperand;
    }
}

// Get operation symbol for display
function getOperationSymbol(operation) {
    const symbols = {
        '+': '+',
        '-': '−',
        '*': '×',
        '/': '÷'
    };
    return symbols[operation] || operation;
}

// Append number
function appendNumber(number) {
    if (state.shouldResetScreen) {
        state.currentOperand = '';
        state.shouldResetScreen = false;
    }
    if (number === '.' && state.currentOperand.includes('.')) return;
    if (state.currentOperand === '0' && number !== '.') {
        state.currentOperand = number;
    } else {
        state.currentOperand += number;
    }
}

// Choose operation
function chooseOperation(operation) {
    if (state.currentOperand === '') return;
    if (state.previousOperand !== '') {
        compute();
    }
    state.operation = operation;
    state.previousOperand = state.currentOperand;
    state.shouldResetScreen = true;
}

// Compute result
function compute() {
    if (state.operation == null || state.shouldResetScreen) return;
    
    const prev = parseFloat(state.previousOperand);
    const current = parseFloat(state.currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    let result;
    switch (state.operation) {
        case '+':
            result = calculate.add(prev, current);
            break;
        case '-':
            result = calculate.subtract(prev, current);
            break;
        case '*':
            result = calculate.multiply(prev, current);
            break;
        case '/':
            result = calculate.divide(prev, current);
            break;
        default:
            return;
    }
    
    state.currentOperand = String(result);
    state.operation = null;
    state.previousOperand = '';
}

// Clear all
function clear() {
    state.currentOperand = '0';
    state.previousOperand = '';
    state.operation = null;
}

// Delete last digit
function deleteLast() {
    if (state.shouldResetScreen) return;
    if (state.currentOperand.length === 1 || (state.currentOperand.length === 2 && state.currentOperand[0] === '-')) {
        state.currentOperand = '0';
    } else {
        state.currentOperand = state.currentOperand.slice(0, -1);
    }
}

// Apply percentage
function applyPercent() {
    const current = parseFloat(state.currentOperand);
    if (isNaN(current)) return;
    state.currentOperand = String(calculate.percent(current));
}

// Event listeners
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const value = button.dataset.value;
        
        if (action === 'clear') {
            clear();
        } else if (action === 'delete') {
            deleteLast();
        } else if (action === 'percent') {
            applyPercent();
        } else if (action === 'operator') {
            chooseOperation(value);
        } else if (action === 'calculate') {
            compute();
        } else {
            appendNumber(value);
        }
        
        updateDisplay();
    });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
        appendNumber(e.key);
        updateDisplay();
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        chooseOperation(e.key);
        updateDisplay();
    }
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        compute();
        updateDisplay();
    }
    if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clear();
        updateDisplay();
    }
    if (e.key === 'Backspace') {
        deleteLast();
        updateDisplay();
    }
    if (e.key === '%') {
        applyPercent();
        updateDisplay();
    }
});

// Initialize display
updateDisplay();
