'use client';

import { useEffect, useRef, useState } from 'react';
import type { ProviderData } from '@/app/providers/data';

declare global {
  interface Window {
    google?: {
      maps: {
        Map: new (
          el: HTMLElement,
          options: Record<string, unknown>
        ) => unknown;
        Marker: new (
          options: Record<string, unknown>
        ) => unknown;
        LatLng: new (lat: number, lng: number) => unknown;
        MapTypeId: { ROADMAP: unknown };
        event: { addListener: (o: unknown, e: string, f: () => void) => void };
      };
    };
  }
}

const KUTU = { lat: -0.5117, lng: 37.2661 };
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

interface ProvidersMapProps {
  providers: ProviderData[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function markerOffset(index: number) {
  const angle = (index / 11) * Math.PI * 2;
  return {
    lat: KUTU.lat + Math.sin(angle) * 0.035,
    lng: KUTU.lng + Math.cos(angle) * 0.035,
  };
}

export function ProvidersMap({
  providers,
  selectedId,
  onSelect,
}: ProvidersMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<unknown>(null);
  const markers = useRef<unknown[]>([]);
  const [scriptFailed, setScriptFailed] = useState(false);

  const selected = providers.find((p) => p.id === selectedId) ?? null;

  useEffect(() => {
    if (!API_KEY || scriptFailed) return;
    if (mapInstance.current) return;

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-google-maps]'
    );
    const load = () => {
      if (!mapRef.current || !window.google) return;
      const google = window.google;
      mapInstance.current = new google.maps.Map(
        mapRef.current,
        {
          center: new google.maps.LatLng(KUTU.lat, KUTU.lng),
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        }
      );
      markers.current = providers.map((provider, index) => {
        const position = markerOffset(index);
        const marker = new google.maps.Marker({
          position,
          title: provider.name,
          map: mapInstance.current,
        });
        google.maps.event.addListener(marker, 'click', () =>
          onSelect(provider.id)
        );
        return marker;
      });
    };

    if (existingScript) {
      existingScript.addEventListener('load', load);
      return () =>
        existingScript.removeEventListener('load', load);
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    script.dataset.googleMaps = 'true';
    script.async = true;
    script.addEventListener('load', load);
    script.addEventListener('error', () => setScriptFailed(true));
    document.head.appendChild(script);
  }, [scriptFailed, providers, onSelect]);

  useEffect(() => {
    if (!API_KEY || !window.google || !mapInstance.current) return;
    const index = providers.findIndex((p) => p.id === selectedId);
    if (index >= 0) {
      const position = markerOffset(index);
      (
        mapInstance.current as { setCenter: (center: unknown) => void }
      ).setCenter(
        new window.google.maps.LatLng(position.lat, position.lng)
      );
    }
  }, [selectedId, providers]);

  const showFallback = !API_KEY || scriptFailed;

  return (
    <div className="relative h-[420px] rounded-card overflow-hidden shadow-lifted bg-surface-raised border border-border">
      {showFallback ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-primary-soft to-surface">
          <MapPinIcon />
          <h3 className="text-xl font-semibold tracking-tight mt-4">
            Map of Kutus providers
          </h3>
          <p className="text-foreground-muted max-w-sm mt-2 text-sm">
            Add <code className="text-primary-strong">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to
            the web environment to see the live map with
            provider markers.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {providers.map((provider) => (
              <button
                key={provider.id}
                type="button"
                onClick={() => onSelect(provider.id)}
                className={
                  provider.id === selectedId
                    ? 'bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium'
                    : 'bg-surface border border-border px-3 py-1 rounded-full text-xs text-foreground-muted'
                }
              >
                {provider.area}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div ref={mapRef} className="absolute inset-0" />
      )}

      {selected && (
        <div className="absolute left-4 bottom-4 right-4 sm:right-auto sm:max-w-sm glass-panel rounded-card p-4">
          <p className="text-xs text-foreground-muted mb-1">
            Selected provider
          </p>
          <p className="font-semibold tracking-tight">
            {selected.name}
          </p>
          <p className="text-sm text-foreground-muted">
            {selected.area} · {selected.distanceKm.toFixed(1)} km ·{' '}
            {selected.turnaroundHours}h turnaround
          </p>
          <p className="text-sm font-medium text-primary-strong mt-1">
            KES {(selected.pricePerKg / 100).toFixed(2)}/kg
          </p>
        </div>
      )}
    </div>
  );
}

function MapPinIcon() {
  return (
    <span className="h-14 w-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center">
      <svg
        className="h-7 w-7"
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
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </span>
  );
}
