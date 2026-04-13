package com.example.myapplication

import android.content.Intent
import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView

class EventsAdapter(private val events: List<Event>) : RecyclerView.Adapter<EventsAdapter.EventViewHolder>() {

    class EventViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val title: TextView = view.findViewById(R.id.textViewEventTitle)
        val date: TextView = view.findViewById(R.id.textViewEventDate)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EventViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_event, parent, false)
        return EventViewHolder(view)
    }

    override fun onBindViewHolder(holder: EventViewHolder, position: Int) {
        val event = events[position]
        holder.title.text = event.title
        holder.date.text = event.date

        holder.itemView.setOnClickListener {
            val context = holder.itemView.context
            if (event.url.isNotEmpty()) {
                try {
                    // Ensure the URL starts with http:// or https://
                    val finalUrl = if (!event.url.startsWith("http://") && !event.url.startsWith("https://")) {
                        "https://" + event.url
                    } else {
                        event.url
                    }
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(finalUrl))
                    context.startActivity(intent)
                } catch (e: Exception) {
                    Toast.makeText(context, "Could not open link: ${e.message}", Toast.LENGTH_SHORT).show()
                }
            } else {
                Toast.makeText(context, "No link available for this event", Toast.LENGTH_SHORT).show()
            }
        }
    }

    override fun getItemCount() = events.size
}