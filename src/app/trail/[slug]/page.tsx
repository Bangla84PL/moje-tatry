/**
 * Individual Trail Report Page
 *
 * Dynamic route for displaying detailed trail information
 * Polish version (default language)
 */

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TrailStats } from '@/components/trail/TrailStats';
import { TrailMap } from '@/components/map/TrailMap';
import { TrailCard } from '@/components/trail/TrailCard';
import { Button } from '@/components/common/Button';
import type { Trail } from '@/types';

// TODO: Replace with actual GraphQL query when WordPress is configured
// import { apolloClient } from '@/lib/wordpress/client';
// import { GET_TRAIL_BY_SLUG, GET_RELATED_TRAILS } from '@/lib/wordpress/queries';

// Mock data for development
const mockTrails: Record<string, Trail> = {
  'morskie-oko': {
    id: '1',
    databaseId: 1,
    title: 'Morskie Oko',
    slug: 'morskie-oko',
    excerpt: 'Jeden z najpopularniejszych szlaków w Tatrach prowadzący do malowniczego jeziora.',
    content: `
      <h2>Opis szlaku</h2>
      <p>Morskie Oko to jedno z najpiękniejszych i najbardziej rozpoznawalnych miejsc w Tatrach.
      Jezioro położone jest na wysokości 1395 m n.p.m. w Dolinie Rybiego Potoku.</p>

      <h3>Dojście</h3>
      <p>Szlak rozpoczyna się w Palenicy Białczańskiej i prowadzi wygodną asfaltową drogą
      przez około 9 km. Trasa jest łatwa i dostępna dla większości turystów.</p>

      <h3>Atrakcje</h3>
      <ul>
        <li>Malownicze jezioro otoczone tatrzańskimi szczytami</li>
        <li>Schronisko PTTK nad Morskim Okiem</li>
        <li>Możliwość kontynuacji na Czarny Staw pod Rysami</li>
        <li>Piękne widoki na Rysy i Mięguszowieckie Szczyty</li>
      </ul>

      <h3>Wskazówki</h3>
      <p>Najlepszy czas na wizytę to wczesne ranki lub późne popołudnia, aby uniknąć tłumów.
      W sezonie letnim warto wybrać się na szlak przed godziną 8:00 rano.</p>
    `,
    date: '2024-01-15',
    modified: '2024-01-15',
    featuredImage: {
      node: {
        sourceUrl: '/images/placeholder-trail.jpg',
        altText: 'Morskie Oko lake surrounded by mountains',
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
          name: 'Tatry Wysokie',
          slug: 'high-tatras',
        },
      ],
    },
    seasons: {
      nodes: [
        {
          id: 'season-1',
          name: 'Lato',
          slug: 'summer',
        },
        {
          id: 'season-2',
          name: 'Jesień',
          slug: 'fall',
        },
      ],
    },
    trailTypes: {
      nodes: [
        {
          id: 'type-1',
          name: 'Tam i z powrotem',
          slug: 'out-and-back',
        },
      ],
    },
    features: {
      nodes: [
        {
          id: 'feature-1',
          name: 'Jezioro',
          slug: 'lake',
        },
        {
          id: 'feature-2',
          name: 'Schronisko',
          slug: 'mountain-hut',
        },
        {
          id: 'feature-3',
          name: 'Punkt widokowy',
          slug: 'viewpoint',
        },
      ],
    },
    language: {
      code: 'PL',
      name: 'Polski',
    },
  },
  'giewont': {
    id: '2',
    databaseId: 2,
    title: 'Giewont',
    slug: 'giewont',
    excerpt: 'Kultowy szczyt Tatr Zachodnich z charakterystycznym krzyżem na szczycie.',
    content: `
      <h2>Opis szlaku</h2>
      <p>Giewont (1895 m n.p.m.) to jeden z najbardziej rozpoznawalnych szczytów Tatr,
      zwieńczony masywnym stalowym krzyżem widocznym z daleka.</p>

      <h3>Wymagania</h3>
      <p>Szlak jest trudny technicznie, szczególnie ostatni fragment prowadzący łańcuchami.
      Wymagana jest pewność siebie na ekspozycji i brak lęku wysokości.</p>

      <h3>Bezpieczeństwo</h3>
      <p><strong>UWAGA:</strong> Giewont jest niebezpieczny podczas burzy ze względu na metalowy krzyż.
      Nigdy nie wchodź na szczyt, gdy jest burza lub się zapowiada.</p>
    `,
    date: '2024-01-10',
    modified: '2024-01-10',
    featuredImage: {
      node: {
        sourceUrl: '/images/placeholder-trail.jpg',
        altText: 'Giewont peak with cross',
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
          name: 'Tatry Zachodnie',
          slug: 'western-tatras',
        },
      ],
    },
    seasons: {
      nodes: [
        {
          id: 'season-1',
          name: 'Lato',
          slug: 'summer',
        },
      ],
    },
    trailTypes: {
      nodes: [
        {
          id: 'type-1',
          name: 'Tam i z powrotem',
          slug: 'out-and-back',
        },
      ],
    },
    features: {
      nodes: [
        {
          id: 'feature-4',
          name: 'Szczyt',
          slug: 'peak',
        },
        {
          id: 'feature-3',
          name: 'Punkt widokowy',
          slug: 'viewpoint',
        },
      ],
    },
    language: {
      code: 'PL',
      name: 'Polski',
    },
  },
  'dolina-koscieliska': {
    id: '3',
    databaseId: 3,
    title: 'Dolina Kościeliska',
    slug: 'dolina-koscieliska',
    excerpt: 'Najdłuższa i najpiękniejsza dolina Tatr Zachodnich.',
    content: `
      <h2>Opis szlaku</h2>
      <p>Dolina Kościeliska to najdłuższa dolina Tatr Zachodnich, słynąca z malowniczych polan,
      jaskiń i bogatej flory.</p>

      <h3>Atrakcje</h3>
      <ul>
        <li>Jaskinia Mroźna - najdłuższa jaskinia Tatr</li>
        <li>Smreczyński Staw</li>
        <li>Polana Pisana</li>
        <li>Klin Tatrzański - potencjalnie najstarsze drzewo w Polsce</li>
      </ul>
    `,
    date: '2024-01-05',
    modified: '2024-01-05',
    featuredImage: {
      node: {
        sourceUrl: '/images/placeholder-trail.jpg',
        altText: 'Dolina Kościeliska valley',
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
          name: 'Tatry Zachodnie',
          slug: 'western-tatras',
        },
      ],
    },
    seasons: {
      nodes: [
        {
          id: 'season-1',
          name: 'Lato',
          slug: 'summer',
        },
        {
          id: 'season-2',
          name: 'Jesień',
          slug: 'fall',
        },
        {
          id: 'season-3',
          name: 'Zima',
          slug: 'winter',
        },
        {
          id: 'season-4',
          name: 'Wiosna',
          slug: 'spring',
        },
      ],
    },
    trailTypes: {
      nodes: [
        {
          id: 'type-1',
          name: 'Tam i z powrotem',
          slug: 'out-and-back',
        },
      ],
    },
    features: {
      nodes: [
        {
          id: 'feature-3',
          name: 'Punkt widokowy',
          slug: 'viewpoint',
        },
      ],
    },
    language: {
      code: 'PL',
      name: 'Polski',
    },
  },
};

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static params for known trails (optional, for SSG)
export function generateStaticParams() {
  // TODO: Replace with actual query to get all trail slugs
  return Object.keys(mockTrails).map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;
  const trail = mockTrails[slug];

  if (!trail) {
    return {
      title: 'Trail Not Found | Tatra Trails',
    };
  }

  return {
    title: `${trail.title} | Tatra Trails`,
    description: trail.excerpt,
    openGraph: {
      title: trail.title,
      description: trail.excerpt,
      images: [trail.featuredImage?.node?.sourceUrl || '/images/og-image.jpg'],
    },
  };
}

export default async function TrailPage({ params }: PageProps) {
  const { slug } = params;

  // TODO: Replace with actual GraphQL query
  // const { data } = await apolloClient.query({
  //   query: GET_TRAIL_BY_SLUG,
  //   variables: { slug, language: 'PL' }
  // });
  // const trail = data.trailReport;

  const trail = mockTrails[slug];

  if (!trail) {
    notFound();
  }

  // TODO: Fetch related trails based on region or difficulty
  const relatedTrails = Object.values(mockTrails)
    .filter((t) => t.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image Section */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        <Image
          src={trail.featuredImage?.node?.sourceUrl || '/images/placeholder-trail.jpg'}
          alt={trail.featuredImage?.node?.altText || trail.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Breadcrumbs */}
        <div className="absolute top-8 left-0 right-0 z-10">
          <div className="container">
            <nav className="flex items-center space-x-2 text-sm text-white">
              <Link href="/" className="hover:text-accent transition-colors">
                Strona główna
              </Link>
              <span>/</span>
              <Link href="/trails" className="hover:text-accent transition-colors">
                Szlaki
              </Link>
              <span>/</span>
              <span className="text-gray-300">{trail.title}</span>
            </nav>
          </div>
        </div>

        {/* Trail Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-8">
          <div className="container">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
              {trail.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {trail.regions.nodes.map((region) => (
                <span
                  key={region.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm text-white"
                >
                  {region.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="section">
        <div className="container">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Sidebar with Trail Stats */}
            <aside className="lg:col-span-4 mb-8 lg:mb-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Trail Stats Card */}
                <div className="card">
                  <div className="p-6">
                    <h2 className="text-xl font-heading font-bold text-text-primary mb-4">
                      Informacje o szlaku
                    </h2>
                    <TrailStats trail={trail} language="pl" />
                  </div>
                </div>

                {/* Map Card */}
                <div className="card overflow-hidden">
                  <TrailMap
                    location={{
                      lat: parseFloat(trail.trailData.gpsLatitude),
                      lng: parseFloat(trail.trailData.gpsLongitude),
                    }}
                    trailName={trail.title}
                  />
                </div>

                {/* Features */}
                {trail.features && trail.features.nodes.length > 0 && (
                  <div className="card">
                    <div className="p-6">
                      <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                        Atrakcje
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {trail.features.nodes.map((feature) => (
                          <span
                            key={feature.id}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-text-secondary"
                          >
                            {feature.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Seasons */}
                {trail.seasons && trail.seasons.nodes.length > 0 && (
                  <div className="card">
                    <div className="p-6">
                      <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                        Polecane pory roku
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {trail.seasons.nodes.map((season) => (
                          <span
                            key={season.id}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                          >
                            {season.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:col-span-8">
              {/* Trail Excerpt */}
              {trail.excerpt && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-primary">
                  <p className="text-lg text-text-primary leading-relaxed">{trail.excerpt}</p>
                </div>
              )}

              {/* Trail Content */}
              <div
                className="prose prose-lg max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: trail.content || '' }}
              />

              {/* Share Section */}
              <div className="mb-12 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Podziel się tym szlakiem
                </h3>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // TODO: Implement share functionality
                    }}
                  >
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // TODO: Implement share functionality
                    }}
                  >
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // TODO: Implement copy link
                    }}
                  >
                    Kopiuj link
                  </Button>
                </div>
              </div>

              {/* Comments Section Placeholder */}
              <div className="mb-12">
                <h3 className="text-2xl font-heading font-bold text-text-primary mb-6">
                  Komentarze
                </h3>
                <div className="p-8 bg-gray-50 rounded-lg text-center">
                  <p className="text-text-secondary mb-4">
                    Sekcja komentarzy zostanie wkrótce uruchomiona.
                  </p>
                  <p className="text-sm text-text-tertiary">
                    Będziesz mógł dzielić się swoimi doświadczeniami z tego szlaku!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Trails Section */}
      {relatedTrails.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4 heading-underline inline-block">
                Podobne szlaki
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Sprawdź inne szlaki, które mogą Cię zainteresować
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedTrails.map((relatedTrail) => (
                <TrailCard key={relatedTrail.id} trail={relatedTrail} language="pl" />
              ))}
            </div>

            <div className="text-center mt-10">
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
      )}
    </div>
  );
}
