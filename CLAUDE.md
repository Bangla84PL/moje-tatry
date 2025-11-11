# Project Context for Claude Code

**Project:** Tatra Trails (moje-tatry)
**Description:** Bilingual headless WordPress blog for Tatra Mountains hiking trails with interactive maps
**Tech Stack:** Next.js 14+ • WordPress 6.4+ • WPGraphQL • Tailwind CSS • Google Maps API
**Architecture:** Headless CMS (WordPress backend) + JAMstack (Next.js frontend)

---

## Documentation Structure

This project uses comprehensive documentation stored in multiple files:

**Root Documentation:**
@README.md - Project overview, setup, deployment
@PRD.md - Complete Product Requirements Document (732 lines)
@TODO.md - Task tracking with 5-phase implementation checklist
@CHANGELOG.md - Version history

**Technical Documentation:**
@docs/architecture.md - Headless WordPress + Next.js architecture, tech stack, ADRs
@docs/API.md - WPGraphQL queries, REST endpoints, Google Maps integration
@docs/db-schema.md - WordPress database schema, custom post types, ACF fields
@docs/features.md - 40 features with user stories and acceptance criteria
@docs/DESIGN.md - Rugged outdoor design system, color palette, typography
@docs/TESTING.md - Testing strategy (unit, integration, E2E)
@docs/conventions.md - TypeScript, React, WordPress coding standards
@docs/ROADMAP.md - 6-month roadmap with 5 development phases
@docs/DECISIONS.md - 8 Architectural Decision Records (ADRs)

---

## Project Overview

**Tatra Trails** is a bilingual (Polish/English) hiking blog featuring:
- **Trail Database** - 100+ Tatra Mountains hiking trails with detailed stats
- **Interactive Maps** - Google Maps with trail markers and location-based search
- **Custom Post Type** - "Trail Report" with ACF fields (difficulty, distance, elevation, GPS)
- **Taxonomies** - Region, Difficulty, Season, Trail Type, Features
- **Bilingual Content** - WPML/Polylang for Polish/English translations
- **Monetization** - Google AdSense + Amazon Associates affiliate links
- **SEO Optimized** - Server-side rendering for search visibility

---

## Technical Architecture

**Backend (WordPress):**
- Self-hosted WordPress 6.4+ with PHP 8.0+ and MySQL 8.0+
- WPGraphQL plugin for GraphQL API layer
- WPML or Polylang for bilingual content (Polish/English)
- Advanced Custom Fields (ACF) Pro for trail metadata
- Custom post type: `trail_report`
- Custom taxonomies: regions, difficulty, season, trail_type, features

**Frontend (Next.js):**
- Next.js 14+ with App Router and TypeScript
- Apollo Client for WPGraphQL data fetching
- Tailwind CSS for styling
- Google Maps JavaScript API for interactive maps
- Deployed on Vercel with automatic CI/CD

**Data Flow:**
```
WordPress (Content) → WPGraphQL API → Next.js (Rendering) → Vercel (Hosting)
                                    ↓
                           Google Maps + Analytics
```

---

## Coding Guidelines

### TypeScript/Next.js Conventions
- **Naming:**
  - Variables/Functions: `camelCase`
  - Components: `PascalCase`
  - Constants: `UPPER_SNAKE_CASE`
  - Files: `PascalCase.tsx` for components, `camelCase.ts` for utilities
- **Formatting:**
  - Indentation: 2 spaces
  - Line length: 100 characters max
  - Quotes: Single quotes for strings
  - Semicolons: Required
  - Trailing commas: Yes

### React Component Structure
```typescript
// External imports
import React from 'react';
import { useQuery } from '@apollo/client';

// Internal imports
import { Button } from '@/components/ui/button';

// Types
interface Props { /* ... */ }

// Component
export function TrailCard({ trail }: Props) {
  // Implementation
}
```

### WordPress Conventions
- Custom post type slug: `trail_report`
- ACF field naming: `snake_case` (e.g., `distance_km`, `elevation_gain_m`)
- Taxonomy slugs: `kebab-case` (e.g., `trail-type`, `western-tatras`)

### Git Workflow
- Branch naming: `feature/trail-filtering`, `bugfix/map-markers`, `hotfix/critical-bug`
- Commit messages: Conventional Commits format
  - `feat(trails): add difficulty filter to trail database`
  - `fix(map): correct GPS coordinate parsing`
  - `docs(api): update WPGraphQL query examples`

---

## Development Commands

### Next.js Development
```bash
npm run dev          # Start Next.js dev server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### WordPress Development
- Access WordPress admin: `https://your-wordpress-site.com/wp-admin`
- Create trail reports via Custom Post Type "Trail Report"
- Manage taxonomies: Regions, Difficulty, Season, Trail Type, Features
- Test WPGraphQL queries: `https://your-wordpress-site.com/graphql` (GraphiQL)
- Moderate comments: WordPress → Comments

### Claude Code Commands
- `/claude-config-init` - Initialize project structure ✅ (already done)
- `/generate-docs-from-prd` - Generate all documentation from PRD.md ✅ (already done)
- `/orchestrate <task>` - Delegate complex tasks to specialized subagents
- `/update-docs [focus]` - Synchronize documentation with code changes
- `/apply-branding` - Apply SmartCamp.AI branding (NOT recommended for this project)

---

## Subagent Workflow

This project uses specialized subagents for different aspects of development:

- **architect** - System architecture, headless WordPress decisions, ADRs
- **api-designer** - WPGraphQL queries, REST endpoints, Google Maps API
- **db-designer** - WordPress database schema, ACF fields, taxonomies
- **feature-planner** - Feature breakdown with user stories and acceptance criteria
- **implementer** - Code implementation (WordPress PHP, Next.js TypeScript/React)
- **visual-excellence-architect** - Frontend UI/UX for modern, visually appealing interfaces
- **doc-guardian** - Documentation synchronization with code changes
- **brand-guardian** - SmartCamp.AI branding (NOT applicable to this project)

**Note:** This project uses a rugged outdoor design aesthetic (not SmartCamp branding). See @docs/DESIGN.md for design system.

---

## Important Development Rules

### Before Writing Code
1. **Read ALL documentation** - PRD.md, architecture.md, API.md, db-schema.md, features.md
2. **Check TODO.md** - See current phase and next tasks
3. **Review DECISIONS.md** - Understand architectural choices (8 ADRs)

### When Implementing Features
- ✅ Follow the 5-phase roadmap in @docs/ROADMAP.md
- ✅ Mark tasks in @TODO.md as you complete them
- ✅ Test on mobile and desktop (responsive design is critical)
- ✅ Ensure bilingual support (Polish/English for all content)
- ✅ Add alt text to all images (accessibility requirement)
- ✅ Optimize images (WebP format, Next.js Image component)

### When Making Changes
- ❌ **Never** modify architecture without updating docs/architecture.md
- ❌ **Never** change API without updating docs/API.md
- ❌ **Never** change database schema without updating docs/db-schema.md
- ❌ **Never** add features without updating docs/features.md
- ❌ **Never** commit API keys or secrets (.env files)
- ✅ **Always** run `/update-docs` after significant code changes
- ✅ **Always** test WPGraphQL queries before using in Next.js
- ✅ **Always** update TODO.md checkboxes for completed tasks

---

## Key Files & Endpoints

### Environment Variables
- `.env.example` - Template with all required variables
- Required: `WORDPRESS_API_URL`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, `NEXT_PUBLIC_SITE_URL`

### WordPress GraphQL Endpoint
- Development: `https://your-wordpress-site.com/graphql`
- Production: Set in `WORDPRESS_API_URL` environment variable

### Trail Data Structure
Each trail report has:
- **Custom Fields (ACF):**
  - `difficulty` (select: Easy, Moderate, Difficult, Very Difficult, Expert)
  - `distance_km` (number)
  - `elevation_gain_m` (number)
  - `estimated_time_hours` (number)
  - `gps_latitude`, `gps_longitude` (text/number)
  - `gallery` (image array)
- **Taxonomies:**
  - Region (Western Tatras, High Tatras, Eastern Tatras)
  - Season (Spring, Summer, Fall, Winter, Year-round)
  - Trail Type (Loop, Out-and-back, Point-to-point)
  - Features (Waterfall, Peak, Mountain Hut, Viewpoint, Lake, Ridge)

---

## Design System (NOT SmartCamp)

**Color Palette:**
- Primary: Deep forest green `#2C5F2D` or slate blue `#4A5F7A`
- Secondary: Earth brown `#8B7355` or rust orange `#C97132`
- Accent: Bright trail marker yellow `#FFC857`

**Typography:**
- Headers: Montserrat or Poppins (bold, modern sans-serif)
- Body: Open Sans or Inter (readable)

**Design Aesthetic:**
- Rugged/outdoorsy feel (earthy tones, mountain imagery)
- Content-first approach (trail info takes center stage)
- Mobile-first responsive design
- Fast loading (optimized images, efficient code)

See @docs/DESIGN.md for complete design system.

---

## Current Project Status

**Phase:** Planning & Documentation ✅ Complete
**Next Phase:** Phase 1 - WordPress Backend Setup

**Completed:**
- ✅ Project initialization (claude-config-init)
- ✅ PRD.md with comprehensive requirements (732 lines)
- ✅ Architecture documentation (headless WordPress + Next.js)
- ✅ API documentation (WPGraphQL queries, REST endpoints)
- ✅ Database schema (WordPress custom post types, ACF fields)
- ✅ Features documentation (40 features with user stories)
- ✅ Supporting documentation (DESIGN, TESTING, conventions, ROADMAP, DECISIONS)
- ✅ README.md with setup instructions
- ✅ TODO.md with 5-phase task checklist
- ✅ .env.example with all environment variables

**Next Steps:**
1. Set up WordPress hosting (choose provider: shared hosting, VPS, or managed WordPress)
2. Install WordPress 6.4+ with required plugins (WPGraphQL, WPML/Polylang, ACF Pro)
3. Configure custom post type "Trail Report" and taxonomies
4. Create sample trail content (2-3 trails with photos)
5. Initialize Next.js 14 project with TypeScript and Tailwind CSS

See @TODO.md for complete task checklist.

---

## Useful Resources

- **WPGraphQL Docs:** https://www.wpgraphql.com/docs/introduction
- **WPML Docs:** https://wpml.org/documentation/
- **Polylang Docs:** https://polylang.pro/doc/
- **Google Maps JavaScript API:** https://developers.google.com/maps/documentation/javascript
- **Next.js WordPress Template:** https://vercel.com/templates/cms/nextjs-wordpress-headless-cms
- **ACF GraphQL:** https://www.wpgraphql.com/acf/

---

**Last Updated:** 2025-11-11
**Project Version:** 0.1.0 (Documentation Phase Complete)
