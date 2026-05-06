package com.example.myapplication

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.card.MaterialCardView

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.layout)

        // Contact Us Card
        findViewById<MaterialCardView>(R.id.cardContact).setOnClickListener {
            val intent = Intent(this, MainActivity2::class.java)
            startActivity(intent)
        }

        // Allies Card
        findViewById<MaterialCardView>(R.id.cardAllies).setOnClickListener {
            val intent = Intent(this, Main4::class.java)
            startActivity(intent)
        }

        // Services Card
        findViewById<MaterialCardView>(R.id.cardServices).setOnClickListener {
            val intent = Intent(this, Main3::class.java)
            startActivity(intent)
        }

        // Legal Updates Card
        findViewById<MaterialCardView>(R.id.cardLegal).setOnClickListener {
            val legalUrl = "https://www.cuny.edu/about/administration/offices/communications-marketing/citizenship-now/services/immigration_updates/"
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(legalUrl))
            startActivity(intent)
        }

        // Events Card
        findViewById<MaterialCardView>(R.id.cardEvents).setOnClickListener {
            val intent = Intent(this, EventsActivity::class.java)
            startActivity(intent)
        }

        // Appointments Card (Example link, update as needed)
        findViewById<MaterialCardView>(R.id.cardAppointments).setOnClickListener {
             val appointmentsUrl = "https://www.brooklyn.edu/dosa/student-support-services/isso/appointments/"
             val intent = Intent(Intent.ACTION_VIEW, Uri.parse(appointmentsUrl))
             startActivity(intent)
        }
    }
}