export type EventItem = {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  rsvpUrl?: string;
  tags?: string[];
};

type Props = {
  event: EventItem;
};

export default function EventCard({ event }: Props) {
  return (
    <div className="event-card">
      <div className="event-top">
        <h3 className="event-title">{event.title}</h3>
        <div className="event-meta">
          <span>{event.date}</span>
          {event.time ? <span>• {event.time}</span> : null}
        </div>
        {event.location ? <div className="event-location">📍 {event.location}</div> : null}
      </div>

      {event.description ? <p className="event-desc">{event.description}</p> : null}

      {event.tags?.length ? (
        <div className="event-tags">
          {event.tags.map((t) => (
            <span key={t} className="event-tag">
              {t}
            </span>
          ))}
        </div>
      ) : null}

      <div className="event-actions">
        {event.rsvpUrl ? (
          <a className="event-btn" href={event.rsvpUrl} target="_blank" rel="noreferrer">
            RSVP
          </a>
        ) : (
          <span className="event-muted">RSVP coming soon</span>
        )}
      </div>
    </div>
  );
}