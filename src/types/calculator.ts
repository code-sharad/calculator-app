/**
 * Calculator operation types
 */
export type Operation = '+' | '-' | '*' | '/' | null;

/**
 * Calculator action types
 */
export type CalculatorAction =
  | { type: 'APPEND_NUMBER'; payload: string }
  | { type: 'CHOOSE_OPERATION'; payload: Operation }
  | { type: 'CALCULATE' }
  | { type: 'CLEAR' }
  | { type: 'DELETE' }
  | { type: 'PERCENT' };

/**
 * Calculator state interface
 */
export interface CalculatorState {
  currentOperand: string;
  previousOperand: string;
  operation: Operation;
  shouldResetScreen: boolean;
}

/**
 * Calculation result type
 */
export type CalculationResult = number | 'Error';

/**
 * Calculator configuration
 */
export interface CalculatorConfig {
  maxDecimalPlaces: number;
  maxDigits: number;
}

/**
 * Keyboard mapping
 */
export interface KeyboardMapping {
  [key: string]: CalculatorAction;
}
