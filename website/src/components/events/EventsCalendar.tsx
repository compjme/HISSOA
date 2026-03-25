import type { EventItem } from "./eventcard";

type Props = {
  events: EventItem[];
};

export default function EventsCalendar({ events }: Props) {
  return (
    <div className="events-calendar">
      <h2>Calendar View</h2>
      <p>Calendar integration coming soon.</p>

      <ul className="calendar-list">
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> — {event.date}
            {event.time ? ` (${event.time})` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}