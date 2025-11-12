/**
 * Trail Stats Component
 *
 * Displays comprehensive trail statistics in a sidebar or header
 * Shows difficulty, distance, elevation, time, GPS coordinates, and metadata
 */

import React from 'react';
import type { Trail, Language } from '@/types';
import {
  formatDistance,
  formatElevation,
  formatDuration,
  formatDifficulty,
  formatGPS,
  getDifficultyColorClass,
} from '@/lib/utils/formatters';

export interface TrailStatsProps {
  trail: Trail;
  language?: Language;
  className?: string;
}

export function TrailStats({ trail, language = 'pl', className = '' }: TrailStatsProps) {
  const { trailData, regions, seasons, trailTypes, features } = trail;

  const statsItems = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
        </svg>
      ),
      label: language === 'pl' ? 'Dystans' : 'Distance',
      value: formatDistance(trailData.distanceKm, language),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      ),
      label: language === 'pl' ? 'Przewyższenie' : 'Elevation Gain',
      value: formatElevation(trailData.elevationGainM, language),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      label: language === 'pl' ? 'Czas' : 'Estimated Time',
      value: formatDuration(trailData.estimatedTimeHours, language),
    },
  ];

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      {/* Difficulty Badge */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
          {language === 'pl' ? 'Trudność' : 'Difficulty'}
        </h3>
        <span
          className={`
            inline-block px-4 py-2 rounded-lg
            text-sm font-bold uppercase tracking-wide
            text-white
            ${getDifficultyColorClass(trailData.difficulty)}
          `}
        >
          {formatDifficulty(trailData.difficulty, language)}
        </span>
      </div>

      {/* Trail Stats */}
      <div className="space-y-4 mb-6">
        {statsItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 text-primary">{item.icon}</div>
            <div>
              <div className="text-sm text-gray-600">{item.label}</div>
              <div className="text-lg font-semibold text-gray-900">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* GPS Coordinates */}
      {trailData.gpsLatitude && trailData.gpsLongitude && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
            {language === 'pl' ? 'Współrzędne GPS' : 'GPS Coordinates'}
          </h3>
          <div className="text-sm font-mono text-gray-700 bg-gray-50 px-3 py-2 rounded">
            {formatGPS(trailData.gpsLatitude, trailData.gpsLongitude)}
          </div>
        </div>
      )}

      {/* Region */}
      {regions && regions.nodes.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
            {language === 'pl' ? 'Region' : 'Region'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {regions.nodes.map((region) => (
              <span
                key={region.id}
                className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
              >
                {region.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Seasons */}
      {seasons && seasons.nodes.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
            {language === 'pl' ? 'Sezony' : 'Seasons'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {seasons.nodes.map((season) => (
              <span
                key={season.id}
                className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full"
              >
                {season.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Trail Type */}
      {trailTypes && trailTypes.nodes.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
            {language === 'pl' ? 'Typ szlaku' : 'Trail Type'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {trailTypes.nodes.map((type) => (
              <span
                key={type.id}
                className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {features && features.nodes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
            {language === 'pl' ? 'Atrakcje' : 'Features'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {features.nodes.map((feature) => (
              <span
                key={feature.id}
                className="inline-block px-3 py-1 bg-accent/20 text-accent-dark text-sm font-medium rounded-full"
              >
                {feature.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
