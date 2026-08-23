'use client';

import React, { useState } from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { FileText, Search, Clock, ShieldCheck } from 'lucide-react';

export function AuditLogViewer() {
  const { eventLogs, nodes } = useSahayakMesh();
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredLogs = eventLogs.filter(log => {
    if (filterType !== 'ALL' && log.type !== filterType) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const nodeName = (nodes.find(n => n.nodeId === log.sourceNodeId)?.displayName || log.sourceNodeId).toLowerCase();
      return log.summary.toLowerCase().includes(term) || log.type.toLowerCase().includes(term) || nodeName.includes(term);
    }
    return true;
  });

  const getNodeName = (nodeId: string) => {
    return nodes.find(n => n.nodeId === nodeId)?.displayName || nodeId;
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700">
            <FileText className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider">
              FR-16 Auditability & Event Timeline Stream
            </h3>
            <p className="text-xs text-slate-400">
              Live immutable stream: observation IDs, deduplication, conflicts, outbox replays & sync events
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          {/* Text Search Input */}
          <div className="relative w-full sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-700/80 bg-slate-950 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Type Filter Select */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-700/80 bg-slate-950 text-slate-100 focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
          >
            <option value="ALL">All Events ({eventLogs.length})</option>
            <option value="OBSERVATION_CREATED">Observations Created</option>
            <option value="DUPLICATE_MERGED">Duplicates Merged</option>
            <option value="ROUTE_DECISION">Route Decisions</option>
            <option value="NODE_DISCONNECTED">Disconnections</option>
            <option value="NODE_RECONNECTED">Reconnections</option>
            <option value="OUTBOX_QUEUED">Outbox Queued</option>
          </select>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto flex flex-col gap-2 p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800/90 shadow-inner">
        {filteredLogs.length === 0 ? (
          <div className="text-slate-500 text-center py-8 flex flex-col items-center gap-2">
            <FileText className="w-8 h-8 opacity-30" />
            <span>No event logs matching search or filter criteria.</span>
          </div>
        ) : (
          filteredLogs.map(log => {
            const timeStr = new Date(log.timestamp).toLocaleTimeString();
            const sourceName = getNodeName(log.sourceNodeId);

            return (
              <div
                key={log.eventId}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-slate-700 transition"
              >
                <div className="flex items-start sm:items-center gap-2.5">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider shrink-0 border ${
                    log.status === 'SUCCESS' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80' :
                    log.status === 'WARNING' ? 'bg-amber-950/80 text-amber-300 border-amber-800/80' :
                    'bg-rose-950/80 text-rose-300 border-rose-800/80'
                  }`}>
                    {log.type.replace('_', ' ')}
                  </span>

                  <span className="text-slate-200 text-xs font-sans font-medium leading-tight">
                    {log.summary}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-400 shrink-0 border-t sm:border-t-0 border-slate-800/60 pt-2 sm:pt-0 font-mono">
                  <span>Src: <strong className="text-slate-200 font-semibold">{sourceName}</strong></span>
                  <span>Latency: <strong className="text-indigo-400 font-extrabold">{log.latencyMs}ms</strong></span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {timeStr}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
