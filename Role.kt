package com.sangam.mesh.mission

/** The four runtime roles. One APK, one architecture — this only changes which
 *  screens/nav graph a user sees, never which code module runs. */
enum class Role(val displayName: String, val purpose: String) {
    VISITOR(
        displayName = "Visitor",
        purpose = "Find a usable resource nearby, right now."
    ),
    STAFF(
        displayName = "Staff",
        purpose = "Report what you see: a lift down, a counter open."
    ),
    RELAY(
        displayName = "Relay",
        purpose = "Keep this device visible — it helps carry reports across the mesh."
    ),
    COORDINATOR(
        displayName = "Coordinator",
        purpose = "See the full local picture: resources, conflicts, node health."
    )
}
