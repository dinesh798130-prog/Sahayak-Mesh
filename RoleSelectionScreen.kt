package com.sangam.mesh.ui.onboarding

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.sangam.mesh.mission.Role
import com.sangam.mesh.ui.components.SahayakTopBar
import com.sangam.mesh.ui.theme.SahayakDimens
import com.sangam.mesh.ui.theme.SahayakTheme
import com.sangam.mesh.ui.theme.SahayakTypography

private fun Role.icon(): ImageVector = when (this) {
    Role.VISITOR -> Icons.Filled.Person
    Role.STAFF -> Icons.Filled.Badge
    Role.RELAY -> Icons.Filled.SettingsInputAntenna
    Role.COORDINATOR -> Icons.Filled.Dashboard
}

/**
 * Selecting a role here does NOT touch any repository/DAO directly — this
 * composable only calls back up with the chosen Role. The caller (nav graph
 * -> future MissionViewModel) is responsible for persisting it.
 */
@Composable
fun RoleSelectionScreen(onRoleSelected: (Role) -> Unit) {
    Scaffold(topBar = { SahayakTopBar(title = "Choose your role") }) { padding ->
        Column(Modifier.padding(padding).fillMaxSize()) {
            Text(
                "The same app supports all four roles — pick the one that " +
                    "matches what you're doing right now.",
                style = SahayakTypography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(SahayakDimens.spaceMd)
            )
            LazyColumn(
                contentPadding = PaddingValues(
                    horizontal = SahayakDimens.spaceMd,
                    vertical = SahayakDimens.spaceSm
                ),
                verticalArrangement = Arrangement.spacedBy(SahayakDimens.spaceSm)
            ) {
                items(Role.values().toList()) { role ->
                    RoleCard(role = role, onClick = { onRoleSelected(role) })
                }
            }
        }
    }
}

@Composable
private fun RoleCard(role: Role, onClick: () -> Unit) {
    Card(
        onClick = onClick,
        modifier = Modifier
            .fillMaxWidth()
            .heightIn(min = SahayakDimens.touchTargetMin)
    ) {
        Row(
            Modifier.padding(SahayakDimens.spaceMd),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(SahayakDimens.spaceMd)
        ) {
            Icon(
                role.icon(),
                contentDescription = null,
                modifier = Modifier.size(SahayakDimens.iconSizeLg),
                tint = MaterialTheme.colorScheme.primary
            )
            Column(Modifier.weight(1f)) {
                Text(role.displayName, style = SahayakTypography.titleMedium)
                Spacer(Modifier.height(2.dp))
                Text(
                    role.purpose,
                    style = SahayakTypography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun RoleSelectionPreview() {
    SahayakTheme { RoleSelectionScreen(onRoleSelected = {}) }
}
