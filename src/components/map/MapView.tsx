/**
 * Map View Component
 *
 * Thin wrapper around `TrailMap` to maintain backward compatibility with
 * existing pages that expect the older MapView API.
 */

'use client';

import type { MapLocation } from '@/types';
import { TrailMap } from './TrailMap';

export interface MapViewProps {
  latitude: number;
  longitude: number;
  trailName: string;
  className?: string;
}

const toLocation = (latitude: number, longitude: number): MapLocation => ({
  lat: latitude,
  lng: longitude,
});

export function MapView({ latitude, longitude, trailName, className }: MapViewProps) {
  return (
    <TrailMap
      location={toLocation(latitude, longitude)}
      trailName={trailName}
      className={className}
    />
  );
}
