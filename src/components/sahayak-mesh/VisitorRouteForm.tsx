'use client';

import React, { useState } from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { ResourceType, RouteDecision } from '@/lib/sahayak-mesh/types';
import { 
  Navigation, 
  Accessibility, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';

interface VisitorRouteFormProps {
  onRouteDecision?: (decision: RouteDecision) => void;
}

export function VisitorRouteForm({ onRouteDecision }: VisitorRouteFormProps) {
  const { evaluateRoute, resources } = useSahayakMesh();

  const [requestedType, setRequestedType] = useState<ResourceType>('lab');
  const [accessibilityNeed, setAccessibilityNeed] = useState<boolean>(true);
  const [preferredBuilding, setPreferredBuilding] = useState<string>('block-cse');
  const [preferredFloor, setPreferredFloor] = useState<string>('Ground Floor');
  const [decision, setDecision] = useState<RouteDecision | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const result = evaluateRoute({
      requestId: `req-${Date.now()}`,
      requestedType,
      accessibilityNeed,
      preferredBuilding,
      preferredFloor,
      maxCrowd: 'low',
      createdAt: Date.now()
    });

    setDecision(result);
    if (onRouteDecision) onRouteDecision(result);
  };

  const selectedRes = decision?.selectedResourceId 
    ? resources.find(r => r.resourceId === decision.selectedResourceId)
    : null;

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            SNIST Student & Campus Route Decision Engine
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            100% Offline Edge Navigation • Campus Block, Department & Floor Filter
          </p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Facility / Room Need
          </label>
          <select
            value={requestedType}
            onChange={(e) => setRequestedType(e.target.value as ResourceType)}
            className="w-full px-3 py-2 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="lab">Engineering & Research Labs</option>
            <option value="office">HOD & Department Offices</option>
            <option value="library">Digital Library & Reading Rooms</option>
            <option value="auditorium">Auditoriums & Sports Arena</option>
            <option value="counter">Exam Branch & Admin Desks</option>
            <option value="canteen">Food Court & Canteen</option>
            <option value="lift">Accessible Elevator</option>
            <option value="ramp">Ramp / Barrier-Free Slope</option>
            <option value="restroom">Accessible Restrooms</option>
            <option value="entrance">Campus Entrance Gates</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Preferred Campus Block
          </label>
          <select
            value={preferredBuilding}
            onChange={(e) => setPreferredBuilding(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="block-cse">CSE & AI/ML Block</option>
            <option value="block-admin">Admin & Principal Block</option>
            <option value="block-ece">ECE & VLSI Block</option>
            <option value="block-mech">Mechanical Block</option>
            <option value="block-library">Central Library</option>
            <option value="block-canteen">Canteen & Sports Hub</option>
          </select>
        </div>

        <div className="flex flex-col justify-between">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={accessibilityNeed}
              onChange={(e) => setAccessibilityNeed(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span className="flex items-center gap-1">
              <Accessibility className="w-3.5 h-3.5 text-blue-500" />
              Require Wheelchair Access
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition flex items-center justify-center gap-2 mt-2 sm:mt-0 cursor-pointer"
          >
            <span>Evaluate Campus Route</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Decision Output Card */}
      {decision && (
        <div className={`p-4 rounded-xl border flex flex-col gap-3 transition-all ${
          selectedRes
            ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/30'
            : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/30'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {selectedRes ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
              )}
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {selectedRes ? `Recommended Campus Destination: ${selectedRes.name}` : 'Route Safety Avoidance Warning'}
              </h4>
            </div>

            {decision.confidence > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200">
                {Math.round(decision.confidence * 100)}% Confidence
              </span>
            )}
          </div>

          <div className="text-xs font-mono whitespace-pre-line text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 p-3 rounded-lg border border-slate-200/80 dark:border-slate-800">
            {decision.explanation}
          </div>

          {selectedRes && (
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 pt-1">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Path Segment IDs:</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400">
                {decision.pathSegmentIds.join(' ➔ ')}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
