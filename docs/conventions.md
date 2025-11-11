# Coding Conventions

**Project:** Tatra Trails Blog (moje-tatry)
**Created:** 2025-11-11
**Last Updated:** 2025-11-11
**Architecture:** Headless WordPress + Next.js 14

## Overview

This document defines coding standards, file organization, naming conventions, and best practices for the Tatra Trails project. Consistent conventions improve code readability, maintainability, and team collaboration. All contributors must follow these guidelines.

**Core Principles:**
1. **Readability over cleverness** - Write code others can understand
2. **Consistency over personal preference** - Follow established patterns
3. **Explicit over implicit** - Make intentions clear
4. **Simple over complex** - Choose simplest solution that works

---

## TypeScript/JavaScript Conventions

### Naming Conventions

**Variables & Functions:**
```typescript
// Variables: camelCase
const trailCount = 10;
const userPreferences = { theme: 'dark' };

// Functions: camelCase (verb + noun)
function getTrailById(id: string) { }
function calculateDistance(start: number, end: number) { }
async function fetchTrailData(slug: string) { }

// Boolean variables: is/has/should prefix
const isLoading = true;
const hasComments = false;
const shouldDisplayMap = true;

// Event handlers: handle prefix
const handleSubmit = () => { };
const handleFilterChange = (value: string) => { };
```

**Classes & Interfaces:**
```typescript
// Classes: PascalCase
class TrailService {
  constructor() { }
}

// Interfaces: PascalCase (no 'I' prefix)
interface TrailData {
  id: string;
  title: string;
}

// Type Aliases: PascalCase
type Difficulty = 'easy' | 'moderate' | 'difficult' | 'very-difficult' | 'expert';
```

**Constants:**
```typescript
// Constants: UPPER_SNAKE_CASE
const MAX_TRAILS_PER_PAGE = 12;
const DEFAULT_LANGUAGE = 'pl';
const API_TIMEOUT_MS = 5000;

// Enum: PascalCase
enum TrailDifficulty {
  Easy = 'EASY',
  Moderate = 'MODERATE',
  Difficult = 'DIFFICULT'
}
```

**React Components:**
```typescript
// Component: PascalCase
function TrailCard({ trail }: TrailCardProps) {
  return <div>{trail.title}</div>;
}

// Component Props: PascalCase with 'Props' suffix
interface TrailCardProps {
  trail: Trail;
  onSelect?: (trail: Trail) => void;
}

// Hooks: camelCase with 'use' prefix
function useTrailFilters() {
  const [filters, setFilters] = useState({});
  return { filters, setFilters };
}
```

### File Naming

**React Components:**
```
components/
├── TrailCard.tsx          # Component file (PascalCase)
├── TrailCard.test.tsx     # Test file
├── TrailCard.stories.tsx  # Storybook stories (optional)
└── TrailCard.module.css   # CSS module (if not using Tailwind)
```

**Utilities & Libraries:**
```
lib/
├── formatters.ts          # Utility file (camelCase)
├── formatters.test.ts     # Test file
├── wordpress/
│   ├── client.ts          # API client
│   ├── queries.ts         # GraphQL queries
│   └── types.ts           # TypeScript types
└── utils/
    ├── dates.ts           # Date utilities
    └── validation.ts      # Validation utilities
```

**Next.js Pages & App Router:**
```
app/
├── page.tsx               # Homepage (lowercase)
├── layout.tsx             # Root layout
├── [lang]/                # Dynamic route segment
│   ├── trails/
│   │   ├── page.tsx       # Trail database page
│   │   └── [slug]/
│   │       └── page.tsx   # Individual trail page
│   └── map/
│       └── page.tsx       # Interactive map page
└── api/
    └── comments/
        └── route.ts       # API route handler
```

### Code Formatting

**Indentation & Spacing:**
```typescript
// 2 spaces for indentation (enforced by Prettier)
function example() {
  if (condition) {
    doSomething();
  }
}

// Line length: 100 characters max (guideline, not hard limit)
const longString =
  'This is a very long string that exceeds 100 characters ' +
  'so we break it across multiple lines';

// Semicolons: Always required
const value = 10; // Good
const value = 10  // Bad (missing semicolon)

// Quotes: Single quotes for strings, double quotes for JSX
const name = 'John';
const jsx = <div className="container">Hello</div>;

// Trailing commas: Always use (except in JSON)
const array = [
  'item1',
  'item2',
  'item3',  // Trailing comma
];

const object = {
  key1: 'value1',
  key2: 'value2',  // Trailing comma
};
```

**Import Organization:**
```typescript
// 1. External imports (libraries)
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';

// 2. Internal imports (absolute paths with @/)
import { Button } from '@/components/ui/button';
import { formatDistance } from '@/lib/utils/formatters';
import { getTrailBySlug } from '@/lib/wordpress/queries';

// 3. Types (if not inline)
import type { Trail, TrailFilters } from '@/types';

// 4. CSS imports (last)
import '@/styles/globals.css';
```

**File Organization:**
```typescript
// 1. Imports
import React from 'react';
import { formatDate } from '@/lib/utils';

// 2. Type definitions
interface Props {
  trail: Trail;
}

// 3. Constants
const DEFAULT_IMAGE = '/images/placeholder.jpg';
const MAX_DESCRIPTION_LENGTH = 200;

// 4. Main component/function
export function TrailCard({ trail }: Props) {
  // Component logic
  return <div>{trail.title}</div>;
}

// 5. Helper functions (not exported)
function truncateDescription(text: string, maxLength: number): string {
  return text.length > maxLength
    ? text.slice(0, maxLength) + '...'
    : text;
}

// 6. Named exports (if needed)
export { type Props as TrailCardProps };
```

---

## React Best Practices

### Component Structure

**Server Components (Default in Next.js 14):**
```typescript
// app/trails/page.tsx
import { getTrails } from '@/lib/wordpress/queries';
import { TrailCard } from '@/components/trail/TrailCard';

// Server Component (no 'use client')
export default async function TrailsPage() {
  const trails = await getTrails();

  return (
    <div>
      <h1>Trail Database</h1>
      {trails.map(trail => (
        <TrailCard key={trail.id} trail={trail} />
      ))}
    </div>
  );
}
```

**Client Components (Interactive):**
```typescript
// components/trail/TrailFilters.tsx
'use client'; // Required for client-side interactivity

import { useState } from 'react';

export function TrailFilters({ onFilterChange }: Props) {
  const [difficulty, setDifficulty] = useState<string[]>([]);

  const handleDifficultyChange = (value: string) => {
    // Update state
    setDifficulty(prev =>
      prev.includes(value)
        ? prev.filter(d => d !== value)
        : [...prev, value]
    );
    onFilterChange({ difficulty });
  };

  return (
    <div>
      {/* Filter UI */}
    </div>
  );
}
```

### Props Patterns

**Props Definition:**
```typescript
// Good: Explicit props interface
interface TrailCardProps {
  trail: Trail;
  onSelect?: (trail: Trail) => void;
  showDescription?: boolean;
}

function TrailCard({
  trail,
  onSelect,
  showDescription = true
}: TrailCardProps) {
  // Component logic
}

// Avoid: Inline props
function TrailCard({ trail, onSelect }: { trail: Trail; onSelect?: (t: Trail) => void }) {
  // Hard to read, not reusable
}
```

**Destructuring:**
```typescript
// Good: Destructure in function signature
function TrailCard({ trail, onSelect }: TrailCardProps) {
  return <div>{trail.title}</div>;
}

// Avoid: Accessing via props object
function TrailCard(props: TrailCardProps) {
  return <div>{props.trail.title}</div>;
}
```

### State Management

**useState:**
```typescript
// Simple state
const [count, setCount] = useState(0);

// Object state (use multiple useState or useReducer for complex state)
const [user, setUser] = useState<User>({ name: '', email: '' });

// Update object state immutably
setUser(prev => ({ ...prev, name: 'John' }));

// Avoid mutating state directly
user.name = 'John'; // Bad
setUser(user); // Bad
```

**useEffect:**
```typescript
// Fetch data on mount
useEffect(() => {
  fetchData();
}, []); // Empty dependency array

// Sync with prop changes
useEffect(() => {
  setLocalState(propValue);
}, [propValue]); // Re-run when propValue changes

// Cleanup
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe(); // Cleanup
}, []);
```

### Conditional Rendering

```typescript
// Good: Ternary for simple conditions
{isLoading ? <Spinner /> : <Content />}

// Good: && for single branch
{hasError && <ErrorMessage />}

// Good: Early return for complex conditions
if (isLoading) return <Spinner />;
if (hasError) return <ErrorMessage />;
return <Content />;

// Avoid: Complex nested ternaries
{isLoading ? <Spinner /> : hasError ? <Error /> : hasData ? <Content /> : null}
```

---

## WordPress (Backend) Conventions

### Custom Post Type Registration

```php
// functions.php or custom plugin
function register_trail_report_cpt() {
  $labels = array(
    'name'               => __('Trail Reports', 'tatra-trails'),
    'singular_name'      => __('Trail Report', 'tatra-trails'),
    'add_new'            => __('Add New', 'tatra-trails'),
    'add_new_item'       => __('Add New Trail Report', 'tatra-trails'),
    // ... more labels
  );

  $args = array(
    'labels'             => $labels,
    'public'             => true,
    'has_archive'        => true,
    'show_in_graphql'    => true,
    'graphql_single_name' => 'trailReport',
    'graphql_plural_name' => 'trailReports',
    'supports'           => array('title', 'editor', 'thumbnail', 'comments'),
    // ... more args
  );

  register_post_type('trail_report', $args);
}
add_action('init', 'register_trail_report_cpt');
```

### ACF Field Naming

```php
// ACF field keys: prefix with project abbreviation
// Field name: snake_case
$fields = array(
  'tt_difficulty' => array(
    'key' => 'field_tt_difficulty',
    'label' => __('Difficulty', 'tatra-trails'),
    'name' => 'difficulty',
    'type' => 'select',
    'choices' => array(
      'easy' => __('Easy', 'tatra-trails'),
      'moderate' => __('Moderate', 'tatra-trails'),
      // ...
    ),
  ),
);
```

---

## GraphQL Conventions

### Query Naming

```graphql
# Query names: PascalCase
query GetTrailBySlug($slug: String!, $language: LanguageCodeEnum!) {
  trailReport(id: $slug, idType: SLUG, language: $language) {
    id
    title
    slug
    difficulty
    distance
    elevationGain
  }
}

# Fragment names: PascalCase with 'Fragment' suffix
fragment TrailCardFragment on TrailReport {
  id
  title
  slug
  difficulty
  featuredImage {
    node {
      sourceUrl
      altText
    }
  }
}
```

### Query Organization

```typescript
// lib/wordpress/queries.ts
import { gql } from '@apollo/client';

// Fragments
export const TRAIL_CARD_FRAGMENT = gql`
  fragment TrailCardFragment on TrailReport {
    id
    title
    slug
    difficulty
    distance
    elevationGain
  }
`;

// Queries
export const GET_TRAIL_BY_SLUG = gql`
  ${TRAIL_CARD_FRAGMENT}
  query GetTrailBySlug($slug: String!) {
    trailReport(id: $slug, idType: SLUG) {
      ...TrailCardFragment
      content
      gpsLatitude
      gpsLongitude
    }
  }
`;
```

---

## CSS/Tailwind Conventions

### Tailwind Class Order

```tsx
// Recommended order: Layout → Spacing → Typography → Visual → Interactive
<div
  className="
    flex flex-col items-center
    p-4 gap-2
    text-lg font-semibold
    bg-white border border-gray-200 rounded-lg shadow-md
    hover:shadow-lg transition-shadow
  "
>
  Content
</div>
```

### Custom CSS (When Needed)

```css
/* Use Tailwind's @apply for reusable patterns */
.trail-card {
  @apply bg-white rounded-lg shadow-md overflow-hidden;
  @apply transition-all duration-300;
  @apply hover:shadow-lg hover:-translate-y-1;
}

/* Avoid inline styles */
/* Bad */
<div style={{ color: 'red', fontSize: '16px' }}>Text</div>

/* Good */
<div className="text-red-500 text-base">Text</div>
```

---

## Error Handling

### Frontend Error Handling

```typescript
// API calls: try-catch with specific error handling
async function fetchTrail(slug: string): Promise<Trail | null> {
  try {
    const { data } = await client.query({
      query: GET_TRAIL_BY_SLUG,
      variables: { slug }
    });
    return data.trailReport;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error('GraphQL error:', error.message);
      // Handle specific error types
      if (error.networkError) {
        throw new NetworkError('Failed to fetch trail');
      }
    }
    throw new Error('Unknown error fetching trail');
  }
}

// Component error boundaries
'use client'; // Client component

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

export class ErrorBoundary extends Component<Props> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}
```

### Form Validation

```typescript
// Use Zod for schema validation
import { z } from 'zod';

const commentSchema = z.object({
  author: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
});

type CommentFormData = z.infer<typeof commentSchema>;

function validateComment(data: unknown): CommentFormData {
  return commentSchema.parse(data); // Throws ZodError if invalid
}
```

---

## Async/Await Patterns

```typescript
// Good: Async/await
async function fetchAndProcessTrails() {
  try {
    const trails = await fetchTrails();
    const processed = await processTrails(trails);
    return processed;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Good: Parallel execution
async function fetchMultiple() {
  const [trails, comments, regions] = await Promise.all([
    fetchTrails(),
    fetchComments(),
    fetchRegions()
  ]);
  return { trails, comments, regions };
}

// Avoid: Promise chains
fetchTrails()
  .then(trails => processTrails(trails))
  .then(processed => saveTrails(processed))
  .catch(error => console.error(error));
```

---

## Git Practices

### Branch Naming

```bash
# Feature branches
git checkout -b feature/trail-filtering
git checkout -b feature/comment-moderation

# Bug fixes
git checkout -b bugfix/map-marker-rendering
git checkout -b bugfix/language-switcher

# Hotfixes (critical production bugs)
git checkout -b hotfix/api-timeout

# Documentation
git checkout -b docs/api-documentation
git checkout -b docs/readme-update
```

### Commit Messages

**Format:** `type(scope): message`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no logic changes)
- `refactor`: Code restructuring (no feature/bug changes)
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, build config)
- `perf`: Performance improvements

**Examples:**
```bash
feat(trails): add difficulty filter to trail database
fix(map): correct GPS coordinate parsing
docs(readme): update installation instructions
style(components): format TrailCard component
refactor(api): extract GraphQL queries to separate file
test(filters): add unit tests for trail filtering
chore(deps): update Next.js to 14.1.0
perf(images): implement lazy loading for trail images
```

**Commit Message Best Practices:**
```bash
# Good
git commit -m "feat(comments): add comment moderation UI"
git commit -m "fix(api): handle 404 errors in GraphQL queries"

# Bad (too vague)
git commit -m "fix bug"
git commit -m "update code"

# Multi-line commits
git commit -m "feat(trails): add advanced filtering

- Add difficulty filter checkboxes
- Add region filter dropdown
- Add search input for trail names
- Update trail list to react to filter changes"
```

### Pull Requests

**PR Title:** `[Type] Brief description`

**PR Description Template:**
```markdown
## Summary
Brief description of changes

## Changes Made
- [ ] Feature 1
- [ ] Feature 2
- [ ] Bug fix 1

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Screenshots (if UI changes)
[Add screenshots here]

## Related Issues
Closes #123
Relates to #456

## Checklist
- [ ] Code follows project conventions
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No console errors/warnings
```

---

## Comments & Documentation

### JSDoc Comments

```typescript
/**
 * Fetches a trail report by slug from WordPress GraphQL API.
 *
 * @param slug - The trail slug (URL-friendly identifier)
 * @param language - Language code ('pl' or 'en')
 * @returns Promise resolving to trail data or null if not found
 * @throws {GraphQLError} If the API request fails
 *
 * @example
 * const trail = await getTrailBySlug('morskie-oko', 'en');
 */
export async function getTrailBySlug(
  slug: string,
  language: string
): Promise<Trail | null> {
  // Implementation
}
```

### Inline Comments

```typescript
// Good: Explain WHY, not WHAT
// We need to delay execution because Google Maps API loads asynchronously
setTimeout(() => initializeMap(), 100);

// Bad: Comment states the obvious
// Set count to 0
const count = 0;

// Good: Explain business logic
// Add 3 days grace period as per Product Requirements Document
const gracePeriod = 3 * 24 * 60 * 60 * 1000;

// Good: Explain workaround
// HACK: WordPress REST API requires this header even for public endpoints
headers['X-WP-Nonce'] = 'dummy-value';
```

### TODO Comments

```typescript
// TODO: Implement caching for trail list
// TODO(john): Review performance after adding pagination
// FIXME: Map markers not rendering on mobile Safari
// NOTE: This approach is temporary until WordPress v6.5 is released
```

---

## Testing Conventions

### Test File Organization

```typescript
// TrailCard.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { TrailCard } from './TrailCard';
import { trailFactory } from '@/lib/test-utils/factories';

describe('TrailCard', () => {
  let trail: Trail;

  beforeEach(() => {
    trail = trailFactory();
  });

  describe('rendering', () => {
    it('displays trail title', () => {
      render(<TrailCard trail={trail} />);
      expect(screen.getByText(trail.title)).toBeInTheDocument();
    });

    it('displays difficulty badge', () => {
      render(<TrailCard trail={trail} />);
      expect(screen.getByText(trail.difficulty)).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onSelect when clicked', () => {
      const onSelect = vi.fn();
      render(<TrailCard trail={trail} onSelect={onSelect} />);

      screen.getByRole('link').click();
      expect(onSelect).toHaveBeenCalledWith(trail);
    });
  });
});
```

### Test Naming

```typescript
// Good: Descriptive, clear expectations
it('displays error message when email is invalid', () => {});
it('disables submit button while form is submitting', () => {});
it('redirects to login page when user is not authenticated', () => {});

// Bad: Vague, unclear
it('works correctly', () => {});
it('test1', () => {});
it('should work', () => {});
```

---

## Security Best Practices

### Never Commit Sensitive Data

```bash
# .env.local (never committed)
WORDPRESS_API_URL=https://wp.tatra-trails.com/graphql
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...
DATABASE_PASSWORD=secret123

# .gitignore
.env.local
.env
.env.production.local
*.pem
*.key
secrets/
```

### Input Validation

```typescript
// Always validate user input
function sanitizeComment(comment: string): string {
  // Remove HTML tags
  return comment.replace(/<[^>]*>/g, '');
}

// Validate before processing
const commentSchema = z.object({
  content: z.string().min(10).max(500),
  author: z.string().min(2).max(50),
  email: z.string().email(),
});

function handleCommentSubmit(data: unknown) {
  const validated = commentSchema.parse(data); // Throws if invalid
  submitComment(validated);
}
```

### API Key Protection

```typescript
// Good: Server-side API calls (API key not exposed)
// app/api/geocode/route.ts
export async function GET(request: Request) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  return Response.json(await response.json());
}

// Bad: Client-side with secret key
const response = await fetch(
  `https://api.example.com?key=${process.env.SECRET_API_KEY}` // Exposed in browser!
);
```

---

## Version History

**Version 1.0** (2025-11-11)
- Initial coding conventions documentation
- TypeScript, React, WordPress, GraphQL standards defined
- File organization and naming conventions specified
- Git practices and commit message format outlined
- Testing and security best practices documented

---

## Related Documentation

- **PRD.md**: Feature requirements and technical specifications
- **docs/architecture.md**: Tech stack and system design
- **docs/TESTING.md**: Testing strategy and tools
- **docs/CONTRIBUTING.md**: How to contribute to the project

---

**Document Owner**: Engineering Lead
**Review Cycle**: Quarterly or when conventions change
**Next Review**: 2026-02-11
