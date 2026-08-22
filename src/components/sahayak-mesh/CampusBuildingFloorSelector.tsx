'use client';

import React, { useState } from 'react';
import { useSahayakMesh } from '@/lib/sahayak-mesh/mesh-context';
import { Building2, Layers, MapPin, CheckCircle2, AlertTriangle, ShieldCheck, Accessibility } from 'lucide-react';

interface CampusBuildingFloorSelectorProps {
  onBuildingSelect?: (buildingId: string | null) => void;
  onFloorSelect?: (floor: string | null) => void;
}

export function CampusBuildingFloorSelector({ onBuildingSelect, onFloorSelect }: CampusBuildingFloorSelectorProps) {
  const { resources, resourceStates } = useSahayakMesh();

  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);

  const buildings = [
    { id: 'block-admin', name: 'Admin & Principal Block', code: 'ADM', icon: '🏛️', color: 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40' },
    { id: 'block-cse', name: 'CSE & AI/ML Block', code: 'CSE', icon: '💻', color: 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40' },
    { id: 'block-ece', name: 'ECE & VLSI Block', code: 'ECE', icon: '⚡', color: 'border-purple-500 bg-purple-50/60 dark:bg-purple-950/40' },
    { id: 'block-mech', name: 'Mechanical & Civil Block', code: 'MECH', icon: '⚙️', color: 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/40' },
    { id: 'block-library', name: 'Central Library & Digital Center', code: 'LIB', icon: '📚', color: 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40' },
    { id: 'block-canteen', name: 'Student Canteen & Sports Hub', code: 'HUB', icon: '🍔', color: 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40' },
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
    <div className="flex flex-col gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              SNIST Campus Multi-Building & Floor Layout Controller
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              50+ Acre Campus Layout • Filter nodes by College Block & Floor Level
            </p>
          </div>
        </div>

        {/* Floor Level Filter Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 select-none overflow-x-auto">
          {floors.map(flr => {
            const isActive = (flr === 'All Floors' && selectedFloor === null) || selectedFloor === flr;
            return (
              <button
                key={flr}
                onClick={() => handleFloorClick(flr)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {flr}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of College Campus Blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 select-none">
        {buildings.map(b => {
          const isSelected = selectedBuildingId === b.id;
          const blockResources = resources.filter(r => r.buildingId === b.id);

          return (
            <button
              key={b.id}
              onClick={() => handleBuildingClick(b.id)}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                isSelected
                  ? `${b.color} ring-2 ring-indigo-500 shadow-md scale-102`
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{b.icon}</span>
                <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-slate-900/80 text-indigo-300">
                  {b.code}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">
                  {b.name}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold mt-0.5">
                  {blockResources.length} Campus Nodes
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
