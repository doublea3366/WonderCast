import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { topic, age } = req.body;

  if (!topic || topic.trim().length < 10) {
    return res.status(200).json({ tier: null });
  }

  const prompt = `You are a content reviewer for WonderCast, a children's audio learning app.
Your job is to evaluate whether a topic is suitable and simple enough for a single short audio episode aimed at children ages ${age}.

Evaluate this topic: "${topic}"

Check for these problems:
1. TOO COMPLEX — abstract, academic, or theoretical language a child wouldn't understand (e.g. "socioeconomic paradigms", "geopolitical tension", "quantum superposition")
2. TOO MANY IDEAS — multiple unrelated concepts crammed together (e.g. "dinosaurs and the French Revolution and how computers work")
3. TOO LONG / OVER-SPECIFIED — an extremely specific or detailed prompt that constrains the episode too tightly
4. AGE MISMATCH — topic complexity is clearly inappropriate for the selected age group (e.g. "existential philosophy" for ages 3-4, or "advanced calculus" for ages 5-6)
5. APPROPRIATE — perfectly fine, clear, child-friendly topic

Return ONLY a JSON object in this exact format, no markdown, no explanation:
{
  "tier": null,
  "message": "",
  "suggestion": ""
}

Rules for tier:
- null = topic is fine, no issues
- "warn" = one mild issue — topic is a bit complex or slightly overloaded but workable. Suggest a simpler angle.
- "block" = serious issue — topic is far too complex, too abstract, or has too many unrelated concepts for a single children's episode.

For "warn" and "block", write a short friendly message (1 sentence, no jargon) and a concrete simpler suggestion (e.g. "Try: 'How do volcanoes erupt?' instead").

Keep suggestions short, warm, and child-focused. Never be harsh.`;

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 256,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].text.trim();
    const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
    const result = JSON.parse(cleaned);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Topic check error:", error);
    // Fail open — don't block the user if check fails
    return res.status(200).json({ tier: null });
  }
}
