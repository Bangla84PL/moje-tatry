# Contributing Guide

**Project:** moje-tatry

Thank you for considering contributing to this project!

## Getting Started

### Prerequisites
- Node.js 18+
- [Other requirements]
- Git

### Setup Development Environment

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/moje-tatry.git
cd moje-tatry

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env
# Edit .env with your configuration

# 4. Run development server
npm run dev

# 5. Run tests
npm test
```

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Description:** Clear description of the bug
- **Steps to reproduce:** Detailed steps
- **Expected behavior:** What should happen
- **Actual behavior:** What actually happens
- **Environment:** OS, browser, Node version
- **Screenshots:** If applicable

### Suggesting Features

Feature requests are welcome! Include:

- **Use case:** Why is this feature needed?
- **Proposed solution:** How should it work?
- **Alternatives:** Other approaches considered

### Pull Request Process

1. **Create a branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes:**
   - Follow code conventions (see docs/conventions.md)
   - Add tests
   - Update documentation

3. **Commit your changes:**
   ```bash
   git commit -m "feat(scope): description"
   ```
   Follow [Conventional Commits](https://www.conventionalcommits.org/)

4. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request:**
   - Fill out the PR template
   - Link related issues
   - Add screenshots for UI changes
   - Ensure CI passes

### Code Review

- Be responsive to feedback
- Make requested changes
- Keep PRs focused and small
- One feature/fix per PR

## Development Workflow

### Branch Naming
- `feature/feature-name` - New features
- `bugfix/bug-name` - Bug fixes
- `docs/doc-name` - Documentation
- `refactor/refactor-name` - Code refactoring

### Commit Messages

Format: `type(scope): message`

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code restructuring
- `test` - Adding tests
- `chore` - Maintenance

**Examples:**
```
feat(auth): add OAuth login
fix(api): handle null user in endpoint
docs(readme): update setup instructions
```

### Testing

- Write tests for new features
- Ensure all tests pass: `npm test`
- Maintain >80% code coverage
- Test edge cases

### Code Style

- Follow existing patterns
- Run linter: `npm run lint`
- Use Prettier: `npm run format`
- See docs/conventions.md for details

## Project Structure

```
src/
├── components/     # Reusable UI components
├── features/       # Feature-specific modules
├── lib/            # Shared utilities
├── hooks/          # Custom React hooks
└── utils/          # Helper functions
```

See docs/architecture.md for detailed structure.

## Communication

- **Questions:** Open a GitHub Discussion
- **Bugs:** Create an issue
- **Features:** Create an issue with [Feature] prefix
- **Security:** Email [security@example.com]

## License

By contributing, you agree that your contributions will be licensed under the project's license.

---

Thank you for contributing! 🎉
