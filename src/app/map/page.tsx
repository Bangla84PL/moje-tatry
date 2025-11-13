/**
 * Interactive Map Page
 *
 * Displays all trails on a single Google Map with filtering capabilities
 * Polish version (default language)
 */

'use client';

import { useState, useMemo } from 'react';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { trailImages } from '@/lib/images';
import type { Trail, TrailFilters, Difficulty, MarkerData } from '@/types';

// TODO: Replace with actual GraphQL query when WordPress is configured
// import { apolloClient } from '@/lib/wordpress/client';
// import { GET_ALL_TRAILS_FOR_MAP } from '@/lib/wordpress/queries';

// Mock data for development
const mockTrails: Trail[] = [
  {
    id: '1',
    databaseId: 1,
    title: 'Morskie Oko',
    slug: 'morskie-oko',
    excerpt: 'Jeden z najpopularniejszych szlaków w Tatrach prowadzący do malowniczego jeziora.',
    content: '',
    date: '2024-01-15',
    modified: '2024-01-15',
    featuredImage: {
      node: {
        sourceUrl: trailImages.morskieOko,
        altText: 'Morskie Oko',
        mediaDetails: {
          width: 1920,
          height: 1280,
        },
      },
    },
    trailData: {
      difficulty: 'moderate',
      distanceKm: 9.0,
      elevationGainM: 300,
      estimatedTimeHours: 3.0,
      gpsLatitude: '49.2016',
      gpsLongitude: '20.0731',
    },
    regions: {
      nodes: [
        {
          id: 'region-1',
          databaseId: 1,
          name: 'Tatry Wysokie',
          slug: 'high-tatras',
        },
      ],
    },
    seasons: {
      nodes: [
        {
          id: 'season-1',
          databaseId: 1,
          name: 'Lato',
          slug: 'summer',
        },
      ],
    },
    trailTypes: {
      nodes: [
        {
          id: 'type-1',
          databaseId: 1,
          name: 'Tam i z powrotem',
          slug: 'out-and-back',
        },
      ],
    },
    features: {
      nodes: [
        {
          id: 'feature-1',
          databaseId: 1,
          name: 'Jezioro',
          slug: 'lake',
        },
      ],
    },
    language: {
      code: 'pl',
      name: 'Polski',
    },
  },
  {
    id: '2',
    databaseId: 2,
    title: 'Giewont',
    slug: 'giewont',
    excerpt: 'Kultowy szczyt Tatr Zachodnich z charakterystycznym krzyżem na szczycie.',
    content: '',
    date: '2024-01-10',
    modified: '2024-01-10',
    featuredImage: {
      node: {
        sourceUrl: trailImages.morskieOko,
        altText: 'Giewont',
        mediaDetails: {
          width: 1920,
          height: 1280,
        },
      },
    },
    trailData: {
      difficulty: 'difficult',
      distanceKm: 12.0,
      elevationGainM: 1250,
      estimatedTimeHours: 6.0,
      gpsLatitude: '49.2390',
      gpsLongitude: '19.9316',
    },
    regions: {
      nodes: [
        {
          id: 'region-2',
          databaseId: 2,
          name: 'Tatry Zachodnie',
          slug: 'western-tatras',
        },
      ],
    },
    seasons: {
      nodes: [
        {
          id: 'season-1',
          databaseId: 1,
          name: 'Lato',
          slug: 'summer',
        },
      ],
    },
    trailTypes: {
      nodes: [
        {
          id: 'type-1',
          databaseId: 1,
          name: 'Tam i z powrotem',
          slug: 'out-and-back',
        },
      ],
    },
    features: {
      nodes: [
        {
          id: 'feature-2',
          databaseId: 2,
          name: 'Szczyt',
          slug: 'peak',
        },
      ],
    },
    language: {
      code: 'pl',
      name: 'Polski',
    },
  },
  {
    id: '3',
    databaseId: 3,
    title: 'Dolina Kościeliska',
    slug: 'dolina-koscieliska',
    excerpt: 'Najdłuższa i najpiękniejsza dolina Tatr Zachodnich.',
    content: '',
    date: '2024-01-05',
    modified: '2024-01-05',
    featuredImage: {
      node: {
        sourceUrl: trailImages.morskieOko,
        altText: 'Dolina Kościeliska',
        mediaDetails: {
          width: 1920,
          height: 1280,
        },
      },
    },
    trailData: {
      difficulty: 'easy',
      distanceKm: 18.0,
      elevationGainM: 400,
      estimatedTimeHours: 5.0,
      gpsLatitude: '49.2730',
      gpsLongitude: '19.8450',
    },
    regions: {
      nodes: [
        {
          id: 'region-2',
          databaseId: 2,
          name: 'Tatry Zachodnie',
          slug: 'western-tatras',
        },
      ],
    },
    seasons: {
      nodes: [
        {
          id: 'season-1',
          databaseId: 1,
          name: 'Lato',
          slug: 'summer',
        },
      ],
    },
    trailTypes: {
      nodes: [
        {
          id: 'type-1',
          databaseId: 1,
          name: 'Tam i z powrotem',
          slug: 'out-and-back',
        },
      ],
    },
    features: {
      nodes: [
        {
          id: 'feature-3',
          databaseId: 3,
          name: 'Punkt widokowy',
          slug: 'viewpoint',
        },
      ],
    },
    language: {
      code: 'pl',
      name: 'Polski',
    },
  },
];

export default function MapPage() {
  const [filters, setFilters] = useState<TrailFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  // TODO: Replace with actual GraphQL query
  // const { data, loading, error } = useQuery(GET_ALL_TRAILS_FOR_MAP, {
  //   variables: { language: 'PL' }
  // });
  // const trails = data?.trailReports?.nodes || [];

  const trails = mockTrails;

  // Filter trails based on active filters
  const filteredTrails = useMemo(() => {
    let result = [...trails];

    if (filters.region) {
      result = result.filter(
        (trail) => trail.regions?.nodes.some((r) => r.slug === filters.region) ?? false
      );
    }

    if (filters.difficulty && filters.difficulty.length > 0) {
      result = result.filter((trail) => filters.difficulty?.includes(trail.trailData.difficulty));
    }

    if (filters.season && filters.season.length > 0) {
      result = result.filter(
        (trail) => trail.seasons?.nodes.some((s) => filters.season?.includes(s.slug)) ?? false
      );
    }

    if (filters.trailType && filters.trailType.length > 0) {
      result = result.filter(
        (trail) => trail.trailTypes?.nodes.some((t) => filters.trailType?.includes(t.slug)) ?? false
      );
    }

    if (filters.features && filters.features.length > 0) {
      result = result.filter(
        (trail) => trail.features?.nodes.some((f) => filters.features?.includes(f.slug)) ?? false
      );
    }

    return result;
  }, [trails, filters]);

  const markers = useMemo<MarkerData[]>(() => {
    return filteredTrails.reduce<MarkerData[]>((acc, trail) => {
      const lat = trail.trailData.gpsLatitude ? parseFloat(trail.trailData.gpsLatitude) : null;
      const lng = trail.trailData.gpsLongitude ? parseFloat(trail.trailData.gpsLongitude) : null;

      if (lat === null || lng === null || Number.isNaN(lat) || Number.isNaN(lng)) {
        return acc;
      }

      acc.push({
        id: trail.id,
        position: { lat, lng },
        title: trail.title,
        difficulty: trail.trailData.difficulty,
        slug: trail.slug,
        distance: trail.trailData.distanceKm,
        region: trail.regions?.nodes[0]?.name,
      });

      return acc;
    }, []);
  }, [filteredTrails]);

  const handleToggleDifficulty = (difficulty: Difficulty) => {
    setFilters((prev) => {
      const currentDifficulties: Difficulty[] = prev.difficulty ?? [];
      const newDifficulties = currentDifficulties.includes(difficulty)
        ? currentDifficulties.filter((d) => d !== difficulty)
        : [...currentDifficulties, difficulty];

      return {
        ...prev,
        difficulty: newDifficulties.length > 0 ? newDifficulties : undefined,
      };
    });
  };

  const handleToggleRegion = (region: string) => {
    setFilters((prev) => ({
      ...prev,
      region: prev.region === region ? undefined : region,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.keys(filters).some(
    (key) => filters[key as keyof TrailFilters] !== undefined
  );

  const difficultyFilters: Array<{ value: Difficulty; label: string; color: string }> = [
    { value: 'easy', label: 'Łatwe', color: 'bg-green-500' },
    { value: 'moderate', label: 'Umiarkowane', color: 'bg-yellow-500' },
    { value: 'difficult', label: 'Trudne', color: 'bg-orange-500' },
    { value: 'very_difficult', label: 'Bardzo trudne', color: 'bg-red-500' },
    { value: 'expert', label: 'Eksperckie', color: 'bg-purple-600' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Page Header */}
      <section className="bg-primary text-white py-8">
        <div className="container">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3">
            Mapa szlaków
          </h1>
          <p className="text-lg text-primary-light max-w-3xl">
            Odkryj wszystkie szlaki w Tatrach na interaktywnej mapie. Kliknij na znacznik, aby
            zobaczyć szczegóły szlaku.
          </p>
        </div>
      </section>

      {/* Filter Controls */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container py-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Filter Toggle Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filtry {hasActiveFilters && `(${Object.keys(filters).length})`}
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-text-secondary">Pokaż:</span>

              {/* Difficulty Filters */}
              <div className="flex gap-2">
                {difficultyFilters.map(({ value, label, color }) => (
                  <button
                    key={value}
                    onClick={() => handleToggleDifficulty(value)}
                    className={`
                      inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
                      transition-all duration-200
                      ${
                        filters.difficulty?.includes(value)
                          ? `${color} text-white shadow-md`
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }
                    `}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <span className="text-gray-300">|</span>

              {/* Region Filters */}
              <div className="flex gap-2">
                {[
                  { value: 'high-tatras', label: 'Tatry Wysokie' },
                  { value: 'western-tatras', label: 'Tatry Zachodnie' },
                  { value: 'eastern-tatras', label: 'Tatry Wschodnie' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => handleToggleRegion(value)}
                    className={`
                      inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
                      transition-all duration-200
                      ${
                        filters.region === value
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }
                    `}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {hasActiveFilters && (
                <>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:text-primary-dark font-semibold transition-colors"
                  >
                    Wyczyść filtry
                  </button>
                </>
              )}
            </div>

            {/* Results Count */}
            <div className="ml-auto text-sm text-text-secondary">
              Wyświetlono <span className="font-semibold text-text-primary">{filteredTrails.length}</span> z{' '}
              <span className="font-semibold text-text-primary">{trails.length}</span> szlaków
            </div>
          </div>

          {/* Mobile Filters Dropdown */}
          {showFilters && (
            <div className="lg:hidden mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
              {/* Difficulty Section */}
              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-2">Trudność</h3>
                  <div className="flex flex-wrap gap-2">
                    {difficultyFilters.map(({ value, label, color }) => (
                      <button
                        key={value}
                        onClick={() => handleToggleDifficulty(value)}
                      className={`
                        inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          filters.difficulty?.includes(value)
                            ? `${color} text-white`
                            : 'bg-white text-gray-600 border border-gray-200'
                        }
                      `}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Region Section */}
              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-2">Region</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'high-tatras', label: 'Tatry Wysokie' },
                    { value: 'western-tatras', label: 'Tatry Zachodnie' },
                    { value: 'eastern-tatras', label: 'Tatry Wschodnie' },
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => handleToggleRegion(value)}
                      className={`
                        inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          filters.region === value
                            ? 'bg-primary text-white'
                            : 'bg-white text-gray-600 border border-gray-200'
                        }
                      `}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-text-secondary hover:bg-gray-50 transition-colors"
                >
                  Wyczyść wszystkie filtry
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Map */}
      <div className="flex-1">
        <InteractiveMap markers={markers} language="pl" />
      </div>

      {/* Legend */}
      <div className="bg-white border-t border-gray-200 py-4">
        <div className="container">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-text-secondary">Legenda trudności:</span>
            <div className="flex flex-wrap gap-3">
              {[
                { color: 'bg-green-500', label: 'Łatwy' },
                { color: 'bg-yellow-500', label: 'Umiarkowany' },
                { color: 'bg-orange-500', label: 'Trudny' },
                { color: 'bg-red-500', label: 'Bardzo trudny' },
                { color: 'bg-purple-600', label: 'Ekspercki' },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${color}`} />
                  <span className="text-sm text-text-secondary">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
