# Tatra Trails

A bilingual (Polish/English) headless WordPress blog built with Next.js, providing comprehensive trail information and trip reports for the Tatra Mountains. Features structured trail data, interactive maps, and moderated community engagement.

**Tech Stack:** Next.js 14+ • WordPress 6.4+ • WPGraphQL • Tailwind CSS • Google Maps API

## 🏔️ Features

- **Trail Database** - Filterable collection of Tatra Mountains hiking trails with detailed stats
- **Interactive Maps** - Google Maps integration showing trail locations and markers
- **Bilingual Content** - Full Polish/English translation support via WPML
- **Trip Reports** - Rich content with photo galleries, GPS data, and hiking details
- **Moderated Comments** - Community engagement with spam protection
- **Planning Guides** - Gear recommendations, safety info, and hiking resources
- **Responsive Design** - Mobile-first approach for hikers on the go
- **SEO Optimized** - Server-side rendering for search engine visibility

## 🚀 Quick Start

### Prerequisites

- **WordPress Environment:**
  - Self-hosted WordPress 6.4+ with PHP 8.0+ and MySQL 8.0+
  - Required plugins: WPGraphQL, WPML or Polylang, ACF Pro, Yoast SEO
  - HTTPS/SSL certificate

- **Next.js Environment:**
  - Node.js 18+
  - npm or yarn

### Installation

**1. Set up WordPress backend:**

```bash
# Install WordPress on your hosting provider
# Install required plugins:
# - WPGraphQL
# - WPML or Polylang
# - Advanced Custom Fields (ACF) Pro
# - Yoast SEO or Rank Math
# - Akismet (spam protection)

# Import ACF custom fields from docs/db-schema.md (Appendix)
# Configure taxonomies (see PRD.md section 8)
```

**2. Set up Next.js frontend:**

```bash
# Clone/create project
cd moje-tatry

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your WordPress GraphQL endpoint

# Run development server
npm run dev
```

**3. Configure environment variables:**

Edit `.env` with your configuration:
```env
WORDPRESS_API_URL=https://your-wordpress-site.com/graphql
GOOGLE_MAPS_API_KEY=your_google_maps_key
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## 🏗️ Project Structure

```
moje-tatry/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Homepage
│   │   ├── trails/       # Trail database & individual trails
│   │   ├── map/          # Interactive map page
│   │   ├── guides/       # Planning guides
│   │   └── ...
│   ├── components/       # React components
│   │   ├── TrailCard.tsx
│   │   ├── MapView.tsx
│   │   ├── CommentForm.tsx
│   │   └── ...
│   ├── lib/             # Utilities
│   │   ├── wpgraphql.ts # WPGraphQL client
│   │   ├── maps.ts      # Google Maps helpers
│   │   └── ...
│   └── types/           # TypeScript types
├── public/              # Static assets
├── docs/                # Comprehensive documentation
└── .env.example         # Environment variable template
```

## 📚 Documentation

Complete documentation is available in the `/docs` folder:

- **[PRD.md](PRD.md)** - Product Requirements Document
- **[Architecture](docs/architecture.md)** - Tech stack, system design, ADRs
- **[API Documentation](docs/API.md)** - WPGraphQL queries, REST endpoints, Google Maps
- **[Database Schema](docs/db-schema.md)** - WordPress database design, custom fields, ERD
- **[Features](docs/features.md)** - Feature specifications with user stories
- **[Design](docs/DESIGN.md)** - UI/UX decisions, design system
- **[Testing](docs/TESTING.md)** - Testing strategy and tools
- **[Conventions](docs/conventions.md)** - Code style and standards
- **[Roadmap](docs/ROADMAP.md)** - Development phases and timeline
- **[Decisions](docs/DECISIONS.md)** - Architectural Decision Records

## 🔧 Development

### Available Commands

```bash
npm run dev          # Start Next.js dev server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### WordPress Development

Access your WordPress admin panel at: `https://your-wordpress-site.com/wp-admin`

- **Create Trail Reports:** Custom Post Type "Trail Report"
- **Manage Taxonomies:** Regions, Difficulty, Season, Trail Type, Features
- **Moderate Comments:** WordPress → Comments
- **Manage Translations:** WPML plugin interface

### Next.js Development Workflow

1. **Fetch data from WordPress:**
   - Use WPGraphQL queries (see `docs/API.md`)
   - Apollo Client for data fetching
   - Server-side rendering (SSR) or Incremental Static Regeneration (ISR)

2. **Create components:**
   - React components in `src/components/`
   - Tailwind CSS for styling
   - TypeScript for type safety

3. **Test locally:**
   - `npm run dev` to start dev server
   - View at http://localhost:3000

### Environment Variables

See `.env.example` for all required environment variables:
- WordPress GraphQL endpoint URL
- Google Maps API key
- Google Analytics ID
- AdSense publisher ID (optional)

## 📦 Deployment

### WordPress Deployment

1. Self-hosted WordPress on your hosting provider (shared hosting, VPS, or managed WordPress)
2. Install and activate required plugins
3. Import ACF custom fields (see `docs/db-schema.md`)
4. Configure WPML/Polylang for Polish/English
5. Set up SSL certificate (HTTPS required)
6. Configure CORS to allow Next.js frontend access

### Next.js Deployment (Vercel)

```bash
# Connect to Vercel via GitHub
# Automatic deployments on push to main branch

# Or deploy manually:
npm run build
vercel --prod
```

**Environment variables in Vercel:**
- Add all `.env.example` variables in Vercel dashboard
- Ensure `WORDPRESS_API_URL` points to production WordPress

See **[docs/architecture.md](docs/architecture.md)** for detailed deployment instructions.

## 🗺️ Trail Data Structure

Each trail report includes:
- **Name** (Polish/English)
- **Difficulty** (Easy, Moderate, Difficult, Very Difficult, Expert)
- **Distance** (kilometers)
- **Elevation Gain** (meters)
- **Estimated Time** (hours)
- **GPS Coordinates** (latitude/longitude)
- **Region** (Western Tatras, High Tatras, etc.)
- **Season** (Spring, Summer, Fall, Winter, Year-round)
- **Trail Type** (Loop, Out-and-back, Point-to-point)
- **Features** (Waterfall, Peak, Mountain Hut, Viewpoint, Lake, Ridge)
- **Photo Gallery**
- **Trip Report** (rich text content)
- **Google Map** (embedded location)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

See **[docs/TESTING.md](docs/TESTING.md)** for comprehensive testing strategy.

## 🎨 Design System

**Color Palette:**
- Primary: Deep forest green `#2C5F2D` or slate blue `#4A5F7A`
- Secondary: Earth brown `#8B7355` or rust orange `#C97132`
- Accent: Bright trail marker yellow `#FFC857`

**Typography:**
- Headers: Montserrat or Poppins (bold, modern sans-serif)
- Body: Open Sans or Inter (readable)

See **[docs/DESIGN.md](docs/DESIGN.md)** for complete design guidelines.

## 🌐 Multilingual Support

All content is available in Polish and English:
- Language switcher in header (flag icons)
- URL structure: `/trail/slug` (PL) and `/en/trail/slug` (EN)
- Managed via WPML or Polylang WordPress plugin
- Next.js i18n routing

## 🤝 Contributing

See **[docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)** for contribution guidelines.

## 📊 Performance

Target metrics:
- Page load time: **< 3 seconds** on 4G
- Lighthouse score: **80+** (Performance, Accessibility, SEO)
- Image optimization: WebP format, responsive sizes
- Server-side rendering for SEO

## 🔐 Security

- HTTPS enforced (SSL certificate required)
- WordPress security best practices (Wordfence, strong passwords)
- Regular plugin updates
- Input sanitization for comments/forms
- CORS configuration for API access
- Environment variables for API keys (never committed)

## 📄 License

[Your license here]

---

**Project:** Tatra Trails (moje-tatry)
**Version:** 0.1.0
**Created:** 2025-11-11
**Tech Stack:** Next.js + WordPress Headless CMS
**Live Site:** [Your domain]
**WordPress Admin:** [Your WP admin URL]
