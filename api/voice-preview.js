import { ElevenLabsClient } from "elevenlabs";

const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });

const PREVIEW_TEXT = "Once upon a time, in a land not too far away, something amazing was about to happen...";

// Known voice IDs — only allow previewing voices we use
const ALLOWED_VOICES = new Set([
  "ThT5KcBeYPX3keUQqHPh", // Dorothy
  "TX3LPaxmHKxFdv7VOQHJ", // Liam
  "jBpfuIE2acCO8z3wKNLl", // Gigi
  "tKZElWEODX58dXiptROX", // Iman
  "N2lVS1w4EtoT3dr4eOWO", // Callum
]);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { voiceId } = req.query;

  if (!voiceId || !ALLOWED_VOICES.has(voiceId)) {
    return res.status(400).json({ error: "Invalid voice ID" });
  }

  try {
    const audioStream = await client.textToSpeech.convert(voiceId, {
      text: PREVIEW_TEXT,
      model_id: "eleven_turbo_v2_5",
      output_format: "mp3_44100_128",
      voice_settings: {
        stability: 0.55,
        similarity_boost: 0.75,
        style: 0.35,
        use_speaker_boost: true,
      },
    });

    const chunks = [];
    for await (const chunk of audioStream) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", buffer.length);
    // Cache for 7 days — previews don't change
    res.setHeader("Cache-Control", "public, max-age=604800, immutable");
    return res.status(200).send(buffer);
  } catch (error) {
    console.error("Voice preview error:", error);
    return res.status(500).json({ error: "Preview unavailable" });
  }
}
