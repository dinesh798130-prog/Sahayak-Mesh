# Sahayak — Frontend skeleton (Prompts 0–2 of the build pack)

This is a working starting point for the Sahayak Android frontend, matching
`Sangam Mesh — Locked Tech Stack v1.0` exactly: native Android, Kotlin,
Jetpack Compose + Material 3, one APK / one architecture, no cloud, no web
framework. Drop the `app/src/main/java/com/sangam/mesh` tree into an existing
Android Studio project (or use this as the app module directly) and it will
build and run standalone — every screen has synthetic preview data, no
Nearby/Room dependency is required yet.

## What's implemented

| Layer | File | Prompt-pack step |
|---|---|---|
| Design tokens | `ui/theme/Color.kt`, `Type.kt`, `Dimens.kt`, `Theme.kt` | Prompt 1 |
| Reusable status components | `ui/components/StatusComponents.kt` | Prompt 1 |
| Reusable state/action components | `ui/components/CommonStates.kt` | Prompt 1 |
| Shared enums (no UI dependency) | `core/SemanticStates.kt`, `mission/Role.kt` | Prompt 1 (contract) |
| Navigation graph + policy | `ui/navigation/*` | Prompt 3 |
| Welcome + Role selection | `ui/onboarding/*` | Prompt 2 |
| Device Readiness (UiState + ViewModel + Screen) | `ui/readiness/*` | Prompt 2 |
| App shell | `MainActivity.kt` | Prompt 1 |

## Architecture rules already enforced in this code

1. **No composable touches Room, DAOs, NearbyTransport, or MissionKeyStore.**
   `ReadinessScreen` only depends on `ReadinessSource`, an interface — the
   real implementation (backed by `NodeRepository` + `NearbyTransport`) gets
   swapped in later without touching a single Composable.
2. **State flows one way.** `ReadinessViewModel` exposes
   `StateFlow<ReadinessUiState>`; the screen renders it and sends back
   `ReadinessIntent` values only.
3. **Every semantic state pairs color with text/icon** (see
   `StatusComponents.kt`) — never color alone, per the accessibility
   requirement in Prompt 12.
4. **Internet-disabled is rendered as expected, not as an error** — see the
   `LocalModeBanner` and the "Internet" row in `ReadinessScreen`.
5. **Readiness is a real navigation gate.** `SahayakNavGraph` routes through
   `READINESS` before any role home screen and pops the back stack so it
   can't be skipped by pressing back.

## What's intentionally stubbed

- `VISITOR_HOME`, `STAFF_HOME`, `RELAY_HOME`, `COORDINATOR_HOME` route to a
  visible placeholder (`RoleHomePlaceholder`) that states plainly it isn't
  built yet — this is deliberate per the "no fake success / no placeholder
  screens that hide uncertainty" rule. Build these in Prompts 4–7.
- `ReadinessSource` has a `FakeReadinessSource` implementation so the screen
  is runnable today. Replace it with a real implementation once
  `NodeRepository` / `NearbyTransport` exist (Prompt 10).
- No Room, no Protobuf, no Nearby dependency is in `build.gradle.kts` yet —
  add `androidx.room:room-*`, the Nearby Connections artifact, and the
  Protobuf Gradle plugin when you start the phases that need persistence and
  transport (per the locked stack's dependency table).

## Exact next step

Follow **Prompt 3** in the pack (shared navigation/state semantics — already
partially done here, verify against your actual repo state) then **Prompt 4**
(Visitor experience) using the same pattern as `ReadinessScreen`:
`XyzUiState.kt` (data class + sample fixtures) → `XyzViewModel.kt`
(StateFlow + intents) → `XyzScreen.kt` (stateful wrapper + stateless
`XyzContent` + `@Preview`s for every state, including empty/error/conflict).
