package com.sangam.mesh.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.sangam.mesh.mission.Role
import com.sangam.mesh.ui.onboarding.RoleSelectionScreen
import com.sangam.mesh.ui.onboarding.WelcomeScreen
import com.sangam.mesh.ui.readiness.ReadinessScreen

/**
 * Navigation policy (enforced here, not scattered per-screen):
 * 1. READINESS must be reached and passed before any role home screen.
 * 2. Role is changed only via an explicit "switch role" action, which routes
 *    back through ROLE_SELECTION -> READINESS, never a silent jump.
 * 3. Destructive actions (reset) are triggered from dedicated confirmation
 *    screens/sheets, never directly from a nav call.
 *
 * This is a SKELETON: screens for Visitor/Staff/Relay/Coordinator home are
 * stubbed as TODO composables to be filled in during Prompts 4-7. Wiring
 * them in is mechanical once their UiState/ViewModel exist (Prompt 10).
 */
@Composable
fun SahayakNavGraph(
    navController: NavHostController = rememberNavController(),
    startDestination: String = SahayakDestinations.WELCOME
) {
    NavHost(navController = navController, startDestination = startDestination) {

        composable(SahayakDestinations.WELCOME) {
            WelcomeScreen(
                onContinue = { navController.navigate(SahayakDestinations.ROLE_SELECTION) }
            )
        }

        composable(SahayakDestinations.ROLE_SELECTION) {
            RoleSelectionScreen(
                onRoleSelected = { role: Role ->
                    // Role is stored by the (future) MissionViewModel; here we
                    // just navigate forward — readiness is mandatory next.
                    navController.navigate(SahayakDestinations.READINESS)
                }
            )
        }

        composable(SahayakDestinations.READINESS) {
            ReadinessScreen(
                onContinue = { role ->
                    val dest = when (role) {
                        Role.VISITOR -> SahayakDestinations.VISITOR_HOME
                        Role.STAFF -> SahayakDestinations.STAFF_HOME
                        Role.RELAY -> SahayakDestinations.RELAY_HOME
                        Role.COORDINATOR -> SahayakDestinations.COORDINATOR_HOME
                    }
                    navController.navigate(dest) {
                        // Readiness is a gate, not a page you go "back" through.
                        popUpTo(SahayakDestinations.WELCOME) { inclusive = false }
                    }
                }
            )
        }

        // --- Role home screens: built in Prompts 4-7, stubbed here so the
        // graph compiles and is navigable end-to-end today. ---
        composable(SahayakDestinations.VISITOR_HOME) { RoleHomePlaceholder(navController, Role.VISITOR) }
        composable(SahayakDestinations.STAFF_HOME) { RoleHomePlaceholder(navController, Role.STAFF) }
        composable(SahayakDestinations.RELAY_HOME) { RoleHomePlaceholder(navController, Role.RELAY) }
        composable(SahayakDestinations.COORDINATOR_HOME) { RoleHomePlaceholder(navController, Role.COORDINATOR) }
    }
}

@Composable
private fun RoleHomePlaceholder(navController: NavHostController, role: Role) {
    // Deliberately NOT a fake success screen — it visibly states this is a
    // placeholder so nobody mistakes it for a finished, data-backed screen.
    com.sangam.mesh.ui.components.EmptyState(
        title = "${role.displayName} home — coming in the next prompt",
        body = "This screen is wired into navigation but not yet built. " +
            "It will consume ${role.displayName}HomeUiState from its ViewModel."
    )
}
