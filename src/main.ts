/**
 * @fileoverview Main application entry point
 * @module main
 */

import type { Operation } from './types/calculator';
import { Calculator } from './utils/calculator';

/**
 * DOM element references
 */
const elements = {
  currentOperand: document.getElementById('current-operand') as HTMLDivElement,
  previousOperand: document.getElementById('previous-operand') as HTMLDivElement,
  buttons: document.querySelectorAll<HTMLButtonElement>('.btn'),
} as const;

/**
 * Keyboard event mappings
 */
const KEYBOARD_MAPPINGS: Record<string, () => void> = {
  '0': () => calculator.appendNumber('0'),
  '1': () => calculator.appendNumber('1'),
  '2': () => calculator.appendNumber('2'),
  '3': () => calculator.appendNumber('3'),
  '4': () => calculator.appendNumber('4'),
  '5': () => calculator.appendNumber('5'),
  '6': () => calculator.appendNumber('6'),
  '7': () => calculator.appendNumber('7'),
  '8': () => calculator.appendNumber('8'),
  '9': () => calculator.appendNumber('9'),
  '.': () => calculator.appendNumber('.'),
  '+': () => calculator.chooseOperation('+'),
  '-': () => calculator.chooseOperation('-'),
  '*': () => calculator.chooseOperation('*'),
  '/': () => calculator.chooseOperation('/'),
  Enter: () => calculator.compute(),
  '=': () => calculator.compute(),
  Escape: () => calculator.clear(),
  c: () => calculator.clear(),
  C: () => calculator.clear(),
  Backspace: () => calculator.deleteLast(),
  '%': () => calculator.applyPercent(),
};

/**
 * Calculator instance
 */
const calculator = new Calculator();

/**
 * Updates the display with current state
 */
function updateDisplay(): void {
  const state = calculator.getState();

  // Update current operand
  elements.currentOperand.textContent = state.currentOperand;

  // Update previous operand with operation symbol
  if (state.operation !== null) {
    elements.previousOperand.textContent = `${state.previousOperand} ${Calculator.getOperationSymbol(state.operation)}`;
  } else {
    elements.previousOperand.textContent = state.previousOperand;
  }

  // Update aria-live region for screen readers
  elements.currentOperand.setAttribute('aria-label', `Current value: ${state.currentOperand}`);
}

/**
 * Handles button click events
 * @param button - The clicked button element
 */
function handleButtonClick(button: HTMLButtonElement): void {
  const action = button.dataset.action;
  const value = button.dataset.value as string;

  switch (action) {
    case 'clear':
      calculator.clear();
      break;
    case 'delete':
      calculator.deleteLast();
      break;
    case 'percent':
      calculator.applyPercent();
      break;
    case 'operator':
      calculator.chooseOperation(value as Operation);
      break;
    case 'calculate':
      calculator.compute();
      break;
    default:
      if (value) {
        calculator.appendNumber(value);
      }
  }

  updateDisplay();
}

/**
 * Handles keyboard events
 * @param event - Keyboard event
 */
function handleKeyboard(event: KeyboardEvent): void {
  const handler = KEYBOARD_MAPPINGS[event.key];

  if (handler) {
    event.preventDefault();
    handler();
    updateDisplay();

    // Visual feedback for keyboard presses
    highlightButton(event.key);
  }
}

/**
 * Highlights the corresponding button for keyboard presses
 * @param key - The pressed key
 */
function highlightButton(key: string): void {
  const button = Array.from(elements.buttons).find((btn: HTMLButtonElement) => {
    const btnValue = btn.dataset.value;
    if (key >= '0' && key <= '9' && btnValue === key) {
      return true;
    }
    if (['+', '-', '*', '/'].includes(key) && btnValue === key) {
      return true;
    }
    return false;
  });

  if (button) {
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 100);
  }
}

/**
 * Sets up event listeners
 */
function setupEventListeners(): void {
  // Button click events
  elements.buttons.forEach((button) => {
    button.addEventListener('click', () => handleButtonClick(button));
  });

  // Keyboard events
  document.addEventListener('keydown', handleKeyboard);

  // Prevent double-tap zoom on mobile
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  });
}

/**
 * Initializes the application
 */
function init(): void {
  setupEventListeners();
  updateDisplay();
  // eslint-disable-next-line no-console
  console.log('Calculator initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
