/**
 * Trail Card Component
 *
 * Displays a preview card for a trail with image, title, difficulty, and stats
 * Used in trail database grid and featured trails sections
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Trail, Language } from '@/types';
import {
  formatDistance,
  formatElevation,
  formatDuration,
  formatDifficulty,
  getDifficultyColorClass,
  getTrailUrl,
} from '@/lib/utils/formatters';

export interface TrailCardProps {
  trail: Trail;
  language?: Language;
  className?: string;
}

export function TrailCard({ trail, language = 'pl', className = '' }: TrailCardProps) {
  const {
    title,
    slug,
    excerpt,
    featuredImage,
    trailData,
    regions,
  } = trail;

  const trailUrl = getTrailUrl(slug, language);

  return (
    <Link
      href={trailUrl}
      className={`
        group block bg-white rounded-xl shadow-md overflow-hidden
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
        ${className}
      `}
      data-testid="trail-card"
    >
      {/* Featured Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
        {featuredImage?.node ? (
          <Image
            src={featuredImage.node.sourceUrl}
            alt={featuredImage.node.altText || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`
              inline-block px-3 py-1 rounded-full
              text-xs font-bold uppercase tracking-wide
              text-white shadow-md
              ${getDifficultyColorClass(trailData.difficulty)}
            `}
          >
            {formatDifficulty(trailData.difficulty, language)}
          </span>
        </div>

        {/* Region Tag */}
        {regions && regions.nodes.length > 0 && (
          <div className="absolute top-3 right-3">
            <span className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 shadow-md">
              {regions.nodes[0].name}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-heading font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {excerpt.replace(/<[^>]*>/g, '')}
          </p>
        )}

        {/* Trail Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-700">
          {/* Distance */}
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="font-medium">{formatDistance(trailData.distanceKm, language)}</span>
          </div>

          {/* Elevation Gain */}
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            <span className="font-medium">{formatElevation(trailData.elevationGainM, language)}</span>
          </div>

          {/* Estimated Time */}
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">{formatDuration(trailData.estimatedTimeHours, language)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
