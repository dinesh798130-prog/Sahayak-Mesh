// Minimal app-module Gradle config for the frontend skeleton created in this
// step. Only the dependency groups explicitly allowed by the locked tech
// stack doc are listed. Room / Nearby / Protobuf / Coroutines-for-domain are
// NOT added yet because this skeleton has no domain or persistence code —
// add them in the phase that introduces PacketCodec/AppDatabase/NearbyTransport.

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    namespace = "com.sangam.mesh"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.sangam.mesh"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "0.1-frontend-skeleton"
    }

    buildFeatures {
        compose = true
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    // AndroidX Core, Lifecycle, Activity, Navigation Compose, Compose UI
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.activity:activity-compose:1.9.3")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.7")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7")
    implementation("androidx.navigation:navigation-compose:2.8.4")

    // Compose BOM keeps compose artifact versions aligned
    implementation(platform("androidx.compose:compose-bom:2024.12.01"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")

    // Kotlin Coroutines (used by ViewModels)
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.9.0")

    debugImplementation("androidx.compose.ui:ui-tooling")

    // JUnit / Kotlin test
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")
}
