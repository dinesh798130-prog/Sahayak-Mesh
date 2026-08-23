package com.sangam.mesh.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val LightColors = lightColorScheme(
    primary = SahayakAccent,
    onPrimary = SahayakSurfaceLight,
    primaryContainer = SahayakAccentContainerLight,
    onPrimaryContainer = SahayakInk,
    background = SahayakSurfaceLight,
    onBackground = SahayakInk,
    surface = SahayakSurfaceLight,
    onSurface = SahayakInk,
    surfaceVariant = SahayakSurfaceVariantLight,
    onSurfaceVariant = SahayakInk,
    error = SahayakError,
    onError = SahayakSurfaceLight
)

private val DarkColors = darkColorScheme(
    primary = SahayakAccent,
    onPrimary = SahayakInkDark,
    primaryContainer = SahayakAccentContainerDark,
    onPrimaryContainer = SahayakInkDark,
    background = SahayakSurfaceDark,
    onBackground = SahayakInkDark,
    surface = SahayakSurfaceDark,
    onSurface = SahayakInkDark,
    surfaceVariant = SahayakSurfaceVariantDark,
    onSurfaceVariant = SahayakInkDark,
    error = SahayakError,
    onError = SahayakInkDark
)

/**
 * Root theme for the whole app. Every screen/composable must be a descendant
 * of SahayakTheme — never build a second theme system or reference raw hex
 * colors outside ui/theme.
 */
@Composable
fun SahayakTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColors else LightColors
    MaterialTheme(
        colorScheme = colorScheme,
        typography = SahayakTypography,
        shapes = SahayakShapes,
        content = content
    )
}
