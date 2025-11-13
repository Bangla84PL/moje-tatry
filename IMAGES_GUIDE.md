# Tatra Mountains Images - Implementation Guide

## ✅ What's Been Completed

### 1. Image Library Created
Created `/src/lib/images.ts` with beautiful placeholder images from Unsplash Source API:

**Hero Images:**
- Main homepage hero (panoramic Tatra Mountains view)
- Morskie Oko lake
- Mountain peaks
- Autumn/winter seasonal views
- Hiking trail images

**Trail Images:**
- Morskie Oko
- Giewont peak
- Rysy peak
- Kasprowy Wierch
- Czarny Staw
- Dolina Kościeliska
- Dolina Pięciu Stawów
- Generic mountain, valley, lake, and trail images

**Gallery Images:**
- Landscape orientation (1200x800)
- Portrait orientation (800x1200)
- Square format (1000x1000)

### 2. Components Updated
All components now use the image library:
- ✅ Homepage hero section
- ✅ Featured trails on homepage
- ✅ Trail database page (/trails)
- ✅ Individual trail pages (/trail/[slug])
- ✅ Interactive map page (/map)

### 3. Next.js Configuration
Next.js is already configured to load images from:
- `images.unsplash.com`
- `source.unsplash.com`
- `*.tatra-trails.com` (for future WordPress images)

### 4. Directory Structure
```
public/images/
├── hero/           # Hero/banner images (empty - for future downloads)
├── trails/         # Trail featured images (empty - for future downloads)
├── gallery/        # Gallery photos (empty - for future downloads)
├── placeholders/   # Temporary placeholders (empty)
└── README.md       # Image sourcing guide
```

## 🎨 Current Placeholder System

The website currently uses **Unsplash Source API** for placeholder images:
- Format: `https://source.unsplash.com/random/[WIDTH]x[HEIGHT]/?[KEYWORDS]`
- Example: `https://source.unsplash.com/random/1920x1080/?tatra,mountains,poland`

**Advantages:**
- ✅ Free, high-quality images
- ✅ No download/storage required
- ✅ Perfect for development and testing
- ✅ Images change on each load (shows variety)

**Note:** The Unsplash Source API is deprecated but still functional. For production, download actual images.

## 📸 Recommended High-Quality Images to Download

### Priority 1: Hero Images (Homepage)

**1. Main Hero - Morskie Oko**
- **Search on Unsplash/Pexels:** "Morskie Oko Tatra Mountains"
- **Recommended size:** 1920x1080 (landscape)
- **Description:** Iconic lake with mountain reflections, summer or autumn
- **Destination:** `/public/images/hero/morskie-oko-hero.jpg`

**2. Alternative Hero - Mountain Panorama**
- **Search:** "Tatra Mountains panorama sunrise"
- **Size:** 1920x1080
- **Description:** Wide vista of Tatra peaks
- **Destination:** `/public/images/hero/tatra-panorama.jpg`

### Priority 2: Trail Featured Images

**1. Morskie Oko Trail** (800x600)
- Search: "Morskie Oko lake summer"
- File: `/public/images/trails/morskie-oko.jpg`

**2. Giewont Peak** (800x600)
- Search: "Giewont cross Tatra Mountains"
- File: `/public/images/trails/giewont.jpg`

**3. Dolina Kościeliska** (800x600)
- Search: "Koscieliska Valley Tatra"
- File: `/public/images/trails/koscieliska-valley.jpg`

**4. Dolina Pięciu Stawów** (800x600)
- Search: "Valley of Five Lakes Tatra"
- File: `/public/images/trails/pieciu-stawow.jpg`

**5. Rysy Peak** (800x600)
- Search: "Rysy peak highest Poland"
- File: `/public/images/trails/rysy-peak.jpg`

**6. Kasprowy Wierch** (800x600)
- Search: "Kasprowy Wierch cable car"
- File: `/public/images/trails/kasprowy-wierch.jpg`

### Priority 3: Gallery Images

Download 10-15 high-quality landscape photos:
- Mountain peaks
- Alpine lakes
- Hiking trails
- Mountain huts (schronisko)
- Autumn colors
- Winter snow scenes

## 🔄 How to Replace Placeholders with Downloaded Images

### Step 1: Download Images
1. Visit [Unsplash](https://unsplash.com/s/photos/tatra-mountains)
2. Search for specific locations (Morskie Oko, Giewont, etc.)
3. Download high-resolution versions
4. Rename with descriptive names (e.g., `morskie-oko-summer.jpg`)

### Step 2: Optimize Images
```bash
# Install image optimization tools
npm install sharp-cli -g

# Convert to WebP (smaller file size)
sharp -i morskie-oko.jpg -o morskie-oko.webp --webp

# Resize for web
sharp -i morskie-oko.jpg -o morskie-oko-1920.jpg --resize 1920
```

### Step 3: Update Image Library
Edit `/src/lib/images.ts` to use local images instead of Unsplash URLs:

**Before:**
```typescript
export const heroImages = {
  main: unsplashImage(1920, 1080, ['tatra', 'mountains', 'poland', 'morskie oko']),
};
```

**After:**
```typescript
export const heroImages = {
  main: '/images/hero/morskie-oko-hero.jpg',
  // Or keep Unsplash as fallback
  mainFallback: unsplashImage(1920, 1080, ['tatra', 'mountains']),
};
```

### Step 4: Test Images
```bash
# Start dev server
npm run dev

# Visit pages and verify images load:
# - http://localhost:3000 (homepage hero)
# - http://localhost:3000/trails (trail cards)
# - http://localhost:3000/trail/morskie-oko (individual trail)
```

## 📋 Image Specifications

### Hero Images
- **Format:** WebP (primary), JPEG (fallback)
- **Dimensions:** 1920x1080 minimum (landscape)
- **Max file size:** 500KB (optimized)
- **Alt text:** Descriptive (include location, season)

### Trail Featured Images
- **Format:** WebP (primary), JPEG (fallback)
- **Dimensions:** 800x600 (landscape 4:3 ratio)
- **Max file size:** 200KB (optimized)
- **Alt text:** Trail name + key features

### Gallery Images
- **Format:** WebP (primary), JPEG (fallback)
- **Dimensions:** 1200x800 (landscape), 800x1200 (portrait)
- **Max file size:** 300KB (optimized)
- **Alt text:** Scene description

## 🎯 Best Practices

### Image Quality
- ✅ Use high-resolution source images (2x desired display size)
- ✅ Optimize for web (compress, convert to WebP)
- ✅ Use Next.js `<Image>` component (automatic optimization)
- ✅ Provide descriptive alt text (accessibility + SEO)

### Performance
- ✅ Lazy load images below the fold
- ✅ Use `priority` prop for above-the-fold images
- ✅ Provide multiple sizes via `sizes` prop
- ✅ Use blur placeholder while loading

### SEO
- ✅ Descriptive filenames (`morskie-oko-lake-summer.jpg` not `IMG_1234.jpg`)
- ✅ Comprehensive alt text
- ✅ Include location keywords
- ✅ Use Schema.org ImageObject markup

## 🌐 Free Stock Photo Resources

### Highly Recommended (No Attribution Required)

1. **[Unsplash](https://unsplash.com/s/photos/tatra-mountains)**
   - Highest quality
   - 45,000+ Tatra photos
   - Free for commercial use
   - No attribution required (but appreciated)

2. **[Pexels](https://www.pexels.com/search/tatra%20mountains/)**
   - 200,000+ Tatra photos
   - Free for commercial use
   - No attribution required

3. **[Pixabay](https://pixabay.com/images/search/tatra%20mountains/)**
   - 100,000+ Tatra photos
   - Royalty-free
   - No attribution required

### Specific Recommendations

**Best Morskie Oko Photos:**
- Search: "Morskie Oko lake"
- Filter: Landscape orientation, high resolution
- Look for: Clear reflections, dramatic sky, minimal crowds

**Best Giewont Photos:**
- Search: "Giewont cross" or "Giewont peak"
- Filter: Include the iconic cross on summit
- Look for: Clear weather, visible chains on ridge

**Best Valley Photos:**
- Search: "Koscieliska valley" or "Tatras valley meadow"
- Filter: Summer wildflowers or autumn colors
- Look for: Wide vistas, hiking trails visible

## 📝 Legal & Licensing

### Unsplash License
- ✅ Free for commercial and non-commercial use
- ✅ No permission needed
- ✅ Attribution not required (but appreciated)
- ✅ Can modify and adapt

### Pexels License
- ✅ Free for commercial and non-commercial use
- ✅ No attribution required
- ✅ Can modify images
- ✅ Can use in website, apps, print

### Best Practice
Even though attribution isn't required, consider:
- Creating a "Photo Credits" page
- Linking to photographers' Unsplash/Pexels profiles
- Supporting photographers by following them

## 🚀 Next Steps

1. **Immediate (Development Phase)**
   - ✅ Continue using Unsplash placeholder URLs
   - ✅ Test image loading and responsiveness
   - ✅ Ensure all components render images correctly

2. **Before Production Launch**
   - [ ] Download 5-10 high-quality hero images
   - [ ] Download featured images for each documented trail
   - [ ] Optimize all images (WebP conversion, compression)
   - [ ] Update image library to use local files
   - [ ] Test performance (Lighthouse scores)

3. **Post-Launch**
   - [ ] Continuously add gallery images
   - [ ] Create seasonal variations
   - [ ] Get user-submitted photos (with permission)
   - [ ] Build comprehensive photo library

## 🔧 Troubleshooting

### Images not loading?
1. Check Next.js config allows external domains
2. Verify image URLs are accessible
3. Check browser console for errors
4. Ensure `unoptimized` prop if needed for external URLs

### Images too slow?
1. Optimize image file sizes
2. Use WebP format
3. Implement lazy loading
4. Use CDN for static assets

### Low Lighthouse scores?
1. Reduce image file sizes
2. Use `next/image` component
3. Add `priority` to above-the-fold images
4. Implement progressive image loading

---

**Last Updated:** November 13, 2025
**Status:** ✅ Placeholder system active and functional
**Next Review:** Before production deployment
