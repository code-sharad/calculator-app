/**
 * @fileoverview Test suite for Calculator class
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from '../utils/calculator';

describe('Calculator Class', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('Initialization', () => {
    it('should initialize with default state', () => {
      const state = calculator.getState();
      expect(state.currentOperand).toBe('0');
      expect(state.previousOperand).toBe('');
      expect(state.operation).toBeNull();
      expect(state.shouldResetScreen).toBe(false);
    });

    it('should accept custom configuration', () => {
      const customCalc = new Calculator({ maxDigits: 5 });
      // Test max digits by appending more than 5 digits
      customCalc.appendNumber('1');
      customCalc.appendNumber('2');
      customCalc.appendNumber('3');
      customCalc.appendNumber('4');
      customCalc.appendNumber('5');
      customCalc.appendNumber('6');
      expect(customCalc.getState().currentOperand).toBe('12345');
    });
  });

  describe('appendNumber', () => {
    it('should append numbers to current operand', () => {
      calculator.appendNumber('1');
      expect(calculator.getState().currentOperand).toBe('1');
      calculator.appendNumber('2');
      expect(calculator.getState().currentOperand).toBe('12');
    });

    it('should handle zero correctly', () => {
      calculator.appendNumber('5');
      expect(calculator.getState().currentOperand).toBe('5');
    });

    it('should prevent multiple decimal points', () => {
      calculator.appendNumber('1');
      calculator.appendNumber('.');
      calculator.appendNumber('2');
      calculator.appendNumber('.');
      expect(calculator.getState().currentOperand).toBe('1.2');
    });

    it('should reset screen when shouldResetScreen is true', () => {
      calculator.appendNumber('5');
      calculator.chooseOperation('+');
      calculator.appendNumber('3');
      expect(calculator.getState().currentOperand).toBe('3');
    });
  });

  describe('chooseOperation', () => {
    it('should set operation and previous operand', () => {
      calculator.appendNumber('5');
      calculator.chooseOperation('+');
      const state = calculator.getState();
      expect(state.operation).toBe('+');
      expect(state.previousOperand).toBe('5');
    });

    it('should compute if operation already exists', () => {
      calculator.appendNumber('5');
      calculator.chooseOperation('+');
      calculator.appendNumber('3');
      calculator.chooseOperation('-');
      const state = calculator.getState();
      expect(state.currentOperand).toBe('8');
      expect(state.operation).toBe('-');
    });

    it('should not choose operation with empty current operand', () => {
      calculator.chooseOperation('+');
      expect(calculator.getState().operation).toBeNull();
    });
  });

  describe('compute', () => {
    it('should perform addition', () => {
      calculator.appendNumber('5');
      calculator.chooseOperation('+');
      calculator.appendNumber('3');
      calculator.compute();
      expect(calculator.getState().currentOperand).toBe('8');
    });

    it('should perform subtraction', () => {
      calculator.appendNumber('10');
      calculator.chooseOperation('-');
      calculator.appendNumber('3');
      calculator.compute();
      expect(calculator.getState().currentOperand).toBe('7');
    });

    it('should perform multiplication', () => {
      calculator.appendNumber('4');
      calculator.chooseOperation('*');
      calculator.appendNumber('5');
      calculator.compute();
      expect(calculator.getState().currentOperand).toBe('20');
    });

    it('should perform division', () => {
      calculator.appendNumber('10');
      calculator.chooseOperation('/');
      calculator.appendNumber('2');
      calculator.compute();
      expect(calculator.getState().currentOperand).toBe('5');
    });

    it('should handle division by zero', () => {
      calculator.appendNumber('10');
      calculator.chooseOperation('/');
      calculator.appendNumber('0');
      calculator.compute();
      expect(calculator.getState().currentOperand).toBe('Error');
    });

    it('should not compute without operation', () => {
      calculator.appendNumber('5');
      calculator.compute();
      expect(calculator.getState().currentOperand).toBe('5');
    });
  });

  describe('clear', () => {
    it('should reset to initial state', () => {
      calculator.appendNumber('5');
      calculator.chooseOperation('+');
      calculator.clear();
      const state = calculator.getState();
      expect(state.currentOperand).toBe('0');
      expect(state.previousOperand).toBe('');
      expect(state.operation).toBeNull();
    });
  });

  describe('deleteLast', () => {
    it('should delete last digit', () => {
      calculator.appendNumber('1');
      calculator.appendNumber('2');
      calculator.appendNumber('3');
      calculator.deleteLast();
      expect(calculator.getState().currentOperand).toBe('12');
    });

    it('should reset to zero when deleting last digit', () => {
      calculator.appendNumber('5');
      calculator.deleteLast();
      expect(calculator.getState().currentOperand).toBe('0');
    });

    it('should handle negative numbers', () => {
      calculator.appendNumber('-5');
      calculator.deleteLast();
      expect(calculator.getState().currentOperand).toBe('0');
    });

    it('should reset Error to zero', () => {
      calculator.appendNumber('10');
      calculator.chooseOperation('/');
      calculator.appendNumber('0');
      calculator.compute();
      calculator.deleteLast();
      expect(calculator.getState().currentOperand).toBe('0');
    });
  });

  describe('applyPercent', () => {
    it('should apply percentage', () => {
      calculator.appendNumber('50');
      calculator.applyPercent();
      expect(calculator.getState().currentOperand).toBe('0.5');
    });

    it('should handle zero', () => {
      calculator.appendNumber('0');
      calculator.applyPercent();
      expect(calculator.getState().currentOperand).toBe('0');
    });

    it('should not modify Error state', () => {
      calculator.appendNumber('10');
      calculator.chooseOperation('/');
      calculator.appendNumber('0');
      calculator.compute();
      calculator.applyPercent();
      expect(calculator.getState().currentOperand).toBe('Error');
    });
  });

  describe('getOperationSymbol', () => {
    it('should return correct symbols', () => {
      expect(Calculator.getOperationSymbol('+')).toBe('+');
      expect(Calculator.getOperationSymbol('-')).toBe('−');
      expect(Calculator.getOperationSymbol('*')).toBe('×');
      expect(Calculator.getOperationSymbol('/')).toBe('÷');
      expect(Calculator.getOperationSymbol(null)).toBe('');
    });
  });
});
