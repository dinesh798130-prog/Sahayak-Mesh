'use client';

import React from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { NodeRole } from '@/lib/sahayak-mesh/types';
import { User, ShieldAlert, Radio, Server } from 'lucide-react';

interface RoleOption {
  role: NodeRole;
  nodeId: string;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
}

export function RoleSelector() {
  const { activeNodeId, setActiveNodeId, nodes } = useSahayakMesh();

  const roleOptions: RoleOption[] = [
    {
      role: 'visitor',
      nodeId: 'node-visitor-1',
      label: 'Visitor / Patient',
      subtitle: 'Requests accessible resources & routes',
      icon: User,
      color: 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
    },
    {
      role: 'staff',
      nodeId: 'node-staff-1',
      label: 'Staff Observer',
      subtitle: 'Reports physical state changes (Lift broken, Counter open)',
      icon: ShieldAlert,
      color: 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
    },
    {
      role: 'relay',
      nodeId: 'node-relay-1',
      label: 'Crowd Relay Observer',
      subtitle: 'Mobile crowd observer & P2P message store-and-forward',
      icon: Radio,
      color: 'border-purple-500 bg-purple-50/60 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300'
    },
    {
      role: 'coordinator',
      nodeId: 'node-coordinator-1',
      label: 'Local Venue Coordinator',
      subtitle: 'Full topology health, conflict review & decision audit',
      icon: Server,
      color: 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
    }
  ];

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          FR-02 Role Selection (Single Codebase Prototype)
        </h3>
        <span className="text-xs text-slate-500">
          Active Device ID: <code className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">{activeNodeId}</code>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {roleOptions.map(opt => {
          const Icon = opt.icon;
          const isSelected = activeNodeId === opt.nodeId;
          const nodeData = nodes.find(n => n.nodeId === opt.nodeId);
          const isDisconnected = nodeData?.linkState === 'disconnected';

          return (
            <button
              key={opt.nodeId}
              onClick={() => setActiveNodeId(opt.nodeId)}
              className={`flex flex-col p-3 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? `${opt.color} shadow-sm ring-2 ring-indigo-500/50`
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
              }`}
            >
              {isDisconnected && (
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white">
                  OFFLINE
                </span>
              )}

              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4 shrink-0" />
                <span className="font-bold text-xs">{opt.label}</span>
              </div>
              <p className="text-[11px] opacity-80 leading-tight">
                {opt.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
