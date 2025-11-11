# Architectural Decision Records (ADR)

**Project:** Tatra Trails Blog (moje-tatry)
**Created:** 2025-11-11
**Last Updated:** 2025-11-11

This document records major architectural decisions made for this project. Each ADR captures the context, decision, and consequences of significant technical choices.

Format based on [Michael Nygard's template](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions).

---

## ADR-001: Headless WordPress over Traditional WordPress Theme

**Date:** 2025-11-11
**Status:** Accepted

### Context

We need a content management system (CMS) for managing trail reports, blog posts, and media. Traditional WordPress uses PHP templates to render pages server-side, coupling content management with presentation. We're evaluating:

1. **Traditional WordPress Theme** (PHP-based monolith)
2. **Headless WordPress** (WordPress as CMS, separate frontend)
3. **Full-stack JavaScript** (Next.js + Strapi/Sanity)

**Requirements:**
- Bilingual content management (Polish/English)
- Non-technical author can create/edit content
- Mature ecosystem with plugins for SEO, multilingual, security
- Scalable frontend with modern UX
- Fast page loads, good SEO

### Decision

We will use **Headless WordPress** (WordPress as backend CMS, Next.js as frontend).

**Rationale:**
- **WordPress familiarity**: Author already experienced with WordPress admin
- **Plugin ecosystem**: Mature multilingual (WPML/Polylang), SEO (Yoast), ACF for custom fields
- **Content flexibility**: Rich text editor, media library, version history, scheduling
- **Modern frontend**: Next.js provides modern UX, fast rendering, optimized images
- **Decoupling**: Separate content management from presentation layer
- **API-first**: WPGraphQL provides type-safe, efficient data fetching

### Consequences

**Positive:**
- Best of both worlds: WordPress content management + React frontend
- Author can use familiar WordPress admin interface
- Next.js provides excellent performance, SEO, developer experience
- Easy to add interactive features (maps, filters) without WordPress constraints
- Can switch frontend technology later without migrating content

**Negative:**
- Requires managing two separate systems (WordPress + Next.js)
- Additional complexity compared to traditional WordPress
- Need to maintain two separate deployments (WordPress hosting + Vercel)
- Learning curve for developers unfamiliar with headless architecture

**Risks:**
- WordPress plugin compatibility issues (some plugins designed for traditional themes)
- Need to implement features that WordPress themes provide (comments, search)
- Preview/draft functionality requires custom implementation

**Mitigation:**
- Use well-tested plugins with WPGraphQL support
- Leverage Next.js ecosystem for missing features
- Implement simple preview system or use WordPress preview with traditional theme fallback

---

## ADR-002: WPGraphQL over WordPress REST API

**Date:** 2025-11-11
**Status:** Accepted

### Context

With headless WordPress, we need an API to fetch content. WordPress provides:

1. **WordPress REST API** (REST endpoints, JSON responses)
2. **WPGraphQL** (GraphQL endpoint, type-safe queries)

**Requirements:**
- Efficient data fetching (avoid over-fetching or under-fetching)
- Type-safe queries with TypeScript
- Support for custom post types, ACF fields, multilingual content
- Good developer experience
- Performance (minimize network requests)

### Decision

We will use **WPGraphQL** (with WPGraphQL for ACF extension).

**Rationale:**
- **Efficient queries**: Fetch only needed data in single request (no over-fetching)
- **Type safety**: GraphQL schema generates TypeScript types
- **Developer experience**: GraphQL Playground for query testing, autocomplete
- **Relationships**: Easy to fetch related content (taxonomies, comments, featured images)
- **ACF support**: WPGraphQL for ACF exposes custom fields automatically
- **Active ecosystem**: Well-maintained, documented, community support

### Consequences

**Positive:**
- Single request fetches all needed data (trail + taxonomies + featured image)
- TypeScript types auto-generated from GraphQL schema
- Reduced network overhead compared to multiple REST API calls
- GraphQL Playground makes development easier
- Apollo Client provides caching, optimistic updates

**Negative:**
- Learning curve for GraphQL (if unfamiliar)
- Additional plugin dependency (WPGraphQL)
- Potential for complex queries (requires careful optimization)
- REST API still needed for comments (POST endpoint)

**Risks:**
- WPGraphQL plugin updates could break queries
- Performance issues with deeply nested queries
- Need to monitor query complexity

**Mitigation:**
- Pin WPGraphQL version, test updates before deploying
- Use query fragments to keep queries maintainable
- Monitor query performance, add pagination where needed

---

## ADR-003: WPML over Polylang for Multilingual

**Date:** 2025-11-11
**Status:** Accepted

### Context

We need a multilingual plugin for managing Polish and English content. Options:

1. **WPML 4.6+** (mature, comprehensive, premium)
2. **Polylang Pro 3.5+** (lightweight, open-source core, premium add-ons)
3. **TranslatePress** (visual translation, beginner-friendly)

**Requirements:**
- Translate posts, pages, taxonomies, custom fields
- WPGraphQL integration for querying by language
- Language switcher UI
- SEO-friendly (hreflang tags, language-specific URLs)
- Good documentation and support

### Decision

We will use **WPML 4.6+** (premium license).

**Rationale:**
- **Maturity**: Industry standard, 15+ years of development
- **WPGraphQL support**: Official WPML WPGraphQL extension available
- **Comprehensive**: Translates everything (posts, taxonomies, menus, strings)
- **SEO features**: Automatic hreflang tags, language-specific sitemaps
- **ACF compatibility**: Works seamlessly with Advanced Custom Fields
- **Translation management**: Built-in translation workflow, supports translation services

**Alternative considered:**
- **Polylang Pro**: Lighter, cheaper, but less comprehensive WPGraphQL support

### Consequences

**Positive:**
- Full-featured multilingual solution
- Official WPGraphQL extension ensures compatibility
- Automatic SEO handling (hreflang, sitemaps)
- Easy for author to manage translations
- Translation memory reduces duplicate work

**Negative:**
- Premium cost (~$99/year for Multilingual CMS)
- Heavier plugin (more database queries)
- Can slow WordPress admin if not optimized

**Risks:**
- License cost increases with additional features
- Potential performance issues on shared hosting

**Mitigation:**
- Budget for annual license renewal
- Use managed WordPress hosting (WP Engine, SiteGround) for better performance
- Monitor WordPress performance, optimize queries

---

## ADR-004: Vercel over Netlify/AWS for Next.js Hosting

**Date:** 2025-11-11
**Status:** Accepted

### Context

We need to host the Next.js frontend. Options:

1. **Vercel** (Next.js creators, optimized for Next.js)
2. **Netlify** (JAMstack platform, good DX)
3. **AWS Amplify** (Full-stack AWS integration)
4. **Self-hosted VPS** (DigitalOcean, Linode)

**Requirements:**
- Fast global CDN
- Automatic deployments from GitHub
- Serverless functions for API routes
- Edge caching and ISR support
- Good free tier for MVP
- Easy to scale

### Decision

We will use **Vercel** (free tier initially, upgrade to Pro if needed).

**Rationale:**
- **Next.js optimization**: Vercel created Next.js, first-class support
- **Edge Network**: Global CDN, automatic edge caching
- **Zero config**: Deploy Next.js with one click, automatic optimizations
- **ISR support**: Built-in Incremental Static Regeneration
- **Generous free tier**: 100GB bandwidth/month, unlimited deployments
- **Developer experience**: Preview deployments for PRs, easy rollbacks
- **Analytics**: Built-in Web Vitals monitoring

**Alternative considered:**
- **Netlify**: Great for static sites, but Vercel better for Next.js
- **AWS**: More powerful but overkill for MVP, steeper learning curve

### Consequences

**Positive:**
- Zero-configuration Next.js deployments
- Automatic HTTPS, CDN, image optimization
- Preview deployments for every PR (great for testing)
- Fast edge network improves page load times globally
- Built-in analytics and Web Vitals tracking

**Negative:**
- Vendor lock-in (Vercel-specific features)
- Free tier bandwidth limits (100GB/month) - may need upgrade
- Serverless functions have cold start latency
- Limited control over infrastructure

**Risks:**
- Bandwidth overages (high traffic could exceed free tier)
- Cold start latency for serverless functions
- Future pricing changes

**Mitigation:**
- Monitor bandwidth usage, optimize images
- Implement caching to reduce serverless function invocations
- Budget for Pro plan ($20/month) if traffic grows

---

## ADR-005: Google Maps over Mapbox for Interactive Map

**Date:** 2025-11-11
**Status:** Accepted

### Context

We need an interactive map to display trail locations. Options:

1. **Google Maps JavaScript API** (mature, familiar, detailed maps)
2. **Mapbox GL JS** (customizable, modern, vector maps)
3. **Leaflet + OpenStreetMap** (open-source, free, community-driven)

**Requirements:**
- Display trail markers with custom colors
- Marker click popups with trail info
- Good map detail for Tatra Mountains region
- Reliable, maintained API
- Reasonable free tier for MVP

### Decision

We will use **Google Maps JavaScript API**.

**Rationale:**
- **Familiarity**: Most users recognize Google Maps interface
- **Map detail**: Excellent coverage of Tatra Mountains region
- **Reliability**: Mature, stable API with extensive documentation
- **Free tier**: $200 credit/month (covers ~28,000 map loads)
- **Ecosystem**: React libraries (e.g., @react-google-maps/api) available
- **Features**: Markers, info windows, clustering, terrain/satellite views

**Alternative considered:**
- **Mapbox**: More customizable, modern, but less familiar to users
- **Leaflet**: Free, but requires more setup, less detailed basemaps

### Consequences

**Positive:**
- Users already familiar with Google Maps UX
- Detailed, accurate maps of Tatra Mountains
- Easy integration with React libraries
- No immediate cost (free tier sufficient for MVP)
- Terrain and satellite views useful for hiking context

**Negative:**
- Vendor lock-in (Google Maps API)
- Potential cost if traffic exceeds free tier ($7/1000 map loads after free credit)
- Less customizable than Mapbox
- Requires API key (security consideration)

**Risks:**
- API usage costs if site goes viral
- Google Maps pricing changes
- API key exposure

**Mitigation:**
- Monitor API usage via Google Cloud Console
- Set up billing alerts ($50, $100 thresholds)
- Consider Mapbox migration if costs become prohibitive
- Restrict API key to specific domains (security)

---

## ADR-006: Tailwind CSS over Bootstrap/Custom CSS

**Date:** 2025-11-11
**Status:** Accepted

### Context

We need a CSS framework/strategy for styling the Next.js frontend. Options:

1. **Tailwind CSS** (utility-first, modern, popular)
2. **Bootstrap** (component-based, mature, opinionated)
3. **Custom CSS** (full control, no dependencies)
4. **CSS-in-JS** (Emotion, Styled Components)

**Requirements:**
- Fast development (prototyping to production)
- Responsive design (mobile-first)
- Customizable (match design system)
- Small bundle size (performance)
- Good developer experience

### Decision

We will use **Tailwind CSS**.

**Rationale:**
- **Utility-first**: Rapid development, no need to name CSS classes
- **Small bundle**: PurgeCSS removes unused styles (production bundles ~10KB)
- **Customizable**: Easy to extend with custom colors, fonts, spacing
- **Responsive**: Mobile-first breakpoints built-in (`sm:`, `md:`, `lg:`)
- **Developer experience**: IntelliSense, no context switching (HTML + CSS in one file)
- **Ecosystem**: Tailwind UI components, plugins (forms, typography)

**Alternative considered:**
- **Bootstrap**: Faster initial setup, but harder to customize, larger bundle
- **Custom CSS**: Full control, but slower development, harder to maintain

### Consequences

**Positive:**
- Rapid UI development (no need to write custom CSS)
- Small production CSS bundle (PurgeCSS removes unused classes)
- Consistent design (design tokens in tailwind.config.js)
- Responsive design easy (utility classes for breakpoints)
- Easy to refactor (change classes, no orphaned CSS)

**Negative:**
- HTML can look verbose (many utility classes)
- Learning curve for developers unfamiliar with utility-first CSS
- Potential for inconsistent spacing if not disciplined

**Risks:**
- Over-reliance on utility classes (hard to read HTML)
- Duplication of utility class combinations

**Mitigation:**
- Use `@apply` directive for repeated patterns
- Extract reusable components (TrailCard, Button)
- Enforce consistent design tokens (spacing, colors) in config

---

## ADR-007: Separate Repositories for WordPress & Next.js

**Date:** 2025-11-11
**Status:** Accepted

### Context

We need to decide how to structure source code repositories. Options:

1. **Monorepo** (single repo, /wordpress and /nextjs folders)
2. **Separate repos** (wordpress-backend, nextjs-frontend repos)
3. **Next.js only** (WordPress not in version control)

**Requirements:**
- Independent deployments (WordPress and Next.js)
- Different hosting (WordPress on VPS, Next.js on Vercel)
- Clear separation of concerns
- Easy to manage for solo developer

### Decision

We will use **separate repositories** (wordpress-backend, nextjs-frontend).

**Rationale:**
- **Independent deployments**: WordPress and Next.js deployed separately
- **Clear separation**: Backend (WordPress) vs. frontend (Next.js)
- **Different workflows**: WordPress rarely changes after setup, Next.js iterates frequently
- **Hosting flexibility**: Different deployment pipelines (FTP for WordPress, Vercel for Next.js)
- **Simpler CI/CD**: No need for monorepo tooling (Nx, Turborepo)

**Alternative considered:**
- **Monorepo**: Easier to share types/configs, but overkill for solo developer

### Consequences

**Positive:**
- Clear separation of backend and frontend
- Independent deployment schedules
- Smaller repos, faster git operations
- No monorepo tooling complexity

**Negative:**
- Potential for duplicated types (WordPress GraphQL types)
- Need to sync changes across repos (e.g., schema changes)
- Harder to coordinate breaking changes

**Risks:**
- Schema changes in WordPress break Next.js queries
- Duplicated configuration (ESLint, TypeScript)

**Mitigation:**
- Auto-generate TypeScript types from WPGraphQL schema (GraphQL Code Generator)
- Use semantic versioning for WordPress schema changes
- Document schema changes in CHANGELOG

---

## ADR-008: Incremental Static Regeneration (ISR) over Pure SSR or SSG

**Date:** 2025-11-11
**Status:** Accepted

### Context

We need to decide how Next.js pages are rendered. Options:

1. **SSR (Server-Side Rendering)**: Render on every request
2. **SSG (Static Site Generation)**: Pre-render at build time
3. **ISR (Incremental Static Regeneration)**: SSG + on-demand revalidation
4. **CSR (Client-Side Rendering)**: Render in browser

**Requirements:**
- Fast page loads (SEO, user experience)
- Fresh content (trail reports updated occasionally)
- Scalable (handle traffic spikes)
- Cost-effective (minimize serverless function invocations)

### Decision

We will use **Incremental Static Regeneration (ISR)** with on-demand revalidation.

**Rationale:**
- **Fast page loads**: Pages served from edge cache (like SSG)
- **Fresh content**: Revalidate pages on-demand when WordPress content updated
- **Scalable**: Cached pages handle traffic spikes without serverless function costs
- **SEO-friendly**: Pre-rendered HTML, fast TTFB (Time to First Byte)
- **Balance**: Combines benefits of SSG (speed) and SSR (fresh content)

**Configuration:**
- Homepage: Revalidate every 3600 seconds (1 hour)
- Trail database: Revalidate every 7200 seconds (2 hours)
- Individual trail pages: On-demand revalidation (via Next.js API route called by WordPress webhook)

### Consequences

**Positive:**
- Lightning-fast page loads (served from CDN edge cache)
- Fresh content (revalidate on WordPress publish/update)
- Cost-effective (minimize serverless function invocations)
- Great SEO (pre-rendered HTML, fast TTFB)
- Handles traffic spikes gracefully (cached pages)

**Negative:**
- Complexity (need to set up WordPress webhooks for on-demand revalidation)
- Stale content risk (if revalidation fails, old page served)
- Cache invalidation challenges (need to revalidate related pages)

**Risks:**
- Webhook failures (revalidation doesn't trigger)
- Overly aggressive revalidation (exceeds Vercel limits)
- Stale data displayed to users

**Mitigation:**
- Implement WordPress webhook with retry logic
- Monitor revalidation API route (Sentry, Vercel Analytics)
- Provide "Last updated" timestamp on pages
- Manual revalidation option in case of webhook failure

---

## Decision Index

| ADR | Title | Date | Status |
|-----|-------|------|--------|
| 001 | Headless WordPress over Traditional Theme | 2025-11-11 | Accepted |
| 002 | WPGraphQL over WordPress REST API | 2025-11-11 | Accepted |
| 003 | WPML over Polylang for Multilingual | 2025-11-11 | Accepted |
| 004 | Vercel over Netlify/AWS for Next.js Hosting | 2025-11-11 | Accepted |
| 005 | Google Maps over Mapbox for Interactive Map | 2025-11-11 | Accepted |
| 006 | Tailwind CSS over Bootstrap/Custom CSS | 2025-11-11 | Accepted |
| 007 | Separate Repositories for WordPress & Next.js | 2025-11-11 | Accepted |
| 008 | ISR over Pure SSR or SSG | 2025-11-11 | Accepted |

---

## How to Add New ADRs

When making a significant architectural decision:

1. **Copy template** from ADR-001
2. **Assign ADR number** (next sequential number)
3. **Document context** (problem, options, requirements)
4. **State decision** (what was chosen, why)
5. **List consequences** (positive, negative, risks, mitigation)
6. **Update Decision Index** (add row to table above)
7. **Set status**:
   - **Proposed**: Decision under discussion
   - **Accepted**: Decision approved and implemented
   - **Deprecated**: Decision replaced by newer ADR
   - **Superseded by ADR-XXX**: Decision replaced by specific ADR

---

## Version History

**Version 1.0** (2025-11-11)
- Initial ADR document created
- 8 architectural decisions documented
- Decision index added
- ADR template defined

---

## Related Documentation

- **PRD.md**: Product requirements and feature specifications
- **docs/architecture.md**: Complete system architecture documentation
- **docs/conventions.md**: Code style and best practices

---

**Document Owner**: Engineering Lead / Architect
**Review Cycle**: Quarterly or when major decisions are made
**Next Review**: 2026-02-11
