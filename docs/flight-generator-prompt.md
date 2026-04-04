# Generating Missions with AI

You can use AI assistants like [Claude](https://claude.ai) to generate custom missions for Aerofly FS 4. This guide shows you how to write a prompt that produces valid, importable mission files.

---

## How It Works

You give the AI a prompt describing the mission you want. The AI returns a JSON file that you can import directly into the app. The better your prompt, the more accurate the result.

---

## The Prompt Template

Copy the following prompt and replace the last line with your own mission description:

```
You are a flight plan generator for Aerofly FS 4. Generate flight missions as a JSON array that strictly follows this JSON Schema:
https://raw.githubusercontent.com/fboes/aerofly-custom-missions/refs/heads/main/docs/custom_missions_user.schema.json

Rules:
- Return only valid JSON. No markdown, no code fences, no explanation.
- The JSON must be an array, even if it contains only one mission.
- Use real-world ICAO codes, coordinates, and headings. Do not invent fictional airports.
- `origin` and `destination` coordinates must match the actual airport position.
- Checkpoints must start with type `origin` followed by `departure_runway`, and end with `destination_runway` followed by `destination`.
- All altitudes are in meters above WGS 84 ellipsoid.
- `conditions.time` must be a full ISO 8601 UTC datetime string, e.g. "1987-05-28T11:00:00Z".
- `clouds.cover` is a normalized value between 0 (clear) and 1 (overcast).
- `wind.speed` and `wind.gusts` are in knots. `fuelMass` and `payloadMass` are in kg.
- `callsign` must be uppercased. `aircraft.name` must be lowercased.
- If a filename is requested, used `.aerofly.json` as file suffix.

Now generate the following mission:
[YOUR MISSION DESCRIPTION HERE]
```

---

## Example Requests

Here are some example mission descriptions you can use as the last line:

> Recreate the famous 1987 flight of Matthias Rust from Helsinki-Malmi to Moscow in a Cessna 172.

> A 30-minute Combat Air Patrol over the Baltic Sea as part of NATO Baltic Air Policing, flying an F/A-18 out of Šiauliai Air Base, Lithuania.

> A short VFR sightseeing flight around the San Francisco Bay Area in a Robinson R22, departing from Oakland on a clear summer morning.

> A commercial IFR flight from London Heathrow to Amsterdam Schiphol in an Airbus A320, in typical overcast autumn weather.

The more detail you provide — aircraft type, departure airport, weather mood, time of day, historical context — the better the result.

---

## Step-by-Step with Claude

1. Go to [claude.ai](https://claude.ai) and open a new conversation.
2. Paste the full prompt template above into the message field.
3. Replace `[YOUR MISSION DESCRIPTION HERE]` with your mission idea.
4. Send the message.
5. Claude will reply with a JSON array. Copy the entire JSON response.
6. Save it as a `.json` file, e.g. `my_mission.json`.
7. Import the file into the app.

> **Tip:** If Claude wraps the JSON in a code block (` ```json ... ``` `), copy only the content between the backticks.

---

## Troubleshooting

**The AI returned an explanation instead of pure JSON.**
Add the following to the end of your prompt: _"Reply with the raw JSON only. Do not include any explanation or markdown formatting."_

**The import fails with a validation error.**
Ask the AI to fix it: _"The JSON you generated failed validation. Please check that all required fields are present and that all values match the schema."_

**The airport coordinates look wrong.**
ICAO coordinates are sometimes approximated by AI. You can ask: _"Please double-check the coordinates for [ICAO code] and correct them if necessary."_

**I want multiple missions in one file.**
The format is a JSON array, so you can ask for several at once: _"Generate three missions, each as a separate entry in the JSON array."_

---

## Tips for Better Results

- **Name the aircraft specifically.** "Cessna 172" works better than just "small plane". Known Aerofly FS 4 aircraft identifiers include `c172`, `b737`, `a320`, `fa18`, `r22`.
- **Mention real airports by ICAO code** if you know them, e.g. "departing from EDDH (Hamburg)".
- **Describe the weather in plain language.** "Overcast with low clouds and poor visibility" or "clear skies, strong crosswind" gives the AI enough context to fill in the numeric values correctly.
- **Specify the time of day and season** for realistic lighting and weather conditions.
