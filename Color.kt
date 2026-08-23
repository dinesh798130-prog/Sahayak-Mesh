package com.sangam.mesh.ui.theme

import androidx.compose.ui.graphics.Color

/*
 * Sahayak palette: warm neutral surfaces, dark ink text, one strong accent
 * for primary actions, and a fixed set of SEMANTIC colors for resource /
 * connection states. These semantic colors are looked up by state enum,
 * never hard-coded per-screen, so Visitor/Staff/Relay/Coordinator all agree
 * on what "broken" or "stale" looks like.
 */

// Base neutrals
val SahayakInk = Color(0xFF1B1B18)          // primary text, light theme
val SahayakInkDark = Color(0xFFF2EFE9)      // primary text, dark theme
val SahayakSurfaceLight = Color(0xFFFBF8F2) // warm neutral surface
val SahayakSurfaceDark = Color(0xFF15140F)
val SahayakSurfaceVariantLight = Color(0xFFEFE9DC)
val SahayakSurfaceVariantDark = Color(0xFF272620)

// Accent — used for primary actions and selected state only
val SahayakAccent = Color(0xFF0F6E5B)        // deep teal-green
val SahayakAccentContainerLight = Color(0xFFCFEEE3)
val SahayakAccentContainerDark = Color(0xFF0B4A3D)

// --- Semantic resource-state colors (used via ResourceStateChip etc.) ---
val StateAvailable = Color(0xFF1E8E3E)   // usable now
val StateBusy = Color(0xFFB98900)        // operational but crowded
val StateBlocked = Color(0xFFB5442A)     // unsafe/inaccessible for routing
val StateBroken = Color(0xFFB3261E)      // unavailable + unsafe
val StateUnknown = Color(0xFF6B6960)     // insufficient evidence
val StateStale = Color(0xFF8A6D00)       // may not reflect current conditions
val StateExpired = Color(0xFF9C9689)     // excluded from active truth
val StateConflict = Color(0xFF8E24AA)    // fresh reports disagree
val StateQueued = Color(0xFF3A5CCB)      // persisted locally, awaiting sync
val StateLocal = Color(0xFF0F6E5B)       // processed fully offline

// Connection / node link states
val LinkConnected = Color(0xFF1E8E3E)
val LinkDegraded = Color(0xFFB98900)
val LinkDisconnected = Color(0xFF9C9689)
val LinkFailed = Color(0xFFB3261E)

// Feedback
val SahayakError = Color(0xFFB3261E)
val SahayakWarningContainerLight = Color(0xFFFCEFC7)
val SahayakWarningContainerDark = Color(0xFF4A3B00)
