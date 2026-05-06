package com.example.myapplication

import android.content.Intent
import android.os.Bundle
import android.util.Patterns
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.DefaultRetryPolicy
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.google.android.material.textfield.TextInputEditText
import org.json.JSONObject

class CreateAccountActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_account)

        val usernameET = findViewById<TextInputEditText>(R.id.editTextRegUsername)
        val emailET = findViewById<TextInputEditText>(R.id.editTextRegEmail)
        val passwordET = findViewById<TextInputEditText>(R.id.editTextRegPassword)
        val confirmPasswordET = findViewById<TextInputEditText>(R.id.editTextRegConfirmPassword)
        val registerButton = findViewById<Button>(R.id.buttonRegister)
        val backToLoginTV = findViewById<TextView>(R.id.textViewBackToLogin)

        val url = "https://script.google.com/macros/s/AKfycbw5MQwTeJ5ARfW39EUYLgZDMY0hzExEYCBTrpu3saeetfDOyxdqVmb7-d0s60AdO46wJw/exec"

        registerButton.setOnClickListener {
            val username = usernameET.text.toString().trim()
            val email = emailET.text.toString().trim()
            val password = passwordET.text.toString().trim()
            val confirmPassword = confirmPasswordET.text.toString().trim()

            // Validation
            if (username.isEmpty() || email.isEmpty() || password.isEmpty() || confirmPassword.isEmpty()) {
                Toast.makeText(this, "All fields are required", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                Toast.makeText(this, "Please enter a valid email", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (password.length < 6) {
                Toast.makeText(this, "Password must be at least 6 characters", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (password != confirmPassword) {
                Toast.makeText(this, "Passwords do not match", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            performRegister(username, email, password, url)
        }

        backToLoginTV.setOnClickListener {
            finish()
        }
    }

    private fun performRegister(user: String, email: String, pass: String, url: String) {
        val jsonObject = JSONObject()
        jsonObject.put("action", "create")
        jsonObject.put("username", user)
        jsonObject.put("email", email)
        jsonObject.put("password", pass)

        val stringRequest = object : StringRequest(
            Request.Method.POST, url,
            { response ->
                if (response == "Success") {
                    Toast.makeText(this, "Account created successfully!", Toast.LENGTH_SHORT).show()
                    finish()
                } else {
                    Toast.makeText(this, response, Toast.LENGTH_LONG).show()
                }
            },
            { error ->
                Toast.makeText(this, "Error: ${error.message}", Toast.LENGTH_LONG).show()
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