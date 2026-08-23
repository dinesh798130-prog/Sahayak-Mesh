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
  GraduationCap,
  Sparkles,
  MapPin
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
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
        <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider">
            Campus Navigation Route Decision Engine
          </h3>
          <p className="text-xs text-slate-400">
            Evaluates safety, accessibility & WGS84 geodesic proximity on Edge CPU
          </p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 p-4 rounded-xl bg-slate-900/60 border border-slate-800/90">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Facility / Destination Type
          </label>
          <select
            value={requestedType}
            onChange={(e) => setRequestedType(e.target.value as ResourceType)}
            className="w-full px-3 py-2 rounded-xl text-xs font-semibold border border-slate-700/80 bg-slate-950 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
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
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Target College Block
          </label>
          <select
            value={preferredBuilding}
            onChange={(e) => setPreferredBuilding(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-xs font-semibold border border-slate-700/80 bg-slate-950 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
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
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer pt-1 hover:text-white transition">
            <input
              type="checkbox"
              checked={accessibilityNeed}
              onChange={(e) => setAccessibilityNeed(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 accent-indigo-600"
            />
            <span className="flex items-center gap-1.5 font-bold">
              <Accessibility className="w-4 h-4 text-blue-400" />
              Require Barrier-Free Access
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 active:scale-98 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 mt-3 sm:mt-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Evaluate Campus Route</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Decision Output Card */}
      {decision && (
        <div className={`p-4 rounded-xl border flex flex-col gap-3 transition-all ${
          selectedRes
            ? 'border-emerald-500/40 bg-emerald-950/20'
            : 'border-rose-500/40 bg-rose-950/20'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {selectedRes ? (
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                </div>
              ) : (
                <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                </div>
              )}
              <h4 className="text-xs font-black text-slate-100">
                {selectedRes ? `Optimal Route Destination: ${selectedRes.name}` : 'Route Avoidance Warning'}
              </h4>
            </div>

            {decision.confidence > 0 && (
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {Math.round(decision.confidence * 100)}% Confidence
              </span>
            )}
          </div>

          <div className="text-xs font-mono whitespace-pre-line text-slate-300 bg-slate-950/90 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
            {decision.explanation}
          </div>

          {selectedRes && (
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 pt-1 overflow-x-auto">
              <span className="font-extrabold text-slate-200 shrink-0 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                Segment Path:
              </span>
              <div className="flex items-center gap-1.5">
                {decision.pathSegmentIds.map((segId, idx) => (
                  <React.Fragment key={segId}>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 font-mono text-[11px] font-bold border border-indigo-800/60">
                      {segId}
                    </span>
                    {idx < decision.pathSegmentIds.length - 1 && <span className="text-slate-600 font-bold">➔</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
