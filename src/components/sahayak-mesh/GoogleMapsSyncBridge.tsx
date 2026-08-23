'use client';

import React, { useState } from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { GoogleMapsPlaceRecord } from '@/lib/sahayak-mesh/types';
import { Database, Plus, CheckCircle2 } from 'lucide-react';

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
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider">
              Google Maps Offline Edge Storage & Pre-Sync Bridge
            </h3>
            <p className="text-xs text-slate-400">
              Pre-fetches Google Maps Places into local IndexedDB for zero-WAN edge spatial queries
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800/80">
          Cached Places: {gmapsCache.length} Records
        </span>
      </div>

      {/* Place Sync Form */}
      <form onSubmit={handleSyncPlace} className="grid grid-cols-1 sm:grid-cols-4 gap-3.5 p-4 rounded-xl bg-slate-900/60 border border-slate-800/90">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Google Maps Place Name
          </label>
          <input
            type="text"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-xs font-semibold border border-slate-700/80 bg-slate-950 text-slate-100 focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Latitude (WGS84)
          </label>
          <input
            type="number"
            step="0.00001"
            value={lat}
            onChange={(e) => setLat(parseFloat(e.target.value))}
            className="w-full px-3 py-2 rounded-xl text-xs font-mono font-bold border border-slate-700/80 bg-slate-950 text-slate-100 focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Longitude (WGS84)
          </label>
          <input
            type="number"
            step="0.00001"
            value={lng}
            onChange={(e) => setLng(parseFloat(e.target.value))}
            className="w-full px-3 py-2 rounded-xl text-xs font-mono font-bold border border-slate-700/80 bg-slate-950 text-slate-100 focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <div className="flex flex-col justify-end">
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-98 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Cache Place to Edge Store</span>
          </button>
        </div>
      </form>

      {lastSynced && (
        <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/80 text-xs font-bold text-blue-300 flex items-center gap-2.5 shadow-md">
          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
          <span>{lastSynced}</span>
        </div>
      )}

      {/* Cached Google Maps Place Table */}
      <div className="max-h-52 overflow-y-auto rounded-xl border border-slate-800/90 bg-slate-950 p-3 font-mono text-[11px]">
        <div className="grid grid-cols-12 font-bold text-slate-400 pb-2.5 border-b border-slate-800 mb-2">
          <span className="col-span-4">Place Name & ID</span>
          <span className="col-span-3">WGS84 Coords</span>
          <span className="col-span-3">Edge Distance</span>
          <span className="col-span-2 text-right">Category</span>
        </div>

        {gmapsCache.map(record => {
          const distanceMeters = engine.calculateHaversineDistance(userLat, userLng, record.lat, record.lng);

          return (
            <div key={record.placeId} className="grid grid-cols-12 py-2 border-b border-slate-900/80 text-slate-300 items-center hover:bg-slate-900/40 transition px-1 rounded-lg">
              <div className="col-span-4 flex flex-col">
                <span className="font-bold text-slate-200 truncate">{record.name}</span>
                <span className="text-[9px] text-slate-500 font-mono">{record.placeId}</span>
              </div>

              <div className="col-span-3 text-slate-400 font-mono">
                {record.lat.toFixed(4)}°, {record.lng.toFixed(4)}°
              </div>

              <div className="col-span-3 font-bold text-indigo-400">
                {distanceMeters}m away
              </div>

              <div className="col-span-2 text-right">
                <span className="px-2 py-0.5 rounded bg-slate-900 text-[9px] capitalize text-slate-300 border border-slate-800">
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
