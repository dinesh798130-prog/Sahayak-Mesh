package com.sangam.mesh.ui.onboarding

import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.sangam.mesh.ui.components.PrimaryActionButton
import com.sangam.mesh.ui.theme.SahayakDimens
import com.sangam.mesh.ui.theme.SahayakTheme
import com.sangam.mesh.ui.theme.SahayakTypography

@Composable
fun WelcomeScreen(onContinue: () -> Unit) {
    Scaffold { padding ->
        Column(
            modifier = Modifier
                .padding(padding)
                .fillMaxSize()
                .padding(SahayakDimens.spaceLg),
            verticalArrangement = Arrangement.Bottom
        ) {
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.Center
            ) {
                Text("Sahayak", style = SahayakTypography.displaySmall)
                Spacer(Modifier.height(SahayakDimens.spaceMd))
                Text(
                    "A local truth layer for finding usable resources in a " +
                        "crowded venue — even when the network is down.",
                    style = SahayakTypography.bodyLarge
                )
                Spacer(Modifier.height(SahayakDimens.spaceLg))
                Text(
                    "This prototype uses synthetic venue data.",
                    style = SahayakTypography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Spacer(Modifier.height(4.dp))
                Text(
                    "Sahayak is not an emergency dispatch system, medical " +
                        "device, or guarantee of safe passage.",
                    style = SahayakTypography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            PrimaryActionButton(text = "Continue", onClick = onContinue)
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun WelcomeScreenPreview() {
    SahayakTheme { WelcomeScreen(onContinue = {}) }
}
