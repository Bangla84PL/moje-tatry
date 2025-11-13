# Tatra Mountains Images

This directory contains placeholder and actual images for the Tatra Trails website.

## Image Sources

### Free Stock Photo Websites (Recommended)

1. **Unsplash** - High-quality, free images
   - Search: https://unsplash.com/s/photos/tatra-mountains
   - Direct API (deprecated but works): `https://source.unsplash.com/random/1920x1080/?tatra,mountains`

2. **Pexels** - Thousands of free Tatra Mountains photos
   - Search: https://www.pexels.com/search/tatra%20mountains/
   - Free for commercial use, no attribution required

3. **Pixabay** - 100,000+ free Tatra photos
   - Search: https://pixabay.com/images/search/tatra%20mountains/
   - Royalty-free, no attribution required

4. **1zoom.me** - Free wallpapers including Morskie Oko
   - Direct: https://www.1zoom.me/en/wallpaper/550519/z11063.3/1920x1080
   - Various resolutions available

### Recommended Images to Download

#### Hero Images (Homepage Banner)
- **Morskie Oko Lake** - The most iconic Tatra location
  - Search: "Morskie Oko summer" on Unsplash/Pexels
  - Recommended size: 1920x1080 or larger

- **Mountain Peaks Panorama**
  - Search: "Tatra Mountains panorama" or "Giewont peak"
  - Recommended size: 1920x1080 or larger

#### Trail Featured Images
- **Rysy Peak** - Highest peak in Poland
- **Kasprowy Wierch** - Cable car destination
- **Dolina Kościeliska** - Beautiful valley
- **Czarny Staw** - Black lake
- **Dolina Pięciu Stawów** - Valley of Five Lakes
- **Giewont** - Famous cross on peak

#### Gallery Images
- Autumn colors in Tatras
- Winter snow-covered peaks
- Mountain lakes reflections
- Hiking trails with markers
- Mountain huts (schronisko)
- Wildflowers in summer

## Current Placeholder Images

The website currently uses placeholder images from:
- Unsplash Source API: `https://source.unsplash.com/random/[WIDTH]x[HEIGHT]/?tatra,mountains`
- Lorem Picsum: `https://picsum.photos/[WIDTH]/[HEIGHT]`

## Image Guidelines

- **Format**: WebP (primary), JPEG (fallback)
- **Hero images**: 1920x1080 minimum
- **Trail cards**: 800x600 minimum
- **Gallery images**: 1200x800 minimum
- **Thumbnails**: 400x300

## Image Optimization

All images should be optimized before upload:
1. Resize to appropriate dimensions
2. Convert to WebP format
3. Keep JPEG fallback for older browsers
4. Use Next.js `<Image>` component for automatic optimization

## Attribution

While Unsplash, Pexels, and Pixabay don't require attribution, it's good practice to:
- Keep track of photographers
- Give credit when possible
- Follow each platform's license terms

## Download Instructions

1. Visit one of the free stock photo sites above
2. Search for "Tatra Mountains", "Morskie Oko", "Zakopane", etc.
3. Download high-resolution versions
4. Place images in appropriate subdirectories:
   - `/public/images/hero/` - Homepage hero images
   - `/public/images/trails/` - Trail featured images
   - `/public/images/gallery/` - Gallery photos
   - `/public/images/placeholders/` - Temporary placeholders
