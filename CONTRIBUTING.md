# Contributing to Todoist Clone

Thank you for your interest in contributing to this project! This guide will help you get started.

## Getting Started

### Prerequisites
- Node.js (v12 or higher recommended)
- Yarn or npm package manager
- Git

### Setup

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/todoist.git
   cd todoist
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Create a `.env` file in the root directory with your Firebase configuration (see `.env` for required variables).

4. Start the development server:
   ```bash
   yarn start
   # or
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- **`yarn start`** - Runs the app in development mode with hot reloading
- **`yarn build`** - Creates an optimized production build
- **`yarn test`** - Runs the test suite in watch mode
- **`yarn eject`** - Ejects from Create React App (one-way operation, use with caution)

## Running Tests

This project uses React Testing Library for testing. Run tests with:

```bash
yarn test
```

### Coverage Requirements

The project maintains high test coverage standards:
- **90%** branch coverage
- **90%** function coverage
- **90%** line coverage
- **90%** statement coverage

Please ensure your contributions include appropriate tests and maintain these coverage thresholds.

## Code Quality

This project uses ESLint and Prettier for code quality and formatting:
- ESLint configuration extends Airbnb style guide
- Prettier is configured for consistent formatting
- Code is automatically linted during development

Make sure your code passes linting before submitting a PR.

## Pull Request Guidelines

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the existing code style and patterns.

3. **Write or update tests** for your changes.

4. **Run tests** to ensure everything passes:
   ```bash
   yarn test
   ```

5. **Commit your changes** with clear, descriptive commit messages.

6. **Push to your fork** and submit a pull request to the `main` branch.

7. **Describe your changes** in the PR description:
   - What problem does it solve?
   - How does it work?
   - Any breaking changes?
   - Screenshots (if UI changes)

## Priority Areas

The project creator has specifically mentioned that **accessibility improvements** are highly encouraged! Other contributions are also welcome, including:
- Bug fixes
- New features
- Documentation improvements
- Test coverage improvements
- Performance optimizations

## Questions?

Feel free to open an issue for any questions or discussions about contributing to this project.

Thank you for contributing! 🎉
