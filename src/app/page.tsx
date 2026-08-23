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
import { GraduationCap, MapPin } from 'lucide-react';

export default function HomePage() {
  const [activePathSegments, setActivePathSegments] = useState<string[]>([]);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);

  const handleRouteDecision = (decision: RouteDecision) => {
    setActivePathSegments(decision.pathSegmentIds || []);
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-black shadow-lg shadow-indigo-500/25">
              <GraduationCap className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-slate-100 tracking-tight">
                  Sahayak Mesh
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Track 05 Edge Layer
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                SNIST College Campus Geofence • Offline P2P Edge Navigation
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span>Ghatkesar, Hyderabad (17.4529° N, 78.6754° E)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Page Layout Container */}
      <main className="flex flex-col gap-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-2">
        {/* Section 1: Device Readiness Status */}
        <section>
          <DeviceReadinessBar />
        </section>

        {/* Section 2: Automated Demo Acceptance Script Automator */}
        <section>
          <DemoScenarioRunner />
        </section>

        {/* Section 3: Role Switcher & Persona Selector */}
        <section>
          <RoleSelector />
        </section>

        {/* Section 4: Campus Building & Floor Layout Filters */}
        <section>
          <CampusBuildingFloorSelector
            onBuildingSelect={setSelectedBuildingId}
            onFloorSelect={setSelectedFloor}
          />
        </section>

        {/* Section 5: Main Operations Grid (Left = Navigation & Observation, Right = Satellite Visualizer) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Route Request Form & Staff Observation Reporter */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <VisitorRouteForm onRouteDecision={handleRouteDecision} />
            <ObservationForm />
          </div>

          {/* Right Column: Google Maps Satellite GIS & Blueprint Canvas */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <GoogleMapsGISVisualizer
              selectedPathSegments={activePathSegments}
              selectedBuildingId={selectedBuildingId}
              selectedFloor={selectedFloor}
            />
          </div>
        </section>

        {/* Section 6: Offline Storage & Pre-Sync Bridge */}
        <section>
          <GoogleMapsSyncBridge />
        </section>

        {/* Section 7: Multi-Node P2P Cluster Topology Graph */}
        <section>
          <TopologyGraph />
        </section>

        {/* Section 8: Node Failure & Reconnection Reconciliation Simulator */}
        <section>
          <NodeFailureSimulator />
        </section>

        {/* Section 9: Performance Latency Telemetry */}
        <section>
          <MetricsPanel />
        </section>

        {/* Section 10: Audit Log & Event Timeline Stream */}
        <section>
          <AuditLogViewer />
        </section>

        {/* Footer */}
        <footer className="glass-panel rounded-2xl p-6 border border-slate-800/80 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-slate-200">Sahayak Mesh v1.0.0</span>
            <span className="text-slate-600">•</span>
            <span>Offline-First P2P Edge Navigation Engine</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 text-indigo-300 border border-slate-800 font-bold">
              Track 05 Offline Systems
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800/80 font-bold">
              0 WAN Operational
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
