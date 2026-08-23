'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { SahayakMeshEngine } from './engine';
import { 
  VenueResource, 
  ResourceState, 
  MeshNode, 
  OutboxItem, 
  EventLog, 
  TelemetryMetrics, 
  RouteRequest, 
  RouteDecision,
  ObservationState,
  GoogleMapsPlaceRecord
} from './types';

interface SahayakMeshContextType {
  engine: SahayakMeshEngine;
  resources: VenueResource[];
  resourceStates: ResourceState[];
  nodes: MeshNode[];
  outbox: OutboxItem[];
  eventLogs: EventLog[];
  telemetry: TelemetryMetrics;
  gmapsCache: GoogleMapsPlaceRecord[];
  activeNodeId: string;
  readiness: ReturnType<SahayakMeshEngine['getReadinessStatus']>;
  setActiveNodeId: (nodeId: string) => void;
  submitObservation: (params: {
    resourceId: string;
    state: ObservationState;
    confidence?: number;
    crowdEstimate?: 'low' | 'moderate' | 'high' | 'overcrowded';
    reason: string;
    sourceNodeId?: string;
  }) => void;
  evaluateRoute: (request: RouteRequest) => RouteDecision;
  toggleNode: (nodeId: string, connect?: boolean) => void;
  syncGoogleMapsPlaceRecord: (record: GoogleMapsPlaceRecord) => void;
  resetDemo: () => void;
  refreshState: () => void;
}

const SahayakMeshContext = createContext<SahayakMeshContextType | null>(null);

export function SahayakMeshProvider({ children }: { children: React.ReactNode }) {
  const engine = useMemo(() => new SahayakMeshEngine(), []);
  
  const [resources, setResources] = useState<VenueResource[]>(() => engine.getResources());
  const [resourceStates, setResourceStates] = useState<ResourceState[]>(() => engine.getAllResourceStates());
  const [nodes, setNodes] = useState<MeshNode[]>(() => engine.getNodes());
  const [outbox, setOutbox] = useState<OutboxItem[]>(() => engine.getOutbox());
  const [eventLogs, setEventLogs] = useState<EventLog[]>(() => engine.getEventLogs());
  const [telemetry, setTelemetry] = useState<TelemetryMetrics>(() => engine.getTelemetry());
  const [gmapsCache, setGmapsCache] = useState<GoogleMapsPlaceRecord[]>(() => engine.getGmapsCache());
  const [activeNodeId, setActiveNodeIdState] = useState<string>('node-coordinator-1');

  const updateState = useCallback(() => {
    setResources(engine.getResources());
    setResourceStates(engine.getAllResourceStates());
    setNodes([...engine.getNodes()]);
    setOutbox([...engine.getOutbox()]);
    setEventLogs([...engine.getEventLogs()]);
    setTelemetry({ ...engine.getTelemetry() });
    setGmapsCache([...engine.getGmapsCache()]);
  }, [engine]);

  useEffect(() => {
    queueMicrotask(() => {
      engine.loadFromStorage();
      updateState();
    });
  }, [engine, updateState]);

  const setActiveNodeId = (nodeId: string) => {
    engine.setActiveNodeId(nodeId);
    setActiveNodeIdState(nodeId);
    updateState();
  };

  const submitObservation = (params: {
    resourceId: string;
    state: ObservationState;
    confidence?: number;
    crowdEstimate?: 'low' | 'moderate' | 'high' | 'overcrowded';
    reason: string;
    sourceNodeId?: string;
  }) => {
    engine.submitObservation(params);
    updateState();
  };

  const evaluateRoute = (request: RouteRequest) => {
    const decision = engine.evaluateRouteRequest(request);
    updateState();
    return decision;
  };

  const toggleNode = (nodeId: string, connect?: boolean) => {
    engine.toggleNodeConnection(nodeId, connect);
    updateState();
  };

  const syncGoogleMapsPlaceRecord = (record: GoogleMapsPlaceRecord) => {
    engine.syncGoogleMapsPlaceRecord(record);
    updateState();
  };

  const resetDemo = () => {
    engine.resetDemoState();
    updateState();
  };

  const readiness = engine.getReadinessStatus();

  return (
    <SahayakMeshContext.Provider
      value={{
        engine,
        resources,
        resourceStates,
        nodes,
        outbox,
        eventLogs,
        telemetry,
        gmapsCache,
        activeNodeId,
        readiness,
        setActiveNodeId,
        submitObservation,
        evaluateRoute,
        toggleNode,
        syncGoogleMapsPlaceRecord,
        resetDemo,
        refreshState: updateState
      }}
    >
      {children}
    </SahayakMeshContext.Provider>
  );
}

export function useSahayakMesh() {
  const context = useContext(SahayakMeshContext);
  if (!context) {
    throw new Error('useSahayakMesh must be used within a SahayakMeshProvider');
  }
  return context;
}
