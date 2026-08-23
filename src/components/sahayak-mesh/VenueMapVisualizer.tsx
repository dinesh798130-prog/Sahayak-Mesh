'use client';

import React, { useState } from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { VenueResource, ResourceState, ObservationState } from '@/lib/sahayak-mesh/types';
import { 
  Building2, 
  Accessibility, 
  MapPin
} from 'lucide-react';

interface VenueMapVisualizerProps {
  selectedPathSegments?: string[];
  onSelectResource?: (resourceId: string) => void;
}

export function VenueMapVisualizer({ selectedPathSegments = [], onSelectResource }: VenueMapVisualizerProps) {
  const { resources, resourceStates } = useSahayakMesh();
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);

  const getResourceState = (resourceId: string): ResourceState | undefined => {
    return resourceStates.find(s => s.resourceId === resourceId);
  };

  const getStateBadge = (state: ObservationState, isConflicted: boolean) => {
    if (isConflicted) {
      return {
        label: 'CONFLICTED',
        bg: 'bg-purple-600 text-white shadow-purple-600/30',
        border: 'border-purple-400',
        ring: 'ring-purple-400'
      };
    }

    switch (state) {
      case 'Available':
        return {
          label: 'AVAILABLE',
          bg: 'bg-emerald-600 text-white shadow-emerald-600/30',
          border: 'border-emerald-400',
          ring: 'ring-emerald-400'
        };
      case 'Busy':
        return {
          label: 'BUSY / HIGH CROWD',
          bg: 'bg-amber-500 text-white shadow-amber-500/30',
          border: 'border-amber-400',
          ring: 'ring-amber-400'
        };
      case 'Blocked':
      case 'Broken':
        return {
          label: state.toUpperCase(),
          bg: 'bg-rose-600 text-white shadow-rose-600/30',
          border: 'border-rose-400',
          ring: 'ring-rose-400'
        };
      default:
        return {
          label: 'UNKNOWN',
          bg: 'bg-slate-600 text-white shadow-slate-600/30',
          border: 'border-slate-400',
          ring: 'ring-slate-400'
        };
    }
  };

  const selectedRes = resources.find(r => r.resourceId === selectedResourceId);
  const selectedState = selectedResourceId ? getResourceState(selectedResourceId) : undefined;

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider">
              FR-03 Indoor Venue Blueprint & Physical Node Map Visualizer
            </h3>
            <p className="text-xs text-slate-400">
              Interactive 2D spatial graph with real-time ephemeral node state overlays
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
          Campus Nodes: {resources.length} Geocoded Points
        </span>
      </div>

      {/* Blueprint Canvas Window */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl border border-slate-800/90 bg-slate-950 overflow-hidden select-none shadow-2xl">
        <div className="absolute top-3 left-4 text-xs font-mono font-extrabold text-slate-600 uppercase tracking-widest">
          South Entrance & Main Gate
        </div>
        <div className="absolute top-3 right-4 text-xs font-mono font-extrabold text-slate-600 uppercase tracking-widest">
          North Academic Blocks
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {resources.map(res => {
            const connectedIds = res.metadata.connectedNodes || [];
            return connectedIds.map(targetId => {
              const targetRes = resources.find(r => r.resourceId === targetId);
              if (!targetRes) return null;
              const isPathActive = selectedPathSegments.includes(res.resourceId) && selectedPathSegments.includes(targetId);

              return (
                <line
                  key={`path-${res.resourceId}-${targetId}`}
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

        {resources.map(res => {
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
                className={`relative flex items-center justify-center p-2.5 rounded-full shadow-lg transition-all ${badge.bg} ${
                  isSelected ? 'ring-4 ring-indigo-400 scale-125 shadow-indigo-500/50' : ''
                }`}
              >
                <MapPin className="w-4 h-4 text-white" />
                {res.accessible && (
                  <Accessibility className="w-3.5 h-3.5 absolute -top-1 -right-1 text-blue-200 bg-slate-900 rounded-full p-0.5 border border-blue-400/50" />
                )}
              </div>

              <div className="flex flex-col items-center bg-slate-950/95 backdrop-blur-md px-2 py-1 rounded-md border border-slate-800 text-center max-w-[130px] shadow-md">
                <span className="text-[10px] font-extrabold text-slate-100 truncate w-full">
                  {res.name}
                </span>
                <span className="text-[9px] font-mono text-indigo-300">
                  {res.floor}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Node Inspector Footer */}
      {selectedRes && (
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <h4 className="text-sm font-black text-slate-100">
                {selectedRes.name}
              </h4>
              <span className="text-xs font-mono text-indigo-400 font-bold px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800/60">
                {selectedRes.resourceId}
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Building: {selectedRes.buildingName} • Level: {selectedRes.floor}
            </p>
          </div>

          {selectedState && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-slate-300">
                Status: <strong className="text-emerald-400">{selectedState.effectiveState}</strong>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
