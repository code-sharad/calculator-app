/**
 * @fileoverview Calculator class with state management and error handling
 * @module utils/calculator
 */

import type { CalculatorState, CalculatorConfig, Operation } from '../types/calculator';
import { calculate, formatResult, percent, CalculationError } from './calculations';

/**
 * Default calculator configuration
 */
const DEFAULT_CONFIG: CalculatorConfig = {
  maxDecimalPlaces: 10,
  maxDigits: 15,
};

/**
 * Calculator class for managing calculator state and operations
 */
export class Calculator {
  private state: CalculatorState;
  private config: CalculatorConfig;

  constructor(config: Partial<CalculatorConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.state = this.getInitialState();
  }

  /**
   * Gets the initial state of the calculator
   */
  private getInitialState(): CalculatorState {
    return {
      currentOperand: '0',
      previousOperand: '',
      operation: null,
      shouldResetScreen: false,
    };
  }

  /**
   * Gets the current state
   */
  getState(): Readonly<CalculatorState> {
    return { ...this.state };
  }

  /**
   * Appends a number or decimal point to current operand
   * @param number - The number or decimal point to append
   */
  appendNumber(number: string): void {
    // Reset screen if needed
    if (this.state.shouldResetScreen) {
      this.state.currentOperand = '';
      this.state.shouldResetScreen = false;
    }

    // Prevent multiple decimals
    if (number === '.' && this.state.currentOperand.includes('.')) {
      return;
    }

    // Prevent leading zeros
    if (this.state.currentOperand === '0' && number !== '.') {
      this.state.currentOperand = number;
      return;
    }

    // Check max digits limit
    if (this.state.currentOperand.replace('.', '').length >= this.config.maxDigits) {
      return;
    }

    this.state.currentOperand += number;
  }

  /**
   * Chooses an operation
   * @param operation - The operation to perform
   */
  chooseOperation(operation: Operation): void {
    if (this.state.currentOperand === '' || this.state.currentOperand === '0') {
      return;
    }

    // Compute if there's already an operation pending
    if (this.state.previousOperand !== '' && this.state.operation !== null) {
      this.compute();
    }

    this.state.operation = operation;
    this.state.previousOperand = this.state.currentOperand;
    this.state.shouldResetScreen = true;
  }

  /**
   * Performs the calculation
   */
  compute(): void {
    if (this.state.operation === null || this.state.shouldResetScreen) {
      return;
    }

    const prev = parseFloat(this.state.previousOperand);
    const current = parseFloat(this.state.currentOperand);

    if (isNaN(prev) || isNaN(current)) {
      this.state.currentOperand = 'Error';
      this.resetOperation();
      return;
    }

    try {
      const result = calculate(prev, current, this.state.operation);
      this.state.currentOperand = formatResult(result, this.config.maxDecimalPlaces);
      this.resetOperation();
    } catch (error) {
      if (error instanceof CalculationError) {
        this.state.currentOperand = 'Error';
        this.resetOperation();
      } else {
        throw error;
      }
    }
  }

  /**
   * Resets the operation state
   */
  private resetOperation(): void {
    this.state.operation = null;
    this.state.previousOperand = '';
    this.state.shouldResetScreen = true;
  }

  /**
   * Clears the calculator state
   */
  clear(): void {
    this.state = this.getInitialState();
  }

  /**
   * Deletes the last digit
   */
  deleteLast(): void {
    // Handle Error state
    if (this.state.currentOperand === 'Error') {
      this.state.currentOperand = '0';
      return;
    }

    if (this.state.shouldResetScreen) {
      return;
    }

    if (
      this.state.currentOperand.length === 1 ||
      (this.state.currentOperand.length === 2 && this.state.currentOperand[0] === '-')
    ) {
      this.state.currentOperand = '0';
    } else {
      this.state.currentOperand = this.state.currentOperand.slice(0, -1);
    }
  }

  /**
   * Applies percentage to current operand
   */
  applyPercent(): void {
    if (this.state.currentOperand === 'Error') {
      return;
    }

    const current = parseFloat(this.state.currentOperand);

    if (isNaN(current)) {
      return;
    }

    try {
      const result = percent(current);
      this.state.currentOperand = formatResult(result, this.config.maxDecimalPlaces);
    } catch (error) {
      if (error instanceof CalculationError) {
        this.state.currentOperand = 'Error';
      } else {
        throw error;
      }
    }
  }

  /**
   * Gets the display symbol for an operation
   * @param operation - The operation
   * @returns Display symbol
   */
  static getOperationSymbol(operation: Operation): string {
    const symbols: Record<string, string> = {
      '+': '+',
      '-': '−',
      '*': '×',
      '/': '÷',
    };
    return operation ? symbols[operation] || operation : '';
  }
}
