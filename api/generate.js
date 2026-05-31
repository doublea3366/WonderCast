import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const BLOCKED_TERMS = [
  "sex", "sexual", "porn", "nude", "naked", "rape", "assault", "abuse",
  "incest", "self harm", "suicide", "kill myself", "gore", "graphic violence",
  "murder", "terrorism", "hate speech",
];

function getWordsPerMinute(age) {
  if (age === "3-4" || age === "5-6") return 90;
  if (age === "7-8" || age === "9-10") return 110;
  return 130;
}

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

  const topicLower = topic.toLowerCase();
  if (BLOCKED_TERMS.some((term) => topicLower.includes(term))) {
    return res.status(400).json({
      error: "Topic not allowed",
      detail: "WonderCast cannot generate content on this topic.",
    });
  }

  const minuteCount = parseInt(length) || 5;
  const wpm = getWordsPerMinute(age);
  const wordCount = minuteCount * wpm;

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
  "script": "IMPORTANT: This must be the COMPLETE, FULL spoken audio script — not a summary, not an excerpt. Write every word that will be spoken aloud, from the opening line to the closing line. The script must be approximately ${wordCount} words long. Use natural spoken language only. For ${speakerSetup}, format dialogue clearly with speaker names followed by a colon. Do not shorten or summarize.",
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
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text = message.content[0].text.trim();
    const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
    const parsed = JSON.parse(cleaned);

    return res.status(200).json(parsed);
  } catch (error) {
    console.error("Generation error:", error);
    return res.status(500).json({ error: "Failed to generate episode", detail: error.message });
  }
}
