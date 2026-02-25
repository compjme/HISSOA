package com.example.myapplication

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity

class MainActivity2 : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Find the Instagram icons by their IDs
        val instagramIcon = findViewById<ImageView>(R.id.imageView)
        val linkedinIcon = findViewById<ImageView>(R.id.imageView2)
        val tiktokIcon = findViewById<ImageView>(R.id.imageView3)
        val instagramUrl = "https://www.instagram.com/issobc/"
        val tiktokUrl = "https://www.tiktok.com/foryou?lang=en"
        val linkedinUrl = "https://www.linkedin.com/company/brooklyn-college-immigrant-student-success-office/"
        val openInstagram = {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(instagramUrl))
            startActivity(intent)
        }
        val openLinkedin = {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(linkedinUrl))
            startActivity(intent)
        }
        val openTiktok = {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(tiktokUrl))
            startActivity(intent)
        }
        instagramIcon.setOnClickListener { openInstagram() }
        linkedinIcon.setOnClickListener { openLinkedin() }
        tiktokIcon.setOnClickListener { openLinkedin() }
    }
}