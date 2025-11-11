# Architecture Documentation

**Project:** Tatra Trails Blog (moje-tatry)
**Created:** 2025-11-11
**Last Updated:** 2025-11-11
**Architecture Type:** Headless CMS (WordPress) + JAMstack (Next.js)

## Overview

Tatra Trails is a bilingual (Polish/English) hiking blog built on a modern headless architecture, separating content management from presentation. The system uses WordPress as a headless CMS for content authoring and management, exposing data via WPGraphQL API, consumed by a Next.js frontend deployed on Vercel. This architecture provides the familiar WordPress editing experience while delivering a blazing-fast, SEO-optimized React-based frontend.

**Core Objectives:**
- Provide comprehensive trail information for Tatra Mountains hikers
- Support bilingual content (Polish/English) with seamless language switching
- Deliver excellent performance and SEO for organic search growth
- Enable easy content management through WordPress admin
- Display monetization elements (ads, affiliate links)
- Support community engagement through moderated comments

## Tech Stack

### Frontend (Client-Side Rendering & SSR)

**Core Framework:**
- **Next.js 14+** - React framework with App Router
  - Rationale: Built-in SSR/SSG, excellent SEO, automatic code splitting, image optimization, Vercel deployment optimization
- **React 18+** - UI library
  - Rationale: Industry standard, large ecosystem, component reusability
- **TypeScript** - Type safety
  - Rationale: Catch errors at compile time, better IDE support, improved maintainability

**Styling & UI:**
- **Tailwind CSS 3.x** - Utility-first CSS framework
  - Rationale: Rapid development, consistent design system, small production bundle, responsive utilities
- **Headless UI** (optional) - Unstyled, accessible components
  - Rationale: Accessibility built-in, fully customizable with Tailwind

**Data Fetching:**
- **Apollo Client** or **@apollo/experimental-nextjs-app-support** - GraphQL client
  - Rationale: Robust GraphQL client, caching, normalized store, DevTools support
- **graphql-request** (alternative) - Lightweight GraphQL client
  - Rationale: Simpler alternative if Apollo is overkill

**Maps Integration:**
- **@react-google-maps/api** - Google Maps React wrapper
  - Rationale: Official React bindings, TypeScript support, hooks-based API

**Image Handling:**
- **Next.js Image Component** - Automatic image optimization
  - Rationale: WebP conversion, lazy loading, responsive images, built-in

**Markdown/Content Rendering:**
- **html-react-parser** - Parse WordPress HTML content
  - Rationale: Safe HTML parsing, converts to React elements
- **DOMPurify** - Sanitize HTML from WordPress
  - Rationale: XSS protection when rendering user content

### Backend (Content Management System)

**CMS Platform:**
- **WordPress 6.4+** - Headless CMS
  - Rationale: Familiar admin interface, mature ecosystem, excellent multilingual support, plugin extensibility
- **PHP 8.0+** - WordPress runtime
  - Rationale: WordPress requirement, modern PHP performance improvements
- **MySQL 8.0+** - Relational database
  - Rationale: WordPress standard, proven reliability, transaction support

**WordPress Plugins (Core):**
- **WPGraphQL 1.18+** - GraphQL API layer
  - Rationale: Modern API standard, type-safe queries, efficient data fetching, avoids REST overfetching
- **WPGraphQL for Advanced Custom Fields** - Expose ACF fields via GraphQL
  - Rationale: Makes custom trail data accessible through GraphQL
- **Advanced Custom Fields (ACF) Pro 6.x** - Custom field management
  - Rationale: Powerful field builder, repeater fields, gallery fields, developer-friendly
- **WPML 4.6+** OR **Polylang Pro 3.5+** - Multilingual content
  - Rationale: Complete translation management, language switcher, SEO support (hreflang)
  - Choice: WPML (more features) vs Polylang (lighter, cheaper)

**WordPress Plugins (SEO & Security):**
- **Yoast SEO 21+** OR **Rank Math 1.0.118+** - SEO optimization
  - Rationale: Meta tags, XML sitemaps, schema markup, breadcrumbs, social previews
- **Wordfence Security 7.10+** - Security hardening
  - Rationale: Firewall, malware scanning, login security, brute force protection
- **Akismet 5.3+** - Comment spam filtering
  - Rationale: WordPress.com powered spam detection, essential for comment moderation

**WordPress Plugins (Performance & Backups):**
- **WP Rocket 3.15+** OR **W3 Total Cache** - Caching
  - Rationale: Page caching, minification, database optimization (reduces GraphQL query load)
- **Smush Pro** OR **EWWW Image Optimizer** - Image optimization
  - Rationale: Compress images, lazy loading, WebP conversion for WordPress admin
- **UpdraftPlus Premium** OR **BackupBuddy** - Automated backups
  - Rationale: Scheduled backups to cloud storage (Dropbox, S3), easy restoration

**WordPress Plugins (Optional/Recommended):**
- **WPGraphQL CORS** - Enable CORS for Next.js frontend
  - Rationale: Allow cross-origin requests from Vercel domain
- **Redirection** - URL redirect management
  - Rationale: Handle permalink changes, 301 redirects for SEO

### Database

**Primary Database:**
- **MySQL 8.0+** (or **MariaDB 10.6+**)
  - Schema: WordPress standard tables + ACF custom field tables
  - Rationale: WordPress native support, ACID compliance, proven at scale

**Caching Layer (Optional for WordPress):**
- **Redis** OR **Memcached** - Object cache
  - Rationale: Cache WPGraphQL query results, reduce database load
- **WordPress Object Cache Plugin** (if using Redis/Memcached)
  - Rationale: Drop-in cache for WP queries

### Infrastructure & Hosting

**Frontend Hosting:**
- **Vercel** - Next.js deployment platform
  - Rationale: Zero-config Next.js deployment, edge network CDN, automatic HTTPS, preview deployments, excellent DX
  - Alternative: Netlify, AWS Amplify

**Backend Hosting:**
- **Self-Hosted WordPress** - Managed VPS or shared hosting
  - Recommended Providers:
    - **SiteGround** (managed WordPress)
    - **WP Engine** (premium managed WordPress)
    - **DigitalOcean** (VPS with manual management)
    - **Cloudways** (managed cloud hosting)
  - Requirements: PHP 8.0+, MySQL 8.0+, HTTPS/SSL, cPanel or similar
  - Rationale: Full control over WordPress installation, plugin access, custom configurations

**CDN (Content Delivery Network):**
- **Cloudflare** (free tier) - Global CDN and DNS
  - Rationale: DDoS protection, SSL/TLS, caching, firewall, improves WordPress performance globally
- **Vercel Edge Network** - Automatic for Next.js frontend
  - Rationale: Built-in, serves static assets from edge locations

**DNS & Domain:**
- **Cloudflare DNS** - Fast, secure DNS management
  - Rationale: Fast propagation, DNSSEC support, analytics

**SSL/TLS:**
- **Let's Encrypt** (via hosting provider) - WordPress HTTPS
  - Rationale: Free, auto-renewal, trusted certificate authority
- **Vercel Automatic SSL** - Next.js frontend HTTPS
  - Rationale: Automatic, included

### APIs & Integrations

**GraphQL API:**
- **WPGraphQL** - Primary data API
  - Endpoint: `https://wordpress-domain.com/graphql`
  - Authentication: Public queries (no auth for reading), JWT for mutations (future)
  - Rationale: Single endpoint, type-safe schema, efficient queries with fragments

**REST API (Limited Use):**
- **WordPress REST API** - Comment submission, contact forms
  - Endpoints: `/wp-json/wp/v2/comments` (POST)
  - Rationale: Native WordPress API for mutations, easier than GraphQL mutations for simple operations

**Third-Party APIs:**
- **Google Maps JavaScript API** - Interactive maps
  - Usage: Individual trail maps, comprehensive trails map
  - Billing: Pay-as-you-go (free tier: 28,000 map loads/month)
  - API Key Security: Restrict by domain (Vercel domain)
- **Google Analytics 4** - Visitor tracking (via gtag.js)
  - Rationale: Free, comprehensive analytics, event tracking
- **Google AdSense** - Display advertising
  - Integration: Async ad units, responsive sizes
  - Rationale: Monetization, easy integration
- **Amazon Associates API** (optional) - Affiliate product links
  - Rationale: Monetize gear recommendations

### Development Tools

**Version Control:**
- **Git** - Source control
- **GitHub** - Repository hosting, CI/CD triggers
  - Rationale: Vercel integration, PR previews, issue tracking

**Package Management:**
- **npm** OR **pnpm** - Node.js package manager
  - Rationale: Dependency management, lockfiles

**CI/CD:**
- **Vercel Git Integration** - Automatic deployments
  - Rationale: Automatic preview deployments per PR, production deployments on merge to main
- **GitHub Actions** (optional) - Additional workflows
  - Rationale: Run tests, linting, type checking before deployment

**Code Quality:**
- **ESLint** - JavaScript/TypeScript linting
  - Config: `eslint-config-next` (Next.js recommended)
- **Prettier** - Code formatting
  - Rationale: Consistent code style
- **TypeScript Compiler** - Type checking
  - Rationale: Catch type errors before runtime

**Local Development:**
- **Local by Flywheel** OR **Docker (wordpress:latest)** - Local WordPress
  - Rationale: Test WordPress configuration, plugin setup locally
- **Next.js Dev Server** (`npm run dev`) - Local frontend
  - Rationale: Hot reload, fast refresh, local API testing

## System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          USERS (Global)                          │
│                    (Desktop, Mobile, Tablet)                     │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE CDN + DNS                          │
│              (DDoS Protection, SSL/TLS, Caching)                 │
└─────────────┬────────────────────────────────┬──────────────────┘
              │                                │
              │ (Frontend)                     │ (Backend)
              ▼                                ▼
┌─────────────────────────────┐  ┌────────────────────────────────┐
│      VERCEL EDGE NETWORK    │  │   WORDPRESS HOSTING PROVIDER   │
│   (Next.js Frontend Hosting) │  │  (SiteGround/WP Engine/VPS)    │
│                              │  │                                │
│  ┌────────────────────────┐ │  │ ┌────────────────────────────┐ │
│  │   Next.js 14 App       │ │  │ │   WordPress 6.4+           │ │
│  │  (React 18 + TypeScript)│ │  │ │   (PHP 8.0 + MySQL 8.0)    │ │
│  │                         │ │  │ │                            │ │
│  │  - Homepage             │ │  │ │  - Admin Dashboard         │ │
│  │  - Trail Database       │ │  │ │  - Content Editor          │ │
│  │  - Individual Trails    │ │  │ │  - ACF Custom Fields       │ │
│  │  - Interactive Map      │ │  │ │  - WPML/Polylang           │ │
│  │  - Planning Guides      │ │  │ │  - Media Library           │ │
│  │  - About/Contact        │ │  │ │  - Comment Moderation      │ │
│  │                         │ │  │ │                            │ │
│  │  Components:            │ │  │ │  Plugins:                  │ │
│  │  - Tailwind CSS         │ │  │ │  - WPGraphQL               │ │
│  │  - Apollo Client        │◄─┼──┼─┤  - ACF Pro                 │ │
│  │  - Google Maps API      │ │  │ │  - WPML/Polylang           │ │
│  │  - Image Optimization   │ │  │ │  - Yoast SEO               │ │
│  │  - Language Switcher    │ │  │ │  - Wordfence Security      │ │
│  └────────────────────────┘ │  │ │  - Akismet                 │ │
│                              │  │ └────────────────────────────┘ │
│  SSR/SSG Rendering:         │  │                                │
│  - Server Components        │  │  ┌────────────────────────────┐ │
│  - Static Generation        │  │ │   WPGraphQL API Endpoint   │ │
│  - Incremental Static       │  │ │   /graphql                 │ │
│  - Client Hydration         │  │ │                            │ │
└──────────────┬──────────────┘  │ │  - Queries (GET)           │ │
               │                  │ │  - Mutations (POST)        │ │
               │                  │ └────────────────────────────┘ │
               │                  │                                │
               │                  │  ┌────────────────────────────┐ │
               │                  │ │   MySQL 8.0+ Database      │ │
               │                  │ │                            │ │
               │                  │ │  - wp_posts (trails, posts)│ │
               │                  │ │  - wp_postmeta (ACF data)  │ │
               │                  │ │  - wp_terms (taxonomies)   │ │
               │                  │ │  - wp_comments             │ │
               │                  │ │  - WPML language tables    │ │
               │                  │ └────────────────────────────┘ │
               │                  └────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   THIRD-PARTY SERVICES                           │
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐ │
│  │ Google Maps API  │  │ Google AdSense   │  │ Google         │ │
│  │ - Trail Maps     │  │ - Display Ads    │  │ Analytics 4    │ │
│  │ - Markers        │  │ - Revenue        │  │ - Tracking     │ │
│  └──────────────────┘  └──────────────────┘  └────────────────┘ │
│                                                                   │
│  ┌──────────────────┐                                            │
│  │ Amazon Associates│                                            │
│  │ - Affiliate Links│                                            │
│  └──────────────────┘                                            │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

**1. Content Creation Flow (Author → WordPress → Database)**
```
1. Author logs into WordPress admin (https://wordpress-domain.com/wp-admin)
2. Creates "Trail Report" custom post type
3. Fills in ACF custom fields (difficulty, distance, elevation, GPS, etc.)
4. Uploads photos to media library, creates gallery
5. Writes rich text content in block editor
6. Uses WPML/Polylang to create Polish and English versions
7. Publishes post → Saved to MySQL database
8. WPGraphQL automatically exposes data via GraphQL schema
```

**2. Frontend Data Fetching Flow (User Request → Next.js → WordPress)**
```
1. User navigates to https://tatra-trails.com/trail/morskie-oko
2. Next.js receives request on Vercel edge server (nearest location)
3. Next.js checks if page is statically generated (ISR cache)
   - IF cached: Serve cached HTML (fast)
   - IF not cached OR revalidation needed:
     a. Next.js sends GraphQL query to WordPress endpoint
     b. WPGraphQL processes query, fetches from MySQL
     c. Returns JSON data (trail data, content, taxonomies)
     d. Next.js renders React components with data (SSR)
     e. Sends HTML to user
     f. Client-side React hydrates page (interactive)
4. User sees rendered trail report page
5. User clicks language toggle → Client-side route change
6. Next.js fetches English version data via GraphQL (client-side)
7. Re-renders page with English content
```

**3. Interactive Features Flow**
```
Trail Database Filtering:
1. User selects filter (e.g., "Difficult" difficulty)
2. Client-side state updates (React)
3. GraphQL query sent with filter variables
4. WPGraphQL returns filtered trails
5. Trail cards re-render with filtered results

Comments Submission:
1. User fills comment form (name, email, comment)
2. Form submits to WordPress REST API endpoint
3. WordPress creates comment with "pending" status
4. Author receives notification in wp-admin
5. Author approves comment
6. Next time trail page loads, approved comment appears

Google Maps:
1. Trail page loads with GPS coordinates
2. Google Maps API initializes map
3. Marker placed at lat/long coordinates
4. User can interact (zoom, pan)
```

### Component Architecture (Next.js Frontend)

```
next.js-app/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx                # Root layout (header, footer, providers)
│   ├── page.tsx                  # Homepage
│   ├── [lang]/                   # Language-specific routes
│   │   ├── layout.tsx            # Language layout wrapper
│   │   ├── trails/
│   │   │   ├── page.tsx          # Trail database (filterable list)
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Individual trail report (dynamic)
│   │   ├── map/
│   │   │   └── page.tsx          # Interactive map page
│   │   ├── guides/
│   │   │   ├── page.tsx          # Planning guides archive
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Individual guide post
│   │   ├── about/
│   │   │   └── page.tsx          # About page
│   │   └── contact/
│   │       └── page.tsx          # Contact page
│   └── api/                      # API routes (if needed)
│       └── comments/
│           └── route.ts          # Proxy to WordPress REST API
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Site header with nav + language switcher
│   │   ├── Footer.tsx            # Site footer
│   │   └── Navigation.tsx        # Main navigation menu
│   ├── trail/
│   │   ├── TrailCard.tsx         # Trail preview card (thumbnail, stats)
│   │   ├── TrailFilters.tsx      # Filter sidebar/panel
│   │   ├── TrailStats.tsx        # Trail statistics display
│   │   ├── TrailMap.tsx          # Google Maps embed component
│   │   └── TrailGallery.tsx      # Photo gallery lightbox
│   ├── common/
│   │   ├── LanguageSwitcher.tsx  # PL/EN toggle
│   │   ├── SearchBar.tsx         # Trail search input
│   │   ├── CommentForm.tsx       # Comment submission form
│   │   ├── CommentList.tsx       # Display approved comments
│   │   └── AdUnit.tsx            # Google AdSense ad wrapper
│   └── map/
│       └── InteractiveMap.tsx    # Full-page Google Maps with markers
│
├── lib/
│   ├── wordpress/
│   │   ├── client.ts             # Apollo Client configuration
│   │   ├── queries.ts            # GraphQL queries (trails, posts, etc.)
│   │   └── types.ts              # TypeScript types for WordPress data
│   ├── google-maps/
│   │   └── config.ts             # Google Maps API initialization
│   └── utils/
│       ├── formatters.ts         # Date, number formatting
│       └── translations.ts       # Translation helpers
│
├── public/
│   ├── images/                   # Static images (logo, icons)
│   └── locales/                  # Translation JSON files (if not from WP)
│
├── styles/
│   └── globals.css               # Tailwind imports + global styles
│
├── .env.local                    # Environment variables (not committed)
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## Design Patterns & Architectural Principles

### 1. Headless CMS Pattern
- **Separation of Concerns**: WordPress handles content management, Next.js handles presentation
- **Benefits**: Best-in-class editing experience + modern frontend performance
- **Trade-off**: Added complexity (two systems to maintain)

### 2. JAMstack Architecture
- **JavaScript** (React/Next.js) + **APIs** (WPGraphQL) + **Markup** (Pre-rendered HTML)
- **Benefits**: Performance, security (no exposed database), scalability
- **Implementation**: Static generation where possible, SSR for dynamic content

### 3. Server-Side Rendering (SSR) + Static Generation (SSG)
- **SSR**: Trail pages rendered on-demand for fresh content
- **SSG**: Static pages (About, Contact) pre-built at build time
- **Incremental Static Regeneration (ISR)**: Cached trail pages revalidate every N seconds
- **Rationale**: Balance performance (static) with freshness (dynamic)

### 4. GraphQL Query Pattern
- **Fragments**: Reusable query fragments for trail data
- **Variables**: Dynamic queries for filtering (difficulty, region, etc.)
- **Normalized Cache**: Apollo Client deduplicates and caches data
- **Rationale**: Fetch exactly what you need, avoid overfetching/underfetching

### 5. Component-Based Architecture
- **Atomic Design**: Small, reusable components (TrailCard, TrailStats)
- **Composition**: Combine small components into pages
- **Props-Driven**: Components receive data via props (no direct API calls in components)
- **Rationale**: Maintainability, testability, reusability

### 6. Client-Side State Management
- **React Hooks**: useState, useEffect for local component state
- **URL State**: Filters stored in query parameters (shareable URLs)
- **Apollo Cache**: GraphQL data cached client-side
- **No Global State Library Initially**: Keep it simple, add Zustand/Jotai if needed later
- **Rationale**: Avoid over-engineering, leverage built-in solutions

### 7. Progressive Enhancement
- **Core Content Accessible Without JavaScript**: SSR ensures crawlers see content
- **JavaScript Enhances Experience**: Filtering, language switching, maps
- **Rationale**: SEO, accessibility, resilience

### 8. Mobile-First Responsive Design
- **Tailwind Breakpoints**: Design for mobile (320px), scale up to desktop (1440px)
- **Touch-Friendly**: Large tap targets, swipe gestures for galleries
- **Rationale**: Many hikers browse on mobile while planning trips

## Security Architecture

### Frontend Security (Next.js)

**1. Environment Variables**
- Secrets stored in `.env.local` (never committed)
- Vercel environment variables for production
- Public variables prefixed with `NEXT_PUBLIC_`
- Example:
  ```
  WORDPRESS_API_URL=https://wordpress-domain.com/graphql
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...
  NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXX
  ```

**2. API Key Protection**
- **Google Maps API**: Restrict by HTTP referrer (Vercel domain)
- **WordPress GraphQL**: Public for reading, future: JWT for mutations

**3. Content Sanitization**
- Use `DOMPurify` to sanitize HTML from WordPress before rendering
- Prevents XSS attacks from malicious WordPress content

**4. HTTPS Enforcement**
- Vercel automatically enforces HTTPS
- All API calls to WordPress over HTTPS only

**5. CORS Configuration**
- WordPress CORS headers allow Next.js domain
- WPGraphQL CORS plugin: Whitelist Vercel domain

### Backend Security (WordPress)

**1. Authentication & Authorization**
- Strong admin passwords (16+ characters, password manager)
- Two-factor authentication (Wordfence 2FA or Google Authenticator plugin)
- Limit login attempts (Wordfence)
- Change default admin username from "admin"
- WordPress role-based access control (only Editor/Admin roles)

**2. WordPress Hardening**
- Disable file editing in wp-config.php:
  ```php
  define('DISALLOW_FILE_EDIT', true);
  ```
- Move wp-config.php outside webroot (if possible)
- Change database table prefix from `wp_` to random prefix
- Hide WordPress version number
- Disable XML-RPC (if not needed for mobile apps)

**3. Plugin & Theme Security**
- Only install plugins from official WordPress repository
- Keep WordPress core + plugins + themes updated (automated updates)
- Remove unused plugins/themes
- Wordfence Security:
  - Web Application Firewall (WAF)
  - Malware scanning
  - IP blocking for brute force attempts

**4. Database Security**
- Strong MySQL password
- Database user with minimum required privileges
- Regular backups (UpdraftPlus to encrypted cloud storage)
- SQL injection prevention (WordPress uses prepared statements)

**5. SSL/TLS**
- Force HTTPS in WordPress settings
- HSTS headers (Strict-Transport-Security)
- SSL certificate from Let's Encrypt (free, auto-renewal)

**6. Comment Security**
- Akismet spam filtering
- Require comment moderation before publishing
- CAPTCHA (if spam is severe): Google reCAPTCHA plugin
- Sanitize comment input (WordPress does by default)

**7. File Upload Security**
- Restrict file types (images only for media library)
- Disable PHP execution in uploads directory
- Scan uploaded files for malware (Wordfence)

**8. Backup Strategy**
- Daily automated backups (UpdraftPlus)
- Store backups off-site (Dropbox, Google Drive, AWS S3)
- Backup includes: Database, plugins, themes, uploads
- Test restoration process quarterly

### API Security

**1. Rate Limiting**
- Cloudflare rate limiting rules (prevent DDoS)
- WordPress rate limiting for REST API (plugin: WP REST API Rate Limit)

**2. Input Validation**
- WordPress sanitizes all inputs by default
- GraphQL schema validates query structure
- Comment form: Server-side validation of name, email, content

**3. GDPR Compliance**
- Privacy Policy page explaining comment data storage
- WordPress GDPR compliance features (data export, data deletion)
- Cookie consent banner (if using analytics)

## Performance Strategy

### Frontend Performance (Next.js)

**1. Image Optimization**
- Next.js `<Image>` component:
  - Automatic WebP conversion
  - Lazy loading (images load as user scrolls)
  - Responsive sizes (srcset for different viewports)
  - Blur placeholder while loading
- Example:
  ```tsx
  <Image
    src={trail.featuredImage.url}
    alt={trail.title}
    width={800}
    height={600}
    placeholder="blur"
  />
  ```

**2. Code Splitting**
- Next.js automatic route-based code splitting
- Dynamic imports for heavy components:
  ```tsx
  const InteractiveMap = dynamic(() => import('@/components/map/InteractiveMap'), {
    ssr: false,  // Don't render on server (Google Maps needs window)
    loading: () => <MapSkeleton />
  })
  ```

**3. Static Generation + ISR**
- Static pages: About, Contact (built at build time)
- Trail pages: ISR with 60-second revalidation
  ```tsx
  export const revalidate = 60;  // Revalidate every 60 seconds
  ```
- Trail database: Client-side data fetching with caching

**4. Caching Strategy**
- Vercel Edge Network caches static assets (images, CSS, JS)
- Apollo Client caches GraphQL responses in-memory
- HTTP caching headers for trail pages:
  ```
  Cache-Control: s-maxage=60, stale-while-revalidate=300
  ```

**5. Font Optimization**
- Next.js font optimization with `next/font`:
  ```tsx
  import { Inter } from 'next/font/google'
  const inter = Inter({ subsets: ['latin'] })
  ```
- Self-hosts Google Fonts (no external request)

**6. Third-Party Script Optimization**
- Google Analytics loaded asynchronously
- AdSense async loading with lazy rendering
- Google Maps loaded only on map pages

**7. Bundle Size Optimization**
- Tree shaking (Webpack removes unused code)
- Analyze bundle with `@next/bundle-analyzer`
- Use lightweight libraries (e.g., `date-fns` instead of `moment.js`)

### Backend Performance (WordPress)

**1. WordPress Caching**
- WP Rocket plugin:
  - Page caching (HTML files)
  - Browser caching (static assets)
  - GZIP compression
  - Database optimization
  - Lazy loading images

**2. Object Caching (Optional)**
- Redis or Memcached for WP_Object_Cache
- Caches database queries
- Reduces MySQL load for repeated GraphQL queries

**3. Database Optimization**
- Regular database cleanup (revisions, spam comments, transients)
- Optimize database tables (WP-Optimize plugin)
- Index custom ACF fields used in queries

**4. CDN for WordPress Assets**
- Cloudflare CDN caches WordPress images, CSS, JS
- Reduces load on WordPress server
- Faster global delivery

**5. WPGraphQL Query Optimization**
- Limit query depth (prevent nested query abuse)
- Use query caching (WPGraphQL Smart Cache plugin)
- Fetch only required fields (GraphQL benefits)

### Monitoring & Metrics

**1. Performance Monitoring**
- **Google Lighthouse**: Monthly audits (Performance, SEO, Accessibility, Best Practices)
  - Target: 80+ scores across all categories
- **Vercel Analytics**: Real user monitoring (RUM)
  - Track Core Web Vitals: LCP, FID, CLS
- **Google PageSpeed Insights**: Public URL testing

**2. Uptime Monitoring**
- **UptimeRobot** (free): Ping WordPress + Next.js every 5 minutes
- Email alerts if site goes down
- Monitor GraphQL endpoint health

**3. Error Tracking**
- **Sentry** (optional): JavaScript error tracking
- Catch runtime errors in production
- Track error frequency and user impact

**4. Analytics**
- **Google Analytics 4**:
  - Pageviews, sessions, user demographics
  - Event tracking (filter usage, comment submissions)
  - Conversion tracking (affiliate link clicks)

## Deployment Strategy

### WordPress Deployment

**1. Initial WordPress Setup**
```
1. Choose hosting provider (SiteGround, WP Engine, or VPS)
2. Install WordPress via hosting control panel or SSH
3. Configure domain and SSL certificate
4. Install required plugins:
   - WPGraphQL
   - ACF Pro
   - WPML/Polylang
   - Yoast SEO
   - Wordfence Security
   - Akismet
   - WP Rocket
   - UpdraftPlus
5. Configure WPGraphQL endpoint: /graphql
6. Create custom post type "Trail Report" with ACF fields
7. Set up taxonomies (Region, Difficulty, Season, etc.)
8. Configure WPML languages (Polish, English)
9. Create initial content (5 sample trails)
10. Configure automated backups (daily to cloud storage)
```

**2. WordPress Updates**
- **Process**:
  1. Automated updates enabled for WordPress core minor versions
  2. Manual testing of major updates on staging environment first
  3. Plugin updates: Review changelog → Test on staging → Update production
  4. Theme updates: Test on staging before production
- **Rollback Plan**: UpdraftPlus backup restoration if update breaks site

**3. WordPress Maintenance**
- Daily automated backups (3:00 AM server time)
- Weekly database optimization (WP-Optimize)
- Monthly security scans (Wordfence)
- Quarterly restoration test (verify backups work)

### Next.js Deployment (Vercel)

**1. Initial Vercel Setup**
```
1. Push Next.js code to GitHub repository
2. Connect Vercel to GitHub account
3. Import repository in Vercel dashboard
4. Configure environment variables:
   - WORDPRESS_API_URL (GraphQL endpoint)
   - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
   - NEXT_PUBLIC_GA_MEASUREMENT_ID
5. Configure custom domain (tatra-trails.com)
6. Vercel automatically deploys on commit to main branch
7. Automatic HTTPS certificate provisioned
```

**2. Continuous Deployment Workflow**
```
Development Branch Workflow:
1. Developer creates feature branch: git checkout -b feature/trail-filters
2. Make code changes locally
3. Test locally: npm run dev
4. Commit changes: git commit -m "Add trail filtering"
5. Push to GitHub: git push origin feature/trail-filters
6. Create Pull Request on GitHub
7. Vercel automatically creates preview deployment
8. Review preview URL (e.g., tatra-trails-pr-5.vercel.app)
9. Merge PR to main branch after review
10. Vercel automatically deploys to production (tatra-trails.com)
11. Deployment takes ~2-3 minutes
```

**3. Deployment Environments**
- **Production**: `main` branch → tatra-trails.com
- **Preview**: Pull Requests → unique Vercel preview URL
- **Local Development**: `npm run dev` → localhost:3000

**4. Rollback Strategy**
- Vercel keeps deployment history
- One-click rollback to previous deployment in Vercel dashboard
- Alternative: Revert git commit and push (triggers new deployment)

**5. Build Optimization**
- Vercel build cache speeds up deployments
- Only changed pages rebuild (Incremental Static Regeneration)
- Average build time: 2-5 minutes

### CI/CD Pipeline (Optional)

**GitHub Actions Workflow** (`.github/workflows/ci.yml`):
```yaml
name: CI
on: [pull_request]
jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint        # ESLint
      - run: npm run type-check  # TypeScript
      - run: npm run test        # Jest (future)
```

**Benefits**: Catch errors before deployment, enforce code quality

### Domain & DNS Configuration

**DNS Records (Cloudflare)**:
```
Type    Name              Value
A       tatra-trails.com  76.76.21.21 (Vercel IP)
CNAME   www               cname.vercel-dns.com
A       wp                123.45.67.89 (WordPress hosting IP)
```

**Subdomain Strategy**:
- `tatra-trails.com` → Next.js frontend (Vercel)
- `wp.tatra-trails.com` → WordPress admin (WordPress hosting)
- GraphQL endpoint: `https://wp.tatra-trails.com/graphql`

### Monitoring Deployment Health

**1. Vercel Deployment Checks**
- Build logs accessible in Vercel dashboard
- Build status notifications (email, Slack)
- Preview deployments for QA testing

**2. WordPress Health Check**
- UptimeRobot monitors `https://wp.tatra-trails.com/graphql`
- Alert if endpoint returns error or times out

**3. Post-Deployment Smoke Tests**
- Manual checks after production deployment:
  1. Homepage loads correctly
  2. Trail database filtering works
  3. Individual trail page displays
  4. Language switcher functions
  5. Google Maps render
  6. Comments submit successfully

## Scalability Strategy

### Current Architecture Scalability

**Expected Initial Load**: 10,000 monthly visitors (MVP)

**Frontend Scalability (Vercel)**:
- **Horizontal Scaling**: Automatic (Vercel edge network)
- **Traffic Capacity**: Supports millions of requests (Vercel CDN)
- **Cost**: Free tier → Pro ($20/month) at ~100GB bandwidth
- **Bottleneck**: None expected at 10K visitors

**Backend Scalability (WordPress)**:
- **Traffic Capacity**: 10K-50K monthly visitors on shared hosting
- **Database**: MySQL handles 100-500 trail reports easily
- **Bottleneck**: WordPress server CPU/RAM on shared hosting
- **Cost**: SiteGround StartUp ($3/month) → GrowBig ($5/month) at 25K+ visitors

### Scaling Plan for Growth

**Phase 1: 10K-50K Monthly Visitors** (Current Architecture)
- No changes needed
- Monitor WordPress server resources
- Ensure WP Rocket caching enabled

**Phase 2: 50K-100K Monthly Visitors**
- Upgrade WordPress hosting tier (more RAM, CPU)
- Add Redis object cache for WordPress
- Enable WPGraphQL Smart Cache plugin
- Consider Cloudflare Pro ($20/month) for advanced caching

**Phase 3: 100K-500K Monthly Visitors**
- Migrate WordPress to VPS (DigitalOcean, Cloudways)
- Dedicated MySQL database with replication
- Enable CDN for WordPress images (Cloudflare, BunnyCDN)
- Consider GraphQL query rate limiting

**Phase 4: 500K+ Monthly Visitors**
- Migrate to WP Engine managed hosting (optimized for headless)
- Database read replicas for GraphQL queries
- Consider Edge caching for GraphQL responses (Stellate, Cloudflare Workers)
- Split WordPress multisite for Polish vs English (if needed)

### Performance Under Load

**Caching Layers**:
```
User Request
    ↓
1. Vercel Edge Cache (static assets) ← ~100ms response
    ↓ (miss)
2. Next.js ISR Cache (HTML pages) ← ~200ms response
    ↓ (miss)
3. WPGraphQL Query
    ↓
4. WordPress Object Cache (Redis) ← ~300ms response
    ↓ (miss)
5. MySQL Database Query ← ~500ms response
```

**Result**: 90%+ requests served from cache (fast), 10% hit database

## Architectural Decisions (ADRs)

### ADR-001: Headless WordPress over Traditional WordPress Theme

**Context**: Need CMS for content management + fast modern frontend.

**Decision**: Use headless WordPress (WPGraphQL API) with separate Next.js frontend instead of traditional WordPress theme.

**Rationale**:
- WordPress provides familiar editing experience for non-technical users
- Next.js delivers superior performance (SSR, static generation)
- Decouples frontend from WordPress (future-proof)
- Better developer experience (React vs PHP templates)
- Excellent SEO with server-side rendering

**Consequences**:
- Positive: Fast frontend, modern development, scalability, great SEO
- Negative: More complex setup, two systems to maintain, GraphQL learning curve
- Mitigation: Document setup thoroughly, use Vercel templates as starting point

### ADR-002: WPGraphQL over WordPress REST API

**Context**: Need API layer to fetch WordPress content in Next.js.

**Decision**: Use WPGraphQL instead of WordPress REST API.

**Rationale**:
- GraphQL prevents overfetching (fetch only needed fields)
- Single endpoint for all queries (vs multiple REST endpoints)
- Type-safe schema (better TypeScript integration)
- Flexible queries (client specifies data structure)
- Better performance for complex nested data (trail + taxonomies + translations)

**Consequences**:
- Positive: Efficient data fetching, fewer API calls, better performance
- Negative: GraphQL learning curve, limited mutation support (use REST for comments)
- Mitigation: Use Apollo Client DevTools for debugging, document common queries

### ADR-003: WPML over Polylang for Multilingual

**Context**: Need bilingual content management (Polish/English).

**Decision**: Use WPML (recommended) over Polylang.

**Rationale**:
- WPML has better SEO features (automatic hreflang tags)
- More robust translation management interface
- Better integration with WPGraphQL
- Supports translation of taxonomies, custom fields, menus
- Industry standard for WordPress multilingual

**Consequences**:
- Positive: Complete multilingual solution, excellent SEO support
- Negative: Higher cost (~$99/year vs Polylang $99 one-time)
- Alternative: Polylang Pro if budget is limited (still excellent, slightly less features)

### ADR-004: Vercel over Netlify/AWS for Next.js Hosting

**Context**: Need hosting platform for Next.js frontend.

**Decision**: Deploy Next.js on Vercel.

**Rationale**:
- Vercel created Next.js (best integration, first-class support)
- Zero-config deployment (push to GitHub → automatic deploy)
- Excellent DX (preview deployments, instant rollback)
- Edge network CDN included
- Generous free tier (sufficient for MVP)
- Optimal Next.js performance (Vercel optimizes builds)

**Consequences**:
- Positive: Fast deployment, great performance, easy scaling
- Negative: Vendor lock-in to Vercel, costs scale with bandwidth
- Mitigation: Next.js is portable (can migrate to AWS Amplify if needed)

### ADR-005: Google Maps over Mapbox for Trail Maps

**Context**: Need mapping solution for trail locations and interactive map.

**Decision**: Use Google Maps JavaScript API.

**Rationale**:
- Familiar UX (users know Google Maps)
- Excellent documentation and community support
- Generous free tier (28,000 map loads/month)
- No credit card required for free tier
- Satellite imagery available (useful for trails)
- Easy marker customization

**Consequences**:
- Positive: Familiar, reliable, easy to implement, sufficient free tier
- Negative: Costs if exceeding free tier (~$7/1000 loads), less customizable than Mapbox
- Mitigation: Monitor usage, add API key restrictions, switch to Mapbox if costs exceed budget

### ADR-006: Tailwind CSS over Custom CSS/Bootstrap

**Context**: Need styling solution for responsive, modern UI.

**Decision**: Use Tailwind CSS utility-first framework.

**Rationale**:
- Rapid development with utility classes
- Consistent design system (spacing, colors, typography)
- Small production bundle (unused classes purged)
- Excellent responsive utilities (mobile-first)
- No naming conflicts (no BEM required)
- Great Next.js integration

**Consequences**:
- Positive: Fast development, consistent design, small bundle size
- Negative: HTML can look cluttered with many classes, learning curve
- Mitigation: Extract components for reusability, use @apply for complex patterns

### ADR-007: Monorepo vs Separate Repos (Current: Separate)

**Context**: Manage WordPress configuration and Next.js codebase.

**Decision**: Use separate repositories (wordpress-config repo + next.js repo).

**Rationale**:
- WordPress hosted separately from Next.js (different hosting providers)
- Different deployment processes (manual WordPress vs automatic Vercel)
- WordPress changes infrequent (plugin config, ACF setup)
- Next.js changes frequent (feature development)
- Simpler CI/CD (only Next.js needs automated deployment)

**Consequences**:
- Positive: Clear separation of concerns, simpler deployments
- Negative: Need to sync changes manually if GraphQL schema changes
- Mitigation: Document WordPress config, version control ACF JSON exports

### ADR-008: Server-Side Rendering (SSR) over Static Site Generation (SSG) for Trail Pages

**Context**: Trail pages need fresh content but also SEO benefits.

**Decision**: Use Incremental Static Regeneration (ISR) with short revalidation interval (60 seconds).

**Rationale**:
- ISR combines benefits: static performance + fresh content
- Revalidates every 60 seconds (trails don't change frequently)
- First request after revalidation triggers rebuild
- Stale content served while rebuilding (stale-while-revalidate)
- Better than pure SSR (faster) and pure SSG (too stale)

**Consequences**:
- Positive: Fast load times, SEO benefits, reasonably fresh content
- Negative: First visitor after revalidation sees slightly slower load
- Mitigation: Accept trade-off (60s stale data acceptable for trail reports)

---

## Version History

**Version 1.0** (2025-11-11)
- Initial architecture documentation
- Headless WordPress + Next.js architecture defined
- Tech stack finalized
- Security, performance, deployment strategies documented
- 8 Architectural Decision Records created

---

## Related Documentation

- **PRD.md**: Product requirements and feature specifications
- **docs/API.md**: WPGraphQL schema and endpoint documentation
- **docs/db-schema.md**: WordPress database schema and ACF fields
- **docs/features.md**: Feature breakdown and user stories
- **docs/DEPLOYMENT.md**: Detailed deployment procedures
- **docs/SECURITY.md**: Security policies and incident response
- **docs/PERFORMANCE.md**: Performance optimization techniques

---

**Document Owner**: Chief Architect
**Review Cycle**: Quarterly or when major architectural changes proposed
**Next Review**: 2026-02-11
