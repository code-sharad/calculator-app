/**
 * @fileoverview Pure calculation functions with comprehensive error handling
 * @module utils/calculations
 */

import type { CalculationResult, Operation } from '../types/calculator';

/**
 * Custom error class for calculation errors
 */
export class CalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CalculationError';
  }
}

/**
 * Validates if a value is a valid number
 * @param value - The value to validate
 * @returns True if the value is a valid number
 */
function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Validates calculation inputs
 * @param a - First operand
 * @param b - Second operand
 * @throws {CalculationError} If inputs are invalid
 */
function validateInputs(a: unknown, b?: unknown): void {
  if (!isValidNumber(a)) {
    throw new CalculationError(`Invalid first operand: ${String(a)}`);
  }
  if (b !== undefined && !isValidNumber(b)) {
    throw new CalculationError(`Invalid second operand: ${String(b)}`);
  }
}

/**
 * Adds two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 * @throws {CalculationError} If inputs are invalid
 */
export function add(a: number, b: number): number {
  validateInputs(a, b);
  const result = a + b;
  if (!isFinite(result)) {
    throw new CalculationError('Result overflow');
  }
  return result;
}

/**
 * Subtracts second number from first
 * @param a - First number
 * @param b - Second number
 * @returns The difference of a and b
 * @throws {CalculationError} If inputs are invalid
 */
export function subtract(a: number, b: number): number {
  validateInputs(a, b);
  const result = a - b;
  if (!isFinite(result)) {
    throw new CalculationError('Result overflow');
  }
  return result;
}

/**
 * Multiplies two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The product of a and b
 * @throws {CalculationError} If inputs are invalid
 */
export function multiply(a: number, b: number): number {
  validateInputs(a, b);
  const result = a * b;
  if (!isFinite(result)) {
    throw new CalculationError('Result overflow');
  }
  return result;
}

/**
 * Divides first number by second
 * @param a - Dividend
 * @param b - Divisor
 * @returns The quotient of a and b, or 'Error' if dividing by zero
 * @throws {CalculationError} If inputs are invalid
 */
export function divide(a: number, b: number): CalculationResult {
  validateInputs(a, b);
  if (b === 0) {
    return 'Error';
  }
  const result = a / b;
  if (!isFinite(result)) {
    throw new CalculationError('Result overflow');
  }
  return result;
}

/**
 * Calculates percentage of a number
 * @param a - The number to calculate percentage for
 * @returns The percentage (a / 100)
 * @throws {CalculationError} If input is invalid
 */
export function percent(a: number): number {
  validateInputs(a);
  const result = a / 100;
  if (!isFinite(result)) {
    throw new CalculationError('Result overflow');
  }
  return result;
}

/**
 * Performs calculation based on operation type
 * @param a - First operand
 * @param b - Second operand
 * @param operation - The operation to perform
 * @returns Calculation result
 * @throws {CalculationError} If operation is invalid or calculation fails
 */
export function calculate(a: number, b: number, operation: Operation): CalculationResult {
  if (operation === null) {
    throw new CalculationError('No operation specified');
  }

  switch (operation) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      throw new CalculationError(`Unknown operation: ${operation as string}`);
  }
}

/**
 * Formats the result for display
 * @param result - The calculation result
 * @param maxDecimalPlaces - Maximum number of decimal places
 * @returns Formatted string representation
 */
export function formatResult(result: CalculationResult, maxDecimalPlaces = 10): string {
  if (result === 'Error') {
    return 'Error';
  }

  // Handle very large or very small numbers
  if (Math.abs(result) > 1e10 || (Math.abs(result) < 1e-10 && result !== 0)) {
    return result.toExponential(6);
  }

  // Round to max decimal places and remove trailing zeros
  const rounded = parseFloat(result.toFixed(maxDecimalPlaces));
  return String(rounded);
}
