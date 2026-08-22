'use client';

import React from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { 
  WifiOff, 
  Bluetooth, 
  ShieldCheck, 
  Radio, 
  Users, 
  RefreshCw
} from 'lucide-react';

export function DeviceReadinessBar() {
  const { readiness, resetDemo } = useSahayakMesh();

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-lg border border-slate-800 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600 text-white font-bold shadow-xs">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold tracking-tight text-white">
                Sahayak Mesh — Device Readiness
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                FR-01 Verified
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Offline-First P2P Cluster • Venue: <span className="text-indigo-300 font-mono">{readiness.venueId}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
            <WifiOff className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[11px] text-slate-400 font-medium">Internet WAN</span>
            <span className="font-bold text-rose-400">DISABLED (0 WAN)</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Bluetooth className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[11px] text-slate-400 font-medium">Local Transport</span>
            <span className="font-bold text-emerald-400">BLE + Wi-Fi Direct</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[11px] text-slate-400 font-medium">Connected Peers</span>
            <span className="font-bold text-indigo-300">
              {readiness.connectedPeerCount} / 3 Nearby Nodes
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[11px] text-slate-400 font-medium">Permissions</span>
            <span className="font-bold text-amber-300">P2P Cluster Granted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
