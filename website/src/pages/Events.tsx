import EventCard from "../components/events/eventcard";
import { events } from "../data/events";

export default function Events() {
  return (
    <div className="events-page">
      <h1>Events</h1>
      <p>Upcoming events hosted or supported by ISSO.</p>

      <div className="events-grid">
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}