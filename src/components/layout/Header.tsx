/**
 * Header Component
 *
 * Main site header with logo, navigation, and language switcher
 * Sticky header that adapts on scroll
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Language } from '@/types';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';

export interface HeaderProps {
  language: Language;
}

export function Header({ language }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
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
      label: language === 'pl' ? 'Przewodniki' : 'Guides',
      href: language === 'en' ? '/en/guides' : '/guides',
    },
    {
      label: language === 'pl' ? 'O nas' : 'About',
      href: language === 'en' ? '/en/about' : '/about',
    },
    {
      label: language === 'pl' ? 'Kontakt' : 'Contact',
      href: language === 'en' ? '/en/contact' : '/contact',
    },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/' || href === '/en') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`
        sticky top-0 z-50 w-full
        transition-all duration-300
        ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-white shadow-sm py-5'
        }
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href={language === 'en' ? '/en' : '/'}
            className="flex items-center gap-3 group"
          >
            <div className="text-primary">
              <svg
                className="w-8 h-8"
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
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-gray-900 group-hover:text-primary transition-colors">
                Tatra Trails
              </h1>
              {!isScrolled && (
                <p className="text-xs text-gray-600">
                  {language === 'pl'
                    ? 'Twój przewodnik po Tatrach'
                    : 'Your Guide to the Tatras'}
                </p>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  text-sm font-medium transition-colors
                  ${
                    isActiveLink(item.href)
                      ? 'text-primary'
                      : 'text-gray-700 hover:text-primary'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Language Switcher */}
          <div className="hidden lg:block">
            <LanguageSwitcher currentLanguage={language} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col gap-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    text-base font-medium transition-colors px-2 py-2 rounded
                    ${
                      isActiveLink(item.href)
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <LanguageSwitcher currentLanguage={language} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
