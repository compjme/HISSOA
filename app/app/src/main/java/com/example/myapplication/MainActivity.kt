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

        // Contact Us Button -> MainActivity2
        val contactButton = findViewById<Button>(R.id.button4)
        contactButton.setOnClickListener {
            val intent = Intent(this, MainActivity2::class.java)
            startActivity(intent)
        }

        // Allies Button -> Main4
        val alliesButton = findViewById<Button>(R.id.button5)
        alliesButton.setOnClickListener {
            val intent = Intent(this, Main4::class.java)
            startActivity(intent)
        }

        // Services Button -> Main3
        val servicesButton = findViewById<Button>(R.id.button3)
        servicesButton.setOnClickListener {
            val intent = Intent(this, Main3::class.java)
            startActivity(intent)
        }

        // Legal Updates Button -> External URL
        val legalButton = findViewById<Button>(R.id.button6)
        val legalUrl = "https://www.cuny.edu/about/administration/offices/communications-marketing/citizenship-now/services/immigration_updates/"
        legalButton.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(legalUrl))
            startActivity(intent)
        }

        // Events Button -> EventsActivity
        val eventsButton = findViewById<Button>(R.id.button7)
        eventsButton.setOnClickListener {
            val intent = Intent(this, EventsActivity::class.java)
            startActivity(intent)
        }
    }
}