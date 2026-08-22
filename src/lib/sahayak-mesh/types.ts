export type ResourceType = 
  | 'entrance' 
  | 'counter' 
  | 'lift' 
  | 'ramp' 
  | 'restroom' 
  | 'waiting_zone'
  | 'lecture_hall'
  | 'lab'
  | 'office'
  | 'library'
  | 'auditorium'
  | 'canteen';

export type ObservationState = 
  | 'Available' 
  | 'Busy' 
  | 'Blocked' 
  | 'Broken' 
  | 'Unknown';

export type ConflictState = 'NONE' | 'CONFLICTED';

export type NodeRole = 'visitor' | 'staff' | 'relay' | 'coordinator';

export type LinkState = 'connected' | 'disconnected' | 'degraded';

export type OutboxState = 'pending' | 'sending' | 'delivered' | 'failed';

export interface GoogleMapsGISMetadata {
  lat: number;
  lng: number;
  placeId?: string;
  formattedAddress?: string;
  googlePlaceTypes?: string[];
  geoDistanceMeters?: number;
  plusCode?: string;
  viewportBounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

export interface VenueResource {
  resourceId: string;
  type: ResourceType;
  name: string;
  buildingId: string; // e.g. 'block-admin', 'block-cse', 'block-ece', 'block-mech', 'block-library', 'block-canteen'
  buildingName: string; // e.g. 'Admin & Principal Block', 'CSE & AI/ML Engineering Block', etc.
  department?: string; // e.g. 'CSE', 'AI & DS', 'ECE', 'Administration', 'Library', 'Mechanical', 'Amenities'
  roomNumber?: string; // e.g. 'CS-101', 'LIB-202', 'ADM-001'
  zoneId: string;
  floor: string; // 'Ground Floor', '1st Floor', '2nd Floor', '3rd Floor'
  accessible: boolean;
  x: number; // percentage on canvas (0-100)
  y: number; // percentage on canvas (0-100)
  gis: GoogleMapsGISMetadata;
  metadata: {
    capacity?: number;
    description?: string;
    connectedNodes?: string[];
  };
}

export interface ResourceObservation {
  observationId: string;
  resourceId: string;
  state: ObservationState;
  sourceNodeId: string;
  confidence: number;
  crowdEstimate: 'low' | 'moderate' | 'high' | 'overcrowded';
  reason: string;
  createdAt: number;
  expiresAt: number;
}

export interface ResourceState {
  resourceId: string;
  effectiveState: ObservationState;
  confidence: number;
  supportingObservationIds: string[];
  conflictState: ConflictState;
  lastUpdatedAt: number;
  conflictingObservations?: ResourceObservation[];
}

export interface RouteRequest {
  requestId: string;
  requestedType: ResourceType;
  accessibilityNeed: boolean;
  preferredBuilding?: string;
  preferredDepartment?: string;
  preferredFloor?: string;
  preferredZone?: string;
  maxCrowd?: 'low' | 'moderate' | 'high';
  userLat?: number;
  userLng?: number;
  createdAt: number;
}

export interface RouteDecision {
  decisionId: string;
  requestId: string;
  selectedResourceId: string | null;
  pathSegmentIds: string[];
  confidence: number;
  explanation: string;
  supportingObservationIds: string[];
  expiresAt: number;
  avoidedResources?: { resourceId: string; reason: string }[];
  calculatedDistanceMeters?: number;
}

export interface MeshNode {
  nodeId: string;
  role: NodeRole;
  displayName: string;
  linkState: LinkState;
  lastSeen: number;
  queueDepth: number;
  routeEpoch: number;
  nodeLat?: number;
  nodeLng?: number;
}

export interface OutboxItem {
  eventId: string;
  targetNodeId: string;
  payload: ResourceObservation;
  attempt: number;
  state: OutboxState;
  nextRetryAt: number;
  lastError?: string;
}

export interface EventLog {
  eventId: string;
  type: 'OBSERVATION_CREATED' | 'DUPLICATE_MERGED' | 'CONFLICT_DETECTED' | 'ROUTE_DECISION' | 'NODE_DISCONNECTED' | 'NODE_RECONNECTED' | 'OUTBOX_QUEUED' | 'BATCH_REPLAYED' | 'STATE_CONVERGED' | 'GMAPS_GIS_SYNC';
  sourceNodeId: string;
  targetNodeId?: string;
  resourceId?: string;
  timestamp: number;
  status: 'SUCCESS' | 'WARNING' | 'ERROR';
  latencyMs: number;
  summary: string;
}

export interface SyncCursor {
  remoteNodeId: string;
  originNodeId: string;
  highestSequenceSeen: number;
}

export interface TelemetryMetrics {
  localDecisionLatency: number[];
  propagationLatency: number[];
  deduplicationLatency: number[];
  reconnectionSyncLatency: number[];
  minDecision: number;
  medianDecision: number;
  p95Decision: number;
  gisHaversineLatency?: number[];
}

export interface GoogleMapsPlaceRecord {
  placeId: string;
  name: string;
  lat: number;
  lng: number;
  formattedAddress: string;
  placeTypes: string[];
  accessibilityRating: number;
  syncedAt: number;
}
