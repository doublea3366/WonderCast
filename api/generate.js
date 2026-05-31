import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    topic,
    age,
    format,
    length,
    tone,
    voiceStyle,
    speakerSetup,
    learningDepth,
    energyLevel,
    safetySensitivity,
    situation,
  } = req.body;

  if (!topic || !age) {
    return res.status(400).json({ error: "topic and age are required" });
  }

  const minuteCount = parseInt(length) || 5;
  const wordCount = minuteCount * 130; // ~130 words per minute for kids audio

  const systemPrompt = `You are WonderCast, a children's educational audio content creator. You write age-appropriate, engaging audio scripts for kids. You always use child-safe language, accurate facts, and warm encouraging tones. You never include anything scary, violent, sexual, or inappropriate for children. Your scripts are designed to be read aloud directly — write ONLY spoken words. Never include stage directions, narrator labels, sound effect notes, bracketed instructions, or any text that is not meant to be spoken out loud.`;

  const userPrompt = `Create a children's audio ${format.toLowerCase()} about "${topic}" with these settings:
- Age group: ${age} years old
- Length: ${length} (~${wordCount} words)
- Tone: ${tone}
- Voice setup: ${speakerSetup}
- Voice style: ${voiceStyle}
- Learning depth: ${learningDepth}
- Energy level: ${energyLevel}
- Situation: ${situation}
- Safety level: ${safetySensitivity}

Respond with a JSON object in this exact format:
{
  "title": "A creative, engaging title for this episode",
  "summary": "A 1-2 sentence description of the episode for parents",
  "learningPoints": ["point 1", "point 2", "point 3", "point 4"],
  "script": "The full audio script, written to be read aloud. Use natural spoken language. For ${speakerSetup}, format dialogue clearly. The script should be approximately ${wordCount} words.",
  "details": {
    "type": "${format === "Story" ? "Story Synopsis" : "Lesson Summary"}",
    "sections": [
      { "label": "section name", "value": "section content" }
    ],
    "coveredTitle": "${format === "Story" ? "Information Covered" : "Key Information Covered"}"
  }
}

Only respond with valid JSON. No markdown, no explanation outside the JSON.`;

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text = message.content[0].text.trim();

    // Strip markdown code fences if present
    const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
    const parsed = JSON.parse(cleaned);

    return res.status(200).json(parsed);
  } catch (error) {
    console.error("Generation error:", error);
    return res.status(500).json({ error: "Failed to generate episode", detail: error.message });
  }
}
