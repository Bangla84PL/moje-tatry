# TODO - Tatra Trails

**Project:** moje-tatry (Tatra Trails Blog)
**Last Updated:** 2025-11-11

---

## 🎯 Phase 1: WordPress Backend Setup (Weeks 1-2)

### WordPress Installation
- [ ] Choose hosting provider (shared hosting, VPS, or managed WordPress)
- [ ] Install WordPress 6.4+ with PHP 8.0+ and MySQL 8.0+
- [ ] Configure domain and SSL certificate (HTTPS required)
- [ ] Set up WordPress admin account with strong password

### Plugin Installation
- [ ] Install WPGraphQL plugin
- [ ] Install WPML or Polylang plugin (bilingual support)
- [ ] Install Advanced Custom Fields (ACF) Pro
- [ ] Install Yoast SEO or Rank Math
- [ ] Install Akismet (spam protection)
- [ ] Install Wordfence or Sucuri (security)
- [ ] Install backup plugin (UpdraftPlus or BackupBuddy)

### Custom Post Type & Fields
- [ ] Create custom post type: "Trail Report"
- [ ] Import ACF custom fields from docs/db-schema.md (Appendix)
- [ ] Configure ACF field groups (difficulty, distance, elevation, GPS, etc.)
- [ ] Test ACF fields in WordPress admin

### Taxonomies Configuration
- [ ] Create taxonomy: Region (Western Tatras, High Tatras, Eastern Tatras)
- [ ] Create taxonomy: Difficulty (Easy, Moderate, Difficult, Very Difficult, Expert)
- [ ] Create taxonomy: Season (Spring, Summer, Fall, Winter, Year-round)
- [ ] Create taxonomy: Trail Type (Loop, Out-and-back, Point-to-point)
- [ ] Create taxonomy: Features (Waterfall, Peak, Mountain Hut, Viewpoint, Lake, Ridge)
- [ ] Translate all taxonomy terms to Polish and English

### Bilingual Setup
- [ ] Configure WPML/Polylang for Polish and English
- [ ] Set Polish as default language
- [ ] Test language switching in WordPress admin
- [ ] Create sample content in both languages

### Sample Content
- [ ] Create 2-3 sample trail reports with photos
- [ ] Add GPS coordinates and all custom fields
- [ ] Test WPGraphQL queries (use GraphiQL in WordPress)

---

## 🚀 Phase 2: Next.js Frontend Setup (Weeks 2-3)

### Project Initialization
- [ ] Initialize Next.js 14 project with TypeScript: `npx create-next-app@latest`
- [ ] Set up Tailwind CSS configuration
- [ ] Configure ESLint and Prettier
- [ ] Set up project folder structure (see README.md)
- [ ] Copy .env.example to .env and fill in WordPress API URL

### WPGraphQL Client Setup
- [ ] Install Apollo Client: `npm install @apollo/client graphql`
- [ ] Create WPGraphQL client in `src/lib/wpgraphql.ts`
- [ ] Test connection to WordPress GraphQL endpoint
- [ ] Create TypeScript types for trail data

### Core Pages
- [ ] Build Homepage (`src/app/page.tsx`)
  - Hero section with mountain imagery
  - Featured trails section
  - Latest posts feed
- [ ] Build Trail Database page (`src/app/trails/page.tsx`)
  - WPGraphQL query for all trail reports
  - Trail card components
  - Basic filtering (region, difficulty)
  - Pagination
- [ ] Build Individual Trail Report page (`src/app/trails/[slug]/page.tsx`)
  - Dynamic route for trails
  - Display all trail data
  - Photo gallery component
  - Comments section

### Navigation & Layout
- [ ] Create Header component with navigation
- [ ] Create Footer component
- [ ] Implement language switcher (Polish/English toggle)
- [ ] Create responsive mobile menu

---

## 🗺️ Phase 3: Advanced Features (Weeks 3-4)

### Google Maps Integration
- [ ] Get Google Maps API key from Google Cloud Console
- [ ] Enable Maps JavaScript API
- [ ] Create MapView component for individual trails
- [ ] Create Interactive Map page (`src/app/map/page.tsx`)
  - Plot all trails as markers
  - Marker click popups with trail info
  - Color-code markers by difficulty
  - Filter controls

### Advanced Filtering
- [ ] Implement multi-filter logic (region + difficulty + season + features)
- [ ] Add search functionality (trail name search)
- [ ] Create FilterBar component
- [ ] Add URL query params for shareable filtered views

### Comments System
- [ ] Display comments from WordPress
- [ ] Create CommentForm component
- [ ] Submit comments via WordPress REST API
- [ ] Add spam protection (Akismet integration)
- [ ] Moderation workflow in WordPress admin

### Planning Guides
- [ ] Create Planning Guides page (`src/app/guides/page.tsx`)
- [ ] Blog post archive with category filtering
- [ ] Individual guide template
- [ ] Sidebar with related guides

### About & Contact
- [ ] Create About page with mission statement
- [ ] Create Contact page with form
- [ ] Implement contact form submission (SendGrid or WordPress plugin)

---

## 🎨 Phase 4: Design & Polish (Weeks 4-5)

### Responsive Design
- [ ] Test all pages on mobile devices (iPhone, Android)
- [ ] Test on tablets (iPad)
- [ ] Optimize breakpoints (320px, 768px, 1024px, 1440px)
- [ ] Fix any layout issues

### Photo Optimization
- [ ] Implement Next.js Image component for all images
- [ ] Configure image optimization (WebP format)
- [ ] Add lazy loading for photo galleries
- [ ] Optimize hero images

### SEO Optimization
- [ ] Add meta tags (title, description) to all pages
- [ ] Implement Schema.org markup for articles/trails
- [ ] Add Open Graph tags for social sharing
- [ ] Generate XML sitemap (Yoast SEO or next-sitemap)
- [ ] Add hreflang tags for Polish/English
- [ ] Configure canonical URLs

### Performance
- [ ] Run Lighthouse audit
- [ ] Optimize bundle size (code splitting)
- [ ] Implement ISR (Incremental Static Regeneration)
- [ ] Add loading states for filtered results
- [ ] Configure caching strategy

### Accessibility
- [ ] WCAG 2.1 AA compliance audit
- [ ] Add alt text to all images
- [ ] Test keyboard navigation
- [ ] Check color contrast ratios
- [ ] Test with screen reader

---

## 💰 Phase 5: Monetization & Launch (Weeks 5-6)

### Display Advertising
- [ ] Get Google AdSense account
- [ ] Create ad units in AdSense dashboard
- [ ] Integrate AdSense script in Next.js layout
- [ ] Place ad units (header, sidebar, in-content)
- [ ] Test ad display and responsiveness

### Affiliate Links
- [ ] Sign up for Amazon Associates
- [ ] Create gear recommendation posts (planning guides)
- [ ] Add affiliate links with disclosure
- [ ] Track affiliate clicks (Google Analytics events)

### Analytics
- [ ] Set up Google Analytics 4 property
- [ ] Install GA4 tracking script in Next.js
- [ ] Configure custom events (filter usage, comment submission, affiliate clicks)
- [ ] Set up conversion tracking

### Pre-Launch Testing
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS Safari, Chrome Mobile)
- [ ] Performance testing (PageSpeed Insights, Lighthouse)
- [ ] Security review (SSL, headers, CORS)
- [ ] Backup strategy test (restore from backup)

### Content Creation
- [ ] Write and photograph 10-15 trail reports
- [ ] Translate all trail reports to Polish and English
- [ ] Create 5-10 planning guides (gear, safety, regulations, best seasons)
- [ ] Add high-quality photos to all content

### Launch
- [ ] Deploy WordPress to production (if not already)
- [ ] Deploy Next.js to Vercel
- [ ] Configure custom domain in Vercel
- [ ] Test production environment
- [ ] Submit sitemap to Google Search Console and Bing Webmaster Tools
- [ ] Announce launch on social media

---

## 📊 Post-Launch (Ongoing)

### Content Strategy
- [ ] Publish 1-2 new trail reports per week
- [ ] Create evergreen planning guides
- [ ] Update trail conditions based on seasons
- [ ] Respond to comments and engage community

### Monitoring & Optimization
- [ ] Monitor Google Analytics (traffic, engagement, conversions)
- [ ] Track ad revenue and affiliate earnings
- [ ] Monitor site uptime and performance
- [ ] Review and fix any errors or bugs
- [ ] Gather user feedback from comments

### SEO & Growth
- [ ] Keyword research for trail-specific queries
- [ ] Build backlinks (guest posts, partnerships)
- [ ] Optimize high-performing content
- [ ] Create new content based on search trends

### Phase 2 Planning
- [ ] Review docs/features.md for post-MVP features
- [ ] Prioritize next features (user accounts, community contributions, etc.)
- [ ] Plan Phase 2 development timeline

---

## ✅ Completed

- [x] Project initialization (claude-config-init) - 2025-11-11
- [x] Documentation structure created - 2025-11-11
- [x] PRD.md completed - 2025-11-11
- [x] Architecture documentation generated - 2025-11-11
- [x] API documentation generated - 2025-11-11
- [x] Database schema documentation generated - 2025-11-11
- [x] Features documentation generated - 2025-11-11
- [x] README.md updated - 2025-11-11
- [x] .env.example created - 2025-11-11

---

## 📝 Notes & Blockers

**Current Phase:** Phase 1 - WordPress Backend Setup

**Next Steps:**
1. Choose and set up WordPress hosting
2. Install WordPress and required plugins
3. Configure custom post type and taxonomies

**Blockers:**
- None currently

**Decisions Needed:**
- Choose between WPML and Polylang (see docs/DECISIONS.md ADR-003)
- Decide on WordPress hosting provider

**Resources:**
- WordPress installation guide: https://wordpress.org/support/article/how-to-install-wordpress/
- WPGraphQL docs: https://www.wpgraphql.com/docs/introduction
- WPML docs: https://wpml.org/documentation/
- Vercel Next.js WordPress template: https://vercel.com/templates/cms/nextjs-wordpress-headless-cms
