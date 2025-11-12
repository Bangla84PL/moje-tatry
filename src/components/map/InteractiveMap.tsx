/**
 * Interactive Map Component
 *
 * Displays multiple trail markers on an interactive Google Map
 * Used on the dedicated map page with filtering capabilities
 */

'use client';

import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Link from 'next/link';
import type { MarkerData, Difficulty, Language } from '@/types';
import { formatDistance, formatDifficulty, getTrailUrl } from '@/lib/utils/formatters';

export interface InteractiveMapProps {
  markers: MarkerData[];
  language?: Language;
  className?: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '600px',
};

// Center on Tatra Mountains region
const defaultCenter = {
  lat: 49.2745,
  lng: 20.0419,
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  mapTypeId: 'terrain' as google.maps.MapTypeId,
};

// Difficulty marker colors
const getDifficultyMarkerIcon = (difficulty: Difficulty): string => {
  const colors = {
    easy: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    moderate: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    difficult: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
    very_difficult: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    expert: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
  };
  return colors[difficulty] || colors.moderate;
};

export function InteractiveMap({
  markers,
  language = 'pl',
  className = '',
}: InteractiveMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const handleMarkerClick = useCallback((marker: MarkerData) => {
    setSelectedMarker(marker);
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  if (!apiKey) {
    return (
      <div
        className={`bg-gray-100 rounded-xl flex items-center justify-center ${className}`}
        style={{ height: '600px' }}
      >
        <div className="text-center text-gray-500">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <p className="font-medium">Map unavailable</p>
          <p className="text-sm mt-1">Google Maps API key not configured</p>
        </div>
      </div>
    );
  }

  if (!markers || markers.length === 0) {
    return (
      <div
        className={`bg-gray-100 rounded-xl flex items-center justify-center ${className}`}
        style={{ height: '600px' }}
      >
        <div className="text-center text-gray-500">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
          </svg>
          <p className="font-medium">
            {language === 'pl' ? 'Brak szlaków do wyświetlenia' : 'No trails to display'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl overflow-hidden shadow-lg ${className}`} data-testid="interactive-map">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={10}
          options={mapOptions}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.location.lat, lng: marker.location.lng }}
              icon={getDifficultyMarkerIcon(marker.difficulty)}
              title={marker.title}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.location.lat,
                lng: selectedMarker.location.lng,
              }}
              onCloseClick={handleInfoWindowClose}
            >
              <div className="p-2 max-w-xs">
                <h3 className="font-heading font-bold text-gray-900 mb-2">
                  {selectedMarker.title}
                </h3>

                <div className="mb-3">
                  <span
                    className={`
                      inline-block px-2 py-1 rounded text-xs font-bold uppercase text-white
                      ${
                        selectedMarker.difficulty === 'easy'
                          ? 'bg-green-500'
                          : selectedMarker.difficulty === 'moderate'
                            ? 'bg-yellow-500'
                            : selectedMarker.difficulty === 'difficult'
                              ? 'bg-orange-500'
                              : selectedMarker.difficulty === 'very_difficult'
                                ? 'bg-red-500'
                                : 'bg-purple-500'
                      }
                    `}
                  >
                    {formatDifficulty(selectedMarker.difficulty, language)}
                  </span>
                </div>

                {selectedMarker.distance && (
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>{language === 'pl' ? 'Dystans:' : 'Distance:'}</strong>{' '}
                    {formatDistance(selectedMarker.distance, language)}
                  </p>
                )}

                {selectedMarker.region && (
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>{language === 'pl' ? 'Region:' : 'Region:'}</strong>{' '}
                    {selectedMarker.region}
                  </p>
                )}

                <Link
                  href={getTrailUrl(selectedMarker.slug, language)}
                  className="inline-block px-3 py-1.5 bg-primary text-white text-sm font-medium rounded hover:bg-primary-dark transition-colors"
                >
                  {language === 'pl' ? 'Zobacz szczegóły' : 'View Details'}
                </Link>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
