package com.example.myapplication

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.layout)

        val contactButton = findViewById<Button>(R.id.button4)
        contactButton.setOnClickListener {
            val intent = Intent(this, MainActivity2::class.java)
            startActivity(intent)
        }
        val alliesButton = findViewById<Button>(R.id.button5)
        contactButton.setOnClickListener {
            val intent = Intent(this, Main4::class.java)
            startActivity(intent)
        }

        val servicesButton = findViewById<Button>(R.id.button3)
        val servicesUrl = "https://www.brooklyn.edu/dosa/student-support-services/isso/free-legal-assistance/"
        servicesButton.setOnClickListener {
            val intent = Intent(this, Main3::class.java)
            startActivity(intent)
        }
        val legalButton = findViewById<Button>(R.id.button6)
        val legalUrl = "https://www.cuny.edu/about/administration/offices/communications-marketing/citizenship-now/services/immigration_updates/"
        legalButton.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(legalUrl))
            startActivity(intent)
        }
    }
}