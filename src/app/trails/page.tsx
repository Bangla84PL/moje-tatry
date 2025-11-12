/**
 * Trail Database Page
 *
 * Displays all trails with filtering, search, and pagination
 * Polish version (default language)
 */

'use client';

import { useState, useMemo } from 'react';
import { TrailCard } from '@/components/trail/TrailCard';
import { TrailFilters } from '@/components/trail/TrailFilters';
import { Button } from '@/components/common/Button';
import type { Trail, TrailFilters as TrailFiltersType } from '@/types';

// TODO: Replace with actual GraphQL query when WordPress is configured
// import { useQuery } from '@apollo/client';
// import { GET_ALL_TRAILS, GET_TAXONOMIES } from '@/lib/wordpress/queries';

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
        sourceUrl: '/images/placeholder-trail.jpg',
        altText: 'Morskie Oko',
        mediaDetails: { width: 1920, height: 1280 },
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
      nodes: [{ id: 'region-1', name: 'Tatry Wysokie', slug: 'high-tatras' }],
    },
    seasons: {
      nodes: [{ id: 'season-1', name: 'Lato', slug: 'summer' }],
    },
    trailTypes: {
      nodes: [{ id: 'type-1', name: 'Tam i z powrotem', slug: 'out-and-back' }],
    },
    features: {
      nodes: [{ id: 'feature-1', name: 'Jezioro', slug: 'lake' }],
    },
    language: { code: 'PL', name: 'Polski' },
  },
  {
    id: '2',
    databaseId: 2,
    title: 'Giewont',
    slug: 'giewont',
    excerpt: 'Kultowy szczyt Tatr Zachodnich z charakterystycznym krzyżem na wierzchołku.',
    content: '',
    date: '2024-01-14',
    modified: '2024-01-14',
    featuredImage: {
      node: {
        sourceUrl: '/images/placeholder-trail.jpg',
        altText: 'Giewont',
        mediaDetails: { width: 1920, height: 1280 },
      },
    },
    trailData: {
      difficulty: 'difficult',
      distanceKm: 11.5,
      elevationGainM: 850,
      estimatedTimeHours: 5.5,
      gpsLatitude: '49.2417',
      gpsLongitude: '19.9333',
    },
    regions: {
      nodes: [{ id: 'region-2', name: 'Tatry Zachodnie', slug: 'western-tatras' }],
    },
    seasons: {
      nodes: [
        { id: 'season-1', name: 'Lato', slug: 'summer' },
        { id: 'season-2', name: 'Jesień', slug: 'fall' },
      ],
    },
    trailTypes: {
      nodes: [{ id: 'type-1', name: 'Tam i z powrotem', slug: 'out-and-back' }],
    },
    features: {
      nodes: [
        { id: 'feature-2', name: 'Szczyt', slug: 'peak' },
        { id: 'feature-3', name: 'Punkt widokowy', slug: 'viewpoint' },
      ],
    },
    language: { code: 'PL', name: 'Polski' },
  },
  {
    id: '3',
    databaseId: 3,
    title: 'Dolina Kościeliska',
    slug: 'dolina-koscieliska',
    excerpt: 'Malownicza dolina z łatwym szlakiem, idealna dla rodzin z dziećmi.',
    content: '',
    date: '2024-01-13',
    modified: '2024-01-13',
    featuredImage: {
      node: {
        sourceUrl: '/images/placeholder-trail.jpg',
        altText: 'Dolina Kościeliska',
        mediaDetails: { width: 1920, height: 1280 },
      },
    },
    trailData: {
      difficulty: 'easy',
      distanceKm: 12.0,
      elevationGainM: 150,
      estimatedTimeHours: 4.0,
      gpsLatitude: '49.2792',
      gpsLongitude: '19.8808',
    },
    regions: {
      nodes: [{ id: 'region-2', name: 'Tatry Zachodnie', slug: 'western-tatras' }],
    },
    seasons: {
      nodes: [
        { id: 'season-1', name: 'Lato', slug: 'summer' },
        { id: 'season-2', name: 'Jesień', slug: 'fall' },
        { id: 'season-3', name: 'Wiosna', slug: 'spring' },
      ],
    },
    trailTypes: {
      nodes: [{ id: 'type-1', name: 'Tam i z powrotem', slug: 'out-and-back' }],
    },
    features: {
      nodes: [
        { id: 'feature-4', name: 'Wodospad', slug: 'waterfall' },
        { id: 'feature-5', name: 'Schronisko', slug: 'mountain-hut' },
      ],
    },
    language: { code: 'PL', name: 'Polski' },
  },
];

// Mock taxonomies for filters
const mockTaxonomies = {
  regions: [
    { id: 'region-1', name: 'Tatry Wysokie', slug: 'high-tatras', count: 25 },
    { id: 'region-2', name: 'Tatry Zachodnie', slug: 'western-tatras', count: 18 },
    { id: 'region-3', name: 'Tatry Wschodnie', slug: 'eastern-tatras', count: 12 },
  ],
  difficulties: [
    { id: 'diff-1', name: 'Łatwy', slug: 'easy', count: 15 },
    { id: 'diff-2', name: 'Umiarkowany', slug: 'moderate', count: 20 },
    { id: 'diff-3', name: 'Trudny', slug: 'difficult', count: 12 },
    { id: 'diff-4', name: 'Bardzo trudny', slug: 'very-difficult', count: 5 },
    { id: 'diff-5', name: 'Ekspert', slug: 'expert', count: 3 },
  ],
  seasons: [
    { id: 'season-1', name: 'Lato', slug: 'summer', count: 45 },
    { id: 'season-2', name: 'Jesień', slug: 'fall', count: 35 },
    { id: 'season-3', name: 'Wiosna', slug: 'spring', count: 30 },
    { id: 'season-4', name: 'Zima', slug: 'winter', count: 10 },
    { id: 'season-5', name: 'Cały rok', slug: 'year-round', count: 15 },
  ],
  trailTypes: [
    { id: 'type-1', name: 'Tam i z powrotem', slug: 'out-and-back', count: 35 },
    { id: 'type-2', name: 'Pętla', slug: 'loop', count: 15 },
    { id: 'type-3', name: 'Punkt do punktu', slug: 'point-to-point', count: 5 },
  ],
  features: [
    { id: 'feature-1', name: 'Jezioro', slug: 'lake', count: 12 },
    { id: 'feature-2', name: 'Szczyt', slug: 'peak', count: 28 },
    { id: 'feature-3', name: 'Punkt widokowy', slug: 'viewpoint', count: 40 },
    { id: 'feature-4', name: 'Wodospad', slug: 'waterfall', count: 8 },
    { id: 'feature-5', name: 'Schronisko', slug: 'mountain-hut', count: 15 },
    { id: 'feature-6', name: 'Grań', slug: 'ridge', count: 10 },
  ],
};

export default function TrailsPage() {
  const [filters, setFilters] = useState<TrailFiltersType>({});
  const [currentPage, setCurrentPage] = useState(1);
  const trailsPerPage = 12;

  // TODO: Replace with actual GraphQL query
  // const { data, loading, error } = useQuery(GET_ALL_TRAILS, {
  //   variables: {
  //     first: trailsPerPage,
  //     after: null,
  //     where: filters,
  //     language: 'PL'
  //   }
  // });

  // Filter trails based on active filters (mock implementation)
  const filteredTrails = useMemo(() => {
    let result = [...mockTrails];

    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (trail) =>
          trail.title.toLowerCase().includes(searchLower) ||
          trail.excerpt?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by region
    if (filters.region) {
      result = result.filter((trail) =>
        trail.regions?.nodes?.some((r) => r.slug === filters.region) ?? false
      );
    }

    // Filter by difficulty
    if (filters.difficulty && filters.difficulty.length > 0) {
      result = result.filter((trail) =>
        filters.difficulty!.includes(trail.trailData.difficulty)
      );
    }

    // Filter by season
    if (filters.season && filters.season.length > 0) {
      result = result.filter((trail) =>
        trail.seasons?.nodes?.some((s) => filters.season!.includes(s.slug)) ?? false
      );
    }

    // Filter by trail type
    if (filters.trailType && filters.trailType.length > 0) {
      result = result.filter((trail) =>
        trail.trailTypes?.nodes?.some((t) => filters.trailType!.includes(t.slug)) ?? false
      );
    }

    // Filter by features
    if (filters.features && filters.features.length > 0) {
      result = result.filter((trail) =>
        filters.features!.some((f) => trail.features?.nodes?.some((tf) => tf.slug === f) ?? false)
      );
    }

    return result;
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(filteredTrails.length / trailsPerPage);
  const startIndex = (currentPage - 1) * trailsPerPage;
  const endIndex = startIndex + trailsPerPage;
  const paginatedTrails = filteredTrails.slice(startIndex, endIndex);

  const handleFiltersChange = (newFilters: TrailFiltersType) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-primary text-white py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Baza szlaków
          </h1>
          <p className="text-xl text-primary-light max-w-2xl">
            Przeglądaj i filtruj szlaki tatrzańskie, aby znaleźć idealną trasę dla siebie
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Filters Sidebar (Desktop) / Collapsible Panel (Mobile) */}
            <aside className="lg:col-span-3 mb-8 lg:mb-0">
              <div className="lg:sticky lg:top-24">
                <TrailFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  taxonomies={mockTaxonomies}
                  language="pl"
                />
              </div>
            </aside>

            {/* Trail Results */}
            <div className="lg:col-span-9">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div className="text-text-secondary">
                  Wyświetlanie{' '}
                  <span className="font-semibold text-text-primary">
                    {startIndex + 1}-{Math.min(endIndex, filteredTrails.length)}
                  </span>{' '}
                  z{' '}
                  <span className="font-semibold text-text-primary">
                    {filteredTrails.length}
                  </span>{' '}
                  szlaków
                </div>

                {/* Sort dropdown - TODO: Add sorting functionality */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-secondary">Sortuj:</span>
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-text-primary"
                    defaultValue="newest"
                  >
                    <option value="newest">Najnowsze</option>
                    <option value="difficulty-asc">Trudność (rosnąco)</option>
                    <option value="difficulty-desc">Trudność (malejąco)</option>
                    <option value="distance-asc">Dystans (rosnąco)</option>
                    <option value="distance-desc">Dystans (malejąco)</option>
                  </select>
                </div>
              </div>

              {/* Trail Grid */}
              {paginatedTrails.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {paginatedTrails.map((trail) => (
                      <TrailCard key={trail.id} trail={trail} language="pl" />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        Poprzednia
                      </Button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`
                              w-10 h-10 rounded-lg font-semibold transition-colors
                              ${
                                currentPage === page
                                  ? 'bg-primary text-white'
                                  : 'bg-white text-text-primary hover:bg-gray-100'
                              }
                            `}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Następna
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                /* Empty State */
                <div className="text-center py-16">
                  <svg
                    className="w-24 h-24 mx-auto mb-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-2xl font-heading font-bold text-text-primary mb-2">
                    Nie znaleziono szlaków
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Spróbuj zmienić filtry lub wyszukaj inną frazę
                  </p>
                  <Button variant="outline" onClick={() => setFilters({})}>
                    Wyczyść filtry
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
