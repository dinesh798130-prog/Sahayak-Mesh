'use client';

import React, { useState } from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { GoogleMapsPlaceRecord } from '@/lib/sahayak-mesh/types';
import { Globe, Database, Download, Plus, CheckCircle2, Compass, MapPin } from 'lucide-react';

export function GoogleMapsSyncBridge() {
  const { gmapsCache, syncGoogleMapsPlaceRecord, engine, activeNodeId, nodes } = useSahayakMesh();

  const [placeName, setPlaceName] = useState<string>('SNIST Pharmacy & Diagnostic Annex');
  const [lat, setLat] = useState<number>(17.45360);
  const [lng, setLng] = useState<number>(78.67620);
  const [placeType, setPlaceType] = useState<string>('pharmacy');
  const [lastSynced, setLastSynced] = useState<string | null>(null);

  const activeNode = nodes.find(n => n.nodeId === activeNodeId);
  const userLat = activeNode?.nodeLat || 17.45291;
  const userLng = activeNode?.nodeLng || 78.67541;

  const handleSyncPlace = (e: React.FormEvent) => {
    e.preventDefault();
    const placeId = `ChIJ_custom_${Date.now()}`;
    const record: GoogleMapsPlaceRecord = {
      placeId,
      name: placeName,
      lat,
      lng,
      formattedAddress: `${placeName}, SNIST Campus, Telangana 501301`,
      placeTypes: [placeType, 'point_of_interest'],
      accessibilityRating: 5.0,
      syncedAt: Date.now()
    };

    syncGoogleMapsPlaceRecord(record);
    setLastSynced(`Cached '${placeName}' (${placeId}) to local IndexedDB GIS store.`);
  };

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Google Maps Offline Edge Storage & Pre-Sync Bridge
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pre-fetches Google Maps Places into local IndexedDB for zero-WAN edge spatial queries
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          Cached Places: {gmapsCache.length} Records
        </span>
      </div>

      {/* Place Sync Form & Calculated Distance Preview */}
      <form onSubmit={handleSyncPlace} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Google Maps Place Name
          </label>
          <input
            type="text"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Latitude (WGS84)
          </label>
          <input
            type="number"
            step="0.00001"
            value={lat}
            onChange={(e) => setLat(parseFloat(e.target.value))}
            className="w-full px-3 py-2 rounded-lg text-xs font-mono border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Longitude (WGS84)
          </label>
          <input
            type="number"
            step="0.00001"
            value={lng}
            onChange={(e) => setLng(parseFloat(e.target.value))}
            className="w-full px-3 py-2 rounded-lg text-xs font-mono border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex flex-col justify-end">
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Cache Place to Edge Store</span>
          </button>
        </div>
      </form>

      {lastSynced && (
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs font-medium text-blue-900 dark:text-blue-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>{lastSynced}</span>
        </div>
      )}

      {/* Cached Google Maps Place Table */}
      <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-3 font-mono text-[11px]">
        <div className="grid grid-cols-12 font-bold text-slate-400 pb-2 border-b border-slate-800 mb-2">
          <span className="col-span-4">Place Name & ID</span>
          <span className="col-span-3">Coordinates</span>
          <span className="col-span-3">Geodesic Distance</span>
          <span className="col-span-2 text-right">Category</span>
        </div>

        {gmapsCache.map(record => {
          const distanceMeters = engine.calculateHaversineDistance(userLat, userLng, record.lat, record.lng);

          return (
            <div key={record.placeId} className="grid grid-cols-12 py-1.5 border-b border-slate-900 text-slate-300 items-center">
              <div className="col-span-4 flex flex-col">
                <span className="font-bold text-slate-200 truncate">{record.name}</span>
                <span className="text-[9px] text-slate-500">{record.placeId}</span>
              </div>

              <div className="col-span-3 text-slate-400">
                {record.lat.toFixed(4)}°, {record.lng.toFixed(4)}°
              </div>

              <div className="col-span-3 font-bold text-indigo-400">
                {distanceMeters} meters away
              </div>

              <div className="col-span-2 text-right">
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] capitalize text-slate-400">
                  {record.placeTypes[0] || 'place'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
