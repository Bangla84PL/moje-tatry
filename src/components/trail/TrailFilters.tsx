/**
 * Trail Filters Component
 *
 * Provides filtering controls for trail database
 * Filters by region, difficulty, season, trail type, and features
 */

'use client';

import React, { useState } from 'react';
import type { Language, TrailFilters as TrailFiltersType, Difficulty } from '@/types';
import { Button } from '@/components/common/Button';

export interface TrailFiltersProps {
  filters: TrailFiltersType;
  onFiltersChange: (filters: TrailFiltersType) => void;
  taxonomies: {
    regions: Array<{ id: string; name: string; slug: string; count: number }>;
    difficulties: Array<{ id: string; name: string; slug: string; count: number }>;
    seasons: Array<{ id: string; name: string; slug: string; count: number }>;
    trailTypes: Array<{ id: string; name: string; slug: string; count: number }>;
    features: Array<{ id: string; name: string; slug: string; count: number }>;
  };
  language?: Language;
  className?: string;
}

export function TrailFilters({
  filters,
  onFiltersChange,
  taxonomies,
  language = 'pl',
  className = '',
}: TrailFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleRegionChange = (slug: string) => {
    onFiltersChange({ ...filters, region: slug === filters.region ? undefined : slug });
  };

  const handleDifficultyToggle = (slug: string) => {
    const currentDifficulties = filters.difficulty || [];
    const newDifficulties = currentDifficulties.includes(slug)
      ? currentDifficulties.filter((d) => d !== slug)
      : [...currentDifficulties, slug];
    onFiltersChange({ ...filters, difficulty: newDifficulties.length > 0 ? newDifficulties : undefined });
  };

  const handleSeasonToggle = (slug: string) => {
    const currentSeasons = filters.season || [];
    const newSeasons = currentSeasons.includes(slug)
      ? currentSeasons.filter((s) => s !== slug)
      : [...currentSeasons, slug];
    onFiltersChange({ ...filters, season: newSeasons.length > 0 ? newSeasons : undefined });
  };

  const handleTrailTypeToggle = (slug: string) => {
    const currentTypes = filters.trailType || [];
    const newTypes = currentTypes.includes(slug)
      ? currentTypes.filter((t) => t !== slug)
      : [...currentTypes, slug];
    onFiltersChange({ ...filters, trailType: newTypes.length > 0 ? newTypes : undefined });
  };

  const handleFeatureToggle = (slug: string) => {
    const currentFeatures = filters.features || [];
    const newFeatures = currentFeatures.includes(slug)
      ? currentFeatures.filter((f) => f !== slug)
      : [...currentFeatures, slug];
    onFiltersChange({ ...filters, features: newFeatures.length > 0 ? newFeatures : undefined });
  };

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value || undefined });
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).some(
    (key) => filters[key as keyof TrailFiltersType] !== undefined
  );

  const FilterSection = ({
    title,
    options,
    selectedValues,
    onToggle,
  }: {
    title: string;
    options: Array<{ id: string; name: string; slug: string; count: number }>;
    selectedValues: string[] | undefined;
    onToggle: (slug: string) => void;
  }) => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
        {title}
      </h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedValues?.includes(option.slug) || false}
              onChange={() => onToggle(option.slug)}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm text-gray-700 flex-1">{option.name}</span>
            <span className="text-xs text-gray-500">({option.count})</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full"
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
          {language === 'pl' ? 'Filtry' : 'Filters'}
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-0.5 bg-primary text-white text-xs rounded-full">
              {Object.keys(filters).length}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      <div
        className={`
          ${className}
          ${isOpen ? 'block' : 'hidden lg:block'}
          bg-white rounded-xl shadow-md p-6
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-heading font-bold text-gray-900">
            {language === 'pl' ? 'Filtry' : 'Filters'}
          </h2>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
            >
              {language === 'pl' ? 'Wyczyść' : 'Clear All'}
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <label htmlFor="trail-search" className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2 block">
            {language === 'pl' ? 'Szukaj' : 'Search'}
          </label>
          <input
            id="trail-search"
            type="text"
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={language === 'pl' ? 'Nazwa szlaku...' : 'Trail name...'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Region Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            {language === 'pl' ? 'Region' : 'Region'}
          </h3>
          <div className="space-y-2">
            {taxonomies.regions.map((region) => (
              <label
                key={region.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <input
                  type="radio"
                  name="region"
                  checked={filters.region === region.slug}
                  onChange={() => handleRegionChange(region.slug)}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span className="text-sm text-gray-700 flex-1">{region.name}</span>
                <span className="text-xs text-gray-500">({region.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <FilterSection
          title={language === 'pl' ? 'Trudność' : 'Difficulty'}
          options={taxonomies.difficulties}
          selectedValues={filters.difficulty}
          onToggle={handleDifficultyToggle}
        />

        {/* Season Filter */}
        <FilterSection
          title={language === 'pl' ? 'Sezon' : 'Season'}
          options={taxonomies.seasons}
          selectedValues={filters.season}
          onToggle={handleSeasonToggle}
        />

        {/* Trail Type Filter */}
        <FilterSection
          title={language === 'pl' ? 'Typ szlaku' : 'Trail Type'}
          options={taxonomies.trailTypes}
          selectedValues={filters.trailType}
          onToggle={handleTrailTypeToggle}
        />

        {/* Features Filter */}
        <FilterSection
          title={language === 'pl' ? 'Atrakcje' : 'Features'}
          options={taxonomies.features}
          selectedValues={filters.features}
          onToggle={handleFeatureToggle}
        />

        {/* Mobile Close Button */}
        <div className="lg:hidden mt-6">
          <Button variant="primary" onClick={() => setIsOpen(false)} className="w-full">
            {language === 'pl' ? 'Zastosuj filtry' : 'Apply Filters'}
          </Button>
        </div>
      </div>
    </>
  );
}
