# Testing Strategy

**Project:** Tatra Trails Blog (moje-tatry)
**Created:** 2025-11-11
**Last Updated:** 2025-11-11
**Architecture:** Headless WordPress + Next.js

## Overview

Tatra Trails employs a comprehensive testing strategy tailored to its headless WordPress + Next.js architecture. The testing approach balances thorough coverage with practical maintainability, focusing on critical user paths, API integrations, and component reliability. This document defines testing philosophy, tools, coverage goals, and best practices.

**Testing Philosophy:**
- Test behavior, not implementation
- Prioritize tests that catch real user-facing bugs
- Fast unit tests, selective integration tests, critical E2E tests
- Automate testing in CI/CD pipeline
- Maintain 80%+ code coverage

---

## Test Pyramid

```
       /\
      /E2E\         Few (5-10 tests)
     /------\       Critical user journeys
    / Integ \      Moderate (20-30 tests)
   /----------\    API + External services
  /   Unit     \   Many (100+ tests)
 /--------------\  Utilities, logic, components
```

**Distribution:**
- **Unit Tests**: 70% of test suite (fast, isolated, many)
- **Integration Tests**: 20% of test suite (API, database, external services)
- **E2E Tests**: 10% of test suite (critical paths only)

---

## Testing Tools

### Frontend (Next.js)

**Unit & Component Testing:**
- **Vitest** (or **Jest**) - Test runner, fast, modern
  - Rationale: Vite-native, faster than Jest, great DX
  - Alternative: Jest (industry standard, mature ecosystem)
- **React Testing Library** - Component testing
  - Rationale: Tests behavior from user perspective, encouraged by React team
- **@testing-library/user-event** - Simulate user interactions
  - Rationale: More realistic user behavior than fireEvent

**E2E Testing:**
- **Playwright** (recommended) OR **Cypress** - Browser automation
  - Rationale: Playwright has better parallel execution, cross-browser support
  - Alternative: Cypress (easier setup, great DX)

**Mocking:**
- **MSW (Mock Service Worker)** - API mocking
  - Rationale: Intercepts network requests, works in Node and browser
- **Vitest mocks** - Module mocking
  - Rationale: Built-in, easy to use

**Coverage:**
- **Vitest coverage** (v8 or istanbul)
  - Rationale: Built-in coverage reporting

### Backend (WordPress)

**WordPress Testing:**
- **WP-CLI** - Command-line testing
  - Rationale: Test WPGraphQL queries, plugin configurations
- **Postman** OR **Insomnia** - Manual API testing
  - Rationale: Test GraphQL queries during development

**GraphQL Testing:**
- **GraphQL Playground** - Interactive query testing
  - Rationale: Built into WPGraphQL, explore schema
- **Apollo Client DevTools** - Client-side debugging
  - Rationale: Inspect queries, cache, network requests

---

## Unit Tests

### What to Test

**React Components:**
- Rendering with different props
- User interactions (clicks, form inputs)
- Conditional rendering
- Error states
- Accessibility (ARIA labels, keyboard navigation)

**Utility Functions:**
- Date/time formatting
- Trail data transformations
- URL generation
- Validation logic

**GraphQL Queries:**
- Query structure (variables, fragments)
- Response parsing
- Error handling

**Hooks:**
- Custom React hooks
- State management
- Side effects

### Coverage Goals

- **Minimum**: 80% overall coverage
- **Target**: 90% for business logic
- **Critical Paths**: 100% (user authentication, payment flows in future)

### Example: Component Test

```typescript
// components/trail/TrailCard.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TrailCard } from './TrailCard';

describe('TrailCard', () => {
  const mockTrail = {
    id: '1',
    title: 'Morskie Oko',
    slug: 'morskie-oko',
    difficulty: 'moderate',
    distance: 9.0,
    elevationGain: 300,
    estimatedTime: 3,
    region: 'High Tatras',
    featuredImage: {
      url: '/images/morskie-oko.jpg',
      alt: 'Morskie Oko lake'
    }
  };

  it('renders trail information correctly', () => {
    render(<TrailCard trail={mockTrail} />);

    expect(screen.getByText('Morskie Oko')).toBeInTheDocument();
    expect(screen.getByText(/9\.0 km/i)).toBeInTheDocument();
    expect(screen.getByText(/300m/i)).toBeInTheDocument();
    expect(screen.getByText(/3 hours/i)).toBeInTheDocument();
    expect(screen.getByAltText('Morskie Oko lake')).toBeInTheDocument();
  });

  it('displays correct difficulty badge', () => {
    render(<TrailCard trail={mockTrail} />);

    const badge = screen.getByText(/moderate/i);
    expect(badge).toHaveClass('difficulty-moderate');
  });

  it('links to trail detail page', () => {
    render(<TrailCard trail={mockTrail} />);

    const link = screen.getByRole('link', { name: /morskie oko/i });
    expect(link).toHaveAttribute('href', '/trail/morskie-oko');
  });

  it('is keyboard accessible', () => {
    render(<TrailCard trail={mockTrail} />);

    const card = screen.getByRole('link');
    card.focus();
    expect(card).toHaveFocus();
  });
});
```

### Example: Utility Function Test

```typescript
// lib/utils/formatters.test.ts
import { describe, it, expect } from 'vitest';
import { formatDistance, formatElevation, formatDuration } from './formatters';

describe('formatDistance', () => {
  it('formats kilometers correctly', () => {
    expect(formatDistance(5.5)).toBe('5.5 km');
    expect(formatDistance(12)).toBe('12 km');
  });

  it('handles zero distance', () => {
    expect(formatDistance(0)).toBe('0 km');
  });
});

describe('formatElevation', () => {
  it('formats meters correctly', () => {
    expect(formatElevation(800)).toBe('800m');
    expect(formatElevation(1200)).toBe('1,200m');
  });
});

describe('formatDuration', () => {
  it('formats hours correctly', () => {
    expect(formatDuration(3)).toBe('3 hours');
    expect(formatDuration(1)).toBe('1 hour');
  });

  it('formats hours and minutes', () => {
    expect(formatDuration(2.5)).toBe('2.5 hours');
  });
});
```

---

## Integration Tests

### What to Test

**WordPress GraphQL API:**
- Fetching trail reports with filters
- Querying taxonomies (regions, difficulty, seasons)
- Fetching comments
- Language-specific queries (WPML/Polylang)
- Error handling (404s, network errors)

**Google Maps Integration:**
- Map initialization
- Marker placement
- Info window rendering
- Coordinate validation

**Comment Submission:**
- Submitting comment via WordPress REST API
- Form validation
- Success/error handling

**Image Loading:**
- WordPress featured images
- Gallery images
- Lazy loading
- Responsive srcset

### Example: GraphQL API Test

```typescript
// lib/wordpress/queries.test.ts
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { getTrailBySlug, getAllTrails, getTrailsByDifficulty } from './queries';
import { server } from '../mocks/server'; // MSW mock server

describe('WordPress GraphQL Queries', () => {
  let client: ApolloClient<any>;

  beforeAll(() => {
    server.listen();
    client = new ApolloClient({
      uri: 'http://localhost:3000/graphql',
      cache: new InMemoryCache()
    });
  });

  it('fetches trail by slug', async () => {
    const { data } = await client.query({
      query: getTrailBySlug,
      variables: { slug: 'morskie-oko', language: 'EN' }
    });

    expect(data.trailReport).toBeDefined();
    expect(data.trailReport.title).toBe('Morskie Oko');
    expect(data.trailReport.difficulty).toBe('MODERATE');
  });

  it('fetches all trails with pagination', async () => {
    const { data } = await client.query({
      query: getAllTrails,
      variables: { first: 10, after: null }
    });

    expect(data.trailReports.nodes).toHaveLength(10);
    expect(data.trailReports.pageInfo.hasNextPage).toBe(true);
  });

  it('filters trails by difficulty', async () => {
    const { data } = await client.query({
      query: getTrailsByDifficulty,
      variables: { difficulty: 'MODERATE' }
    });

    const trails = data.trailReports.nodes;
    expect(trails.every(t => t.difficulty === 'MODERATE')).toBe(true);
  });

  it('handles 404 for non-existent trail', async () => {
    await expect(
      client.query({
        query: getTrailBySlug,
        variables: { slug: 'non-existent' }
      })
    ).rejects.toThrow();
  });
});
```

### Example: API Mocking with MSW

```typescript
// lib/mocks/handlers.ts
import { graphql } from 'msw';

export const handlers = [
  graphql.query('GetTrailBySlug', (req, res, ctx) => {
    const { slug } = req.variables;

    if (slug === 'morskie-oko') {
      return res(
        ctx.data({
          trailReport: {
            id: '1',
            title: 'Morskie Oko',
            slug: 'morskie-oko',
            difficulty: 'MODERATE',
            distance: 9.0,
            elevationGain: 300,
            estimatedTime: 3,
            content: '<p>Beautiful alpine lake...</p>',
            featuredImage: {
              url: '/images/morskie-oko.jpg',
              alt: 'Morskie Oko lake'
            }
          }
        })
      );
    }

    return res(
      ctx.errors([{ message: 'Trail not found' }])
    );
  }),

  graphql.query('GetAllTrails', (req, res, ctx) => {
    return res(
      ctx.data({
        trailReports: {
          nodes: Array(10).fill(null).map((_, i) => ({
            id: `${i + 1}`,
            title: `Trail ${i + 1}`,
            slug: `trail-${i + 1}`,
            difficulty: 'MODERATE'
          })),
          pageInfo: {
            hasNextPage: true,
            endCursor: 'cursor123'
          }
        }
      })
    );
  })
];
```

---

## E2E Tests

### What to Test

**Critical User Journeys:**
1. Browsing trail database
2. Filtering trails by difficulty
3. Viewing individual trail report
4. Switching language (PL/EN)
5. Submitting comment
6. Viewing interactive map

**NOT Tested in E2E (leave to unit/integration):**
- Edge cases
- Error handling
- Validation logic
- API error responses

### Example: E2E Test (Playwright)

```typescript
// e2e/trail-browsing.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Trail Database', () => {
  test('user can browse and filter trails', async ({ page }) => {
    // Navigate to trail database
    await page.goto('/trails');

    // Verify page loads
    await expect(page.locator('h1')).toContainText('Trail Database');

    // Check initial trail cards are visible
    const trailCards = page.locator('[data-testid="trail-card"]');
    await expect(trailCards).toHaveCount(12); // Initial page

    // Apply difficulty filter
    await page.click('text=Moderate');

    // Wait for results to update
    await page.waitForSelector('[data-testid="trail-card"]');

    // Verify all visible trails are moderate
    const badges = page.locator('.difficulty-moderate');
    await expect(badges).toHaveCount(12);

    // Click on a trail
    await trailCards.first().click();

    // Verify redirected to trail detail page
    await expect(page).toHaveURL(/\/trail\/.+/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('user can switch language', async ({ page }) => {
    await page.goto('/trails');

    // Click language switcher
    await page.click('[data-testid="language-switcher"]');
    await page.click('text=English');

    // Verify URL changed
    await expect(page).toHaveURL('/en/trails');

    // Verify content is in English
    await expect(page.locator('h1')).toContainText('Trail Database');

    // Switch back to Polish
    await page.click('[data-testid="language-switcher"]');
    await page.click('text=Polski');

    // Verify Polish content
    await expect(page).toHaveURL('/pl/trails');
  });
});

test.describe('Individual Trail Page', () => {
  test('user can view trail details and submit comment', async ({ page }) => {
    await page.goto('/trail/morskie-oko');

    // Verify trail details visible
    await expect(page.locator('h1')).toContainText('Morskie Oko');
    await expect(page.locator('text=9.0 km')).toBeVisible();
    await expect(page.locator('text=300m')).toBeVisible();

    // Verify Google Map loads
    await expect(page.locator('[data-testid="trail-map"]')).toBeVisible();

    // Scroll to comments section
    await page.locator('#comments').scrollIntoViewIfNeeded();

    // Fill out comment form
    await page.fill('input[name="author"]', 'John Hiker');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('textarea[name="comment"]', 'Great trail! Highly recommend.');

    // Submit comment
    await page.click('button[type="submit"]');

    // Verify success message
    await expect(page.locator('text=Comment submitted')).toBeVisible();
  });
});

test.describe('Interactive Map', () => {
  test('user can view all trails on map', async ({ page }) => {
    await page.goto('/map');

    // Verify map loads
    await expect(page.locator('[data-testid="interactive-map"]')).toBeVisible();

    // Wait for markers to load
    await page.waitForSelector('.trail-marker', { state: 'attached' });

    // Click on a marker
    await page.click('.trail-marker:first-child');

    // Verify info popup appears
    await expect(page.locator('.marker-popup')).toBeVisible();
    await expect(page.locator('.marker-popup h3')).toBeVisible();

    // Click "View Details" in popup
    await page.click('text=View Details');

    // Verify redirected to trail page
    await expect(page).toHaveURL(/\/trail\/.+/);
  });
});
```

---

## Test Data Management

### Strategy

**Test Data Principles:**
- Use factories to generate test data
- Isolate tests (no shared state)
- Reset database/cache after each test
- Use realistic data (not just "test1", "test2")

### Example: Test Data Factory

```typescript
// lib/test-utils/factories.ts
import { faker } from '@faker-js/faker';

export const trailFactory = (overrides = {}) => ({
  id: faker.string.uuid(),
  title: faker.location.city() + ' Trail',
  slug: faker.helpers.slugify(faker.location.city()),
  difficulty: faker.helpers.arrayElement(['easy', 'moderate', 'difficult', 'very-difficult', 'expert']),
  distance: faker.number.float({ min: 1, max: 20, precision: 0.1 }),
  elevationGain: faker.number.int({ min: 100, max: 2000 }),
  estimatedTime: faker.number.float({ min: 1, max: 10, precision: 0.5 }),
  region: faker.helpers.arrayElement(['Western Tatras', 'High Tatras', 'Eastern Tatras']),
  gpsLatitude: faker.location.latitude(),
  gpsLongitude: faker.location.longitude(),
  content: faker.lorem.paragraphs(3),
  featuredImage: {
    url: faker.image.urlLoremFlickr({ category: 'nature' }),
    alt: faker.lorem.words(3)
  },
  ...overrides
});

export const commentFactory = (overrides = {}) => ({
  id: faker.string.uuid(),
  author: faker.person.fullName(),
  email: faker.internet.email(),
  content: faker.lorem.paragraph(),
  date: faker.date.recent().toISOString(),
  status: 'approved',
  ...overrides
});
```

### Usage in Tests

```typescript
import { trailFactory } from '@/lib/test-utils/factories';

it('renders trail card', () => {
  const trail = trailFactory({ title: 'Morskie Oko', difficulty: 'moderate' });
  render(<TrailCard trail={trail} />);
  expect(screen.getByText('Morskie Oko')).toBeInTheDocument();
});
```

---

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Run unit tests
        run: npm run test:unit

      - name: Run integration tests
        run: npm run test:integration

      - name: Generate coverage report
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  e2e:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload Playwright report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### Pre-commit Hooks (Husky)

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest run --coverage",
    "test:integration": "vitest run --config vitest.integration.config.ts",
    "test:e2e": "playwright test",
    "test:watch": "vitest watch",
    "lint": "eslint . --ext ts,tsx",
    "type-check": "tsc --noEmit"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "vitest related --run"
    ]
  }
}
```

---

## Running Tests

### Commands

```bash
# Run all tests (unit + integration)
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run E2E tests
npm run test:e2e

# Watch mode (re-run on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests for specific file
npm test -- TrailCard.test.tsx

# Run tests matching pattern
npm test -- --grep "TrailCard"

# Run E2E tests in headed mode (visible browser)
npm run test:e2e -- --headed

# Run E2E tests in specific browser
npm run test:e2e -- --project=chromium
```

### Coverage Reports

```bash
# Generate coverage report
npm run test:coverage

# Open coverage report in browser
open coverage/index.html
```

**Coverage Thresholds:**
```json
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    }
  }
});
```

---

## Best Practices

### General Testing

1. **Test behavior, not implementation**
   - Focus on what users see and interact with
   - Avoid testing internal state or private methods

2. **Write clear, descriptive test names**
   ```typescript
   // Good
   it('displays error message when email is invalid', () => {});

   // Bad
   it('test1', () => {});
   ```

3. **Arrange-Act-Assert (AAA) pattern**
   ```typescript
   it('filters trails by difficulty', () => {
     // Arrange
     const trails = [trailFactory(), trailFactory()];

     // Act
     const result = filterByDifficulty(trails, 'moderate');

     // Assert
     expect(result).toHaveLength(1);
   });
   ```

4. **One assertion per test (guideline, not rule)**
   - Makes failures easier to debug
   - Related assertions can be grouped

5. **Isolate tests**
   - No shared state between tests
   - Use `beforeEach` to reset state
   - Mock external dependencies

### React Component Testing

1. **Query by accessible roles**
   ```typescript
   // Good
   screen.getByRole('button', { name: /submit/i });

   // Avoid
   screen.getByTestId('submit-button');
   ```

2. **Test from user perspective**
   - What users see, not internal state
   - Use `userEvent` for realistic interactions

3. **Avoid testing implementation details**
   ```typescript
   // Bad - testing internal state
   expect(component.state.isOpen).toBe(true);

   // Good - testing visible behavior
   expect(screen.getByText('Modal Content')).toBeVisible();
   ```

### E2E Testing

1. **Test critical paths only**
   - E2E tests are slow and expensive
   - Focus on most important user journeys

2. **Use data-testid sparingly**
   - Prefer semantic queries (role, label, text)
   - Use data-testid when no other option

3. **Wait for elements properly**
   ```typescript
   // Good
   await expect(page.locator('h1')).toBeVisible();

   // Bad - flaky
   await page.waitForTimeout(1000);
   ```

4. **Independent tests**
   - Each test should run standalone
   - Don't rely on test execution order

---

## Performance Testing

### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on: [push]

jobs:
  lighthouse:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://tatra-trails.com
            https://tatra-trails.com/trails
            https://tatra-trails.com/trail/morskie-oko
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true
```

**Lighthouse Budget:**
```json
// lighthouse-budget.json
{
  "performance": 80,
  "accessibility": 95,
  "best-practices": 90,
  "seo": 95,
  "pwa": 50
}
```

---

## Known Issues & Limitations

### Current Limitations

1. **WordPress GraphQL Mocking**
   - Challenge: Complex GraphQL schema difficult to mock
   - Solution: Use MSW with simplified schema for tests

2. **Google Maps Testing**
   - Challenge: Maps API requires browser environment
   - Solution: Mock Google Maps API in unit tests, test in E2E only

3. **Multilingual Content**
   - Challenge: Testing language switching requires full WordPress setup
   - Solution: Mock language data in unit/integration tests

4. **Image Loading**
   - Challenge: Testing lazy loading and responsive images
   - Solution: Mock Intersection Observer, test in E2E

---

## Version History

**Version 1.0** (2025-11-11)
- Initial testing strategy documentation
- Test pyramid defined
- Unit, integration, E2E test patterns documented
- CI/CD integration specified
- Best practices outlined

---

## Related Documentation

- **PRD.md**: Feature requirements and acceptance criteria
- **docs/architecture.md**: Tech stack and component architecture
- **docs/conventions.md**: Code style and git practices
- **docs/CONTRIBUTING.md**: How to write and submit tests

---

**Document Owner**: QA Lead / Engineering Lead
**Review Cycle**: Quarterly or when testing strategy changes
**Next Review**: 2026-02-11
