/**
 * Trail Map Component
 *
 * Displays a single trail location on Google Maps
 * Used on individual trail report pages
 */

'use client';

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import type { MapLocation } from '@/types';

export interface TrailMapProps {
  location: MapLocation;
  trailName: string;
  className?: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: false,
  fullscreenControl: true,
};

export function TrailMap({ location, trailName, className = '' }: TrailMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div
        className={`bg-gray-100 rounded-xl flex items-center justify-center ${className}`}
        style={{ height: '400px' }}
      >
        <div className="text-center text-gray-500">
          <svg
            className="w-12 h-12 mx-auto mb-2"
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
          <p className="text-sm">Map unavailable (API key not configured)</p>
        </div>
      </div>
    );
  }

  if (!location.lat || !location.lng) {
    return (
      <div
        className={`bg-gray-100 rounded-xl flex items-center justify-center ${className}`}
        style={{ height: '400px' }}
      >
        <div className="text-center text-gray-500">
          <svg
            className="w-12 h-12 mx-auto mb-2"
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
          <p className="text-sm">GPS coordinates not available</p>
        </div>
      </div>
    );
  }

  const center = {
    lat: location.lat,
    lng: location.lng,
  };

  return (
    <div className={`rounded-xl overflow-hidden shadow-md ${className}`} data-testid="trail-map">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
          options={mapOptions}
        >
          <Marker position={center} title={trailName} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
