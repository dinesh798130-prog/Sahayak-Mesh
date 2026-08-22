'use client';

import React, { useState } from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { FileText, Search, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';

export function AuditLogViewer() {
  const { eventLogs, nodes } = useSahayakMesh();
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredLogs = filterType === 'ALL'
    ? eventLogs
    : eventLogs.filter(log => log.type === filterType);

  const getNodeName = (nodeId: string) => {
    return nodes.find(n => n.nodeId === nodeId)?.displayName || nodeId;
  };

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              FR-16 Full Auditability & Event Timeline Log
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live immutable stream: observation IDs, deduplication, conflicts, outbox replays, and sync events
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          >
            <option value="ALL">All Event Types ({eventLogs.length})</option>
            <option value="OBSERVATION_CREATED">Observations Created</option>
            <option value="DUPLICATE_MERGED">Duplicates Merged</option>
            <option value="ROUTE_DECISION">Route Decisions</option>
            <option value="NODE_DISCONNECTED">Node Disconnections</option>
            <option value="NODE_RECONNECTED">Node Reconnections</option>
            <option value="OUTBOX_QUEUED">Outbox Queuing</option>
          </select>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto flex flex-col gap-2 p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800">
        {filteredLogs.length === 0 ? (
          <div className="text-slate-500 text-center py-6">No event logs matching filter criteria.</div>
        ) : (
          filteredLogs.map(log => {
            const timeStr = new Date(log.timestamp).toLocaleTimeString();
            const sourceName = getNodeName(log.sourceNodeId);

            return (
              <div
                key={log.eventId}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-start sm:items-center gap-2.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                    log.status === 'SUCCESS' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                    log.status === 'WARNING' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                    'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}>
                    {log.type}
                  </span>

                  <span className="text-slate-300 text-xs">
                    {log.summary}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 shrink-0">
                  <span>Source: {sourceName}</span>
                  <span>Latency: <strong className="text-indigo-400">{log.latencyMs}ms</strong></span>
                  <span>{timeStr}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
