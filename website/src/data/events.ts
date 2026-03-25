import type { EventItem } from "../components/events/eventcard";

export const events: EventItem[] = [
  {
    id: "1",
    title: "ISSO Graduation Celebration",
    date: "May 7, 2026",
    time: "5:00 PM – 8:00 PM",
    start: "2026-05-07T17:00:00",
    end: "2026-05-07T20:00:00",
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
    start: "2026-03-24T14:45:00",
    end: "2026-03-24T16:00:00",
    location: "TBA",
    description: "A space for discussion, support, and student voices.",
    tags: ["Workshop"],
  },
];