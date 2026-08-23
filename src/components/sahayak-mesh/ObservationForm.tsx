'use client';

import React, { useState } from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { ObservationState } from '@/lib/sahayak-mesh/types';
import { ShieldAlert, Plus, CheckCircle2, AlertOctagon } from 'lucide-react';

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
    <div className="flex flex-col gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              FR-04 Journey B: Staff Physical Resource Observation Reporter
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Submits ephemeral state change with local persistence & peer gossip
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          Source Node: <span className="text-indigo-600 dark:text-indigo-400">{activeNode?.displayName || activeNodeId}</span>
        </span>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Target Resource
          </label>
          <select
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
          >
            {resources.map(r => (
              <option key={r.resourceId} value={r.resourceId}>
                {r.name} ({r.zoneId})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Observed Physical State
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value as ObservationState)}
            className="w-full px-3 py-2 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Available">Available (Working / Clear)</option>
            <option value="Busy">Busy (Heavy Crowding)</option>
            <option value="Blocked">Blocked (Entrance/Ramp Obstruction)</option>
            <option value="Broken">Broken (Out of Order)</option>
            <option value="Unknown">Unknown (Unverified)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Crowd Density
          </label>
          <select
            value={crowdEstimate}
            onChange={(e) => setCrowdEstimate(e.target.value as any)}
            className="w-full px-3 py-2 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="low">Low Crowd (&lt; 10 people)</option>
            <option value="moderate">Moderate (10 - 25 people)</option>
            <option value="high">High Crowd (25 - 50 people)</option>
            <option value="overcrowded">Overcrowded (&gt; 50 people)</option>
          </select>
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Observation Notes / Reason
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Lift door stuck, Counter closed for lunch, Entrance clear"
            className="w-full px-3 py-2 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Observation</span>
          </button>
        </div>
      </form>

      {submittedStatus && (
        <div className={`p-3 rounded-lg text-xs font-semibold flex items-center gap-2 ${
          isDisconnected ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
        }`}>
          {isDisconnected ? <AlertOctagon className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
          <span>{submittedStatus}</span>
        </div>
      )}
    </div>
  );
}
