/**
 * Footer Component
 *
 * Site footer with links, social media, and copyright information
 */

import React from 'react';
import Link from 'next/link';
import type { Language } from '@/types';

export interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: language === 'pl' ? 'Nawigacja' : 'Navigation',
      links: [
        {
          label: language === 'pl' ? 'Strona główna' : 'Home',
          href: language === 'en' ? '/en' : '/',
        },
        {
          label: language === 'pl' ? 'Szlaki' : 'Trails',
          href: language === 'en' ? '/en/trails' : '/trails',
        },
        {
          label: language === 'pl' ? 'Mapa' : 'Map',
          href: language === 'en' ? '/en/map' : '/map',
        },
        {
          label: language === 'pl' ? 'O nas' : 'About',
          href: language === 'en' ? '/en/about' : '/about',
        },
      ],
    },
    {
      title: language === 'pl' ? 'Zasoby' : 'Resources',
      links: [
        {
          label: language === 'pl' ? 'Przewodniki' : 'Planning Guides',
          href: language === 'en' ? '/en/guides' : '/guides',
        },
        {
          label: language === 'pl' ? 'Porady' : 'Safety Tips',
          href: language === 'en' ? '/en/guides/safety' : '/guides/safety',
        },
        {
          label: language === 'pl' ? 'Sprzęt' : 'Gear Reviews',
          href: language === 'en' ? '/en/guides/gear' : '/guides/gear',
        },
        {
          label: language === 'pl' ? 'Kontakt' : 'Contact',
          href: language === 'en' ? '/en/contact' : '/contact',
        },
      ],
    },
    {
      title: language === 'pl' ? 'Polityka' : 'Legal',
      links: [
        {
          label: language === 'pl' ? 'Polityka prywatności' : 'Privacy Policy',
          href: language === 'en' ? '/en/privacy' : '/privacy',
        },
        {
          label: language === 'pl' ? 'Warunki użytkowania' : 'Terms of Use',
          href: language === 'en' ? '/en/terms' : '/terms',
        },
        {
          label: language === 'pl' ? 'Pliki cookie' : 'Cookie Policy',
          href: language === 'en' ? '/en/cookies' : '/cookies',
        },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-8 h-8 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <h2 className="text-xl font-heading font-bold text-white">
                Tatra Trails
              </h2>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {language === 'pl'
                ? 'Odkryj piękno Tatr z naszymi szczegółowymi przewodnikami szlaków i relacjami z wypraw.'
                : 'Discover the beauty of the Tatra Mountains with our detailed trail guides and trip reports.'}
            </p>

            {/* Social Media Links */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wide mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} Tatra Trails.{' '}
              {language === 'pl'
                ? 'Wszelkie prawa zastrzeżone.'
                : 'All rights reserved.'}
            </p>
            <p className="text-xs text-gray-600">
              {language === 'pl'
                ? 'Zbudowane z ❤️ dla miłośników gór'
                : 'Built with ❤️ for mountain lovers'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
