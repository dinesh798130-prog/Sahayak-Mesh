package com.sangam.mesh.ui.readiness

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Error
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.sangam.mesh.mission.Role
import com.sangam.mesh.ui.components.*
import com.sangam.mesh.ui.theme.SahayakDimens
import com.sangam.mesh.ui.theme.SahayakTheme
import com.sangam.mesh.ui.theme.SahayakTypography
import com.sangam.mesh.ui.theme.StateAvailable
import com.sangam.mesh.ui.theme.StateBroken
import com.sangam.mesh.ui.theme.StateStale

/**
 * Stateful entry point wired to the ViewModel. Kept thin: it only collects
 * uiState and forwards onContinue with the current role once canContinue
 * is true. All rendering logic lives in the stateless ReadinessContent so
 * it can be previewed/tested with plain data classes.
 */
@Composable
fun ReadinessScreen(
    role: Role = Role.COORDINATOR,
    missionId: String = "CITYCARE-DEMO-01",
    onContinue: (Role) -> Unit
) {
    val viewModel: ReadinessViewModel = viewModel { ReadinessViewModel(role, missionId) }
    val state by viewModel.uiState.collectAsState()

    ReadinessContent(
        state = state,
        onIntent = viewModel::onIntent,
        onContinueClick = { state.role?.let(onContinue) }
    )
}

@Composable
fun ReadinessContent(
    state: ReadinessUiState,
    onIntent: (ReadinessIntent) -> Unit,
    onContinueClick: () -> Unit
) {
    Scaffold(
        topBar = { SahayakTopBar(title = "Device readiness") }
    ) { padding ->
        if (state.isRefreshing && state.checks.isEmpty()) {
            LoadingState(message = "Checking device readiness…", modifier = Modifier.padding(padding))
            return@Scaffold
        }

        Column(
            Modifier
                .padding(padding)
                .fillMaxSize()
        ) {
            LocalModeBanner(peerCount = state.peerCount)

            LazyColumn(
                modifier = Modifier.weight(1f),
                contentPadding = PaddingValues(SahayakDimens.spaceMd),
                verticalArrangement = Arrangement.spacedBy(SahayakDimens.spaceMd)
            ) {
                item {
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        state.role?.let { RoleBadge(it) }
                        MissionBadge(state.missionId)
                    }
                }

                item {
                    // Internet-disabled is EXPECTED local operation, not a failure —
                    // rendered as a neutral/positive row, never red.
                    ReadinessRow(
                        label = "Internet",
                        detail = if (state.internetDisabled) "Disabled (expected for offline demo)" else "Enabled",
                        icon = Icons.Filled.CheckCircle,
                        tint = StateAvailable
                    )
                }

                item {
                    ReadinessRow(
                        label = "Mesh transport",
                        detail = state.transportState.name.lowercase().replaceFirstChar { it.uppercase() },
                        icon = Icons.Filled.CheckCircle,
                        tint = StateAvailable
                    )
                }

                item {
                    Text("Checks", style = SahayakTypography.titleMedium)
                }

                items(state.checks) { check ->
                    val (icon, tint) = when (check.status) {
                        CheckStatus.PASS -> Icons.Filled.CheckCircle to StateAvailable
                        CheckStatus.WARN -> Icons.Filled.Warning to StateStale
                        CheckStatus.FAIL -> Icons.Filled.Error to StateBroken
                        CheckStatus.PENDING -> Icons.Filled.Warning to StateStale
                    }
                    Column {
                        ReadinessRow(label = check.label, detail = check.status.name, icon = icon, tint = tint)
                        check.actionableMessage?.let {
                            Text(
                                it,
                                style = SahayakTypography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                modifier = Modifier.padding(start = 32.dp, top = 2.dp)
                            )
                        }
                    }
                }

                item {
                    Text("Connected peers (${state.peerCount})", style = SahayakTypography.titleMedium)
                }

                if (state.peers.isEmpty()) {
                    item {
                        Text(
                            "No peers discovered yet.",
                            style = SahayakTypography.bodyMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                } else {
                    items(state.peers) { peer ->
                        PeerRow(peer)
                    }
                }
            }

            Column(Modifier.padding(SahayakDimens.spaceMd)) {
                if (!state.canContinue) {
                    Text(
                        "Resolve the failed checks above, or continue in local mode " +
                            "if this is expected for your demo setup.",
                        style = SahayakTypography.bodyMedium,
                        color = MaterialTheme.colorScheme.error,
                        modifier = Modifier.padding(bottom = SahayakDimens.spaceSm)
                    )
                }
                Row(horizontalArrangement = Arrangement.spacedBy(SahayakDimens.spaceSm)) {
                    SecondaryActionButton(
                        text = "Retry checks",
                        onClick = { onIntent(ReadinessIntent.RetryChecks) },
                        modifier = Modifier.weight(1f)
                    )
                    PrimaryActionButton(
                        text = "Continue",
                        onClick = onContinueClick,
                        enabled = state.canContinue,
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }
    }
}

@Composable
private fun ReadinessRow(label: String, detail: String, icon: ImageVector, tint: androidx.compose.ui.graphics.Color) {
    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        Icon(icon, contentDescription = null, tint = tint, modifier = Modifier.size(20.dp))
        Column {
            Text(label, style = SahayakTypography.bodyLarge)
            Text(detail, style = SahayakTypography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}

@Composable
private fun PeerRow(peer: PeerSummary) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        peer.role?.let { RoleBadge(it) }
        Text(peer.nodeId, style = com.sangam.mesh.ui.theme.IdMonoStyle, modifier = Modifier.weight(1f))
        Text(peer.lastSeenLabel, style = SahayakTypography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}

@Preview(showBackground = true)
@Composable
private fun ReadinessReadyPreview() {
    SahayakTheme {
        ReadinessContent(state = ReadinessUiState.sampleReady(), onIntent = {}, onContinueClick = {})
    }
}

@Preview(showBackground = true)
@Composable
private fun ReadinessBlockedPreview() {
    SahayakTheme {
        ReadinessContent(state = ReadinessUiState.sampleBlocked(), onIntent = {}, onContinueClick = {})
    }
}
