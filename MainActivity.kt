package com.sangam.mesh

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.sangam.mesh.ui.navigation.SahayakNavGraph
import com.sangam.mesh.ui.theme.SahayakTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            SahayakTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    SahayakNavGraph()
                }
            }
        }
    }
}
