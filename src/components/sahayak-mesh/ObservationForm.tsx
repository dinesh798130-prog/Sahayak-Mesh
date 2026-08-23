'use client';

import React, { useState } from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { ObservationState } from '@/lib/sahayak-mesh/types';
import { ShieldAlert, Plus, CheckCircle2, AlertOctagon, Send } from 'lucide-react';

export function ObservationForm() {
  const { resources, submitObservation, activeNodeId, nodes } = useSahayakMesh();

  const [resourceId, setResourceId] = useState<string>('res-admin-lift');
  const [state, setState] = useState<ObservationState>('Broken');
  const [crowdEstimate, setCrowdEstimate] = useState<'low' | 'moderate' | 'high' | 'overcrowded'>('high');
  const [reason, setReason] = useState<string>('Elevator motor door stuck on ground floor');
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const activeNode = nodes.find(n => n.nodeId === activeNodeId);
  const isDisconnected = activeNode?.linkState === 'disconnected';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitObservation({
      resourceId,
      state,
      crowdEstimate,
      reason,
      sourceNodeId: activeNodeId
    });

    setSubmittedStatus(
      isDisconnected 
        ? `Observation saved locally to OUTBOX (Device is offline)` 
        : `Observation created & broadcast to P2P cluster successfully!`
    );

    setTimeout(() => setSubmittedStatus(null), 4000);
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider">
              FR-04 Staff Physical Resource Observation Reporter
            </h3>
            <p className="text-xs text-slate-400">
              Submits real-time condition reports with peer gossip & local outbox fallback
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
          Source Node: <span className="text-indigo-400 font-extrabold">{activeNode?.displayName || activeNodeId}</span>
        </span>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 p-4 rounded-xl bg-slate-900/60 border border-slate-800/90">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Target Campus Node
          </label>
          <select
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-xs font-semibold border border-slate-700/80 bg-slate-950 text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          >
            {resources.map(r => (
              <option key={r.resourceId} value={r.resourceId}>
                {r.name} ({r.buildingName.split('&')[0]})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Observed Physical Condition
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value as ObservationState)}
            className="w-full px-3 py-2 rounded-xl text-xs font-semibold border border-slate-700/80 bg-slate-950 text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          >
            <option value="Available">Available (Working / Clear)</option>
            <option value="Busy">Busy (Heavy Crowding)</option>
            <option value="Blocked">Blocked (Entrance / Ramp Obstruction)</option>
            <option value="Broken">Broken (Out of Order)</option>
            <option value="Unknown">Unknown (Unverified)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Estimated Crowd Density
          </label>
          <select
            value={crowdEstimate}
            onChange={(e) => setCrowdEstimate(e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl text-xs font-semibold border border-slate-700/80 bg-slate-950 text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          >
            <option value="low">Low Crowd (&lt; 10 people)</option>
            <option value="moderate">Moderate (10 - 25 people)</option>
            <option value="high">High Crowd (25 - 50 people)</option>
            <option value="overcrowded">Overcrowded (&gt; 50 people)</option>
          </select>
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Observation Notes / Reason
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Lift door stuck, Counter closed for lunch, Entrance clear"
            className="w-full px-3 py-2 rounded-xl text-xs font-semibold border border-slate-700/80 bg-slate-950 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            required
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 active:scale-98 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Observation</span>
          </button>
        </div>
      </form>

      {submittedStatus && (
        <div className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2.5 shadow-md border ${
          isDisconnected 
            ? 'bg-amber-950/60 border-amber-800/80 text-amber-300' 
            : 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300'
        }`}>
          {isDisconnected ? <AlertOctagon className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
          <span>{submittedStatus}</span>
        </div>
      )}
    </div>
  );
}
