package com.sangam.mesh.ui.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Shapes
import androidx.compose.ui.unit.dp

val SahayakShapes = Shapes(
    extraSmall = RoundedCornerShape(4.dp),
    small = RoundedCornerShape(8.dp),
    medium = RoundedCornerShape(12.dp),
    large = RoundedCornerShape(16.dp),
    extraLarge = RoundedCornerShape(28.dp)
)

/** Spacing / sizing tokens. Keep every touch target >= 48.dp per accessibility requirement. */
object SahayakDimens {
    val spaceXs = 4.dp
    val spaceSm = 8.dp
    val spaceMd = 16.dp
    val spaceLg = 24.dp
    val spaceXl = 32.dp

    val iconSizeSm = 18.dp
    val iconSizeMd = 24.dp
    val iconSizeLg = 32.dp

    val touchTargetMin = 48.dp
    val cardElevation = 1.dp

    const val animDurationShortMs = 120
    const val animDurationMediumMs = 220
}
