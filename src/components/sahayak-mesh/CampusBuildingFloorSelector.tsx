'use client';

import React, { useState } from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { Building2, Layers, Check } from 'lucide-react';

interface CampusBuildingFloorSelectorProps {
  onBuildingSelect?: (buildingId: string | null) => void;
  onFloorSelect?: (floor: string | null) => void;
}

export function CampusBuildingFloorSelector({ onBuildingSelect, onFloorSelect }: CampusBuildingFloorSelectorProps) {
  const { resources } = useSahayakMesh();

  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);

  const buildings = [
    { id: 'block-admin', name: 'Admin & Principal Block', code: 'ADM', icon: '🏛️', activeStyle: 'border-blue-500/80 bg-blue-950/30 text-blue-300 ring-2 ring-blue-500/40 shadow-blue-500/10' },
    { id: 'block-cse', name: 'CSE & AI/ML Block', code: 'CSE', icon: '💻', activeStyle: 'border-indigo-500/80 bg-indigo-950/30 text-indigo-300 ring-2 ring-indigo-500/40 shadow-indigo-500/10' },
    { id: 'block-ece', name: 'ECE & VLSI Block', code: 'ECE', icon: '⚡', activeStyle: 'border-purple-500/80 bg-purple-950/30 text-purple-300 ring-2 ring-purple-500/40 shadow-purple-500/10' },
    { id: 'block-mech', name: 'Mechanical & Civil', code: 'MECH', icon: '⚙️', activeStyle: 'border-amber-500/80 bg-amber-950/30 text-amber-300 ring-2 ring-amber-500/40 shadow-amber-500/10' },
    { id: 'block-library', name: 'Central Library', code: 'LIB', icon: '📚', activeStyle: 'border-emerald-500/80 bg-emerald-950/30 text-emerald-300 ring-2 ring-emerald-500/40 shadow-emerald-500/10' },
    { id: 'block-canteen', name: 'Canteen & Sports Hub', code: 'HUB', icon: '🍔', activeStyle: 'border-rose-500/80 bg-rose-950/30 text-rose-300 ring-2 ring-rose-500/40 shadow-rose-500/10' },
  ];

  const floors = ['All Floors', 'Ground Floor', '1st Floor', '2nd Floor', '3rd Floor'];

  const handleBuildingClick = (bId: string) => {
    const nextBuilding = selectedBuildingId === bId ? null : bId;
    setSelectedBuildingId(nextBuilding);
    if (onBuildingSelect) onBuildingSelect(nextBuilding);
  };

  const handleFloorClick = (flr: string) => {
    const nextFloor = flr === 'All Floors' ? null : (selectedFloor === flr ? null : flr);
    setSelectedFloor(nextFloor);
    if (onFloorSelect) onFloorSelect(nextFloor);
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider">
              Campus Block & Floor Filter Engine
            </h3>
            <p className="text-xs text-slate-400">
              Select college block or floor level to filter GIS nodes in real time
            </p>
          </div>
        </div>

        {/* Floor Level Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 select-none overflow-x-auto">
          {floors.map(flr => {
            const isActive = (flr === 'All Floors' && selectedFloor === null) || selectedFloor === flr;
            return (
              <button
                key={flr}
                onClick={() => handleFloorClick(flr)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {flr}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of College Campus Block Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 select-none">
        {buildings.map(b => {
          const isSelected = selectedBuildingId === b.id;
          const blockResources = resources.filter(r => r.buildingId === b.id);

          return (
            <button
              key={b.id}
              onClick={() => handleBuildingClick(b.id)}
              className={`p-3.5 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all cursor-pointer relative ${
                isSelected
                  ? `${b.activeStyle} shadow-lg scale-[1.02]`
                  : 'border-slate-800/80 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{b.icon}</span>
                <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-md bg-slate-950/80 text-indigo-300 border border-slate-800">
                  {b.code}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-extrabold text-xs text-slate-100 truncate">
                  {b.name}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold mt-0.5 flex items-center justify-between">
                  <span>{blockResources.length} Edge Nodes</span>
                  {isSelected && <Check className="w-3 h-3 text-indigo-400" />}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
