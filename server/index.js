const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = 5001;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/events", async (req, res) => {
  try {
    const listingUrl = "https://www.clubs.brooklyn.cuny.edu/isso/events/";
    const listingResponse = await axios.get(listingUrl);
    const $ = cheerio.load(listingResponse.data);

    const eventLinks = [];

    $("a").each((index, element) => {
      const text = $(element).text().trim();
      const href = $(element).attr("href");

      if (text && href && href.includes("/ISSO/rsvp?event_uid=")) {
        eventLinks.push({
          title: text,
          href,
        });
      }
    });

    const events = [];

    for (const link of eventLinks) {
      try {
        const detailResponse = await axios.get(link.href);
        const detailPage = cheerio.load(detailResponse.data);

        const title = detailPage("h1").first().text().trim() || link.title;

        const paragraphs = [];
        detailPage("p").each((index, element) => {
          const text = detailPage(element).text().trim();
          if (text) {
            paragraphs.push(text);
          }
        });

        const date = paragraphs.find((text) => text.includes("2026")) || "";
        const time =
          paragraphs.find((text) => text.includes("AM") || text.includes("PM")) || "";
        const location =
          paragraphs.find((text) => text.includes("Location")) || "";
        const hostedBy =
          paragraphs.find((text) => text.startsWith("by ")) || "";
        const categoryParagraph =
            paragraphs.find((text) => text.includes("/")) || "";

        const cleanCategory = categoryParagraph
            .replace(/\s+/g, " ")
            .trim()
            .split(" Free")[0]
            .trim();
        
        
        events.push({
            id: String(events.length + 1),
            title,
            date,
            time,
            location,
            description: "",
            rsvpUrl: link.href,
            tags: cleanCategory ? [cleanCategory] : [],
            
        });
      } catch (detailError) {
        console.error("Error fetching detail page:", link.href, detailError.message);
      }
    }

    res.json(events);
  } catch (error) {
    console.error("Error fetching ISSO events page:", error.message);
    res.status(500).json({ error: "Failed to fetch ISSO events page" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});