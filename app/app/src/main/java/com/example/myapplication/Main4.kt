package com.example.myapplication

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity

class Main4 : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.layout3)
        val b=findViewById<ImageView>(R.id.imageView4)

        b.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.instagram.com/bcblmi?igsh=MWtyYWJqeGl5ZWwyYw=="))
            startActivity(intent)
        }
        val l=findViewById<ImageView>(R.id.imageView7)

        l.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.instagram.com/lgbtqcenter_bc?igsh=czl0ZzN2dHNkN2U5"))
            startActivity(intent)
        }
        val c=findViewById<ImageView>(R.id.imageView5)

        c.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.instagram.com/bc_caass?igsh=NjVuYWRpYzh3NGh1"))
            startActivity(intent)
        }
        val h=findViewById<ImageView>(R.id.imageView6)

        h.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.instagram.com/bc_healthclinic?igsh=MThoeHd1a3ZnNWR3Ng=="))
            startActivity(intent)
        }
    }
}