package com.sangam.mesh.ui.readiness

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.sangam.mesh.mission.Role
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * Everything this ViewModel needs from the domain layer, as an interface.
 * The REAL implementation (backed by NodeRepository + NearbyTransport +
 * permission/service checks) is written in Prompt 10 / the domain module.
 * Until then, `FakeReadinessSource` below lets this screen run and be
 * previewed/tested with zero dependency on Nearby or Room.
 */
interface ReadinessSource {
    suspend fun runChecks(): List<ReadinessCheck>
    suspend fun currentPeers(): List<PeerSummary>
    suspend fun transportState(): com.sangam.mesh.core.TransportState
    fun isInternetDisabled(): Boolean
}

class FakeReadinessSource : ReadinessSource {
    override suspend fun runChecks(): List<ReadinessCheck> = listOf(
        ReadinessCheck("Bluetooth", CheckStatus.PASS),
        ReadinessCheck("Wi-Fi", CheckStatus.PASS),
        ReadinessCheck("Nearby permissions", CheckStatus.PASS),
        ReadinessCheck("Google Play services", CheckStatus.PASS)
    )
    override suspend fun currentPeers(): List<PeerSummary> = emptyList()
    override suspend fun transportState() = com.sangam.mesh.core.TransportState.DISCOVERING
    override fun isInternetDisabled(): Boolean = true
}

class ReadinessViewModel(
    private val role: Role,
    private val missionId: String,
    private val source: ReadinessSource = FakeReadinessSource()
) : ViewModel() {

    private val _uiState = MutableStateFlow(
        ReadinessUiState(role = role, missionId = missionId, isRefreshing = true)
    )
    val uiState: StateFlow<ReadinessUiState> = _uiState.asStateFlow()

    init { refresh() }

    fun onIntent(intent: ReadinessIntent) {
        when (intent) {
            ReadinessIntent.RetryChecks -> refresh()
            ReadinessIntent.OpenAppSettings -> {
                // Actual settings-intent launch happens at the Activity layer;
                // ViewModel just signals it, never launches Android intents itself.
            }
            ReadinessIntent.ContinueInLocalMode -> {
                // Navigation continuation is handled by the caller reading
                // uiState.canContinue — this ViewModel never navigates.
            }
        }
    }

    private fun refresh() {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isRefreshing = true)
            val checks = source.runChecks()
            val peers = source.currentPeers()
            val transport = source.transportState()
            val hasBlockingFailure = checks.any { it.status == CheckStatus.FAIL }
            _uiState.value = _uiState.value.copy(
                checks = checks,
                peers = peers,
                transportState = transport,
                internetDisabled = source.isInternetDisabled(),
                canContinue = !hasBlockingFailure,
                isRefreshing = false
            )
        }
    }
}
