package com.sangam.mesh.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

/*
 * Sahayak type scale. We deliberately name a few EXTRA tokens beyond the
 * default Material set (metricNumber, idMono) because the prompt pack
 * calls for a monospace treatment for observation/node IDs and a distinct
 * display style for big metric numbers on the Coordinator/metrics screens.
 */

private val SahayakFontFamily = FontFamily.Default
private val SahayakMonoFamily = FontFamily.Monospace

val SahayakTypography = Typography(
    displaySmall = TextStyle(
        fontFamily = SahayakFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 30.sp,
        lineHeight = 36.sp
    ),
    headlineSmall = TextStyle( // screen title
        fontFamily = SahayakFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 22.sp,
        lineHeight = 28.sp
    ),
    titleMedium = TextStyle( // section title
        fontFamily = SahayakFontFamily,
        fontWeight = FontWeight.Medium,
        fontSize = 16.sp,
        lineHeight = 22.sp
    ),
    bodyLarge = TextStyle(
        fontFamily = SahayakFontFamily,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 22.sp
    ),
    bodyMedium = TextStyle(
        fontFamily = SahayakFontFamily,
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 20.sp
    ),
    labelLarge = TextStyle(
        fontFamily = SahayakFontFamily,
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = 18.sp
    ),
    labelSmall = TextStyle(
        fontFamily = SahayakFontFamily,
        fontWeight = FontWeight.Medium,
        fontSize = 11.sp,
        lineHeight = 14.sp
    )
)

// Extra tokens not part of Material3 Typography — used directly where needed
val MetricNumberStyle = TextStyle(
    fontFamily = SahayakFontFamily,
    fontWeight = FontWeight.Bold,
    fontSize = 34.sp,
    lineHeight = 38.sp
)

val IdMonoStyle = TextStyle(
    fontFamily = SahayakMonoFamily,
    fontWeight = FontWeight.Normal,
    fontSize = 12.sp,
    lineHeight = 16.sp
)
