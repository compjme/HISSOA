import EventCard, { type EventItem } from "../components/events/eventcard";

const events: EventItem[] = [
  {
    id: "1",
    title: "ISSO Graduation Celebration",
    date: "May 8, 2026",
    time: "5:00 PM – 8:00 PM",
    location: "Brooklyn College",
    description: "Celebrate our immigrant students and their achievements.",
    rsvpUrl: "https://example.com",
    tags: ["Ceremony", "Community"],
  },
  {
    id: "2",
    title: "Dream Big: Community Conversation",
    date: "Mar 24, 2026",
    time: "2:45 PM",
    location: "Zoom",
    description: "A space for discussion, support, and student voices.",
    tags: ["Workshop"],
  },
];

export default function Events() {
  return (
    <div className="page">
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