'use client';

import React from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { WifiOff, RefreshCw, Zap, Layers, AlertTriangle, CheckCircle2 } from 'lucide-react';

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
      resourceId: 'res-lift-1',
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

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              FR-13 & FR-14 Node Failure & Reconnection Reconciliation Simulator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verifies mid-operation node drops, outbox queueing, missing event replay & zero state duplication
            </p>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          isCoordinatorDisconnected 
            ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300' 
            : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
        }`}>
          Coordinator Status: {isCoordinatorDisconnected ? 'DISCONNECTED (OFFLINE)' : 'ONLINE'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Step 1: Disconnect & Create Outbox Item */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              Step A: Simulate Disconnect & Outbox Queue
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Disconnects Local Coordinator and creates a new physical observation. The observation will be safely stored in the local outbox without failing.
            </p>
          </div>

          <button
            onClick={triggerDisconnectAndCreatePending}
            disabled={isCoordinatorDisconnected}
            className="w-full py-2.5 px-4 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-semibold text-xs shadow-xs transition flex items-center justify-center gap-2"
          >
            <WifiOff className="w-4 h-4" />
            <span>Simulate Node Drop & Queue Observation</span>
          </button>
        </div>

        {/* Step 2: Reconnect & Replay */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Step B: Reconnect & Replay Outbox Batch
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Re-establishes local transport link. Missing events are replayed from outbox, deduplicated, and all nodes converge on the exact same state.
            </p>
          </div>

          <button
            onClick={triggerReconnectAndReplay}
            disabled={!isCoordinatorDisconnected}
            className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs shadow-xs transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reconnect & Converge State ({outbox.filter(o => o.state === 'pending').length} Queued)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
