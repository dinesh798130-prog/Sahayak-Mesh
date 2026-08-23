package com.sangam.mesh.core

/**
 * Effective resource state as computed by the (domain-layer) FusionEngine.
 * The UI NEVER computes this itself — it only renders whatever the
 * ObservationRepository / FusionEngine StateFlow emits. This enum exists in
 * `core` (not `ui`) so both domain and UI can share one source of truth.
 */
enum class ResourceState {
    AVAILABLE,   // usable now
    BUSY,        // operational but crowded
    BLOCKED,     // unsafe/inaccessible for routing
    BROKEN,      // unavailable and unsafe
    UNKNOWN,     // insufficient evidence
    STALE,       // may no longer represent current conditions
    EXPIRED,     // excluded from active truth unless explicit fallback
    CONFLICT     // fresh reports disagree — show both
}

/** Delivery/sync status of a single observation or outbox item. */
enum class SyncStatus {
    QUEUED,        // persisted locally, waiting to transmit
    SENT,          // handed to transport
    ACKED,         // peer confirmed receipt
    FAILED,        // transport/send error, will retry
    REPLAYED       // delivered via reconciliation after reconnect
}

/** Node/link connectivity as shown on Relay + Coordinator topology views. */
enum class LinkState {
    CONNECTED,
    DEGRADED,
    DISCONNECTED,
    UNAVAILABLE
}

/** Overall transport lifecycle, shown on the Device Readiness screen. */
enum class TransportState {
    STOPPED,
    STARTING,
    DISCOVERING,
    PAIRING,
    CONNECTED,
    DEGRADED
}
