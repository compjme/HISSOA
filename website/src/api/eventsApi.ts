import { events } from "../data/events";
import type { EventItem } from "../components/events/eventcard";

export async function getEvents(): Promise<EventItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return events;
}