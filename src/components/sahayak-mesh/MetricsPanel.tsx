'use client';

import React from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { Gauge, Clock, Zap, Cpu, Activity, TrendingUp } from 'lucide-react';

export function MetricsPanel() {
  const { telemetry } = useSahayakMesh();

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Gauge className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider">
              FR-15 Real Edge Bounded Latency & Performance Telemetry
            </h3>
            <p className="text-xs text-slate-400">
              Measured decision, propagation, deduplication & outbox sync latency
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-950/80 text-indigo-300 border border-indigo-800/80 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>SLA Target: &lt; 50ms (Edge CPU)</span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* Min Latency */}
        <div className="p-4 rounded-xl border border-slate-800/90 bg-slate-900/60 flex flex-col justify-between group hover:border-emerald-500/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Min Decision</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1 mt-3">
            <span className="text-3xl font-black text-emerald-400 font-mono tracking-tight">
              {telemetry.minDecision}
            </span>
            <span className="text-xs font-bold text-slate-400">ms</span>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold mt-1">Best-case deterministic lookup</span>
        </div>

        {/* Median Latency */}
        <div className="p-4 rounded-xl border border-slate-800/90 bg-slate-900/60 flex flex-col justify-between group hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Median Latency</span>
            <Clock className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-1 mt-3">
            <span className="text-3xl font-black text-indigo-300 font-mono tracking-tight">
              {telemetry.medianDecision}
            </span>
            <span className="text-xs font-bold text-slate-400">ms</span>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold mt-1">50th percentile execution time</span>
        </div>

        {/* P95 Latency */}
        <div className="p-4 rounded-xl border border-slate-800/90 bg-slate-900/60 flex flex-col justify-between group hover:border-purple-500/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">P95 Tail Latency</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-1 mt-3">
            <span className="text-3xl font-black text-purple-300 font-mono tracking-tight">
              {telemetry.p95Decision}
            </span>
            <span className="text-xs font-bold text-slate-400">ms</span>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold mt-1">95th percentile under load</span>
        </div>

        {/* Reconnection Sync Latency */}
        <div className="p-4 rounded-xl border border-slate-800/90 bg-slate-900/60 flex flex-col justify-between group hover:border-amber-500/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Outbox Replay</span>
            <Cpu className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1 mt-3">
            <span className="text-3xl font-black text-amber-300 font-mono tracking-tight">
              {telemetry.reconnectionSyncLatency[telemetry.reconnectionSyncLatency.length - 1] || 128}
            </span>
            <span className="text-xs font-bold text-slate-400">ms</span>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold mt-1">Batch convergence speed</span>
        </div>
      </div>
    </div>
  );
}
