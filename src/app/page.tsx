/**
 * Homepage
 *
 * Main landing page with hero section, featured trails, and latest posts
 * Polish version (default language)
 */

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { TrailCard } from '@/components/trail/TrailCard';
import { heroImages, trailImages } from '@/lib/images';
import type { Trail } from '@/types';

// TODO: Replace with actual GraphQL query when WordPress is configured
// import { apolloClient } from '@/lib/wordpress/client';
// import { GET_FEATURED_TRAILS, GET_LATEST_POSTS } from '@/lib/wordpress/queries';

// Mock data for development (will be replaced with real data from WordPress)
const mockFeaturedTrails: Trail[] = [
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
        altText: 'Morskie Oko lake surrounded by mountain peaks in the Tatra Mountains',
        mediaDetails: {
          width: 800,
          height: 600,
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
    excerpt: 'Kultowy szczyt z krzyżem, jeden z symboli Tatr. Wymagający, ale niezwykle nagradzający widokami szlak.',
    content: '',
    date: '2024-01-10',
    modified: '2024-01-10',
    featuredImage: {
      node: {
        sourceUrl: trailImages.giewont,
        altText: 'Giewont peak with the iconic cross in the Tatra Mountains',
        mediaDetails: {
          width: 800,
          height: 600,
        },
      },
    },
    trailData: {
      difficulty: 'difficult',
      distanceKm: 6.5,
      elevationGainM: 1260,
      estimatedTimeHours: 5.0,
      gpsLatitude: '49.2458',
      gpsLongitude: '19.9342',
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
          id: 'season-2',
          databaseId: 2,
          name: 'Lato',
          slug: 'summer',
        },
        {
          id: 'season-3',
          databaseId: 3,
          name: 'Jesień',
          slug: 'fall',
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
  {
    id: '3',
    databaseId: 3,
    title: 'Dolina Pięciu Stawów',
    slug: 'dolina-pieciu-stawow',
    excerpt: 'Przepiękna dolina z pięcioma jeziorami polodowcowymi. Długi, ale relatywnie łatwy szlak dla każdego.',
    content: '',
    date: '2024-01-05',
    modified: '2024-01-05',
    featuredImage: {
      node: {
        sourceUrl: trailImages.pieciuStawow,
        altText: 'Valley of Five Lakes in the Tatra Mountains with crystal clear alpine lakes',
        mediaDetails: {
          width: 800,
          height: 600,
        },
      },
    },
    trailData: {
      difficulty: 'moderate',
      distanceKm: 15.0,
      elevationGainM: 650,
      estimatedTimeHours: 6.5,
      gpsLatitude: '49.2156',
      gpsLongitude: '20.0125',
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
          id: 'season-2',
          databaseId: 2,
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

const quickFilters = [
  { label: 'Łatwe', href: '/trails?difficulty=easy', color: 'bg-green-500' },
  { label: 'Umiarkowane', href: '/trails?difficulty=moderate', color: 'bg-yellow-500' },
  { label: 'Trudne', href: '/trails?difficulty=difficult', color: 'bg-orange-500' },
  { label: 'Tatry Zachodnie', href: '/trails?region=western-tatras', color: 'bg-primary' },
];

export default function HomePage() {
  // TODO: Fetch data from WordPress GraphQL API
  // const { data } = await apolloClient.query({
  //   query: GET_FEATURED_TRAILS,
  //   variables: { first: 3, language: 'PL' }
  // });

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImages.main}
            alt="Beautiful panoramic view of Tatra Mountains with dramatic peaks and valleys"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 animate-fade-in">
            Tatra Trails
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 animate-slide-up max-w-3xl mx-auto">
            Twój przewodnik po Tatrach
          </p>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-200">
            Odkryj piękno Tatr z naszymi szczegółowymi przewodnikami szlaków i relacjami z wypraw
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/trails">
              <Button size="lg" className="min-w-[200px]">
                Przeglądaj szlaki
              </Button>
            </Link>
            <Link href="/map">
              <Button variant="outline" size="lg" className="min-w-[200px] bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white hover:text-primary">
                Zobacz mapę
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Quick Filters Section */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <span className="text-sm font-semibold text-text-secondary mr-2">
              Szybkie filtry:
            </span>
            {quickFilters.map((filter) => (
              <Link
                key={filter.href}
                href={filter.href}
                className={`
                  inline-flex items-center px-4 py-2 rounded-full
                  text-sm font-semibold text-white
                  ${filter.color}
                  hover:shadow-md transition-all duration-200
                  hover:scale-105
                `}
              >
                {filter.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trails Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4 heading-underline inline-block">
              Polecane szlaki
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Odkryj najpopularniejsze i najpiękniejsze szlaki w Tatrach
            </p>
          </div>

          {/* Trail Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {mockFeaturedTrails.map((trail) => (
              <TrailCard key={trail.id} trail={trail} language="pl" />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link href="/trails">
              <Button variant="outline" size="lg">
                Zobacz wszystkie szlaki
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-heading font-bold mb-2">50+</div>
              <div className="text-lg text-primary-light">Opisanych szlaków</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-heading font-bold mb-2">1000+</div>
              <div className="text-lg text-primary-light">Zdjęć</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-heading font-bold mb-2">24/7</div>
              <div className="text-lg text-primary-light">Dostęp do informacji</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4 heading-underline inline-block">
              Najnowsze relacje
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Sprawdź najświeższe wpisy z naszych górskich wypraw
            </p>
          </div>

          {/* Latest Posts Grid - TODO: Replace with actual blog posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {mockFeaturedTrails.slice(0, 3).map((trail) => (
              <TrailCard key={trail.id} trail={trail} language="pl" />
            ))}
          </div>

          <div className="text-center">
            <Link href="/guides">
              <Button variant="outline" size="lg">
                Zobacz wszystkie wpisy
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Gotowy na przygodę?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-light">
            Zacznij planować swoją następną wyprawę w Tatry już dziś
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/trails">
              <Button
                size="lg"
                className="min-w-[200px] bg-white text-primary hover:bg-gray-100"
              >
                Przeglądaj szlaki
              </Button>
            </Link>
            <Link href="/guides">
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px] border-white text-white hover:bg-white/10"
              >
                Przewodniki
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
