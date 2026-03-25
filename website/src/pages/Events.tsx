import { useEffect, useState } from "react";
import EventCard, { type EventItem } from "../components/events/eventcard";
import EventsCalendar from "../components/events/EventsCalendar";
import { getEvents } from "../api/eventsApi";

export default function Events() {
  const [view, setView] = useState<"cards" | "calendar">("cards");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  return (
    <div className="events-page">
      <h1>Events</h1>
      <p>Upcoming events hosted or supported by ISSO.</p>

      <div className="events-controls">
        <button onClick={() => setView("cards")}>Card View</button>
        <button onClick={() => setView("calendar")}>Calendar View</button>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p>{error}</p>
      ) : view === "cards" ? (
        <div className="events-grid">
          {events.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      ) : (
        <EventsCalendar events={events} />
      )}
    </div>
  );
}