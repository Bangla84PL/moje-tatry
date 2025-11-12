/**
 * Language Switcher Component
 *
 * Toggles between Polish (PL) and English (EN) languages
 * Displays flag icons and updates route accordingly
 */

'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { Language } from '@/types';

export interface LanguageSwitcherProps {
  currentLanguage: Language;
  className?: string;
}

export function LanguageSwitcher({ currentLanguage, className = '' }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLanguage: Language) => {
    if (newLanguage === currentLanguage) return;

    // Remove current language prefix and add new one
    let newPath = pathname;

    // Remove /en or /pl prefix if exists
    if (pathname.startsWith('/en')) {
      newPath = pathname.replace('/en', '');
    } else if (pathname.startsWith('/pl')) {
      newPath = pathname.replace('/pl', '');
    }

    // Add new language prefix (except for Polish which is default)
    if (newLanguage === 'en') {
      newPath = '/en' + (newPath || '/');
    } else {
      newPath = newPath || '/';
    }

    router.push(newPath);
  };

  return (
    <div
      className={`flex items-center gap-2 bg-gray-100 rounded-lg p-1 ${className}`}
      data-testid="language-switcher"
    >
      <button
        onClick={() => switchLanguage('pl')}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-md
          transition-colors duration-200
          ${
            currentLanguage === 'pl'
              ? 'bg-white shadow-sm font-semibold'
              : 'hover:bg-gray-50'
          }
        `}
        aria-label="Switch to Polish"
        aria-pressed={currentLanguage === 'pl'}
      >
        <span className="text-xl" role="img" aria-label="Polish flag">
          🇵🇱
        </span>
        <span className="text-sm">PL</span>
      </button>

      <button
        onClick={() => switchLanguage('en')}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-md
          transition-colors duration-200
          ${
            currentLanguage === 'en'
              ? 'bg-white shadow-sm font-semibold'
              : 'hover:bg-gray-50'
          }
        `}
        aria-label="Switch to English"
        aria-pressed={currentLanguage === 'en'}
      >
        <span className="text-xl" role="img" aria-label="English flag">
          🇬🇧
        </span>
        <span className="text-sm">EN</span>
      </button>
    </div>
  );
}
