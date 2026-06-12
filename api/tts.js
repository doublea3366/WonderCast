import { ElevenLabsClient } from "elevenlabs";

const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });

// ElevenLabs voice IDs mapped to WonderCast voice styles
const voiceMap = {
  "Warm female voice": "EXAVITQu4vr4xnSDxMaL",      // Sarah
  "Warm male voice": "TX3LPaxmHKxFdv7VOQHJ",          // Liam
  "Animated storyteller": "jBpfuIE2acCO8z3wKNLl",     // Gigi
  "Calm narrator": "onwK4e9ZLuTAKqWW03F9",             // Daniel
  "Teacher-style guide": "N2lVS1w4EtoT3dr4eOWO",      // Callum
};

const defaultVoiceId = "EXAVITQu4vr4xnSDxMaL"; // Sarah

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { script, voiceStyle } = req.body;

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
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.3,
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
