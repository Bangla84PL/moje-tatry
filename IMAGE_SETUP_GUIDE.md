# Image Setup Guide

## What Was Done

I've set up the image infrastructure for your Tatra Trails website:

### ✅ Directory Structure Created
```
public/images/
├── hero/           # Homepage hero images (1920x1080)
├── trails/         # Trail featured images (800x600)
├── gallery/        # Photo gallery images (1200x800)
└── placeholders/   # Temporary placeholders
```

### ✅ SVG Placeholder Images Created

Professional-looking SVG placeholders that will display properly until you add real photos:

**Hero Images:**
- `hero/tatra-hero-placeholder.svg` - Mountain silhouette with gradient sky and text overlay

**Trail Images:**
- `trails/morskie-oko-placeholder.svg` - Blue lake scene (MODERATE difficulty)
- `trails/rysy-peak-placeholder.svg` - Rocky peak with snow (DIFFICULT)
- `trails/giewont-placeholder.svg` - Sunset mountain with cross (CHALLENGING)

**Gallery:**
- `gallery/tatra-landscape-1.svg` - Spring meadow with flowers

### ✅ Automated Download Script

Created `scripts/download-images.sh` that will:
- Download real, high-quality images from Pexels (free, no attribution required)
- Organize them into proper directories
- Name them appropriately for easy reference

## Next Steps

### Option 1: Use Placeholders for Now (Quick Start)

The SVG placeholders are already in place and will work with your Next.js components. They:
- Are lightweight (< 5KB each)
- Look professional
- Have proper dimensions
- Display instantly

Your website will work immediately with these placeholders.

### Option 2: Download Real Images (Recommended)

When you have internet access without restrictions, run:

```bash
# Make sure you're in the project root
cd /home/user/moje-tatry

# Run the download script
bash scripts/download-images.sh
```

This will download ~15 high-quality, free images from Pexels.

### Option 3: Manual Download

If the script doesn't work in your environment:

1. Visit [Pexels Tatra Mountains](https://www.pexels.com/search/tatra%20mountains/)
2. Download images you like
3. Rename and place them in:
   - `public/images/hero/` for hero images
   - `public/images/trails/` for trail cards
   - `public/images/gallery/` for galleries

**Recommended searches:**
- "Morskie Oko"
- "Tatra Mountains"
- "Zakopane"
- "Mountain lake Poland"
- "Carpathian mountains"

## Using Images in Your Components

### Hero Image
```typescript
// In your homepage
<Image
  src="/images/hero/tatra-hero-placeholder.svg"
  alt="Tatra Mountains"
  width={1920}
  height={1080}
  priority
/>
```

### Trail Card
```typescript
// In TrailCard component
<Image
  src="/images/trails/morskie-oko-placeholder.svg"
  alt={trail.title}
  width={800}
  height={600}
  className="object-cover"
/>
```

### Gallery
```typescript
<Image
  src="/images/gallery/tatra-landscape-1.svg"
  alt="Tatra landscape"
  width={1200}
  height={800}
/>
```

## Image Optimization Tips

Once you have real images:

1. **Convert to WebP** for better performance:
   ```bash
   # Install cwebp if needed
   sudo apt-get install webp

   # Convert images
   cwebp -q 80 input.jpg -o output.webp
   ```

2. **Use Next.js Image component** - It automatically:
   - Optimizes images
   - Serves WebP to supporting browsers
   - Lazy loads images
   - Creates responsive sizes

3. **Keep originals** - Save high-res originals in case you need to regenerate

## Troubleshooting

### Script fails with "403 Forbidden"
- This means your network blocks external downloads
- Use the SVG placeholders for now
- Download images manually when on a different network

### Images not displaying
- Check file paths (should be `/images/...` not `public/images/...` in components)
- Verify files exist: `ls -la public/images/hero/`
- Check Next.js console for errors

### Images look stretched
- Add `className="object-cover"` to maintain aspect ratio
- Use proper width/height props in Image component

## Free Image Resources

- **Pexels**: https://www.pexels.com/search/tatra%20mountains/
- **Unsplash**: https://unsplash.com/s/photos/tatra-mountains
- **Pixabay**: https://pixabay.com/images/search/tatra/

All allow free commercial use without attribution (but attribution is appreciated).

---

**Current Status:** ✅ SVG placeholders ready to use
**Next Step:** Run download script or use placeholders as-is
