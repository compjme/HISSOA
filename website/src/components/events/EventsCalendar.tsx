import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { EventItem } from "./eventcard";

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

export default function EventsCalendar({ events }: Props) {
  const calendarEvents = events
    .filter((event) => event.start !== undefined)
    .map((event) => ({
      title: event.title,
      start: new Date(event.start!),
      end: new Date(event.end || event.start!),
      allDay: false,
    }));

  return (
    <div className="events-calendar">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}