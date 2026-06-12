import { ElevenLabsClient } from "elevenlabs";

const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });

// ElevenLabs voice IDs mapped to WonderCast voice styles
const voiceMap = {
  "Warm female voice": "ThT5KcBeYPX3keUQqHPh",      // Dorothy
  "Warm male voice": "TX3LPaxmHKxFdv7VOQHJ",          // Liam
  "Animated storyteller": "jBpfuIE2acCO8z3wKNLl",     // Gigi
  "Calm narrator": "tKZElWEODX58dXiptROX",             // Iman
  "Teacher-style guide": "N2lVS1w4EtoT3dr4eOWO",      // Callum
};

const defaultVoiceId = "ThT5KcBeYPX3keUQqHPh"; // Dorothy

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { script, voiceStyle, voiceSpeed = 1.0, voiceExpression = 0.3, voiceEnergy = 0.5 } = req.body;

  if (!script) {
    return res.status(400).json({ error: "script is required" });
  }

  if (script.length > 15000) {
    return res.status(400).json({ error: "Script is too long for audio generation." });
  }

  const voiceId = voiceMap[voiceStyle] || defaultVoiceId;

  try {
    const audioStream = await client.textToSpeech.convert(voiceId, {
      text: script,
      model_id: "eleven_turbo_v2_5",
      output_format: "mp3_44100_128",
      voice_settings: {
        stability: Math.max(0, Math.min(1, 1 - voiceEnergy)),   // energy → inverted stability
        similarity_boost: 0.75,
        style: Math.max(0, Math.min(1, voiceExpression)),
        speed: Math.max(0.7, Math.min(1.3, voiceSpeed)),
        use_speaker_boost: true,
      },
    });

    // Collect stream into buffer
    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", buffer.length);
    res.setHeader("Cache-Control", "public, max-age=3600");
    return res.status(200).send(buffer);
  } catch (error) {
    console.error("TTS error:", error);
    return res.status(500).json({ error: "Failed to generate audio. Please try again." });
  }
}
