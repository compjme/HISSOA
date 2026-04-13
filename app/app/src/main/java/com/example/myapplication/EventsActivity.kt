package com.example.myapplication

import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ProgressBar
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import org.json.JSONArray
import org.json.JSONException

class EventsActivity : AppCompatActivity() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: EventsAdapter
    private lateinit var progressBar: ProgressBar
    private lateinit var swipeRefreshLayout: SwipeRefreshLayout
    private val eventsList = mutableListOf<Event>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_events)

        recyclerView = findViewById(R.id.recyclerViewEvents)
        progressBar = findViewById(R.id.progressBarEvents)
        swipeRefreshLayout = findViewById(R.id.swipeRefreshEvents)

        recyclerView.layoutManager = LinearLayoutManager(this)
        adapter = EventsAdapter(eventsList)
        recyclerView.adapter = adapter

        swipeRefreshLayout.setOnRefreshListener {
            fetchEvents()
        }

        fetchEvents()
    }

    private fun fetchEvents() {
        if (!swipeRefreshLayout.isRefreshing) {
            progressBar.visibility = View.VISIBLE
        }
        
        val url = "https://script.google.com/macros/s/AKfycbw5MQwTeJ5ARfW39EUYLgZDMY0hzExEYCBTrpu3saeetfDOyxdqVmb7-d0s60AdO46wJw/exec"

        val request = StringRequest(
            Request.Method.GET, url,
            { response ->
                Log.d("EVENTS_JSON", response)
                progressBar.visibility = View.GONE
                swipeRefreshLayout.isRefreshing = false
                try {
                    val jsonArray = JSONArray(response)
                    if (jsonArray.length() == 0) {
                        Toast.makeText(this, "No events found", Toast.LENGTH_SHORT).show()
                    } else {
                        parseEvents(jsonArray)
                    }
                } catch (e: JSONException) {
                    Toast.makeText(this, "Data Error: Script didn't return valid JSON", Toast.LENGTH_LONG).show()
                }
            },
            { error ->
                progressBar.visibility = View.GONE
                swipeRefreshLayout.isRefreshing = false
                Toast.makeText(this, "Network Error: ${error.message}", Toast.LENGTH_LONG).show()
            }
        )

        Volley.newRequestQueue(this).add(request)
    }

    private fun parseEvents(jsonArray: JSONArray) {
        eventsList.clear()
        for (i in 0 until jsonArray.length()) {
            try {
                val obj = jsonArray.getJSONObject(i)
                // Use optString("description") as the URL because that's what the JSON contains
                val event = Event(
                    obj.optString("title", "No Title"),
                    obj.optString("date", "No Date"),
                    obj.optString("description", "")
                )
                eventsList.add(event)
            } catch (e: JSONException) {
                Log.e("PARSE_ERROR", e.message ?: "Error parsing event")
            }
        }
        adapter.notifyDataSetChanged()
    }
}