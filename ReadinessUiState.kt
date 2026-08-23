package com.sangam.mesh.ui.readiness

import com.sangam.mesh.core.TransportState
import com.sangam.mesh.mission.Role

/** One peer as shown in the readiness peer list. */
data class PeerSummary(
    val nodeId: String,       // pseudonymous, e.g. "SANGAM-7F2A-STAFF"
    val role: Role?,
    val lastSeenLabel: String
)

/** A single pass/fail/warn readiness check row (permissions, services, etc). */
data class ReadinessCheck(
    val label: String,
    val status: CheckStatus,
    val actionableMessage: String? = null // shown only when status != PASS
)

enum class CheckStatus { PASS, WARN, FAIL, PENDING }

/**
 * Immutable, single source of truth for the Device Readiness screen.
 * The ViewModel is the ONLY thing that constructs this. Composables read it
 * and emit intents — they never mutate it directly.
 */
data class ReadinessUiState(
    val role: Role? = null,
    val missionId: String = "",
    val transportState: TransportState = TransportState.STOPPED,
    val internetDisabled: Boolean = true, // expected TRUE — not a failure
    val checks: List<ReadinessCheck> = emptyList(),
    val peers: List<PeerSummary> = emptyList(),
    val canContinue: Boolean = false,
    val isRefreshing: Boolean = false,
    val blockingError: String? = null
) {
    val peerCount: Int get() = peers.size

    companion object {
        /** Deterministic sample used in @Preview — never shipped as real data. */
        fun sampleReady(role: Role = Role.COORDINATOR) = ReadinessUiState(
            role = role,
            missionId = "CITYCARE-DEMO-01",
            transportState = TransportState.CONNECTED,
            internetDisabled = true,
            checks = listOf(
                ReadinessCheck("Bluetooth", CheckStatus.PASS),
                ReadinessCheck("Wi-Fi", CheckStatus.PASS),
                ReadinessCheck("Nearby permissions", CheckStatus.PASS),
                ReadinessCheck("Google Play services", CheckStatus.PASS)
            ),
            peers = listOf(
                PeerSummary("SANGAM-7F2A-VISITOR", Role.VISITOR, "2s ago"),
                PeerSummary("SANGAM-91BC-STAFF", Role.STAFF, "4s ago"),
                PeerSummary("SANGAM-33DE-RELAY", Role.RELAY, "1s ago")
            ),
            canContinue = true
        )

        fun sampleBlocked(role: Role = Role.STAFF) = ReadinessUiState(
            role = role,
            missionId = "CITYCARE-DEMO-01",
            transportState = TransportState.STOPPED,
            internetDisabled = true,
            checks = listOf(
                ReadinessCheck("Bluetooth", CheckStatus.PASS),
                ReadinessCheck(
                    "Nearby permissions", CheckStatus.FAIL,
                    "Nearby devices permission is required to discover peers."
                ),
                ReadinessCheck("Google Play services", CheckStatus.PASS)
            ),
            peers = emptyList(),
            canContinue = false
        )
    }
}

/** Explicit user intents — the only way a composable talks to the ViewModel. */
sealed interface ReadinessIntent {
    data object RetryChecks : ReadinessIntent
    data object OpenAppSettings : ReadinessIntent
    data object ContinueInLocalMode : ReadinessIntent
}
