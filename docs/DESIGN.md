# Design System Documentation

**Project:** Tatra Trails Blog (moje-tatry)
**Created:** 2025-11-11
**Last Updated:** 2025-11-11
**Design Language:** Rugged Outdoor Aesthetic

## Overview

Tatra Trails employs a rugged, outdoor-inspired design system that evokes the natural beauty of the Tatra Mountains. The design balances adventurous aesthetics with modern web standards, prioritizing content readability and mobile-first responsiveness. This document defines the visual language, component patterns, and accessibility standards for the entire platform.

**Design Goals:**
- Create an immersive, mountain-inspired aesthetic
- Ensure excellent readability for long-form trail reports
- Provide intuitive navigation for hikers planning trips
- Deliver fast, lightweight pages optimized for mobile
- Maintain WCAG 2.1 AA accessibility standards

---

## Design Principles

### 1. Rugged & Outdoorsy Aesthetic
- **Inspiration**: Mountain landscapes, hiking trails, natural textures
- **Mood**: Adventurous, authentic, trustworthy, exploratory
- **Approach**: Earthy color palette, high-quality mountain photography, organic shapes
- **Avoid**: Corporate/sterile design, excessive minimalism, bright neon colors

### 2. Content-First Philosophy
- **Priority**: Trail information and photography take center stage
- **White Space**: Generous spacing around content for readability
- **Typography**: Large, readable body text (16-18px minimum)
- **Visual Hierarchy**: Clear distinction between headings, body, and metadata

### 3. Mobile-First Responsive Design
- **Rationale**: Hikers browse on mobile while planning trips
- **Approach**: Design for 320px screens first, enhance for larger viewports
- **Touch Targets**: Minimum 44x44px for buttons and interactive elements
- **Performance**: Optimize images, lazy load non-critical content

### 4. Fast Loading Performance
- **Target**: < 3 seconds page load on 4G connection
- **Lighthouse Score**: 80+ (Performance, Accessibility, SEO)
- **Optimization**: WebP images, code splitting, efficient CSS, minimal JavaScript
- **Progressive Enhancement**: Core content accessible without JavaScript

### 5. Accessible by Default
- **Standard**: WCAG 2.1 AA compliance
- **Color Contrast**: Minimum 4.5:1 for body text, 3:1 for large text
- **Semantic HTML**: Proper heading hierarchy, alt text, ARIA labels
- **Keyboard Navigation**: All interactive elements keyboard-accessible

---

## Color Palette

### Primary Colors

**Deep Forest Green** (Primary)
```css
--color-primary: #2C5F2D;
--color-primary-light: #3A7A3B;
--color-primary-dark: #1E4020;
```
- **Usage**: Primary buttons, links, active states, header background
- **Association**: Mountains, forests, nature, trustworthiness
- **Accessibility**: Passes AA contrast on white backgrounds

**Slate Blue** (Alternative Primary)
```css
--color-primary-alt: #4A5F7A;
--color-primary-alt-light: #5B7191;
--color-primary-alt-dark: #3A4D61;
```
- **Usage**: Optional primary color for variation
- **Association**: Mountain skies, alpine lakes
- **Note**: Choose one primary (green OR blue) for consistency

### Secondary Colors

**Earth Brown**
```css
--color-secondary: #8B7355;
--color-secondary-light: #A38969;
--color-secondary-dark: #6F5E44;
```
- **Usage**: Secondary buttons, badges, tags, borders
- **Association**: Mountain rock, earth, hiking boots

**Rust Orange**
```css
--color-secondary-alt: #C97132;
--color-secondary-alt-light: #D68648;
--color-secondary-alt-dark: #A85C28;
```
- **Usage**: Alternative secondary for accents, alerts, call-to-actions
- **Association**: Autumn leaves, sunset on peaks

### Accent Colors

**Trail Marker Yellow**
```css
--color-accent: #FFC857;
--color-accent-light: #FFD678;
--color-accent-dark: #E6B34E;
```
- **Usage**: Highlights, hover states, warnings, attention-grabbing elements
- **Association**: Trail markers, caution signs, sunlight

### Neutral Colors

**Off-White**
```css
--color-background: #F8F9FA;
--color-surface: #FFFFFF;
```
- **Usage**: Page backgrounds, card surfaces, content areas

**Dark Charcoal**
```css
--color-text-primary: #2B2D42;
--color-text-secondary: #5A5C6E;
--color-text-tertiary: #8F90A6;
```
- **Usage**: Body text, headings, secondary text, disabled states

**Gray Shades**
```css
--color-gray-100: #F1F3F5;
--color-gray-200: #E9ECEF;
--color-gray-300: #DEE2E6;
--color-gray-400: #CED4DA;
--color-gray-500: #ADB5BD;
--color-gray-600: #6C757D;
--color-gray-700: #495057;
--color-gray-800: #343A40;
--color-gray-900: #212529;
```
- **Usage**: Borders, dividers, backgrounds, hover states

### Semantic Colors

**Success Green**
```css
--color-success: #28A745;
--color-success-light: #D4EDDA;
```
- **Usage**: Success messages, approved comments, confirmation states

**Warning Yellow**
```css
--color-warning: #FFC107;
--color-warning-light: #FFF3CD;
```
- **Usage**: Warning messages, caution alerts

**Error Red**
```css
--color-error: #DC3545;
--color-error-light: #F8D7DA;
```
- **Usage**: Error messages, form validation errors

**Info Blue**
```css
--color-info: #17A2B8;
--color-info-light: #D1ECF1;
```
- **Usage**: Informational messages, tips, notes

### Difficulty Badge Colors

```css
--difficulty-easy: #28A745;       /* Green */
--difficulty-moderate: #FFC107;   /* Yellow */
--difficulty-difficult: #FD7E14;  /* Orange */
--difficulty-very-difficult: #DC3545; /* Red */
--difficulty-expert: #6F42C1;     /* Purple */
```
- **Usage**: Trail difficulty indicators, visual badges
- **Accessibility**: Always pair with text label, not color alone

---

## Typography

### Font Families

**Headers: Montserrat**
```css
font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```
- **Weights**: 600 (SemiBold), 700 (Bold), 800 (ExtraBold)
- **Usage**: Page titles, section headings, trail names
- **Rationale**: Bold, modern, excellent readability at large sizes
- **Fallback**: System sans-serif fonts

**Body: Open Sans**
```css
font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```
- **Weights**: 400 (Regular), 600 (SemiBold), 700 (Bold)
- **Usage**: Body text, paragraphs, descriptions, metadata
- **Rationale**: Highly readable, optimized for long-form content
- **Fallback**: System sans-serif fonts

**Monospace: Courier New**
```css
font-family: 'Courier New', Courier, monospace;
```
- **Usage**: GPS coordinates, technical data, code snippets
- **Rationale**: Clear distinction for technical information

### Type Scale

**Desktop Type Scale (Base: 16px)**
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
```

**Mobile Type Scale (Base: 16px)**
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.0625rem;  /* 17px */
--text-xl: 1.125rem;   /* 18px */
--text-2xl: 1.25rem;   /* 20px */
--text-3xl: 1.5rem;    /* 24px */
--text-4xl: 1.875rem;  /* 30px */
--text-5xl: 2.25rem;   /* 36px */
--text-6xl: 2.75rem;   /* 44px */
```

### Typography Usage

**H1 - Page Title**
```css
font-family: 'Montserrat', sans-serif;
font-size: 3rem (48px desktop), 2.25rem (36px mobile);
font-weight: 700 (Bold);
line-height: 1.2;
color: var(--color-text-primary);
```

**H2 - Section Heading**
```css
font-family: 'Montserrat', sans-serif;
font-size: 2.25rem (36px desktop), 1.875rem (30px mobile);
font-weight: 700 (Bold);
line-height: 1.3;
color: var(--color-text-primary);
```

**H3 - Subsection Heading**
```css
font-family: 'Montserrat', sans-serif;
font-size: 1.875rem (30px desktop), 1.5rem (24px mobile);
font-weight: 600 (SemiBold);
line-height: 1.4;
color: var(--color-text-primary);
```

**Body Text**
```css
font-family: 'Open Sans', sans-serif;
font-size: 1rem (16px);
font-weight: 400 (Regular);
line-height: 1.75 (28px);
color: var(--color-text-primary);
```

**Link Styling**
```css
font-family: inherit;
color: var(--color-primary);
text-decoration: underline;
text-decoration-thickness: 1px;
text-underline-offset: 2px;

/* Hover */
color: var(--color-primary-dark);
text-decoration-thickness: 2px;
```

---

## Spacing System

**8px Base Unit Grid**
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
```

**Usage Guidelines:**
- Component padding: `space-4` (16px) or `space-6` (24px)
- Section margins: `space-12` (48px desktop), `space-8` (32px mobile)
- Element spacing: `space-2` (8px) to `space-4` (16px)
- Page margins: `space-6` (24px desktop), `space-4` (16px mobile)

---

## Component Patterns

### Buttons

**Primary Button**
```css
background: var(--color-primary);
color: #FFFFFF;
font-family: 'Montserrat', sans-serif;
font-size: 1rem;
font-weight: 600;
padding: 12px 24px;
border-radius: 6px;
border: none;
cursor: pointer;
transition: all 0.2s ease;

/* Hover */
background: var(--color-primary-dark);
transform: translateY(-2px);
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
```

**Difficulty Badge**
```css
display: inline-block;
padding: 4px 12px;
border-radius: 20px;
font-family: 'Montserrat', sans-serif;
font-size: 0.75rem;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.5px;

/* Easy */
background: var(--difficulty-easy);
color: #FFFFFF;
```

### Cards

**Trail Card Component**
```css
background: #FFFFFF;
border-radius: 12px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
overflow: hidden;
transition: all 0.3s ease;

/* Hover */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
transform: translateY(-4px);
```

---

## Key Screens & Layouts

### Homepage Layout

**Hero Section**
- Full-width mountain photo
- Site tagline: "Your Guide to the Tatra Mountains"
- "Explore Trails" call-to-action button

**Featured Trails Section**
- 3-4 highlighted trail cards in grid layout
- "View All Trails" button

**Latest Posts Section**
- Recent trip reports
- Standard blog card layout

### Trail Database Page

**Desktop Layout (Sidebar Filters)**
- Left sidebar: Region, Difficulty, Season, Trail Type, Features filters
- Right content: Trail cards grid (2-3 columns)
- Pagination or infinite scroll

**Mobile Layout (Top Filters)**
- Filter button opens bottom sheet modal
- Search input
- Stacked trail cards
- "Load More" button

### Individual Trail Report Page

**Trail Header**
- Full-width hero image
- Trail name and region
- Difficulty badge

**Trail Stats & Content**
- Sidebar (desktop): Distance, elevation, time, GPS, season, features
- Main content: Trip report text, photo gallery, Google Map
- Below: Comments section, related trails

---

## Navigation Design

### Header (Desktop)
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] Tatra Trails    Home  Trails  Map  Guides  About │
│                                  Contact    [PL|EN]      │
└─────────────────────────────────────────────────────────┘
```
- Height: 80px
- Background: White with subtle shadow
- Sticky header on scroll (compressed to 60px)

### Header (Mobile)
```
┌─────────────────────────────────┐
│  [☰ Menu]  Tatra Trails  [PL|EN]│
└─────────────────────────────────┘
```
- Hamburger menu opens slide-in navigation

### Footer
- Site description
- Social media links
- Quick links (Home, Trails, Map, About, Contact)
- Resources (Planning Guides, Gear Reviews, Safety Info)
- Legal (Privacy Policy, Terms of Use, Cookie Policy)
- Copyright notice

---

## Interaction Patterns

### Hover Effects

**Cards**
- Lift: `transform: translateY(-4px)`
- Shadow increase: `box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15)`
- Transition: `0.3s ease`

**Buttons**
- Slight lift: `transform: translateY(-2px)`
- Color darken: `background: var(--color-primary-dark)`
- Transition: `0.2s ease`

### Loading States

**Skeleton Screens**
- Animated gray placeholders for cards
- Pulse animation while loading

**Spinner**
- Rotating circle with primary color
- Used for inline loading states

### Success/Error Messages

**Toast Notifications**
- Top-right corner placement
- Auto-dismiss after 4 seconds
- Success: Green background
- Error: Red background
- Dismissible with X button

### Image Lazy Loading

**Blur Placeholder**
- Low-res blurred version shows first
- Fade in full-res image when loaded
- Transition: `0.3s ease`

### Lightbox Gallery

**Gallery Grid**
- 4 columns on desktop
- 2 columns on tablet
- 1 column on mobile

**Lightbox Modal**
- Dark overlay (90% opacity)
- Large image centered
- Previous/Next navigation
- Keyboard support (arrow keys, Escape)
- Swipe gestures on mobile

### Filter Interaction

**Desktop Filters (Sidebar)**
- Checkboxes for multi-select
- Instant results update
- "Clear All" button when filters applied
- Show result count

**Mobile Filters (Modal)**
- Bottom sheet modal
- "Apply Filters" button
- "Clear All" and "Close" buttons

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance

**Color Contrast**
- Body text: Minimum 4.5:1 contrast ratio
- Large text (18px+): Minimum 3:1 contrast ratio
- Interactive elements: Minimum 3:1 contrast ratio

**Keyboard Navigation**
- All interactive elements keyboard-accessible
- Logical tab order
- Visible focus indicators (3px outline, offset 2px)
- Skip to main content link
- Escape key closes modals

**Screen Reader Support**
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<aside>`
- Proper heading hierarchy: H1 → H2 → H3
- Alt text for all images
- ARIA labels for icon-only buttons
- ARIA landmarks for major sections
- Live regions for dynamic content

**Form Accessibility**
- Labels associated with inputs
- Error messages associated with inputs
- Required fields indicated with `required` attribute + visual asterisk

**Interactive Elements**
- Minimum touch target size: 44x44px (mobile)
- Sufficient spacing between interactive elements
- Clear focus states

**Motion & Animation**
- Respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Language**
- HTML `lang` attribute: `<html lang="pl">` or `<html lang="en">`
- Bilingual content clearly labeled
- Language switcher accessible

---

## Responsive Design

### Breakpoints

```css
/* Mobile First Approach */

/* Mobile (default): 320px - 767px */
/* Tablet: 768px - 1023px */
@media (min-width: 768px) { ... }

/* Desktop: 1024px - 1439px */
@media (min-width: 1024px) { ... }

/* Large Desktop: 1440px+ */
@media (min-width: 1440px) { ... }
```

### Responsive Grid

**Mobile (1 column)**
```css
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
```

**Tablet (2 columns)**
```css
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}
```

**Desktop (3-4 columns)**
```css
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}
```

---

## Performance Optimization

### Image Optimization

**Formats:**
- Primary: WebP (modern browsers)
- Fallback: JPEG (legacy browsers)
- SVG for icons and logos

**Responsive Images:**
```html
<img
  srcset="
    image-320w.webp 320w,
    image-640w.webp 640w,
    image-960w.webp 960w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  src="image-960w.webp"
  alt="Trail description"
  loading="lazy"
>
```

### CSS Optimization

- Purge unused Tailwind classes in production
- Inline critical CSS in `<head>`
- Load non-critical CSS asynchronously

### Font Loading

```css
@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/montserrat.woff2') format('woff2');
  font-display: swap; /* Show fallback font immediately */
}
```

---

## Design Tokens (Tailwind Config)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C5F2D',
          light: '#3A7A3B',
          dark: '#1E4020',
        },
        secondary: {
          DEFAULT: '#8B7355',
          light: '#A38969',
          dark: '#6F5E44',
        },
        accent: {
          DEFAULT: '#FFC857',
          light: '#FFD678',
          dark: '#E6B34E',
        },
        difficulty: {
          easy: '#28A745',
          moderate: '#FFC107',
          difficult: '#FD7E14',
          veryDifficult: '#DC3545',
          expert: '#6F42C1',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui'],
        mono: ['Courier New', 'ui-monospace', 'monospace'],
      },
    },
  },
};
```

---

## Version History

**Version 1.0** (2025-11-11)
- Initial design system documentation
- Color palette, typography, spacing defined
- Component patterns documented
- Key screens and layouts specified
- Accessibility requirements outlined
- Responsive design strategy defined

---

## Related Documentation

- **PRD.md**: Section 9 (UI/UX Requirements)
- **docs/architecture.md**: Tech stack and component architecture
- **docs/conventions.md**: Code style for implementing designs

---

**Document Owner**: Design Lead
**Review Cycle**: Quarterly or when major design changes proposed
**Next Review**: 2026-02-11
