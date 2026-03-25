import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { EventItem } from "./eventcard";
import { events } from "../../data/events";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type Props = {
  events: EventItem[];
};

function handleSelectEvent(event: any) {
  const found = events.find(e => e.title === event.title);

  if (found) {
    alert(`
${found.title}

📅 ${found.date} ${found.time || ""}
📍 ${found.location || "TBA"}

${found.description || ""}
`);
  }
} 

export default function EventsCalendar({ events }: Props) {
  const calendarEvents = events
    .filter((event) => event.start !== undefined)
    .map((event) => ({
      title: event.title,
      start: new Date(event.start!),
      end: new Date(event.end || event.start!),
      allDay: false,
      resource: event, // store full object
  }));

  return (
    <div className="events-calendar">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: "#7a1e2c",
            borderRadius: "6px", 
            color: "white",
            border: "none",
          },
        })}
    />
    </div>
  );
}