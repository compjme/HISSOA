package com.example.myapplication

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.DefaultRetryPolicy
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import org.json.JSONObject

class MainActivity2 : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val instagramIcon = findViewById<ImageView>(R.id.imageView)
        val linkedinIcon = findViewById<ImageView>(R.id.imageView2)
        val tiktokIcon = findViewById<ImageView>(R.id.imageView3)

        instagramIcon.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.instagram.com/issobc/"))
            startActivity(intent)
        }
        linkedinIcon.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.linkedin.com/company/brooklyn-college-immigrant-student-success-office/"))
            startActivity(intent)
        }
        tiktokIcon.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.tiktok.com/foryou?lang=en"))
            startActivity(intent)
        }

        val nameEditText = findViewById<EditText>(R.id.editTextText2)
        val emailEditText = findViewById<EditText>(R.id.editTextTextEmailAddress2)
        val phoneEditText = findViewById<EditText>(R.id.editTextPhone2)
        val descriptionEditText = findViewById<EditText>(R.id.editTextText3)
        val submitButton = findViewById<Button>(R.id.button)

        submitButton.setOnClickListener {
            submitButton.isEnabled = false
            
            val url = "https://script.google.com/macros/s/AKfycbw5MQwTeJ5ARfW39EUYLgZDMY0hzExEYCBTrpu3saeetfDOyxdqVmb7-d0s60AdO46wJw/exec"

            val name = nameEditText.text.toString()
            val email = emailEditText.text.toString()
            val phone = phoneEditText.text.toString()
            val description = descriptionEditText.text.toString()

            if (name.isEmpty() || email.isEmpty()) {
                Toast.makeText(this, "Please fill in required fields", Toast.LENGTH_SHORT).show()
                submitButton.isEnabled = true
                return@setOnClickListener
            }

            val jsonObject = JSONObject()
            jsonObject.put("name", name)
            jsonObject.put("email", email)
            jsonObject.put("phone", phone)
            jsonObject.put("description", description)

            val stringRequest = object : StringRequest(
                Request.Method.POST, url,
                { response ->
                    submitButton.isEnabled = true
                    Log.d("GAS_RESPONSE", "Success: $response")
                    Toast.makeText(this, "Inquiry submitted successfully!", Toast.LENGTH_SHORT).show()
                    nameEditText.text.clear()
                    emailEditText.text.clear()
                    phoneEditText.text.clear()
                    descriptionEditText.text.clear()
                },
                { error ->
                    submitButton.isEnabled = true
                    Log.e("GAS_RESPONSE", "Error: ${error.message}")
                    Toast.makeText(this, "Submission failed. Check internet and script deployment.", Toast.LENGTH_LONG).show()
                }
            ) {
                override fun getBodyContentType(): String {
                    return "application/json; charset=utf-8"
                }

                override fun getBody(): ByteArray {
                    return jsonObject.toString().toByteArray(Charsets.UTF_8)
                }
            }

            stringRequest.retryPolicy = DefaultRetryPolicy(30000, 0, DefaultRetryPolicy.DEFAULT_BACKOFF_MULT)
            Volley.newRequestQueue(this).add(stringRequest)
        }
    }
}