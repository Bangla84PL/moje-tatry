/**
 * Root Layout
 *
 * Main layout wrapper for the application with Apollo Client provider
 * Includes global styles, metadata, and layout components
 */

import type { Metadata } from 'next';
import { Open_Sans, Montserrat } from 'next/font/google';
import './globals.css';
import { ApolloWrapper } from '@/lib/wordpress/ApolloWrapper';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Font configurations
const openSans = Open_Sans({
  subsets: ['latin', 'latin-ext'], // latin-ext includes Polish characters
  variable: '--font-open-sans',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'Tatra Trails - Your Guide to the Tatra Mountains',
    template: '%s | Tatra Trails',
  },
  description:
    'Discover the beauty of the Tatra Mountains with our detailed trail guides and trip reports. Comprehensive hiking information for both Polish and international visitors.',
  keywords: [
    'Tatra Mountains',
    'hiking',
    'trail reports',
    'Poland hiking',
    'Slovakia hiking',
    'mountain trails',
    'Tatry',
    'szlaki',
  ],
  authors: [{ name: 'Tatra Trails' }],
  creator: 'Tatra Trails',
  publisher: 'Tatra Trails',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      pl: '/pl',
      en: '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    alternateLocale: 'en_US',
    url: '/',
    siteName: 'Tatra Trails',
    title: 'Tatra Trails - Your Guide to the Tatra Mountains',
    description:
      'Discover the beauty of the Tatra Mountains with our detailed trail guides and trip reports.',
    images: [
      {
        url: '/images/og-image.jpg', // TODO: Add Open Graph image
        width: 1200,
        height: 630,
        alt: 'Tatra Mountains Trail Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tatra Trails - Your Guide to the Tatra Mountains',
    description:
      'Discover the beauty of the Tatra Mountains with our detailed trail guides and trip reports.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // TODO: Add Google Search Console verification
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Default to Polish language (will be determined by route in actual pages)
  const language = 'pl';

  return (
    <html
      lang={language}
      className={`${openSans.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Additional head elements can go here */}
      </head>
      <body className="min-h-screen flex flex-col bg-background font-sans antialiased">
        <ApolloWrapper>
          {/* Header */}
          <Header language={language} />

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <Footer language={language} />
        </ApolloWrapper>
      </body>
    </html>
  );
}
