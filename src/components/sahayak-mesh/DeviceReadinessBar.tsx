'use client';

import React from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { 
  WifiOff, 
  Bluetooth, 
  ShieldCheck, 
  Radio, 
  Users, 
  RefreshCw,
  Activity
} from 'lucide-react';

export function DeviceReadinessBar() {
  const { readiness, resetDemo } = useSahayakMesh();

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      {/* Header section with brand icon and action button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/20 relative">
            <Radio className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-ping" />
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black tracking-tight text-slate-100">
                System Readiness & Peer Cluster Status
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 tracking-wide uppercase">
                FR-01 Active
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>Offline-First P2P Edge</span>
              <span>•</span>
              <span>Venue ID:</span>
              <code className="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-[11px] font-bold">
                {readiness.venueId}
              </code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDemo}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 active:scale-95 text-slate-200 text-xs font-bold border border-slate-700/80 shadow-sm transition-all cursor-pointer"
            title="Reset system state back to default seeded observations"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-180 transition-transform duration-500" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </div>

      {/* Grid of 4 Readiness Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/90 flex items-center gap-3 group hover:border-rose-500/40 transition">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:bg-rose-500/20 transition">
            <WifiOff className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 font-medium">Internet Connection</span>
            <span className="font-extrabold text-rose-400 text-xs tracking-tight">
              DISABLED (0 WAN)
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/90 flex items-center gap-3 group hover:border-emerald-500/40 transition">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition">
            <Bluetooth className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 font-medium">Local Transport Layer</span>
            <span className="font-extrabold text-emerald-400 text-xs tracking-tight">
              BLE + Wi-Fi Direct
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/90 flex items-center gap-3 group hover:border-indigo-500/40 transition">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition">
            <Users className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 font-medium">Connected Peer Nodes</span>
            <span className="font-extrabold text-indigo-300 text-xs tracking-tight">
              {readiness.connectedPeerCount} / 3 Nearby Nodes
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/90 flex items-center gap-3 group hover:border-amber-500/40 transition">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500/20 transition">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 font-medium">Cluster Security</span>
            <span className="font-extrabold text-amber-300 text-xs tracking-tight">
              P2P Granted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
