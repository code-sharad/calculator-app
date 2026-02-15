# Calculator App

[![CI/CD](https://github.com/yourusername/calculator-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/yourusername/calculator-app/actions/workflows/deploy.yml)
[![Coverage](https://codecov.io/gh/yourusername/calculator-app/branch/main/graph/badge.svg)](https://codecov.io/gh/yourusername/calculator-app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)

A production-grade calculator application built with TypeScript, featuring comprehensive testing, PWA support, and CI/CD automation.

## Features

- **TypeScript**: Full type safety with strict configuration
- **Comprehensive Testing**: Unit tests with Vitest and coverage reporting
- **Code Quality**: ESLint + Prettier for consistent code style
- **PWA Support**: Installable app with offline functionality
- **Accessibility**: WCAG 2.1 compliant with ARIA labels and keyboard navigation
- **CI/CD**: Automated testing, linting, and deployment via GitHub Actions
- **Responsive Design**: Works on all devices from mobile to desktop

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/calculator-app.git
cd calculator-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run preview      # Preview production build locally

# Building
npm run build        # Build for production
npm run typecheck    # Run TypeScript type checking

# Testing
npm run test         # Run tests in watch mode
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage report

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Project Structure

```
calculator-app/
├── .github/
│   └── workflows/
│       └── deploy.yml       # CI/CD pipeline
├── public/
│   ├── favicon.svg          # App icon
│   ├── manifest.json        # PWA manifest
│   └── apple-touch-icon.png # iOS icon
├── src/
│   ├── __tests__/
│   │   ├── calculations.test.ts  # Calculation function tests
│   │   └── calculator.test.ts    # Calculator class tests
│   ├── types/
│   │   └── calculator.ts         # TypeScript interfaces
│   ├── utils/
│   │   ├── calculations.ts       # Pure calculation functions
│   │   └── calculator.ts         # Calculator class
│   ├── index.html                # App entry HTML
│   ├── main.ts                   # App entry point
│   └── style.css                 # App styles
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── .eslintrc.cjs
├── .prettierrc
└── README.md
```

## Architecture

### Pure Functions

All calculation logic is implemented as pure functions with comprehensive error handling:

```typescript
// src/utils/calculations.ts
export function add(a: number, b: number): number {
  validateInputs(a, b);
  const result = a + b;
  if (!isFinite(result)) {
    throw new CalculationError('Result overflow');
  }
  return result;
}
```

### State Management

The `Calculator` class encapsulates all state management:

```typescript
// src/utils/calculator.ts
export class Calculator {
  private state: CalculatorState;
  
  appendNumber(number: string): void
  chooseOperation(operation: Operation): void
  compute(): void
  clear(): void
  deleteLast(): void
  applyPercent(): void
}
```

### Error Handling

Custom error classes with meaningful messages:

```typescript
export class CalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CalculationError';
  }
}
```

## Testing

### Test Coverage

The project maintains 100% coverage for calculation functions:

```bash
npm run test:coverage
```

### Test Examples

```typescript
describe('Calculation Functions', () => {
  it('should add two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should handle division by zero', () => {
    expect(divide(10, 0)).toBe('Error');
  });

  it('should throw error for invalid inputs', () => {
    expect(() => add(NaN, 5)).toThrow(CalculationError);
  });
});
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| 0-9 | Input numbers |
| . | Decimal point |
| +, -, *, / | Operations |
| Enter, = | Calculate result |
| Escape, C | Clear all |
| Backspace | Delete last digit |
| % | Percentage |

## Accessibility

- Full keyboard navigation support
- ARIA labels for screen readers
- Focus indicators for keyboard users
- Color contrast meets WCAG 2.1 AA standards
- Reduced motion support
- High contrast mode support

## PWA Features

- Installable on mobile and desktop
- Works offline
- Optimized icons for all platforms
- Theme color support

## Deployment

### GitHub Pages (Automatic)

The app automatically deploys to GitHub Pages on every push to main:

1. Push to `main` branch
2. GitHub Actions runs tests and linting
3. If tests pass, builds and deploys
4. Access at: `https://yourusername.github.io/calculator-app/`

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy dist folder to your hosting provider
```

## Technologies Used

- **TypeScript 5.3** - Type-safe JavaScript
- **Vite 5.0** - Next generation frontend tooling
- **Vitest** - Blazing fast unit testing
- **ESLint + Prettier** - Code linting and formatting
- **GitHub Actions** - CI/CD automation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow existing TypeScript types
- Write tests for new features
- Maintain 100% coverage for calculation functions
- Run `npm run lint` and `npm run format` before committing

## Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built as a demonstration of production-grade vanilla TypeScript
- Design inspired by modern calculator apps
- Icons created with SVG

---

Made with TypeScript, Vite, and ♥️
