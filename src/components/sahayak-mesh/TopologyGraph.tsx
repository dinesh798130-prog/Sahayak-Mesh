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

  const pendingCount = outbox.filter(o => o.state === 'pending').length;

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider">
              FR-12 & FR-13 Multi-Node P2P Mesh Cluster Topology
            </h3>
            <p className="text-xs text-slate-400">
              Direct device-to-device transport mesh layer with local outbox queueing
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
          Outbox Pending: <span className="text-rose-400 font-extrabold">{pendingCount} Items</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {nodes.map(node => {
          const Icon = getRoleIcon(node.role);
          const isConnected = node.linkState === 'connected';
          const isActive = node.nodeId === activeNodeId;
          const queuedForNode = pendingCount;

          return (
            <div
              key={node.nodeId}
              className={`p-4 rounded-xl border flex flex-col justify-between gap-3.5 transition-all relative ${
                isConnected
                  ? 'border-slate-800/80 bg-slate-900/60'
                  : 'border-rose-500/40 bg-rose-950/20'
              } ${isActive ? 'ring-2 ring-indigo-500/60 shadow-lg scale-[1.01]' : ''}`}
            >
              {isActive && (
                <span className="absolute -top-2.5 left-3 px-2.5 py-0.5 rounded-full text-[9px] font-black bg-indigo-600 text-white shadow-xs tracking-wider">
                  ACTIVE DEVICE
                </span>
              )}

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2.5 rounded-xl ${
                    isConnected 
                      ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-xs text-slate-100 truncate max-w-[130px]">
                      {node.displayName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono capitalize">
                      {node.role} role
                    </span>
                  </div>
                </div>

                <span className={`inline-flex items-center gap-1.5 text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                  isConnected 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`} />
                  {isConnected ? 'ONLINE' : 'OFFLINE'}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80">
                <span className="text-slate-400 font-medium">Outbox Queue:</span>
                <span className="font-mono font-bold text-slate-200">
                  {!isConnected ? `${queuedForNode} pending` : '0 items'}
                </span>
              </div>

              <button
                onClick={() => toggleNode(node.nodeId)}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                  isConnected
                    ? 'bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/80'
                    : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white'
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
