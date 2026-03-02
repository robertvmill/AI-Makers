/**
 * Post an update to the AI Makers Luma event.
 *
 * Usage:
 *   npx tsx scripts/luma-update.ts "Your update message here"
 *
 * This updates the event description on Luma with your message
 * appended as a pinned update at the top.
 */

const EVENT_ID = "evt-l1UCBHZXsttngH3";
const API_BASE = "https://public-api.luma.com/v1";

async function getEvent(apiKey: string) {
  const res = await fetch(`${API_BASE}/event/get?id=${EVENT_ID}`, {
    headers: { "x-luma-api-key": apiKey },
  });
  if (!res.ok) throw new Error(`Failed to get event: ${res.status} ${await res.text()}`);
  return res.json();
}

async function updateEvent(apiKey: string, descriptionMd: string) {
  const res = await fetch(`${API_BASE}/event/update`, {
    method: "POST",
    headers: {
      "x-luma-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event_api_id: EVENT_ID,
      description_md: descriptionMd,
    }),
  });
  if (!res.ok) throw new Error(`Failed to update event: ${res.status} ${await res.text()}`);
  return res.json();
}

async function main() {
  const apiKey = process.env.LUMA_API_KEY;
  if (!apiKey) {
    console.error("Error: LUMA_API_KEY not set in environment");
    process.exit(1);
  }

  const message = process.argv.slice(2).join(" ");
  if (!message) {
    console.error("Usage: npx tsx scripts/luma-update.ts \"Your update message\"");
    process.exit(1);
  }

  console.log("Fetching current event...");
  const eventData = await getEvent(apiKey);
  const currentDesc = eventData.event?.description_md || eventData.event?.description || "";

  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "America/Toronto",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const update = `> **Update (${timestamp}):** ${message}`;
  const newDesc = `${update}\n\n---\n\n${currentDesc}`;

  console.log("Posting update...");
  const result = await updateEvent(apiKey, newDesc);
  console.log(`Done! Event "${result.event?.name}" updated.`);
  console.log(`Update: ${message}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
