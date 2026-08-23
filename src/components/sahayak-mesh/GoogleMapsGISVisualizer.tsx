'use client';

import React, { useState } from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { VenueResource, ResourceState, ObservationState } from '@/lib/sahayak-mesh/types';
import { 
  Building2, 
  Globe, 
  MapPin, 
  Compass, 
  Accessibility, 
  ShieldCheck,
  Navigation
} from 'lucide-react';

interface GoogleMapsGISVisualizerProps {
  selectedPathSegments?: string[];
  selectedBuildingId?: string | null;
  selectedFloor?: string | null;
  onSelectResource?: (resourceId: string) => void;
}

export function GoogleMapsGISVisualizer({ 
  selectedPathSegments = [], 
  selectedBuildingId = null,
  selectedFloor = null,
  onSelectResource 
}: GoogleMapsGISVisualizerProps) {
  const { resources, resourceStates, activeNodeId, nodes } = useSahayakMesh();
  const [mapMode, setMapMode] = useState<'gmaps' | 'indoor'>('gmaps');
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>('res-gate-main');

  const activeNode = nodes.find(n => n.nodeId === activeNodeId);
  const userLat = activeNode?.nodeLat || 17.45291;
  const userLng = activeNode?.nodeLng || 78.67541;

  const getResourceState = (resourceId: string): ResourceState | undefined => {
    return resourceStates.find(s => s.resourceId === resourceId);
  };

  const getStateBadge = (state: ObservationState, isConflicted: boolean) => {
    if (isConflicted) {
      return { label: 'CONFLICTED', bg: 'bg-purple-600 text-white shadow-purple-600/30', border: 'border-purple-400' };
    }
    switch (state) {
      case 'Available':
        return { label: 'AVAILABLE', bg: 'bg-emerald-600 text-white shadow-emerald-600/30', border: 'border-emerald-400' };
      case 'Busy':
        return { label: 'BUSY', bg: 'bg-amber-500 text-white shadow-amber-500/30', border: 'border-amber-400' };
      case 'Blocked':
      case 'Broken':
        return { label: state.toUpperCase(), bg: 'bg-rose-600 text-white shadow-rose-600/30', border: 'border-rose-400' };
      default:
        return { label: 'UNKNOWN', bg: 'bg-slate-600 text-white shadow-slate-600/30', border: 'border-slate-400' };
    }
  };

  const visibleResources = resources.filter(r => {
    if (selectedBuildingId && r.buildingId !== selectedBuildingId) return false;
    if (selectedFloor && r.floor !== selectedFloor) return false;
    return true;
  });

  const selectedRes = resources.find(r => r.resourceId === selectedResourceId);
  const selectedState = selectedResourceId ? getResourceState(selectedResourceId) : undefined;

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Globe className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider">
                Google Maps GIS Satellite Edge Visualizer
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                WGS84 17.4529° N, 78.6754° E
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Showing {visibleResources.length} of {resources.length} Geocoded Campus Nodes
            </p>
          </div>
        </div>

        {/* Mode Switcher Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 select-none">
          <button
            onClick={() => setMapMode('gmaps')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition cursor-pointer ${
              mapMode === 'gmaps'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Satellite View</span>
          </button>

          <button
            onClick={() => setMapMode('indoor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition cursor-pointer ${
              mapMode === 'indoor'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Blueprint Plan</span>
          </button>
        </div>
      </div>

      {/* Map Canvas Window */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl border border-slate-800/90 bg-slate-950 overflow-hidden select-none shadow-2xl">
        {mapMode === 'gmaps' ? (
          <div className="absolute inset-0 bg-[#0b1329] flex flex-col justify-between p-4">
            {/* Overlay Toolbar */}
            <div className="flex items-center justify-between z-10 bg-slate-900/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs shadow-lg">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-400 animate-spin" />
                <span className="font-mono font-bold text-slate-200">
                  SNIST Campus Satellite Geofence (Ghatkesar, Hyderabad)
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Edge Spatial Engine Active</span>
              </div>
            </div>

            {/* Simulated Satellite Map Canvas & Markers */}
            <div className="relative flex-1 w-full my-2 rounded-xl border border-slate-800/80 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />

              {/* Connecting Path Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {visibleResources.map(res => {
                  const connectedIds = res.metadata.connectedNodes || [];
                  return connectedIds.map(targetId => {
                    const targetRes = resources.find(r => r.resourceId === targetId);
                    if (!targetRes) return null;
                    const isPathActive = selectedPathSegments.includes(res.resourceId) && selectedPathSegments.includes(targetId);

                    return (
                      <line
                        key={`gmaps-path-${res.resourceId}-${targetId}`}
                        x1={`${res.x}%`}
                        y1={`${res.y}%`}
                        x2={`${targetRes.x}%`}
                        y2={`${targetRes.y}%`}
                        stroke={isPathActive ? '#6366f1' : '#3b82f6'}
                        strokeWidth={isPathActive ? '4' : '1.5'}
                        strokeDasharray={isPathActive ? 'none' : '3 3'}
                        opacity={isPathActive ? '1' : '0.4'}
                      />
                    );
                  });
                })}
              </svg>

              {/* Geocoded Google Maps Place Markers */}
              {visibleResources.map(res => {
                const state = getResourceState(res.resourceId);
                const effectiveState = state?.effectiveState || 'Unknown';
                const isConflicted = state?.conflictState === 'CONFLICTED';
                const badge = getStateBadge(effectiveState, isConflicted);
                const isSelected = selectedResourceId === res.resourceId;
                const isInPath = selectedPathSegments.includes(res.resourceId);

                return (
                  <button
                    key={res.resourceId}
                    style={{ left: `${res.x}%`, top: `${res.y}%` }}
                    onClick={() => {
                      setSelectedResourceId(res.resourceId);
                      if (onSelectResource) onSelectResource(res.resourceId);
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group transition-all z-10 cursor-pointer ${
                      isInPath ? 'scale-110' : 'hover:scale-105'
                    }`}
                  >
                    <div
                      className={`relative flex items-center justify-center p-2 rounded-full shadow-lg transition-all ${badge.bg} ${
                        isSelected ? 'ring-4 ring-indigo-400 scale-125 shadow-indigo-500/50' : ''
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-white" />
                      {res.accessible && (
                        <Accessibility className="w-3.5 h-3.5 absolute -top-1 -right-1 text-blue-200 bg-slate-900 rounded-full p-0.5 border border-blue-400/50" />
                      )}
                    </div>

                    <div className="flex flex-col items-center bg-slate-950/95 backdrop-blur-md px-2 py-1 rounded-md border border-slate-700/80 text-center max-w-[130px] shadow-md">
                      <span className="text-[10px] font-extrabold text-slate-100 truncate w-full">
                        {res.name}
                      </span>
                      <span className="text-[9px] font-mono text-indigo-300">
                        {res.buildingName.split('&')[0]} ({res.floor.split(' ')[0]})
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* GIS Bottom Legend */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 z-10 bg-slate-900/90 px-3.5 py-1.5 rounded-xl border border-slate-800">
              <span>SNIST College Geofence: 50+ Acres</span>
              <span className="text-indigo-400 font-bold">100% Offline Edge GIS Engine</span>
            </div>
          </div>
        ) : (
          /* Blueprint Floor Map View */
          <div className="relative w-full h-full p-4">
            <div className="absolute top-3 left-4 text-xs font-mono font-extrabold text-slate-600 uppercase tracking-widest">
              South Campus & Gates
            </div>
            <div className="absolute top-3 right-4 text-xs font-mono font-extrabold text-slate-600 uppercase tracking-widest">
              North Engineering Blocks
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {visibleResources.map(res => {
                const connectedIds = res.metadata.connectedNodes || [];
                return connectedIds.map(targetId => {
                  const targetRes = resources.find(r => r.resourceId === targetId);
                  if (!targetRes) return null;
                  const isPathActive = selectedPathSegments.includes(res.resourceId) && selectedPathSegments.includes(targetId);

                  return (
                    <line
                      key={`indoor-path-${res.resourceId}-${targetId}`}
                      x1={`${res.x}%`}
                      y1={`${res.y}%`}
                      x2={`${targetRes.x}%`}
                      y2={`${targetRes.y}%`}
                      stroke={isPathActive ? '#6366f1' : '#334155'}
                      strokeWidth={isPathActive ? '4' : '1.5'}
                      strokeDasharray={isPathActive ? 'none' : '4 4'}
                    />
                  );
                });
              })}
            </svg>

            {visibleResources.map(res => {
              const state = getResourceState(res.resourceId);
              const effectiveState = state?.effectiveState || 'Unknown';
              const isConflicted = state?.conflictState === 'CONFLICTED';
              const badge = getStateBadge(effectiveState, isConflicted);
              const isSelected = selectedResourceId === res.resourceId;

              return (
                <button
                  key={res.resourceId}
                  style={{ left: `${res.x}%`, top: `${res.y}%` }}
                  onClick={() => {
                    setSelectedResourceId(res.resourceId);
                    if (onSelectResource) onSelectResource(res.resourceId);
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group transition-all z-10 cursor-pointer`}
                >
                  <div className={`p-2 rounded-full shadow-lg ${badge.bg} ${isSelected ? 'ring-4 ring-indigo-400 scale-125' : ''}`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-100 bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-700">
                    {res.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Google Maps Place Detail Card */}
      {selectedRes && (
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <h4 className="text-sm font-black text-slate-100">
                {selectedRes.name}
              </h4>
              <span className="text-xs font-mono text-indigo-400 font-bold px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800/60">
                {selectedRes.roomNumber ? `Room ${selectedRes.roomNumber}` : selectedRes.gis.placeId}
              </span>
              {selectedRes.accessible && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Wheelchair Accessible
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400">
              {selectedRes.buildingName} • {selectedRes.floor} • Department: {selectedRes.department || 'General'}
            </p>
          </div>

          <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4">
            <div className="flex flex-col text-right sm:text-left">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">WGS84 Coords</span>
              <span className="text-xs font-mono font-bold text-slate-200">
                {selectedRes.gis.lat.toFixed(5)}° N, {selectedRes.gis.lng.toFixed(5)}° E
              </span>
            </div>

            <div className="flex flex-col text-right">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Category</span>
              <span className="text-xs font-extrabold text-indigo-400 capitalize">
                {selectedRes.type.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
