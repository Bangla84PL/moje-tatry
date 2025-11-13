/**
 * Image URLs and helpers for Tatra Trails website
 *
 * Currently using placeholder images from Unsplash Source API.
 * Replace these URLs with actual downloaded images in production.
 */

// Unsplash Source API (deprecated but still functional for placeholders)
const UNSPLASH_BASE = 'https://source.unsplash.com';

/**
 * Generate Unsplash placeholder URL with specific keywords
 */
function unsplashImage(width: number, height: number, keywords: string[]): string {
  const query = keywords.join(',');
  return `${UNSPLASH_BASE}/random/${width}x${height}/?${query}`;
}

/**
 * Hero images for homepage and banners
 */
export const heroImages = {
  // Main homepage hero - Morskie Oko or panoramic Tatra view
  main: unsplashImage(1920, 1080, ['tatra', 'mountains', 'poland', 'morskie oko']),

  // Alternative hero images
  morskieOko: unsplashImage(1920, 1080, ['morskie oko', 'lake', 'tatra']),
  peaks: unsplashImage(1920, 1080, ['tatra', 'mountain', 'peaks', 'panorama']),
  autumn: unsplashImage(1920, 1080, ['tatra', 'mountains', 'autumn', 'fall']),
  winter: unsplashImage(1920, 1080, ['tatra', 'mountains', 'winter', 'snow']),
  hiking: unsplashImage(1920, 1080, ['hiking', 'trail', 'mountains', 'tatra']),
};

/**
 * Trail featured images - Use these for individual trail cards
 */
export const trailImages = {
  // Famous Tatra locations
  morskieOko: unsplashImage(800, 600, ['morskie oko', 'lake', 'tatra']),
  rysy: unsplashImage(800, 600, ['rysy', 'peak', 'tatra']),
  giewont: unsplashImage(800, 600, ['giewont', 'tatra', 'cross']),
  kasprowy: unsplashImage(800, 600, ['kasprowy wierch', 'tatra']),
  czarnyStaw: unsplashImage(800, 600, ['czarny staw', 'tatra', 'lake']),
  koscieliska: unsplashImage(800, 600, ['koscieliska', 'valley', 'tatra']),
  pieciuStawow: unsplashImage(800, 600, ['valley', 'lakes', 'tatra', 'mountains']),

  // Generic mountain/trail images
  peak1: unsplashImage(800, 600, ['mountain', 'peak', 'tatra', 'summit']),
  peak2: unsplashImage(800, 600, ['tatra', 'mountains', 'hiking']),
  valley1: unsplashImage(800, 600, ['tatra', 'valley', 'forest']),
  valley2: unsplashImage(800, 600, ['tatra', 'meadow', 'mountains']),
  lake1: unsplashImage(800, 600, ['mountain', 'lake', 'tatra', 'reflection']),
  lake2: unsplashImage(800, 600, ['alpine', 'lake', 'tatra']),
  trail1: unsplashImage(800, 600, ['hiking', 'trail', 'tatra', 'path']),
  trail2: unsplashImage(800, 600, ['mountain', 'trail', 'tatra', 'hiking']),
  ridge: unsplashImage(800, 600, ['mountain', 'ridge', 'tatra']),
  waterfall: unsplashImage(800, 600, ['waterfall', 'tatra', 'mountains']),
  hut: unsplashImage(800, 600, ['mountain', 'hut', 'tatra', 'schronisko']),
  sunrise: unsplashImage(800, 600, ['tatra', 'sunrise', 'mountains']),
  sunset: unsplashImage(800, 600, ['tatra', 'sunset', 'mountains']),
};

/**
 * Gallery images for photo galleries
 */
export const galleryImages = {
  // Landscape orientations
  landscape1: unsplashImage(1200, 800, ['tatra', 'mountains', 'landscape']),
  landscape2: unsplashImage(1200, 800, ['tatra', 'panorama', 'nature']),
  landscape3: unsplashImage(1200, 800, ['tatra', 'valley', 'scenic']),

  // Portrait orientations
  portrait1: unsplashImage(800, 1200, ['tatra', 'mountains', 'vertical']),
  portrait2: unsplashImage(800, 1200, ['tatra', 'peak', 'vertical']),

  // Square
  square1: unsplashImage(1000, 1000, ['tatra', 'mountains']),
  square2: unsplashImage(1000, 1000, ['tatra', 'nature']),
};

/**
 * Thumbnail sizes for trail cards
 */
export const thumbnails = {
  small: (keywords: string[]) => unsplashImage(400, 300, keywords),
  medium: (keywords: string[]) => unsplashImage(600, 450, keywords),
  large: (keywords: string[]) => unsplashImage(800, 600, keywords),
};

/**
 * Get a random trail image
 */
export function getRandomTrailImage(): string {
  const images = Object.values(trailImages);
  return images[Math.floor(Math.random() * images.length)];
}

/**
 * Get trail image by difficulty
 */
export function getTrailImageByDifficulty(difficulty: string): string {
  const difficultyMap: Record<string, string> = {
    easy: trailImages.valley1,
    moderate: trailImages.trail1,
    difficult: trailImages.peak1,
    'very-difficult': trailImages.ridge,
    expert: trailImages.rysy,
  };

  return difficultyMap[difficulty] || getRandomTrailImage();
}

/**
 * Get trail image by feature
 */
export function getTrailImageByFeature(feature: string): string {
  const featureMap: Record<string, string> = {
    lake: trailImages.lake1,
    waterfall: trailImages.waterfall,
    peak: trailImages.peak1,
    'mountain-hut': trailImages.hut,
    viewpoint: trailImages.peak2,
    ridge: trailImages.ridge,
    valley: trailImages.valley1,
  };

  return featureMap[feature] || getRandomTrailImage();
}

/**
 * Default fallback image
 */
export const DEFAULT_IMAGE = unsplashImage(800, 600, ['tatra', 'mountains', 'poland']);

/**
 * Image alt text templates
 */
export const altText = {
  hero: 'Beautiful view of Tatra Mountains with dramatic peaks and valleys',
  morskieOko: 'Morskie Oko lake surrounded by mountain peaks in the Tatra Mountains',
  trail: (name: string) => `Scenic view of ${name} trail in the Tatra Mountains`,
  peak: (name: string) => `${name} peak in the Tatra Mountains`,
  valley: (name: string) => `${name} valley in the Tatra Mountains`,
  generic: 'Tatra Mountains landscape',
};
