'use client';

import React from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { NodeRole } from '@/lib/sahayak-mesh/types';
import { User, ShieldAlert, Radio, Server, Check } from 'lucide-react';

interface RoleOption {
  role: NodeRole;
  nodeId: string;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
}

export function RoleSelector() {
  const { activeNodeId, setActiveNodeId, nodes } = useSahayakMesh();

  const roleOptions: RoleOption[] = [
    {
      role: 'visitor',
      nodeId: 'node-visitor-1',
      label: 'Student / Visitor',
      subtitle: 'Requests accessible resources & optimal edge routes',
      icon: User,
      accentColor: 'border-blue-500/60 bg-blue-950/30 shadow-blue-500/10',
      badgeBg: 'bg-blue-500/20',
      badgeText: 'text-blue-400'
    },
    {
      role: 'staff',
      nodeId: 'node-staff-1',
      label: 'Staff Observer',
      subtitle: 'Reports physical state changes (Lift broken, Counter open)',
      icon: ShieldAlert,
      accentColor: 'border-emerald-500/60 bg-emerald-950/30 shadow-emerald-500/10',
      badgeBg: 'bg-emerald-500/20',
      badgeText: 'text-emerald-400'
    },
    {
      role: 'relay',
      nodeId: 'node-relay-1',
      label: 'Crowd Relay Observer',
      subtitle: 'Mobile crowd observer & P2P store-and-forward node',
      icon: Radio,
      accentColor: 'border-purple-500/60 bg-purple-950/30 shadow-purple-500/10',
      badgeBg: 'bg-purple-500/20',
      badgeText: 'text-purple-400'
    },
    {
      role: 'coordinator',
      nodeId: 'node-coordinator-1',
      label: 'Campus Edge Gateway',
      subtitle: 'Full topology health, conflict review & decision audit',
      icon: Server,
      accentColor: 'border-amber-500/60 bg-amber-950/30 shadow-amber-500/10',
      badgeBg: 'bg-amber-500/20',
      badgeText: 'text-amber-400'
    }
  ];

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider">
            FR-02 Role & Device Switcher
          </h3>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            Active Persona Simulator
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Active Device:</span>
          <code className="px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 font-bold border border-indigo-800/60">
            {activeNodeId}
          </code>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {roleOptions.map(opt => {
          const Icon = opt.icon;
          const isSelected = activeNodeId === opt.nodeId;
          const nodeData = nodes.find(n => n.nodeId === opt.nodeId);
          const isDisconnected = nodeData?.linkState === 'disconnected';

          return (
            <button
              key={opt.nodeId}
              onClick={() => setActiveNodeId(opt.nodeId)}
              className={`flex flex-col p-4 rounded-xl border text-left transition-all relative cursor-pointer ${
                isSelected
                  ? `${opt.accentColor} border-2 shadow-lg ring-2 ring-indigo-500/40 scale-[1.02]`
                  : 'border-slate-800/80 hover:border-slate-700 bg-slate-900/50 hover:bg-slate-800/40 opacity-80 hover:opacity-100'
              }`}
            >
              {isDisconnected && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-black bg-rose-500 text-white shadow-xs tracking-wider">
                  OFFLINE
                </span>
              )}

              {isSelected && !isDisconnected && (
                <span className="absolute top-3 right-3 p-1 rounded-full bg-indigo-600 text-white shadow-xs">
                  <Check className="w-3 h-3" />
                </span>
              )}

              <div className="flex items-center gap-2.5 mb-2">
                <div className={`p-2 rounded-lg ${opt.badgeBg} ${opt.badgeText}`}>
                  <Icon className="w-4 h-4 shrink-0" />
                </div>
                <span className="font-extrabold text-xs text-slate-100">{opt.label}</span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                {opt.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
