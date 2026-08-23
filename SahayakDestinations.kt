package com.sangam.mesh.ui.navigation

/**
 * One flat set of route destinations for the whole app. Role selection does
 * NOT create separate nav graphs — it just decides which of these the
 * bottom navigation surfaces for the current role (see SahayakNavGraph).
 */
object SahayakDestinations {
    const val WELCOME = "welcome"
    const val MISSION_SETUP = "mission_setup"
    const val ROLE_SELECTION = "role_selection"
    const val READINESS = "readiness"
    const val READY_CONFIRM = "ready_confirm"

    const val VISITOR_HOME = "visitor_home"
    const val VISITOR_REQUEST = "visitor_request"
    const val VISITOR_RESULT = "visitor_result"

    const val STAFF_HOME = "staff_home"
    const val STAFF_OBSERVE = "staff_observe"

    const val RELAY_HOME = "relay_home"
    const val RECOVERY = "recovery"

    const val COORDINATOR_HOME = "coordinator_home"
    const val RESOURCE_DETAIL = "resource_detail/{resourceId}"
    fun resourceDetail(resourceId: String) = "resource_detail/$resourceId"

    const val TOPOLOGY = "topology"
    const val TIMELINE = "timeline"
    const val METRICS = "metrics"
    const val SETTINGS_ABOUT = "settings_about"
}
