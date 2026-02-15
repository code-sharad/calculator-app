# Calculator App

A modern, dark-themed calculator application built with pure HTML, CSS, and JavaScript. No frameworks, no dependencies - just clean, functional code.

![Calculator Preview](./preview.png)

## Features

- **Basic Arithmetic**: Addition, subtraction, multiplication, division
- **Keyboard Support**: Use your keyboard for quick calculations
- **Modern Dark Theme**: Sleek, eye-friendly design
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Pure Functions**: Clean, testable calculation logic

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| 0-9 | Input numbers |
| . | Decimal point |
| +, -, *, / | Operations |
| Enter or = | Calculate result |
| Escape or C | Clear all |
| Backspace | Delete last digit |
| % | Percentage |

## Live Demo

Try it live: [GitHub Pages Demo](https://yourusername.github.io/calculator-app/)

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/calculator-app.git
   cd calculator-app
   ```

2. Open `index.html` in your browser:
   ```bash
   # Or simply double-click index.html
   open index.html
   ```

That's it! No build process, no dependencies to install.

## Project Structure

```
calculator-app/
├── index.html          # Application markup
├── style.css           # Styling and responsive design
├── app.js              # Calculator logic
├── README.md           # This file
├── LICENSE             # MIT License
└── preview.png         # Screenshot for README
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid, Flexbox, and custom properties
- **Vanilla JavaScript** - Pure JS with ES6+ features

## Calculation Functions

The calculator uses pure, testable functions for all operations:

```javascript
const calculate = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b === 0 ? 'Error' : a / b,
    percent: (a) => a / 100
};
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built as a learning project for practicing pure JavaScript
- Inspired by modern calculator designs
- Created with ♥️ using vanilla web technologies

---

Made with pure HTML, CSS, and JavaScript. No dependencies, no frameworks, just code.
