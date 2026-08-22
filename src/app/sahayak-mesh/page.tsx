'use client';

import React, { useState } from 'react';
import { DeviceReadinessBar } from '@/components/sahayak-mesh/DeviceReadinessBar';
import { RoleSelector } from '@/components/sahayak-mesh/RoleSelector';
import { CampusBuildingFloorSelector } from '@/components/sahayak-mesh/CampusBuildingFloorSelector';
import { GoogleMapsGISVisualizer } from '@/components/sahayak-mesh/GoogleMapsGISVisualizer';
import { GoogleMapsSyncBridge } from '@/components/sahayak-mesh/GoogleMapsSyncBridge';
import { TopologyGraph } from '@/components/sahayak-mesh/TopologyGraph';
import { VisitorRouteForm } from '@/components/sahayak-mesh/VisitorRouteForm';
import { ObservationForm } from '@/components/sahayak-mesh/ObservationForm';
import { NodeFailureSimulator } from '@/components/sahayak-mesh/NodeFailureSimulator';
import { MetricsPanel } from '@/components/sahayak-mesh/MetricsPanel';
import { AuditLogViewer } from '@/components/sahayak-mesh/AuditLogViewer';
import { DemoScenarioRunner } from '@/components/sahayak-mesh/DemoScenarioRunner';
import { RouteDecision } from '@/lib/sahayak-mesh/types';
import { GraduationCap } from 'lucide-react';

export default function SahayakMeshDashboardPage() {
  const [activePathSegments, setActivePathSegments] = useState<string[]>([]);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);

  const handleRouteDecision = (decision: RouteDecision) => {
    setActivePathSegments(decision.pathSegmentIds || []);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 text-white border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-indigo-600 text-white shadow-lg">
            <GraduationCap className="w-8 h-8 animate-pulse" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950 uppercase tracking-wider">
                Large-Scale Campus System
              </span>
              <span className="text-xs text-slate-400 font-mono">• SNIST Campus Geofence</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Sahayak Mesh — SNIST College Campus Edge Truth Layer
            </h1>
            <p className="text-xs text-slate-300">
              Multi-Building Layout • CSE/AI, Admin, ECE, Mech, Library & Canteen Blocks • Google Maps WGS84 Edge
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right font-mono">
            <span className="text-[11px] text-slate-400 font-medium">Campus Location</span>
            <span className="text-xs font-bold text-indigo-300">SNIST Ghatkesar, Hyderabad (17.4529° N, 78.6754° E)</span>
          </div>
        </div>
      </div>

      {/* FR-01: Device Readiness Bar */}
      <DeviceReadinessBar />

      {/* 2-Minute Demo Acceptance Automator Script */}
      <DemoScenarioRunner />

      {/* FR-02: Role Selection Switcher */}
      <RoleSelector />

      {/* SNIST Campus Multi-Building & Floor Level Layout Controller */}
      <CampusBuildingFloorSelector
        onBuildingSelect={setSelectedBuildingId}
        onFloorSelect={setSelectedFloor}
      />

      {/* Main Grid: Left = Student Route Request & Observation, Right = Google Maps Campus GIS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visitor Request & Staff Observation */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <VisitorRouteForm onRouteDecision={handleRouteDecision} />
          <ObservationForm />
        </div>

        {/* Right Column: Google Maps Interactive GIS Visualizer & WGS84 Coords */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <GoogleMapsGISVisualizer
            selectedPathSegments={activePathSegments}
            selectedBuildingId={selectedBuildingId}
            selectedFloor={selectedFloor}
          />
        </div>
      </div>

      {/* Google Maps Offline Storage & Sync Bridge */}
      <GoogleMapsSyncBridge />

      {/* FR-12 & FR-13: Multi-Node P2P Cluster Topology Graph */}
      <TopologyGraph />

      {/* FR-13 & FR-14: Node Failure & Reconnection Reconciliation Simulator */}
      <NodeFailureSimulator />

      {/* FR-15: Measured Performance Latency Metrics Panel */}
      <MetricsPanel />

      {/* FR-16: Auditability & Event Log Timeline */}
      <AuditLogViewer />
    </div>
  );
}
