import { useEffect, useState } from "react";
import EventCard, { type EventItem } from "../components/events/eventcard";
import EventsCalendar from "../components/events/EventsCalendar";
import { events as initialEvents } from "../data/events";

export default function Events() {
  const [view, setView] = useState<"cards" | "calendar">("cards");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading data
    setTimeout(() => {
      setEvents(initialEvents);
      setLoading(false);
    }, 500);
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