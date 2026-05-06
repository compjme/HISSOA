package com.example.myapplication

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.DefaultRetryPolicy
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import org.json.JSONObject
import io.github.jan.supabase.auth.Auth
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch
import io.github.jan.supabase.auth.auth
class LoginActivity : AppCompatActivity() {
    private val supabase = SupabaseClient.client

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        lifecycleScope.launch {
            try {
                supabase.auth.loadFromStorage()
                // If we have a session, maybe skip login? 
                // However, the error mentioned happened during loadSession.
            } catch (e: Exception) {
                // If loading fails (e.g. key not found), we ignore it and let the user log in.
                e.printStackTrace()
            }
        }

        val usernameEditText = findViewById<EditText>(R.id.editTextUsername)
        val passwordEditText = findViewById<EditText>(R.id.editTextPassword)
        val loginButton = findViewById<Button>(R.id.buttonLogin)
        val createAccountButton = findViewById<Button>(R.id.buttonCreateAccount)
        val guestTextView = findViewById<TextView>(R.id.textViewBypass)

        // Replace with your Google Apps Script URL for User Management
        val url = "https://script.google.com/macros/s/AKfycbw5MQwTeJ5ARfW39EUYLgZDMY0hzExEYCBTrpu3saeetfDOyxdqVmb7-d0s60AdO46wJw/exec"

        loginButton.setOnClickListener {
            val username = usernameEditText.text.toString()

            // Mo initially had password I changed it to userPassword
            val userPassword = passwordEditText.text.toString()

            if (username.isNotEmpty() && userPassword.isNotEmpty()) {

                // implementing supabse login username and password.

                lifecycleScope.launch {
                    try {
                        supabase.auth.signInWith(io.github.jan.supabase.auth.providers.builtin.Email) {
                            email = username
                            password = userPassword
                        }
                        Toast.makeText(this@LoginActivity, "Login successful!", Toast.LENGTH_SHORT).show()
                        val intent = Intent(this@LoginActivity, MainActivity::class.java)
                        startActivity(intent)
                        finish()
                    } catch (e: Exception) {
                        e.printStackTrace()
                        Toast.makeText(this@LoginActivity, "Login failed: ${e.localizedMessage ?: "Unknown error"}", Toast.LENGTH_LONG).show()
                    }
                }
            } else {
                Toast.makeText(this, "Please enter username and password", Toast.LENGTH_SHORT).show()
            }
        }

        createAccountButton.setOnClickListener {
            val username = usernameEditText.text.toString()
            val userPassword = passwordEditText.text.toString()

            if (username.isNotEmpty() && userPassword.isNotEmpty()) {

                // Supabase create account username and passoword will go here.
                lifecycleScope.launch {
                    try {
                        supabase.auth.signUpWith(io.github.jan.supabase.auth.providers.builtin.Email) {
                            email = username
                            password = userPassword
                        }
                        Toast.makeText(this@LoginActivity, "Account created successfully! ", Toast.LENGTH_LONG).show()
                    } catch (e: Exception) {
                        e.printStackTrace()
                        Toast.makeText(this@LoginActivity, "Signup failed: ${e.localizedMessage ?: "Unknown error"}", Toast.LENGTH_LONG).show()
                    }
                }

            } else {
                Toast.makeText(this, "Please enter username and password to create account", Toast.LENGTH_SHORT).show()
            }
        }

        guestTextView.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish()
        }
    }

    private fun performAction(action: String, user: String, pass: String, url: String) {
        val jsonObject = JSONObject()
        jsonObject.put("action", action)
        jsonObject.put("username", user)
        jsonObject.put("password", pass)

        val stringRequest = object : StringRequest(
            Request.Method.POST, url,
            { response ->
                if (response == "Success") {
                    if (action == "login") {
                        Toast.makeText(this, "Login successful!", Toast.LENGTH_SHORT).show()
                        val intent = Intent(this, MainActivity::class.java)
                        startActivity(intent)
                        finish()
                    } else {
                        Toast.makeText(this, "Account created! You can now login.", Toast.LENGTH_LONG).show()
                    }
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