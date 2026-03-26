import axios from "axios";
import type { EventItem } from "../components/events/eventcard";

export async function getEvents(): Promise<EventItem[]> {
  const response = await axios.get("http://localhost:5001/api/events");
  return response.data;
}