#!/bin/bash

# Tatra Trails Image Download Script
# This script downloads free, high-quality images for the website

set -e

echo "🏔️  Downloading Tatra Mountains images..."

# Create directories
mkdir -p public/images/{hero,trails,gallery,placeholders}

# Hero Images (Homepage)
echo "📸 Downloading hero images..."

# Morskie Oko - the most iconic Tatra lake
wget -O public/images/hero/morskie-oko-hero.jpg \
  "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=1920"

# Mountain panorama
wget -O public/images/hero/tatra-panorama.jpg \
  "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1920"

# Autumn in Tatras
wget -O public/images/hero/tatra-autumn.jpg \
  "https://images.pexels.com/photos/1009136/pexels-photo-1009136.jpeg?auto=compress&cs=tinysrgb&w=1920"

# Trail Featured Images
echo "🥾 Downloading trail images..."

# Rysy Peak
wget -O public/images/trails/rysy-peak.jpg \
  "https://images.pexels.com/photos/1670723/pexels-photo-1670723.jpeg?auto=compress&cs=tinysrgb&w=800"

# Kasprowy Wierch
wget -O public/images/trails/kasprowy-wierch.jpg \
  "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800"

# Giewont
wget -O public/images/trails/giewont.jpg \
  "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800"

# Czarny Staw
wget -O public/images/trails/czarny-staw.jpg \
  "https://images.pexels.com/photos/1659440/pexels-photo-1659440.jpeg?auto=compress&cs=tinysrgb&w=800"

# Dolina Kościeliska
wget -O public/images/trails/dolina-koscieliska.jpg \
  "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=800"

# Gallery Images
echo "🖼️  Downloading gallery images..."

for i in {1..6}; do
  wget -O "public/images/gallery/tatra-$i.jpg" \
    "https://picsum.photos/1200/800?random=$i"
  sleep 1
done

echo "✅ Image download complete!"
echo "📊 Downloaded images:"
ls -lh public/images/hero/
ls -lh public/images/trails/
ls -lh public/images/gallery/

echo ""
echo "🎨 Next steps:"
echo "1. Review downloaded images"
echo "2. Optimize with: npm run optimize-images (if script exists)"
echo "3. Convert to WebP for better performance"
