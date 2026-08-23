'use client';

import React from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { WifiOff, RefreshCw, Zap } from 'lucide-react';

export function NodeFailureSimulator() {
  const { nodes, toggleNode, submitObservation, outbox, activeNodeId } = useSahayakMesh();

  const coordinatorNode = nodes.find(n => n.role === 'coordinator');
  const staffNode = nodes.find(n => n.role === 'staff');
  const isCoordinatorDisconnected = coordinatorNode?.linkState === 'disconnected';

  const triggerDisconnectAndCreatePending = () => {
    // 1. Disconnect Coordinator node
    if (coordinatorNode && coordinatorNode.linkState === 'connected') {
      toggleNode(coordinatorNode.nodeId, false);
    }

    // 2. Submit observation while disconnected so it queues in outbox
    submitObservation({
      resourceId: 'res-admin-lift',
      state: 'Broken',
      confidence: 0.95,
      reason: 'Outbox test: Motor failure observed while node disconnected',
      sourceNodeId: staffNode?.nodeId || activeNodeId
    });
  };

  const triggerReconnectAndReplay = () => {
    if (coordinatorNode && coordinatorNode.linkState === 'disconnected') {
      toggleNode(coordinatorNode.nodeId, true);
    }
  };

  const pendingCount = outbox.filter(o => o.state === 'pending').length;

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider">
              FR-13 & FR-14 Node Failure & Reconnection Reconciliation Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Verifies mid-operation node drops, outbox queueing, missing event replay & zero state duplication
            </p>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-black border shadow-md ${
          isCoordinatorDisconnected 
            ? 'bg-rose-950/80 text-rose-300 border-rose-800/80' 
            : 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80'
        }`}>
          Coordinator Status: {isCoordinatorDisconnected ? 'DISCONNECTED (OFFLINE)' : 'ONLINE'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Step A: Disconnect & Create Outbox Item */}
        <div className="p-4.5 rounded-xl border border-slate-800/90 bg-slate-900/50 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-black text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-rose-500/20 text-rose-300 font-mono flex items-center justify-center text-[11px] border border-rose-500/30">A</span>
              Simulate Disconnect & Outbox Queue
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Disconnects Local Coordinator and creates a new physical observation. The observation will be safely stored in the local outbox without failing.
            </p>
          </div>

          <button
            onClick={triggerDisconnectAndCreatePending}
            disabled={isCoordinatorDisconnected}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 disabled:opacity-50 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <WifiOff className="w-4 h-4" />
            <span>Simulate Node Drop & Queue Observation</span>
          </button>
        </div>

        {/* Step B: Reconnect & Replay */}
        <div className="p-4.5 rounded-xl border border-slate-800/90 bg-slate-900/50 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono flex items-center justify-center text-[11px] border border-emerald-500/30">B</span>
              Reconnect & Replay Outbox Batch
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Re-establishes local transport link. Missing events are replayed from outbox, deduplicated, and all nodes converge on the exact same state.
            </p>
          </div>

          <button
            onClick={triggerReconnectAndReplay}
            disabled={!isCoordinatorDisconnected}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 disabled:opacity-50 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reconnect & Converge State ({pendingCount} Queued)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
