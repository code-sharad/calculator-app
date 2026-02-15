/**
 * @fileoverview Test suite for calculation functions
 */

import { describe, it, expect } from 'vitest';
import {
  add,
  subtract,
  multiply,
  divide,
  percent,
  calculate,
  formatResult,
  CalculationError,
} from '../utils/calculations';

describe('Calculation Functions', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('should add positive and negative numbers', () => {
      expect(add(5, -3)).toBe(2);
    });

    it('should add decimal numbers', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    it('should throw error for invalid inputs', () => {
      expect(() => add(NaN, 5)).toThrow(CalculationError);
      expect(() => add(5, NaN)).toThrow(CalculationError);
      expect(() => add(Infinity, 5)).toThrow(CalculationError);
    });
  });

  describe('subtract', () => {
    it('should subtract two positive numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });

    it('should subtract negative numbers', () => {
      expect(subtract(-2, -3)).toBe(1);
    });

    it('should handle decimal subtraction', () => {
      expect(subtract(1, 0.9)).toBeCloseTo(0.1);
    });

    it('should throw error for invalid inputs', () => {
      expect(() => subtract(NaN, 5)).toThrow(CalculationError);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers', () => {
      expect(multiply(4, 5)).toBe(20);
    });

    it('should handle multiplication by zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });

    it('should handle negative multiplication', () => {
      expect(multiply(-3, 4)).toBe(-12);
      expect(multiply(-3, -4)).toBe(12);
    });

    it('should throw error for invalid inputs', () => {
      expect(() => multiply(NaN, 5)).toThrow(CalculationError);
    });
  });

  describe('divide', () => {
    it('should divide two positive numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should return Error for division by zero', () => {
      expect(divide(10, 0)).toBe('Error');
    });

    it('should handle negative division', () => {
      expect(divide(-10, 2)).toBe(-5);
      expect(divide(-10, -2)).toBe(5);
    });

    it('should handle decimal division', () => {
      expect(divide(1, 3)).toBeCloseTo(0.333333, 5);
    });

    it('should throw error for invalid inputs', () => {
      expect(() => divide(NaN, 5)).toThrow(CalculationError);
    });
  });

  describe('percent', () => {
    it('should calculate percentage', () => {
      expect(percent(50)).toBe(0.5);
    });

    it('should handle zero', () => {
      expect(percent(0)).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(percent(-25)).toBe(-0.25);
    });

    it('should throw error for invalid inputs', () => {
      expect(() => percent(NaN)).toThrow(CalculationError);
    });
  });

  describe('calculate', () => {
    it('should perform addition', () => {
      expect(calculate(2, 3, '+')).toBe(5);
    });

    it('should perform subtraction', () => {
      expect(calculate(5, 3, '-')).toBe(2);
    });

    it('should perform multiplication', () => {
      expect(calculate(4, 5, '*')).toBe(20);
    });

    it('should perform division', () => {
      expect(calculate(10, 2, '/')).toBe(5);
    });

    it('should handle division by zero', () => {
      expect(calculate(10, 0, '/')).toBe('Error');
    });

    it('should throw error for null operation', () => {
      expect(() => calculate(5, 3, null)).toThrow(CalculationError);
    });

    it('should throw error for unknown operation', () => {
      expect(() => calculate(5, 3, 'unknown' as never)).toThrow(CalculationError);
    });
  });

  describe('formatResult', () => {
    it('should return Error string for Error type', () => {
      expect(formatResult('Error')).toBe('Error');
    });

    it('should format integers', () => {
      expect(formatResult(42)).toBe('42');
    });

    it('should format decimals', () => {
      expect(formatResult(3.14159)).toBe('3.14159');
    });

    it('should use exponential notation for large numbers', () => {
      expect(formatResult(1e15)).toMatch(/e\+/);
    });

    it('should use exponential notation for very small numbers', () => {
      expect(formatResult(1e-15)).toMatch(/e-/);
    });

    it('should respect maxDecimalPlaces', () => {
      expect(formatResult(3.14159265359, 2)).toBe('3.14');
    });
  });
});
