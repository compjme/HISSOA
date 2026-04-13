package com.example.myapplication

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class Main3 : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.layout2)

        val mentoringButton = findViewById<Button>(R.id.button5)
        mentoringButton.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.brooklyn.edu/dosa/student-support-services/isso/mentoring/"))
            startActivity(intent)
        }

        val scholarshipsButton = findViewById<Button>(R.id.button3)
        scholarshipsButton.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.brooklyn.edu/dosa/student-support-services/isso/scholarships-and-financial-aid/"))
            startActivity(intent)
        }

        val legalAssistanceButton = findViewById<Button>(R.id.button2)
        legalAssistanceButton.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.brooklyn.edu/dosa/student-support-services/isso/free-legal-assistance/"))
            startActivity(intent)
        }

        val wellnessButton = findViewById<Button>(R.id.button4)
        wellnessButton.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.brooklyn.edu/dosa/student-support-services/isso/wellness-and-personal-counseling/"))
            startActivity(intent)
        }
    }
}