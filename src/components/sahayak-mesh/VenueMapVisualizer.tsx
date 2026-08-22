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
        bg: 'bg-purple-500 text-white',
        border: 'border-purple-600',
        ring: 'ring-purple-400'
      };
    }

    switch (state) {
      case 'Available':
        return {
          label: 'AVAILABLE',
          bg: 'bg-emerald-500 text-white',
          border: 'border-emerald-600',
          ring: 'ring-emerald-400'
        };
      case 'Busy':
        return {
          label: 'BUSY / HIGH CROWD',
          bg: 'bg-amber-500 text-white',
          border: 'border-amber-600',
          ring: 'ring-amber-400'
        };
      case 'Blocked':
      case 'Broken':
        return {
          label: state.toUpperCase(),
          bg: 'bg-rose-500 text-white',
          border: 'border-rose-600',
          ring: 'ring-rose-400'
        };
      default:
        return {
          label: 'UNKNOWN',
          bg: 'bg-slate-400 text-white',
          border: 'border-slate-500',
          ring: 'ring-slate-300'
        };
    }
  };

  const selectedRes = resources.find(r => r.resourceId === selectedResourceId);
  const selectedState = selectedResourceId ? getResourceState(selectedResourceId) : undefined;

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              FR-03 Venue Resource Catalog & Live Floor Map
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              8 Seeded Hospital Nodes (Ground Floor) • Ephemeral State Fusion Layer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-medium">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Available
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Busy
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Broken/Blocked
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" /> Conflicted
          </span>
        </div>
      </div>

      <div className="relative w-full h-80 sm:h-96 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

        <div className="absolute top-3 left-4 text-xs font-mono font-bold text-slate-600 uppercase tracking-widest">
          Zone A (Main OPD)
        </div>
        <div className="absolute top-3 right-4 text-xs font-mono font-bold text-slate-600 uppercase tracking-widest">
          Zone B (Emergency & Diagnostic)
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-mono font-bold text-slate-600 uppercase tracking-widest">
          Zone Central (Lobby & Elevator Hub)
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
                  key={`${res.resourceId}-${targetId}`}
                  x1={`${res.x}%`}
                  y1={`${res.y}%`}
                  x2={`${targetRes.x}%`}
                  y2={`${targetRes.y}%`}
                  stroke={isPathActive ? '#6366f1' : '#334155'}
                  strokeWidth={isPathActive ? '4' : '1.5'}
                  strokeDasharray={isPathActive ? 'none' : '4 4'}
                  className={isPathActive ? 'animate-pulse' : ''}
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
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group transition-all z-10 ${
                isInPath ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div
                className={`relative flex items-center justify-center p-2.5 rounded-full shadow-lg transition-all ${badge.bg} ${
                  isSelected ? 'ring-4 ring-indigo-400 scale-125' : ''
                } ${isInPath ? 'ring-4 ring-indigo-500 animate-bounce' : ''}`}
              >
                {res.accessible && (
                  <Accessibility className="w-3.5 h-3.5 absolute -top-1 -right-1 text-blue-300 bg-slate-900 rounded-full p-0.5" />
                )}
                <MapPin className="w-4 h-4" />
              </div>

              <div className="flex flex-col items-center bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-md border border-slate-700 text-center max-w-[120px]">
                <span className="text-[10px] font-bold text-slate-100 truncate w-full">
                  {res.name}
                </span>
                <span className={`text-[9px] font-extrabold px-1 rounded ${badge.bg}`}>
                  {badge.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {selectedRes && selectedState && (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {selectedRes.name}
              </h4>
              <span className="text-xs font-mono text-slate-500">({selectedRes.resourceId})</span>
              {selectedRes.accessible && (
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  Wheelchair Accessible
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {selectedRes.metadata.description} • Zone: {selectedRes.zoneId} • Floor: {selectedRes.floor}
            </p>
          </div>

          <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700 pt-3 sm:pt-0 sm:pl-4">
            <div className="flex flex-col text-right sm:text-left">
              <span className="text-[10px] text-slate-500 font-medium">Fused Effective State</span>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {selectedState.effectiveState} ({Math.round(selectedState.confidence * 100)}% Confidence)
              </span>
            </div>

            <div className="flex flex-col text-right">
              <span className="text-[10px] text-slate-500 font-medium">Evidence Count</span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {selectedState.supportingObservationIds.length} Local Observations
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
