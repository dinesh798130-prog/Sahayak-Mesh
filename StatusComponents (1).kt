package com.sangam.mesh.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CloudOff
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.sangam.mesh.core.LinkState
import com.sangam.mesh.core.ResourceState
import com.sangam.mesh.mission.Role
import com.sangam.mesh.ui.theme.*

/**
 * All state -> (label, color) mappings live in ONE place (this file) so a
 * resource never renders differently on the Visitor screen than it does on
 * the Coordinator board. Every chip pairs color with TEXT — never color alone
 * — per the accessibility requirement.
 */

private data class StateVisual(val label: String, val color: Color)

private fun ResourceState.visual(): StateVisual = when (this) {
    ResourceState.AVAILABLE -> StateVisual("Available", StateAvailable)
    ResourceState.BUSY -> StateVisual("Busy", StateBusy)
    ResourceState.BLOCKED -> StateVisual("Blocked", StateBlocked)
    ResourceState.BROKEN -> StateVisual("Broken", StateBroken)
    ResourceState.UNKNOWN -> StateVisual("Unknown", StateUnknown)
    ResourceState.STALE -> StateVisual("Stale", StateStale)
    ResourceState.EXPIRED -> StateVisual("Expired", StateExpired)
    ResourceState.CONFLICT -> StateVisual("Conflicting reports", StateConflict)
}

private fun LinkState.visual(): StateVisual = when (this) {
    LinkState.CONNECTED -> StateVisual("Connected", LinkConnected)
    LinkState.DEGRADED -> StateVisual("Degraded", LinkDegraded)
    LinkState.DISCONNECTED -> StateVisual("Disconnected", LinkDisconnected)
    LinkState.UNAVAILABLE -> StateVisual("Unavailable", LinkFailed)
}

@Composable
fun ResourceStateChip(state: ResourceState, modifier: Modifier = Modifier) {
    val v = state.visual()
    Row(
        modifier = modifier
            .clip(RoundedCornerShape(50))
            .background(v.color.copy(alpha = 0.14f))
            .padding(horizontal = SahayakDimens.spaceSm, vertical = 4.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(6.dp)
    ) {
        Box(
            Modifier
                .size(8.dp)
                .clip(CircleShape)
                .background(v.color)
        )
        Text(v.label, style = SahayakTypography.labelLarge, color = v.color)
    }
}

@Composable
fun ConnectionStatusChip(link: LinkState, modifier: Modifier = Modifier) {
    val v = link.visual()
    Row(
        modifier = modifier
            .clip(RoundedCornerShape(50))
            .background(v.color.copy(alpha = 0.14f))
            .padding(horizontal = SahayakDimens.spaceSm, vertical = 4.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(6.dp)
    ) {
        Box(Modifier.size(8.dp).clip(CircleShape).background(v.color))
        Text(v.label, style = SahayakTypography.labelLarge, color = v.color)
    }
}

@Composable
fun RoleBadge(role: Role, modifier: Modifier = Modifier) {
    Surface(
        modifier = modifier,
        color = MaterialTheme.colorScheme.primaryContainer,
        shape = RoundedCornerShape(50)
    ) {
        Text(
            text = role.displayName,
            style = SahayakTypography.labelLarge,
            color = MaterialTheme.colorScheme.onPrimaryContainer,
            modifier = Modifier.padding(horizontal = SahayakDimens.spaceSm, vertical = 4.dp)
        )
    }
}

@Composable
fun MissionBadge(missionId: String, modifier: Modifier = Modifier) {
    Text(
        text = "Mission $missionId",
        style = IdMonoStyle,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
        modifier = modifier
    )
}

/** Persistent banner confirming the app is operating without Internet — this
 * is a FEATURE, not an error, so it must never look like a failure state. */
@Composable
fun LocalModeBanner(peerCount: Int, modifier: Modifier = Modifier) {
    Surface(
        modifier = modifier.fillMaxWidth(),
        color = SahayakAccentContainerLight,
        shape = RoundedCornerShape(0.dp)
    ) {
        Row(
            Modifier.padding(horizontal = SahayakDimens.spaceMd, vertical = 6.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Icon(Icons.Filled.CloudOff, contentDescription = null, tint = SahayakInk, modifier = Modifier.size(16.dp))
            Text(
                text = if (peerCount > 0)
                    "Local-only mode · $peerCount ${if (peerCount == 1) "peer" else "peers"} connected"
                else
                    "Local-only mode · searching for peers",
                style = SahayakTypography.labelLarge,
                color = SahayakInk
            )
        }
    }
}

@Composable
fun ConfidenceBar(confidence: Float, modifier: Modifier = Modifier) {
    // confidence expected in 0f..1f, sourced from the domain layer only
    Column(modifier) {
        Text(
            "Confidence: ${(confidence * 100).toInt()}%",
            style = SahayakTypography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        LinearProgressIndicator(
            progress = { confidence.coerceIn(0f, 1f) },
            modifier = Modifier
                .fillMaxWidth()
                .height(6.dp)
                .clip(RoundedCornerShape(3.dp))
        )
    }
}

@Composable
fun FreshnessLabel(ageLabel: String, isStale: Boolean, modifier: Modifier = Modifier) {
    Row(
        modifier = modifier,
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        if (isStale) {
            Icon(
                Icons.Filled.Warning,
                contentDescription = "Stale data warning",
                tint = StateStale,
                modifier = Modifier.size(14.dp)
            )
        }
        Text(
            text = ageLabel,
            style = SahayakTypography.labelSmall,
            color = if (isStale) StateStale else MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

@Composable
fun QueueCountBadge(count: Int, modifier: Modifier = Modifier) {
    if (count <= 0) return
    Surface(
        modifier = modifier,
        color = StateQueued.copy(alpha = 0.16f),
        shape = RoundedCornerShape(50)
    ) {
        Text(
            "$count queued",
            style = SahayakTypography.labelSmall,
            color = StateQueued,
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
        )
    }
}

@Preview(showBackground = true)
@Composable
private fun StatusComponentsPreview() {
    SahayakTheme {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            LocalModeBanner(peerCount = 3)
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                ResourceState.values().take(4).forEach { ResourceStateChip(it) }
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                LinkState.values().forEach { ConnectionStatusChip(it) }
            }
            RoleBadge(Role.COORDINATOR)
            ConfidenceBar(0.72f)
            FreshnessLabel("Updated 2 min ago", isStale = false)
            FreshnessLabel("Updated 40 min ago", isStale = true)
            QueueCountBadge(3)
        }
    }
}
