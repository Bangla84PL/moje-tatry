/**
 * Tatra Trails - Utility Formatters
 *
 * Helper functions for formatting data (dates, numbers, strings, etc.)
 */

import { format, formatDistance as formatDistanceFn, parseISO } from 'date-fns';
import { pl, enUS } from 'date-fns/locale';
import type { Language } from '@/types';

// ============================================
// Date Formatters
// ============================================

/**
 * Format a date string to a localized display format
 * @param dateString - ISO date string from WordPress
 * @param locale - Language code (pl or en)
 * @param formatString - Date format string (default: 'PP')
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  locale: Language = 'pl',
  formatString: string = 'PP'
): string {
  try {
    const date = parseISO(dateString);
    const dateLocale = locale === 'pl' ? pl : enUS;
    return format(date, formatString, { locale: dateLocale });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Format a date as relative time (e.g., "2 days ago")
 * @param dateString - ISO date string
 * @param locale - Language code
 * @returns Relative time string
 */
export function formatRelativeTime(
  dateString: string,
  locale: Language = 'pl'
): string {
  try {
    const date = parseISO(dateString);
    const now = new Date();
    const dateLocale = locale === 'pl' ? pl : enUS;
    return formatDistanceFn(date, now, { addSuffix: true, locale: dateLocale });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return dateString;
  }
}

// ============================================
// Number Formatters
// ============================================

/**
 * Format distance in kilometers
 * @param km - Distance in kilometers
 * @param locale - Language code
 * @returns Formatted distance string (e.g., "12.5 km")
 */
export function formatDistance(km: number, locale: Language = 'pl'): string {
  if (km === 0) return locale === 'pl' ? '0 km' : '0 km';

  const formatted = new Intl.NumberFormat(locale === 'pl' ? 'pl-PL' : 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(km);

  return `${formatted} km`;
}

/**
 * Format elevation gain in meters
 * @param meters - Elevation in meters
 * @param locale - Language code
 * @returns Formatted elevation string (e.g., "850m")
 */
export function formatElevation(meters: number, locale: Language = 'pl'): string {
  const formatted = new Intl.NumberFormat(locale === 'pl' ? 'pl-PL' : 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(meters);

  return `${formatted}m`;
}

/**
 * Format duration in hours
 * @param hours - Duration in hours
 * @param locale - Language code
 * @returns Formatted duration string (e.g., "3.5 hours" or "3.5 godziny")
 */
export function formatDuration(hours: number, locale: Language = 'pl'): string {
  const formatted = new Intl.NumberFormat(locale === 'pl' ? 'pl-PL' : 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(hours);

  if (locale === 'pl') {
    if (hours === 1) return `${formatted} godzina`;
    if (hours < 5) return `${formatted} godziny`;
    return `${formatted} godzin`;
  } else {
    return hours === 1 ? `${formatted} hour` : `${formatted} hours`;
  }
}

// ============================================
// String Formatters
// ============================================

/**
 * Truncate text to specified length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Strip HTML tags from a string
 * @param html - HTML string
 * @returns Plain text
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Convert difficulty enum to display text
 * @param difficulty - Difficulty level
 * @param locale - Language code
 * @returns Localized difficulty text
 */
export function formatDifficulty(
  difficulty: 'easy' | 'moderate' | 'difficult' | 'very_difficult' | 'expert',
  locale: Language = 'pl'
): string {
  const difficulties = {
    pl: {
      easy: 'Łatwy',
      moderate: 'Umiarkowany',
      difficult: 'Trudny',
      very_difficult: 'Bardzo trudny',
      expert: 'Ekspert',
    },
    en: {
      easy: 'Easy',
      moderate: 'Moderate',
      difficult: 'Difficult',
      very_difficult: 'Very Difficult',
      expert: 'Expert',
    },
  };

  return difficulties[locale][difficulty];
}

/**
 * Format GPS coordinates for display
 * @param lat - Latitude
 * @param lng - Longitude
 * @returns Formatted GPS string (e.g., "49.2014°N, 20.0707°E")
 */
export function formatGPS(lat: string | number, lng: string | number): string {
  const latNum = typeof lat === 'string' ? parseFloat(lat) : lat;
  const lngNum = typeof lng === 'string' ? parseFloat(lng) : lng;

  const latDir = latNum >= 0 ? 'N' : 'S';
  const lngDir = lngNum >= 0 ? 'E' : 'W';

  return `${Math.abs(latNum).toFixed(4)}°${latDir}, ${Math.abs(lngNum).toFixed(4)}°${lngDir}`;
}

// ============================================
// URL Formatters
// ============================================

/**
 * Generate trail URL with language prefix
 * @param slug - Trail slug
 * @param locale - Language code
 * @returns Trail URL
 */
export function getTrailUrl(slug: string, locale: Language = 'pl'): string {
  return locale === 'en' ? `/en/trail/${slug}` : `/trail/${slug}`;
}

/**
 * Generate blog post URL with language prefix
 * @param slug - Post slug
 * @param locale - Language code
 * @returns Post URL
 */
export function getPostUrl(slug: string, locale: Language = 'pl'): string {
  return locale === 'en' ? `/en/post/${slug}` : `/post/${slug}`;
}

/**
 * Generate category archive URL
 * @param slug - Category slug
 * @param locale - Language code
 * @returns Category URL
 */
export function getCategoryUrl(slug: string, locale: Language = 'pl'): string {
  return locale === 'en' ? `/en/category/${slug}` : `/category/${slug}`;
}

// ============================================
// Class Name Utilities
// ============================================

/**
 * Combine class names with conditional logic
 * @param classes - Class names or conditional objects
 * @returns Combined class string
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Get difficulty badge color class
 * @param difficulty - Difficulty level
 * @returns Tailwind color class
 */
export function getDifficultyColorClass(
  difficulty: 'easy' | 'moderate' | 'difficult' | 'very_difficult' | 'expert'
): string {
  const colors = {
    easy: 'bg-difficulty-easy',
    moderate: 'bg-difficulty-moderate',
    difficult: 'bg-difficulty-difficult',
    very_difficult: 'bg-difficulty-veryDifficult',
    expert: 'bg-difficulty-expert',
  };

  return colors[difficulty];
}

// ============================================
// Validation Helpers
// ============================================

/**
 * Check if a string is a valid email
 * @param email - Email string
 * @returns True if valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if GPS coordinates are valid
 * @param lat - Latitude
 * @param lng - Longitude
 * @returns True if valid coordinates
 */
export function isValidGPS(lat: string | number, lng: string | number): boolean {
  const latNum = typeof lat === 'string' ? parseFloat(lat) : lat;
  const lngNum = typeof lng === 'string' ? parseFloat(lng) : lng;

  return !isNaN(latNum) && !isNaN(lngNum) &&
         latNum >= -90 && latNum <= 90 &&
         lngNum >= -180 && lngNum <= 180;
}

// ============================================
// Content Helpers
// ============================================

/**
 * Extract excerpt from content
 * @param content - HTML content
 * @param maxLength - Maximum length
 * @returns Excerpt text
 */
export function extractExcerpt(content: string, maxLength: number = 160): string {
  const plainText = stripHtml(content);
  return truncateText(plainText, maxLength);
}

/**
 * Count reading time for content
 * @param content - HTML content
 * @param wordsPerMinute - Reading speed (default: 200)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): number {
  const plainText = stripHtml(content);
  const wordCount = plainText.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
