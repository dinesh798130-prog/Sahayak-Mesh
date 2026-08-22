'use client';

import React from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { Network, Server, User, ShieldAlert, Radio, WifiOff, RefreshCw } from 'lucide-react';

export function TopologyGraph() {
  const { nodes, outbox, toggleNode, activeNodeId } = useSahayakMesh();

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'visitor': return User;
      case 'staff': return ShieldAlert;
      case 'relay': return Radio;
      default: return Server;
    }
  };

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              FR-12 & FR-13 Multi-Node P2P Cluster Topology
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              4 Android Devices in Local Mesh Cluster • Device-to-Device Transport Layer
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          Outbox Pending Items: <span className="text-rose-500">{outbox.filter(o => o.state === 'pending').length}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {nodes.map(node => {
          const Icon = getRoleIcon(node.role);
          const isConnected = node.linkState === 'connected';
          const isActive = node.nodeId === activeNodeId;
          const queuedForNode = outbox.filter(o => o.state === 'pending').length;

          return (
            <div
              key={node.nodeId}
              className={`p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all relative ${
                isConnected
                  ? 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                  : 'border-rose-300 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/30'
              } ${isActive ? 'ring-2 ring-indigo-500' : ''}`}
            >
              {isActive && (
                <span className="absolute -top-2.5 left-3 px-2 py-0.5 rounded text-[9px] font-extrabold bg-indigo-600 text-white tracking-wider">
                  ACTIVE DEVICE
                </span>
              )}

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg ${isConnected ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400' : 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate max-w-[120px]">
                      {node.displayName}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono capitalize">
                      {node.role} role
                    </span>
                  </div>
                </div>

                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isConnected 
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300' 
                    : 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                  {isConnected ? 'ONLINE' : 'OFFLINE'}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-500">Outbox Queue:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {!isConnected ? `${queuedForNode} pending` : '0 items'}
                </span>
              </div>

              <button
                onClick={() => toggleNode(node.nodeId)}
                className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold shadow-xs transition flex items-center justify-center gap-1.5 ${
                  isConnected
                    ? 'bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                }`}
              >
                {isConnected ? (
                  <>
                    <WifiOff className="w-3.5 h-3.5" />
                    <span>Disconnect Node</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reconnect & Sync</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
