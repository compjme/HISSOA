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
        val day: TextView = view.findViewById(R.id.textViewEventDay)
        val month: TextView = view.findViewById(R.id.textViewEventMonth)
        val fullDate: TextView = view.findViewById(R.id.textViewEventFullDate)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EventViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_event, parent, false)
        return EventViewHolder(view)
    }

    override fun onBindViewHolder(holder: EventViewHolder, position: Int) {
        val event = events[position]
        holder.title.text = event.title
        holder.fullDate.text = event.date

        // Extract and format the day with a suffix (e.g., 15th)
        val dateParts = event.date.split(" ", ",")
            .filter { it.isNotBlank() }
            .take(3)

        if (dateParts.size >= 2) {
            val part1 = dateParts[0]
            val part2 = dateParts[1]

            val dayNumStr = if (part1.any { it.isDigit() }) part1.filter { it.isDigit() } 
                            else part2.filter { it.isDigit() }
            
            if (dayNumStr.isNotEmpty()) {
                val dayNum = dayNumStr.toInt()
                val suffix = getDaySuffix(dayNum)
                holder.day.text = "$dayNum$suffix"
                
                val monthStr = if (part1.any { it.isDigit() }) part2 else part1
                holder.month.text = monthStr.take(3).uppercase()
            } else {
                setDefaultDate(holder)
            }
        } else {
            setDefaultDate(holder)
        }

        holder.itemView.setOnClickListener {
            val context = holder.itemView.context
            if (event.url.isNotEmpty()) {
                try {
                    val finalUrl = if (!event.url.startsWith("http://") && !event.url.startsWith("https://")) {
                        "https://" + event.url
                    } else {
                        event.url
                    }
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(finalUrl))
                    context.startActivity(intent)
                } catch (e: Exception) {
                    Toast.makeText(context, "Could not open link", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private fun getDaySuffix(n: Int): String {
        if (n in 11..13) return "th"
        return when (n % 10) {
            1 -> "st"
            2 -> "nd"
            3 -> "rd"
            else -> "th"
        }
    }

    private fun setDefaultDate(holder: EventViewHolder) {
        holder.day.text = "--"
        holder.month.text = "EVENT"
    }

    override fun getItemCount() = events.size
}