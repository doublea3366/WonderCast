import React, { useMemo, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AppNav from "./components/AppNav.jsx";
import HowItWorksPage from "./pages/HowItWorksPage.jsx";
import ForFamiliesPage from "./pages/ForFamiliesPage.jsx";
import FAQPage from "./pages/FAQPage.jsx";
import {
  BadgeCheck,
  BookOpen,
  Car,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Compass,
  Gauge,
  GraduationCap,
  Headphones,
  Library,
  Moon,
  Pause,
  Play,
  RefreshCw,
  School,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Stars,
  Users,
  Volume2,
  Wand2,
} from "lucide-react";

const ageOptions = ["3-4", "5-6", "7-8", "9-10", "11-12", "13-14", "15-16"];
const lengthOptions = ["3 min", "5 min", "10 min", "15 min"];
const toneOptions = ["Calm", "Playful", "Silly", "Adventurous", "Thoughtful"];
const voiceStyleOptions = [
  "Warm female voice",
  "Warm male voice",
  "Animated storyteller",
  "Calm narrator",
  "Teacher-style guide",
];
const speakerSetupOptions = [
  "One narrator",
  "Two speakers",
  "Narrator + character",
  "Parent-style explainer",
];
const learningDepthOptions = [
  "Light and fun",
  "Balanced",
  "More educational",
  "Deeper dive",
];
const energyLevelOptions = ["Gentle", "Balanced", "High energy"];
const safetySensitivityOptions = [
  "Standard child-safe",
  "Extra gentle",
  "Avoid anything scary",
  "Parent-review recommended",
];

const agePresets = {
  "3-4": {
    situation: "Storytime",
    format: "Story",
    length: "3 min",
    tone: "Calm",
    voiceStyle: "Calm narrator",
    speakerSetup: "One narrator",
    learningDepth: "Light and fun",
    energyLevel: "Gentle",
    safetySensitivity: "Extra gentle",
  },
  "5-6": {
    situation: "Storytime",
    format: "Story",
    length: "5 min",
    tone: "Playful",
    voiceStyle: "Animated storyteller",
    speakerSetup: "Narrator + character",
    learningDepth: "Light and fun",
    energyLevel: "Balanced",
    safetySensitivity: "Standard child-safe",
  },
  "7-8": {
    situation: "Storytime",
    format: "Story",
    length: "5 min",
    tone: "Adventurous",
    voiceStyle: "Animated storyteller",
    speakerSetup: "Narrator + character",
    learningDepth: "Balanced",
    energyLevel: "Balanced",
    safetySensitivity: "Standard child-safe",
  },
  "9-10": {
    situation: "Storytime",
    format: "Story",
    length: "10 min",
    tone: "Adventurous",
    voiceStyle: "Warm male voice",
    speakerSetup: "Two speakers",
    learningDepth: "More educational",
    energyLevel: "Balanced",
    safetySensitivity: "Standard child-safe",
  },
  "11-12": {
    situation: "General Learning",
    format: "Lesson",
    length: "10 min",
    tone: "Thoughtful",
    voiceStyle: "Teacher-style guide",
    speakerSetup: "Parent-style explainer",
    learningDepth: "More educational",
    energyLevel: "Balanced",
    safetySensitivity: "Standard child-safe",
  },
  "13-14": {
    situation: "General Learning",
    format: "Lesson",
    length: "10 min",
    tone: "Thoughtful",
    voiceStyle: "Teacher-style guide",
    speakerSetup: "Two speakers",
    learningDepth: "Deeper dive",
    energyLevel: "Balanced",
    safetySensitivity: "Standard child-safe",
  },
  "15-16": {
    situation: "General Learning",
    format: "Lesson",
    length: "15 min",
    tone: "Thoughtful",
    voiceStyle: "Teacher-style guide",
    speakerSetup: "Two speakers",
    learningDepth: "Deeper dive",
    energyLevel: "Balanced",
    safetySensitivity: "Standard child-safe",
  },
};

const situations = [
  {
    label: "Storytime",
    icon: Stars,
    note: "Imaginative, warm, and story-led.",
  },
  {
    label: "Car Ride",
    icon: Car,
    note: "Energetic, engaging, easy to follow.",
  },
  {
    label: "Bedtime",
    icon: Moon,
    note: "Calm, gentle, never overstimulating.",
  },
  {
    label: "General Learning",
    icon: BookOpen,
    note: "Balanced, curious, and clear.",
  },
  {
    label: "School Help",
    icon: School,
    note: "Clear explanations with examples.",
  },
  {
    label: "Travel Prep",
    icon: Compass,
    note: "Place-based, historical, sensory.",
  },
];

const starterEpisodes = [
  {
    id: 1,
    title: "Dinosaur Detectives",
    topic: "Dinosaurs",
    age: "5-6",
    length: "5 min",
    situation: "Storytime",
    format: "Story",
    tone: "Playful",
    voiceStyle: "Animated storyteller",
    speakerSetup: "Narrator + character",
    learningDepth: "Light and fun",
    energyLevel: "Balanced",
    safetySensitivity: "Standard child-safe",
    date: "Today",
  },
  {
    id: 2,
    title: "Why Rain Falls",
    topic: "Weather",
    age: "7-8",
    length: "5 min",
    situation: "General Learning",
    format: "Lesson",
    tone: "Thoughtful",
    voiceStyle: "Teacher-style guide",
    speakerSetup: "Parent-style explainer",
    learningDepth: "Balanced",
    energyLevel: "Balanced",
    safetySensitivity: "Standard child-safe",
    date: "Yesterday",
  },
  {
    id: 3,
    title: "A Sleepy Trip Around the Moon",
    topic: "Outer space",
    age: "3-4",
    length: "3 min",
    situation: "Bedtime",
    format: "Story",
    tone: "Calm",
    voiceStyle: "Calm narrator",
    speakerSetup: "One narrator",
    learningDepth: "Light and fun",
    energyLevel: "Gentle",
    safetySensitivity: "Extra gentle",
    date: "May 14",
  },
];

const titleStarters = [
  "The Secret Map of",
  "The Tiny Guide to",
  "The Curious Case of",
  "A Gentle Journey Through",
  "The Wonder Trail to",
];

const lessonTitles = [
  "A Clear Guide to",
  "How to Understand",
  "The Big Ideas Behind",
  "A Smart Walk Through",
  "What Kids Should Know About",
];

const topicFacts = {
  "ancient egypt": [
    "The Nile River's role in farming and travel",
    "Pharaohs as rulers",
    "Scribes and recordkeeping",
    "Pyramids and ancient Egyptian beliefs",
  ],
  dinosaurs: [
    "Dinosaurs lived long before people",
    "Fossils help scientists learn about ancient life",
    "Plant-eaters and meat-eaters had different bodies",
    "Paleontologists compare bones, teeth, and footprints",
  ],
  rain: [
    "Warm air can carry water vapor",
    "Clouds form when water vapor cools",
    "Raindrops fall when clouds get heavy",
    "Rain helps plants, rivers, and animals",
  ],
  kindness: [
    "Kind choices can help others feel safe",
    "Listening is one way to show care",
    "Mistakes can be repaired with honest words",
    "Small helpful actions can matter a lot",
  ],
  "outer space": [
    "Earth is one planet in our solar system",
    "The Moon travels around Earth",
    "Stars are faraway suns",
    "Astronauts use careful training and teamwork",
  ],
};

const explicitBlockedTerms = [
  "sex",
  "sexual",
  "porn",
  "nude",
  "naked",
  "rape",
  "assault",
  "abuse",
  "incest",
  "self harm",
  "suicide",
  "kill myself",
  "gore",
  "graphic violence",
  "murder",
  "terrorism",
  "hate speech",
];

const sensitiveUnder16Terms = [
  "war",
  "death",
  "violence",
  "disaster",
  "shooting",
  "blood",
  "weapon",
  "gun",
  "drugs",
  "alcohol",
  "eating disorder",
  "medical advice",
  "legal advice",
  "political persuasion",
  "scary horror",
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.32, ease: "easeOut" },
};

function normalizeTopic(topic) {
  return topic.trim().replace(/\s+/g, " ") || "curiosity";
}

function topicIncludesAny(topic, terms) {
  const lower = topic.toLowerCase();
  return terms.some((term) => lower.includes(term));
}

function getSafetyBlock(settings) {
  if (!settings.topic.trim()) return null;

  if (topicIncludesAny(settings.topic, explicitBlockedTerms)) {
    return {
      title: "WonderCast cannot cover this topic",
      detail:
        "Try a safer, age-appropriate learning topic. WonderCast avoids explicit content, graphic harm, sexual content, self-harm, hate, and other unsafe material.",
    };
  }

  if (topicIncludesAny(settings.topic, sensitiveUnder16Terms)) {
    return {
      title: "WonderCast cannot cover this topic",
      detail:
        "For children and teens under 16, WonderCast avoids sensitive or intense topics. Try reframing this as a calm, general learning question.",
    };
  }

  return null;
}

function getLearningPoints(topic, age) {
  const lower = topic.toLowerCase();
  const match = Object.keys(topicFacts).find((key) => lower.includes(key));

  if (match) return topicFacts[match];

  if (age === "3-4" || age === "5-6") {
    return [
      `Simple words connected to ${topic}`,
      "One clear idea repeated gently",
      "Concrete examples from everyday life",
      "A calm ending that helps the idea stick",
    ];
  }

  if (age === "13-14" || age === "15-16") {
    return [
      `Accurate vocabulary connected to ${topic}`,
      "A clearer structure for causes and effects",
      "Useful comparisons that build context",
      "A thoughtful takeaway for later discussion",
    ];
  }

  return [
    `What ${topic} means in kid-friendly language`,
    "A memorable example from the real world",
    "A simple why-or-how explanation",
    "A gentle recap parents can ask about later",
  ];
}

function makeDraftDetails(settings, topic, learningPoints) {
  if (settings.format === "Lesson") {
    return {
      type: "Lesson Summary",
      sections: [
        {
          label: "Core explanation",
          value: `A clear, age-aware explanation of ${topic} that breaks the idea into friendly steps instead of dense facts.`,
        },
        {
          label: "Key concepts",
          value: learningPoints.slice(0, 3).join("; "),
        },
        {
          label: "Examples used",
          value: `${settings.situation.toLowerCase()} examples, familiar comparisons, and short recap moments shaped for ages ${settings.age}.`,
        },
        {
          label: "What your child should understand",
          value: `The main idea behind ${topic}, why it matters, and one simple way to explain it back.`,
        },
      ],
      coveredTitle: "Key Information Covered",
    };
  }

  return {
    type: "Story Synopsis",
    sections: [
      {
        label: "Main character",
        value: `A curious kid explorer guided by a ${settings.voiceStyle.toLowerCase()}.`,
      },
      {
        label: "Setup",
        value: `The explorer discovers a clue that turns ${topic} into a warm, screen-free adventure.`,
      },
      {
        label: "Adventure arc",
        value: `The character follows discoveries one by one, with ${settings.learningDepth.toLowerCase()} learning woven into each scene.`,
      },
      {
        label: "Resolution",
        value: `The story ends calmly, with the child understanding one memorable idea about ${topic}.`,
      },
      {
        label: "Learning woven into the story",
        value: learningPoints.slice(0, 3).join("; "),
      },
    ],
    coveredTitle: "Information Covered",
  };
}

function makePreview(settings, version = 0) {
  const topic = normalizeTopic(settings.topic);
  const learningPoints = getLearningPoints(topic, settings.age);
  const isStory = settings.format === "Story";
  const title = isStory
    ? `${titleStarters[version % titleStarters.length]} ${topic}`
    : `${lessonTitles[version % lessonTitles.length]} ${topic}`;
  const pace =
    settings.energyLevel === "Gentle"
      ? "gentle"
      : settings.energyLevel === "High energy"
        ? "lively"
        : "balanced";
  const summary = `A ${settings.tone.toLowerCase()} ${settings.length} ${settings.format.toLowerCase()} for ages ${settings.age} about ${topic}, shaped for ${settings.situation.toLowerCase()} with a ${pace} pace and ${settings.learningDepth.toLowerCase()} learning depth.`;

  return {
    title,
    summary,
    learningPoints,
    details: makeDraftDetails(settings, topic, learningPoints),
    script: `Today, we begin with a question: what makes ${topic} worth wondering about? The ${settings.speakerSetup.toLowerCase()} explains one idea at a time, uses safe and age-appropriate language, and leaves room for a parent to continue the conversation later.`,
  };
}

function App() {
  const [view, setView] = useState("create");
  const [settings, setSettings] = useState({
    topic: "",
    age: "7-8",
    ...agePresets["7-8"],
  });
  const [isCreating, setIsCreating] = useState(false);
  const [previewVersion, setPreviewVersion] = useState(0);
  const [preview, setPreview] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [savedEpisodes, setSavedEpisodes] = useState(starterEpisodes);
  const [wizardStep, setWizardStep] = useState(1); // 1 = content, 2 = voice
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [voiceExpression, setVoiceExpression] = useState(0.3);
  const [voiceEnergy, setVoiceEnergy] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioError, setAudioError] = useState(null);
  const [showScript, setShowScript] = useState(false);
  const [previewFromApi, setPreviewFromApi] = useState(false);
  const [previewError, setPreviewError] = useState(null);
  const [complexityCheck, setComplexityCheck] = useState(null);
  const [complexityDismissed, setComplexityDismissed] = useState(false);
  const [showComplexityModal, setShowComplexityModal] = useState(false);
  const complexityTimer = React.useRef(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // Dynamic page title
  React.useEffect(() => {
    const titles = {
      create: "WonderCast — Screen-Free Audio Learning for Curious Kids",
      preview: preview?.title ? `Preview: ${preview.title} — WonderCast` : "Preview — WonderCast",
      listen: episode?.title ? `${episode.title} — WonderCast` : "Listen — WonderCast",
      library: "Your Library — WonderCast",
    };
    document.title = titles[view] || "WonderCast";
  }, [view, preview?.title, episode?.title]);

  // localStorage persistence for saved episodes
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("wondercast_episodes");
      if (stored) setSavedEpisodes(JSON.parse(stored));
    } catch {}
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem("wondercast_episodes", JSON.stringify(savedEpisodes));
    } catch {}
  }, [savedEpisodes]);

  // Revoke blob URLs to prevent memory leaks
  React.useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const topicSafetyBlock = useMemo(() => getSafetyBlock(settings), [settings]);

  function updateSetting(key, value) {
    setSettings((current) => ({ ...current, [key]: value }));
    if (key === "topic") {
      setComplexityDismissed(false);
      setComplexityCheck(null);
      clearTimeout(complexityTimer.current);
      if (value.trim().length > 15) {
        complexityTimer.current = setTimeout(() => {
          checkTopicComplexity(value, settings.age);
        }, 1600);
      }
    }
  }

  async function checkTopicComplexity(topic, age) {
    try {
      const res = await fetch("/api/check-topic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, age }),
      });
      const data = await res.json();
      if (data.tier) {
        setComplexityCheck(data);
        if (data.tier === "block") setShowComplexityModal(true);
      } else {
        setComplexityCheck(null);
      }
    } catch {
      // Fail open
    }
  }

  function updateAge(age) {
    setSettings((current) => ({
      ...current,
      age,
      ...agePresets[age],
    }));
    // Reset complexity check — what's too complex for a 3yo may be fine for a 15yo
    setComplexityCheck(null);
    setComplexityDismissed(false);
    clearTimeout(complexityTimer.current);
  }

  async function createPreview() {
    if (getSafetyBlock(settings)) return;

    // If no check has run yet, run it now and block until complete
    if (!complexityCheck && settings.topic.trim().length > 15) {
      clearTimeout(complexityTimer.current);
      setIsCreating(true);
      try {
        const res = await fetch("/api/check-topic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: settings.topic, age: settings.age }),
        });
        const data = await res.json();
        if (data.tier === "block") {
          setComplexityCheck(data);
          setShowComplexityModal(true);
          setIsCreating(false);
          return;
        }
        if (data.tier === "warn") {
          setComplexityCheck(data);
        }
      } catch {
        // Fail open
      }
      setIsCreating(false);
    }

    // Hard stop on block tier — no proceeding
    if (complexityCheck?.tier === "block") {
      setShowComplexityModal(true);
      return;
    }

    setIsCreating(true);
    setShowScript(false);
    setPreviewError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Generation failed");
      }

      const next = await response.json();
      setPreview(next);
      setPreviewFromApi(true);
      setEpisode(null);
      setView("preview");
    } catch (error) {
      console.error("Failed to generate preview:", error);
      const next = makePreview(settings, previewVersion);
      setPreview(next);
      setPreviewFromApi(false);
      setEpisode(null);
      setView("preview");
    } finally {
      setIsCreating(false);
    }
  }

  async function regeneratePreview() {
    const nextVersion = previewVersion + 1;
    setPreviewVersion(nextVersion);
    setShowScript(false);
    setPreviewError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error("Regeneration failed");
      const next = await response.json();
      setPreview(next);
      setPreviewFromApi(true);
      setPreviewError(null);
    } catch {
      setPreviewError("Couldn't regenerate — please try again.");
    }
  }

  async function generateAudio() {
    if (!preview) return;
    setIsGeneratingAudio(true);

    const nextEpisode = {
      id: Date.now(),
      title: preview.title,
      topic: normalizeTopic(settings.topic),
      age: settings.age,
      length: settings.length,
      situation: settings.situation,
      format: settings.format,
      tone: settings.tone,
      voiceStyle: settings.voiceStyle,
      speakerSetup: settings.speakerSetup,
      learningDepth: settings.learningDepth,
      energyLevel: settings.energyLevel,
      safetySensitivity: settings.safetySensitivity,
      summary: preview.summary,
      date: "Just now",
    };

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script: preview.script, voiceStyle: settings.voiceStyle, voiceSpeed, voiceExpression, voiceEnergy }),
      });

      if (!response.ok) throw new Error("TTS failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setAudioError(null);
    } catch (error) {
      console.error("TTS error:", error);
      setAudioUrl(null);
      setAudioError("Audio couldn't be generated — the script was created but voice synthesis failed. You can try again or go back and regenerate.");
    }

    setEpisode(nextEpisode);
    setIsPlaying(false);
    setIsGeneratingAudio(false);
    setView("listen");
  }

  function saveEpisode() {
    if (!episode) return;
    const alreadySaved = savedEpisodes.some((item) => item.id === episode.id);
    if (!alreadySaved) setSavedEpisodes((current) => [episode, ...current]);
  }

  function createAnother() {
    setPreview(null);
    setEpisode(null);
    setIsPlaying(false);
    setWizardStep(1);
    setView("create");
  }

  return (
    <main className="overflow-hidden bg-[#FCE7CF] text-[#1B203A]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,#E7B05E44_0,transparent_40%),radial-gradient(circle_at_bottom_left,#A7492122_0,transparent_40%),linear-gradient(180deg,#FCE7CF_0%,#f5d8b8_100%)]" />
      <div className="relative mx-auto min-h-screen w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <AppNav />

        <Routes>
          <Route path="/" element={
            <>
              <AnimatePresence mode="wait">
                {view === "create" && (
                  <CreateScreen
                    key="create"
                    settings={settings}
                    updateSetting={updateSetting}
                    updateAge={updateAge}
                    advancedOpen={advancedOpen}
                    setAdvancedOpen={setAdvancedOpen}
                    isCreating={isCreating}
                    topicSafetyBlock={topicSafetyBlock}
                    complexityCheck={complexityCheck}
                    complexityDismissed={complexityDismissed}
                    setComplexityDismissed={setComplexityDismissed}
                    onCreate={createPreview}
                    wizardStep={wizardStep}
                    setWizardStep={setWizardStep}
                    voiceSpeed={voiceSpeed} setVoiceSpeed={setVoiceSpeed}
                    voiceExpression={voiceExpression} setVoiceExpression={setVoiceExpression}
                    voiceEnergy={voiceEnergy} setVoiceEnergy={setVoiceEnergy}
                  />
                )}
                {view === "preview" && preview && (
                  <PreviewScreen
                    key="preview"
                    preview={preview}
                    settings={settings}
                    showScript={showScript}
                    setShowScript={setShowScript}
                    onGenerate={generateAudio}
                    isGeneratingAudio={isGeneratingAudio}
                    previewFromApi={previewFromApi}
                    previewError={previewError}
                    onEdit={() => setView("create")}
                    onRegenerate={regeneratePreview}
                  />
                )}
                {view === "listen" && episode && (
                  <ListenScreen
                    key="listen"
                    episode={episode}
                    audioUrl={audioUrl}
                    audioError={audioError}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    onSave={saveEpisode}
                    saved={savedEpisodes.some((item) => item.id === episode.id)}
                    onCreateAnother={createAnother}
                    onRetryAudio={() => { setView("preview"); setAudioError(null); }}
                  />
                )}
              </AnimatePresence>
              {showComplexityModal && complexityCheck?.tier === "block" && (
                <ComplexityModal
                  check={complexityCheck}
                  onDismiss={() => { setShowComplexityModal(false); setComplexityDismissed(true); }}
                  onEdit={() => setShowComplexityModal(false)}
                />
              )}
            </>
          } />
          <Route path="/library" element={
            <LibraryScreen episodes={savedEpisodes} onCreate={() => {}} />
          } />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/for-families" element={<ForFamiliesPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </div>
    </main>
  );
}

function CreateScreen({
  settings, updateSetting, updateAge,
  advancedOpen, setAdvancedOpen,
  isCreating, topicSafetyBlock,
  complexityCheck, complexityDismissed, setComplexityDismissed,
  onCreate,
  wizardStep, setWizardStep,
  voiceSpeed, setVoiceSpeed,
  voiceExpression, setVoiceExpression,
  voiceEnergy, setVoiceEnergy,
}) {
  const isBlocked = complexityCheck?.tier === "block";
  const canAdvance = settings.topic.trim().length > 1 && !isBlocked && !topicSafetyBlock;

  return (
    <motion.section {...fadeUp} className="pb-10">
      <TopTrustCard />

      {/* Step indicator */}
      <div className="mt-5 mb-6 flex items-center justify-center gap-3">
        {[1, 2].map((s) => (
          <React.Fragment key={s}>
            <button
              onClick={() => s < wizardStep && setWizardStep(s)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition ${
                wizardStep === s
                  ? "bg-[#1B203A] text-white shadow-sm"
                  : s < wizardStep
                  ? "bg-[#E7B05E]/40 text-[#7F3E28] hover:bg-[#E7B05E]/60 cursor-pointer"
                  : "bg-white/50 text-[#A74921]/40 cursor-default"
              }`}
            >
              <span className={`grid size-5 place-items-center rounded-full text-xs ${wizardStep === s ? "bg-white/20" : s < wizardStep ? "bg-[#A74921]/20" : "bg-white/30"}`}>{s}</span>
              {s === 1 ? "Story & Style" : "Voice & Sound"}
            </button>
            {s === 1 && <ChevronRight size={16} className="text-[#A74921]/40 shrink-0" />}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {wizardStep === 1 && (
          <motion.div key="step1" {...fadeUp}>
            <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
              {/* Left — main inputs */}
              <div className="rounded-[34px] border border-[#E7B05E]/30 bg-white/70 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur sm:p-7 lg:p-8">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#E7B05E]/30 px-3 py-1.5 text-sm font-bold text-[#A74921]">
                  <Stars size={16} />
                  Less screen time. More learning. Easier parenting.
                </div>
                <h1 className="text-4xl font-black leading-tight text-balance text-[#1B203A] sm:text-5xl">
                  What should your child learn today?
                </h1>
                <p className="mt-3 text-lg leading-8 text-[#7F3E28]">
                  Pick their age, choose a situation, and type any topic.
                </p>

                <div className="mt-7">
                  <AgeSelector value={settings.age} onChange={updateAge} />
                </div>

                <HeroInput
                  value={settings.topic}
                  onChange={(value) => updateSetting("topic", value)}
                  topicSafetyBlock={topicSafetyBlock}
                  complexityCheck={complexityCheck}
                  complexityDismissed={complexityDismissed}
                  onDismissComplexity={() => setComplexityDismissed(true)}
                />

                <div className="mt-7">
                  <button
                    disabled={!canAdvance}
                    onClick={() => setWizardStep(2)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1B203A] px-6 py-4 text-base font-black text-white shadow-[0_18px_36px_rgba(27,32,58,0.3)] transition hover:bg-[#2a3050] disabled:cursor-not-allowed disabled:bg-[#c7b8a5] sm:w-auto"
                  >
                    Next: Choose a voice <ChevronRight size={20} />
                  </button>
                  <p className="mt-3 text-sm font-medium text-[#7F3E28]">
                    You'll pick a voice and fine-tune the sound in the next step.
                  </p>
                </div>
              </div>

              {/* Right — style controls */}
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormatToggle value={settings.format} onChange={(v) => updateSetting("format", v)} />
                  <LengthSelector value={settings.length} onChange={(v) => updateSetting("length", v)} />
                </div>
                <AdvancedControls
                  settings={settings}
                  updateSetting={updateSetting}
                  open={advancedOpen}
                  setOpen={setAdvancedOpen}
                />
              </div>
            </div>
          </motion.div>
        )}

        {wizardStep === 2 && (
          <motion.div key="step2" {...fadeUp}>
            <div className="grid gap-6 lg:grid-cols-[1fr_0.65fr] lg:items-start">
              {/* Left — voice picker */}
              <div className="rounded-[34px] border border-[#E7B05E]/30 bg-white/70 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur sm:p-7">
                <h2 className="mb-2 text-2xl font-black text-[#1B203A]">Who's telling the story?</h2>
                <p className="mb-7 text-base font-medium text-[#7F3E28]">
                  Press play on any voice to hear a short sample, then pick the one that feels right.
                </p>
                <VoicePickerWithPreview
                  value={settings.voiceStyle}
                  onChange={(v) => updateSetting("voiceStyle", v)}
                />
              </div>

              {/* Right — sliders + generate */}
              <div className="space-y-4">
                <div className="rounded-[28px] border border-[#E7B05E]/30 bg-white/70 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.08)] backdrop-blur">
                  <h3 className="mb-5 font-black text-[#1B203A]">Fine-tune the sound</h3>
                  <div className="space-y-6">
                    <VoiceSlider
                      label="Speed"
                      leftLabel="Slower"
                      rightLabel="Faster"
                      min={0.7} max={1.3} step={0.05}
                      value={voiceSpeed}
                      onChange={setVoiceSpeed}
                      defaultValue={1.0}
                    />
                    <VoiceSlider
                      label="Expression"
                      leftLabel="Calm"
                      rightLabel="Expressive"
                      min={0} max={1} step={0.05}
                      value={voiceExpression}
                      onChange={setVoiceExpression}
                      defaultValue={0.3}
                    />
                    <VoiceSlider
                      label="Energy"
                      leftLabel="Gentle"
                      rightLabel="Energetic"
                      min={0} max={1} step={0.05}
                      value={voiceEnergy}
                      onChange={setVoiceEnergy}
                      defaultValue={0.5}
                    />
                  </div>
                </div>

                <div className="rounded-[28px] border border-[#E7B05E]/30 bg-white/70 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.08)] backdrop-blur">
                  <CreateButton
                    disabled={isCreating}
                    isCreating={isCreating}
                    onClick={onCreate}
                  />
                  <button
                    onClick={() => setWizardStep(1)}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f5d8b8] px-5 py-3 text-sm font-black text-[#7F3E28] transition hover:bg-[#E7B05E]/40"
                  >
                    ← Back to story settings
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function TopTrustCard() {
  return (
    <section className="rounded-[28px] border border-[#E7B05E]/40 bg-gradient-to-r from-[#FCE7CF]/90 via-white/80 to-[#FCE7CF]/90 p-4 shadow-[0_18px_70px_rgba(0,0,0,0.3)] backdrop-blur">
      <div className="flex gap-3">
        <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#E7B05E]/30 text-[#A74921] shadow-sm">
          <ShieldCheck size={22} />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.12em] text-[#A74921]">
            Child-safe and parent-approved by design:
          </p>
          <p className="mt-1 text-sm font-bold leading-6 text-[#7F3E28] sm:text-base">
            Language that is appropriate for children based on their age, strict
            child-safe content guidelines, safeguards for explicit and sensitive
            topics, and fact-aware drafts before audio is created.
          </p>
        </div>
      </div>
    </section>
  );
}

function HeroInput({ value, onChange, topicSafetyBlock, complexityCheck, complexityDismissed, onDismissComplexity }) {
  const showWarn = complexityCheck?.tier === "warn" && !complexityDismissed;
  const showBlock = complexityCheck?.tier === "block" && !complexityDismissed;

  return (
    <div className="mt-8">
      <label className="mb-3 block text-sm font-black uppercase tracking-[0.12em] text-[#7F3E28]">
        Topic
      </label>
      <div className={`rounded-[26px] border bg-[#E7B05E]/40 p-3 shadow-inner shadow-[#A74921]/20 transition ${showBlock ? "border-orange-500" : "border-[#A74921]"}`}>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Dinosaurs, Ancient Egypt, how rain works, kindness, outer space..."
          className="min-h-28 w-full resize-none rounded-[20px] bg-transparent p-3 text-2xl font-bold leading-snug text-[#1B203A] outline-none placeholder:text-[#7F3E28]/60 sm:text-3xl"
        />
      </div>

      {topicSafetyBlock && (
        <div className="mt-3 flex gap-3 rounded-2xl border border-red-400/40 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
          <ShieldAlert className="mt-0.5 shrink-0" size={19} />
          <div>
            <p className="font-black">{topicSafetyBlock.title}</p>
            <p className="mt-1">{topicSafetyBlock.detail}</p>
          </div>
        </div>
      )}

      {showWarn && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-start gap-3 rounded-2xl border border-[#E7B05E] bg-[#E7B05E]/20 p-4"
        >
          <span className="mt-0.5 text-xl">💡</span>
          <div className="flex-1">
            <p className="text-sm font-black text-[#7F3E28]">{complexityCheck.message}</p>
            <p className="mt-1 text-sm font-semibold text-[#A74921]">{complexityCheck.suggestion}</p>
          </div>
          <button
            onClick={onDismissComplexity}
            className="shrink-0 rounded-full px-3 py-1.5 text-xs font-black text-[#7F3E28] hover:bg-[#A74921]/10 transition"
          >
            Dismiss
          </button>
        </motion.div>
      )}

      {showBlock && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-start gap-3 rounded-2xl border border-orange-400 bg-orange-50 p-4"
        >
          <span className="mt-0.5 text-xl">🎯</span>
          <div className="flex-1">
            <p className="text-sm font-black text-orange-800">{complexityCheck.message}</p>
            <p className="mt-1 text-sm font-semibold text-orange-700">{complexityCheck.suggestion}</p>
            <p className="mt-2 text-xs font-semibold text-orange-600">Please simplify your topic to continue.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

const voiceProfiles = [
  {
    id: "Warm female voice",
    emoji: "👩",
    label: "Dorothy",
    description: "Warm, British, inviting",
    bestFor: "All ages, bedtime",
  },
  {
    id: "Warm male voice",
    emoji: "👨",
    label: "Warm & Steady",
    description: "Calm, trustworthy, grounding",
    bestFor: "Ages 7+, lessons",
  },
  {
    id: "Animated storyteller",
    emoji: "🎭",
    label: "Storyteller",
    description: "Expressive, playful, engaging",
    bestFor: "Ages 3–10, stories",
  },
  {
    id: "Calm narrator",
    emoji: "🎙️",
    label: "Iman",
    description: "Soothing, measured, gentle",
    bestFor: "Bedtime, relaxation",
  },
  {
    id: "Teacher-style guide",
    emoji: "🎓",
    label: "Teacher",
    description: "Clear, encouraging, structured",
    bestFor: "Ages 10+, school help",
  },
];

function VoiceSelector({ value, onChange }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <div className="grid size-9 place-items-center rounded-xl bg-[#E7B05E]/30 text-[#A74921]">
          <Volume2 size={17} />
        </div>
        <div>
          <p className="font-black text-[#1B203A]">Narrator voice</p>
          <p className="text-sm font-medium text-[#7F3E28]">Pick who tells the story.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {voiceProfiles.map(({ id, emoji, label, description, bestFor }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition ${
              value === id
                ? "border-[#A74921] bg-[#A74921]/10 shadow-sm"
                : "border-[#E7B05E]/40 bg-[#f5d8b8]/40 hover:bg-white"
            }`}
          >
            <span className="text-2xl">{emoji}</span>
            <span className={`text-xs font-black ${value === id ? "text-[#A74921]" : "text-[#1B203A]"}`}>{label}</span>
            <span className="text-[10px] font-semibold leading-tight text-[#7F3E28]">{description}</span>
            <span className={`mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-black ${value === id ? "bg-[#A74921] text-white" : "bg-[#E7B05E]/30 text-[#7F3E28]"}`}>{bestFor}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Maps voice style label → ElevenLabs voice ID (must match api/tts.js)
const voiceIdMap = {
  "Warm female voice":    "ThT5KcBeYPX3keUQqHPh", // Dorothy
  "Warm male voice":      "TX3LPaxmHKxFdv7VOQHJ", // Liam
  "Animated storyteller": "jBpfuIE2acCO8z3wKNLl", // Gigi
  "Calm narrator":        "tKZElWEODX58dXiptROX",  // Iman
  "Teacher-style guide":  "N2lVS1w4EtoT3dr4eOWO",  // Callum
};

function VoicePickerWithPreview({ value, onChange }) {
  const [playingId, setPlayingId] = React.useState(null);
  const [loadingId, setLoadingId] = React.useState(null);
  const audioRefs = React.useRef({});

  async function handlePreview(voiceStyleId) {
    const voiceId = voiceIdMap[voiceStyleId];
    if (!voiceId) return;

    // Stop any currently playing
    Object.values(audioRefs.current).forEach(a => { if (a) { a.pause(); a.currentTime = 0; } });

    if (playingId === voiceStyleId) {
      setPlayingId(null);
      return;
    }

    setLoadingId(voiceStyleId);
    try {
      const res = await fetch(`/api/voice-preview?voiceId=${voiceId}`);
      if (!res.ok) throw new Error("Preview failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRefs.current[voiceStyleId] = audio;
      audio.onended = () => setPlayingId(null);
      audio.play();
      setPlayingId(voiceStyleId);
    } catch {
      // Fail silently
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {voiceProfiles.map(({ id, emoji, label, description, bestFor }) => {
        const isSelected = value === id;
        const isPlaying = playingId === id;
        const isLoading = loadingId === id;

        return (
          <div
            key={id}
            onClick={() => onChange(id)}
            className={`group relative flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
              isSelected
                ? "border-[#A74921] bg-[#A74921]/10 shadow-sm"
                : "border-[#E7B05E]/40 bg-[#f5d8b8]/20 hover:bg-white hover:border-[#E7B05E]"
            }`}
          >
            {/* Selected indicator */}
            <div className={`absolute right-3 top-3 grid size-5 place-items-center rounded-full transition ${isSelected ? "bg-[#A74921]" : "bg-transparent border border-[#E7B05E]/40"}`}>
              {isSelected && <Check size={11} className="text-white" />}
            </div>

            {/* Emoji + info */}
            <div className="flex flex-col items-center gap-1 w-10 shrink-0">
              <span className="text-3xl">{emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-black ${isSelected ? "text-[#A74921]" : "text-[#1B203A]"}`}>{label}</p>
              <p className="text-xs font-semibold text-[#7F3E28]">{description}</p>
              <p className={`mt-1 text-[10px] font-black rounded-full inline-block px-2 py-0.5 ${isSelected ? "bg-[#A74921] text-white" : "bg-[#E7B05E]/30 text-[#7F3E28]"}`}>{bestFor}</p>
            </div>

            {/* Play button */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePreview(id); }}
              aria-label={isPlaying ? `Stop ${label} preview` : `Preview ${label} voice`}
              className={`shrink-0 grid size-10 place-items-center rounded-full border-2 transition ${
                isPlaying
                  ? "border-[#A74921] bg-[#A74921] text-white"
                  : "border-[#E7B05E] bg-white text-[#A74921] hover:bg-[#A74921] hover:text-white hover:border-[#A74921]"
              }`}
            >
              {isLoading ? (
                <RefreshCw size={14} className="animate-spin" />
              ) : isPlaying ? (
                <Pause size={14} fill="currentColor" />
              ) : (
                <Play size={14} fill="currentColor" />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function VoiceSlider({ label, leftLabel, rightLabel, min, max, step, value, onChange, defaultValue }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-black text-[#1B203A]">{label}</p>
        <button
          onClick={() => onChange(defaultValue)}
          className="text-[10px] font-black text-[#A74921]/60 hover:text-[#A74921] transition"
        >
          Reset
        </button>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #A74921 ${pct}%, #E7B05E40 ${pct}%)`,
        }}
      />
      <div className="mt-1.5 flex justify-between text-xs font-semibold text-[#7F3E28]">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

function AgeSelector({ value, onChange }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <div className="grid size-9 place-items-center rounded-xl bg-[#E7B05E]/30 text-[#A74921]">
          <Sparkles size={17} />
        </div>
        <div>
          <p className="font-black text-[#1B203A]">Child age</p>
          <p className="text-sm font-medium text-[#7F3E28]">Sets tone, vocabulary and learning depth automatically.</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 min-[420px]:grid-cols-7">
        {ageOptions.map((age) => (
          <button
            key={age}
            onClick={() => onChange(age)}
            className={`rounded-2xl px-2 py-3.5 text-center text-sm font-black transition ${
              value === age
                ? "bg-[#A74921] text-white shadow-[0_10px_22px_rgba(232,130,12,0.4)]"
                : "bg-[#f5d8b8] text-[#7F3E28] hover:bg-white"
            }`}
          >
            {age}
          </button>
        ))}
      </div>
    </div>
  );
}

function FormatToggle({ value, onChange }) {
  return (
    <ControlPanel icon={BookOpen} title="Format">
      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-[#A74921] bg-[#E7B05E]/40 p-1.5">
        {["Story", "Lesson"].map((format) => (
          <button
            key={format}
            onClick={() => onChange(format)}
            className={`rounded-xl px-4 py-3 text-sm font-black transition ${
              value === format ? "bg-white shadow-sm" : "text-[#7F3E28]"
            }`}
          >
            {format}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm font-medium leading-6 text-[#7F3E28]">
        Story wraps facts in a narrative. Lesson explains directly.
      </p>
    </ControlPanel>
  );
}

function LengthSelector({ value, onChange }) {
  return (
    <ControlPanel icon={Clock3} title="Length">
      <div className="grid grid-cols-2 gap-2">
        {lengthOptions.map((length) => (
          <button
            key={length}
            onClick={() => onChange(length)}
            className={`rounded-2xl px-3 py-3 text-sm font-black transition ${
              value === length
                ? "bg-[#A74921] text-white shadow-sm"
                : "bg-[#f5d8b8] text-[#7F3E28] hover:bg-white"
            }`}
          >
            {length}
          </button>
        ))}
      </div>
    </ControlPanel>
  );
}

function AdvancedControls({ settings, updateSetting, open, setOpen }) {
  return (
    <section className="rounded-[28px] border border-[#E7B05E]/30 bg-white/70 p-4 shadow-[0_16px_60px_rgba(0,0,0,0.3)] backdrop-blur">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-[#E7B05E]/30 text-[#A74921]">
            <SlidersHorizontal size={20} />
          </span>
          <span>
            <span className="block font-black">Advanced Controls</span>
            <span className="mt-1 block text-sm font-medium leading-5 text-[#7F3E28]">
              Fine-tune voice, tone, situation, and learning style.
            </span>
          </span>
        </span>
        <ChevronDown
          className={`shrink-0 text-[#7F3E28] transition ${open ? "rotate-180" : ""}`}
          size={22}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4 border-t border-[#E7B05E]/30 pt-4">
              <SituationSelector
                value={settings.situation}
                onChange={(value) => updateSetting("situation", value)}
              />
              <OptionPills
                icon={Wand2}
                title="Tone"
                options={toneOptions}
                value={settings.tone}
                onChange={(value) => updateSetting("tone", value)}
              />

              <OptionPills
                icon={Users}
                title="Speaker setup"
                options={speakerSetupOptions}
                value={settings.speakerSetup}
                onChange={(value) => updateSetting("speakerSetup", value)}
              />
              <OptionPills
                icon={GraduationCap}
                title="Learning depth"
                options={learningDepthOptions}
                value={settings.learningDepth}
                onChange={(value) => updateSetting("learningDepth", value)}
              />
              <OptionPills
                icon={Gauge}
                title="Energy level"
                options={energyLevelOptions}
                value={settings.energyLevel}
                onChange={(value) => updateSetting("energyLevel", value)}
              />
              <OptionPills
                icon={ShieldCheck}
                title="Safety sensitivity"
                options={safetySensitivityOptions}
                value={settings.safetySensitivity}
                onChange={(value) => updateSetting("safetySensitivity", value)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function SituationSelector({ value, onChange }) {
  return (
    <MiniPanel icon={Compass} title="Situation">
      <div className="grid gap-2 sm:grid-cols-2">
        {situations.map(({ label, icon: Icon, note }) => (
          <button
            key={label}
            onClick={() => onChange(label)}
            className={`flex items-start gap-3 rounded-2xl border p-3 text-left transition ${
              value === label
                ? "border-[#A74921] bg-[#E7B05E]/30 shadow-sm"
                : "border-white/10 bg-[#f5d8b8] hover:bg-white"
            }`}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-[#d66b3f]">
              <Icon size={20} />
            </span>
            <span>
              <span className="block font-black">{label}</span>
              <span className="mt-1 block text-sm font-medium leading-5 text-[#7F3E28]">
                {note}
              </span>
            </span>
          </button>
        ))}
      </div>
    </MiniPanel>
  );
}

function OptionPills({ icon: Icon, title, options, value, onChange }) {
  return (
    <MiniPanel icon={Icon} title={title}>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`rounded-full px-4 py-2.5 text-sm font-black transition ${
              value === option
                ? "bg-[#f47b5d] text-white shadow-sm"
                : "bg-[#f5d8b8] text-[#7F3E28] hover:bg-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </MiniPanel>
  );
}

function ControlPanel({ icon: Icon, title, description, children }) {
  return (
    <section className="rounded-[26px] border border-[#E7B05E]/30 bg-white/70 p-4 shadow-[0_16px_60px_rgba(0,0,0,0.3)] backdrop-blur">
      <div className="mb-3 flex items-start gap-3">
        <div className="grid size-10 place-items-center rounded-2xl bg-[#E7B05E]/30 text-[#A74921]">
          <Icon size={19} />
        </div>
        <div>
          <h2 className="font-black">{title}</h2>
          {description && (
            <p className="mt-1 text-sm font-medium leading-5 text-[#7F3E28]">
              {description}
            </p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

function MiniPanel({ icon: Icon, title, children }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-black text-[#7F3E28]">
        <Icon size={16} />
        {title}
      </div>
      {children}
    </div>
  );
}

function CreateButton({ disabled, isCreating, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#1B203A] px-6 py-4 text-base font-black text-white shadow-[0_18px_36px_rgba(27,32,58,0.3)] transition hover:bg-[#f5d8b8] disabled:cursor-not-allowed disabled:bg-[#c7b8a5] sm:w-auto"
    >
      {isCreating ? (
        <>
          <RefreshCw className="animate-spin" size={20} />
          Creating preview...
        </>
      ) : (
        <>
          <Sparkles size={20} />
          Create Audio
        </>
      )}
    </button>
  );
}

function PreviewScreen({
  preview,
  settings,
  showScript,
  setShowScript,
  onGenerate,
  isGeneratingAudio,
  previewFromApi,
  previewError,
  onEdit,
  onRegenerate,
}) {
  return (
    <motion.section {...fadeUp} className="mx-auto max-w-5xl pb-10">
      <EpisodePreviewCard preview={preview} settings={settings} />
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[28px] border border-[#E7B05E]/30 bg-white/70 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.35)]">
          <FactAwareDraft preview={preview} />
          <LearningPoints
            title={preview.details.coveredTitle}
            points={preview.learningPoints}
          />
          <button
            onClick={() => setShowScript(!showScript)}
            className="mt-5 rounded-2xl bg-[#1B203A] px-4 py-2.5 text-sm font-black text-[#A74921]"
          >
            {showScript ? "Hide script excerpt" : "View full script"}
          </button>
          {showScript && (
            <p className="mt-4 rounded-2xl bg-[#f5d8b8] p-4 text-sm font-semibold leading-7 text-[#7F3E28]">
              {preview.script}
            </p>
          )}
        </div>
        <div className="space-y-3">
          <SafetyNote />
          <div className="rounded-[28px] border border-[#E7B05E]/30 bg-white/70 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.35)]">
            {previewFromApi ? (
              <button
                onClick={onGenerate}
                disabled={isGeneratingAudio}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1B203A] px-5 py-4 font-black text-white shadow-sm disabled:bg-[#c7b8a5] disabled:cursor-not-allowed"
              >
                {isGeneratingAudio ? (
                  <><RefreshCw className="animate-spin" size={18} /> Generating audio...</>
                ) : (
                  <>Generate Audio <ChevronRight size={18} /></>
                )}
              </button>
            ) : (
              <div className="rounded-2xl bg-[#f5d8b8] px-5 py-4 text-center text-sm font-semibold text-[#7F3E28]">
                Preview couldn't be generated — please try again.
              </div>
            )}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={onEdit}
                className="rounded-2xl bg-[#f5d8b8] px-4 py-3 text-sm font-black text-[#A74921]"
              >
                Edit Topic
              </button>
              <button
                onClick={onRegenerate}
                className="rounded-2xl bg-[#f5d8b8] px-4 py-3 text-sm font-black text-[#A74921]"
              >
                Regenerate
              </button>
            </div>
            {previewError && (
              <p className="mt-2 text-center text-xs font-semibold text-red-400">
                {previewError}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function EpisodePreviewCard({ preview, settings }) {
  return (
    <article className="rounded-[34px] border border-white/80 bg-white/78 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.4)] backdrop-blur sm:p-8">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#e4f7fb] px-3 py-1.5 text-sm font-black text-[#27606c]">
        <BadgeCheck size={16} />
        Fact-aware draft
      </div>
      <h1 className="text-4xl font-black leading-tight text-balance sm:text-5xl">
        {preview.title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#7F3E28]">
        {preview.summary}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Tag>Ages {settings.age}</Tag>
        <Tag>{settings.length}</Tag>
        <Tag>{settings.situation}</Tag>
        <Tag>{settings.format}</Tag>
        <Tag>{settings.tone}</Tag>
        <Tag>{settings.voiceStyle}</Tag>
      </div>
      <p className="mt-5 rounded-2xl bg-[#f5d8b8] p-4 text-sm font-semibold leading-6 text-[#7F3E28]">
        Designed to use child-appropriate, commonly validated information.
        Source grounding will be added in a future version.
      </p>
    </article>
  );
}

function FactAwareDraft({ preview }) {
  return (
    <section className="mb-5 rounded-[24px] border border-white/10 bg-[#f5d8b8] p-4">
      <div className="mb-4 flex items-center gap-2">
        <BadgeCheck size={18} className="text-[#A74921]" />
        <h2 className="text-xl font-black">{preview.details.type}</h2>
      </div>
      <div className="space-y-3">
        {preview.details.sections.map((section) => (
          <div key={section.label}>
            <p className="text-sm font-black text-[#A74921]">
              {section.label}:
            </p>
            <p className="mt-1 font-semibold leading-7 text-[#7F3E28]">
              {section.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LearningPoints({ title = "What your child will learn", points }) {
  return (
    <div>
      <h2 className="text-xl font-black">{title}</h2>
      <div className="mt-4 grid gap-3">
        {points.map((point) => (
          <div key={point} className="flex gap-3 rounded-2xl bg-[#f5d8b8] p-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#d4edda] text-[#2d6a4f]">
              <Check size={16} />
            </span>
            <p className="font-semibold leading-6 text-[#7F3E28]">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListenScreen({
  episode,
  audioUrl,
  audioError,
  isPlaying,
  setIsPlaying,
  onSave,
  saved,
  onCreateAnother,
  onRetryAudio,
}) {
  return (
    <motion.section {...fadeUp} className="mx-auto max-w-5xl pb-10">
      {audioError && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl border border-red-300 bg-red-50 p-4">
          <ShieldAlert className="mt-0.5 shrink-0 text-red-500" size={19} />
          <div className="flex-1">
            <p className="text-sm font-black text-red-700">Audio generation failed</p>
            <p className="mt-1 text-sm font-semibold text-red-600">{audioError}</p>
          </div>
          <button onClick={onRetryAudio} className="shrink-0 rounded-full bg-red-100 px-3 py-1.5 text-xs font-black text-red-700 hover:bg-red-200 transition">
            Try again
          </button>
        </div>
      )}
      <AudioPlayerCard
        episode={episode}
        audioUrl={audioUrl}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.65fr]">
        <article className="rounded-[28px] border border-[#E7B05E]/30 bg-white/70 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.35)]">
          <h2 className="text-xl font-black">Parent summary</h2>
          <p className="mt-3 text-base font-medium leading-8 text-[#7F3E28]">
            {episode.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Tag>{episode.voiceStyle}</Tag>
            <Tag>{episode.speakerSetup}</Tag>
            <Tag>{episode.learningDepth}</Tag>
            <Tag>{episode.safetySensitivity}</Tag>
          </div>
        </article>
        <div className="rounded-[28px] border border-[#E7B05E]/30 bg-white/70 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.35)]">
          <button
            onClick={onSave}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 font-black shadow-sm ${
              saved ? "bg-[#d4edda] text-[#2d6a4f]" : "bg-[#1B203A] text-white"
            }`}
          >
            <Library size={18} />
            {saved ? "Saved to Library" : "Save Episode"}
          </button>
          <button
            onClick={onCreateAnother}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f5d8b8] px-5 py-4 font-black text-[#A74921]"
          >
            <Sparkles size={18} />
            Create another
          </button>
        </div>
      </div>
    </motion.section>
  );
}

const BAR_COUNT = 42;
const BAR_HEIGHTS = Array.from({ length: BAR_COUNT }, (_, i) => 22 + ((i * 13) % 48));

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function AudioPlayerCard({ episode, audioUrl, isPlaying, setIsPlaying }) {
  const audioRef = React.useRef(null);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
    return () => { audio.pause(); };
  }, [isPlaying]);

  function handleSeek(e) {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = ratio * duration;
    setCurrentTime(ratio * duration);
  }

  const progress = duration ? currentTime / duration : 0;
  const activeBars = Math.round(progress * BAR_COUNT);

  return (
    <article className="rounded-[36px] border border-white/80 bg-[#1B203A] p-6 text-white shadow-[0_28px_90px_rgba(0,0,0,0.5)] sm:p-8">
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => { setIsPlaying(false); setCurrentTime(0); }}
          onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        />
      )}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-sm font-black text-[#A74921]">
            <Headphones size={16} />
            Ready to listen
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-tight text-balance sm:text-5xl">
            {episode.title}
          </h1>
          <p className="mt-3 text-lg leading-8 text-[#7F3E28]">
            A {episode.tone.toLowerCase()} {episode.length}{" "}
            {episode.format.toLowerCase()} for ages {episode.age} about{" "}
            {episode.topic}.
          </p>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause episode" : "Play episode"}
          className="grid size-20 shrink-0 place-items-center rounded-full bg-[#A74921] text-[#1B203A] shadow-[0_16px_40px_rgba(231,176,94,0.5)]"
        >
          {isPlaying ? (
            <Pause size={32} fill="currentColor" />
          ) : (
            <Play size={32} fill="currentColor" />
          )}
        </button>
      </div>

      <div className="mt-8 rounded-[28px] bg-white/10 p-4">
        <div
          className="mb-4 flex h-20 cursor-pointer items-end gap-1.5"
          onClick={handleSeek}
        >
          {BAR_HEIGHTS.map((height, index) => (
            <span
              key={index}
              className="flex-1 rounded-full transition-all duration-75"
              style={{
                height: `${height}%`,
                backgroundColor: index < activeBars ? "#E7B05E" : "#E7B05E",
                opacity: index < activeBars ? 1 : isPlaying && index === activeBars ? 1 : 0.35,
                transform: isPlaying && index === activeBars ? "scaleY(1.2)" : "scaleY(1)",
                transformOrigin: "bottom",
              }}
            />
          ))}
        </div>
        <div className="h-2 cursor-pointer overflow-hidden rounded-full bg-white/20" onClick={handleSeek}>
          <div
            className="h-full rounded-full bg-[#A74921] transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-sm font-bold text-[#7F3E28]">
          <span>{formatTime(currentTime)}</span>
          <span>{duration ? formatTime(duration) : episode.length}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Tag dark>Ages {episode.age}</Tag>
        <Tag dark>{episode.situation}</Tag>
        <Tag dark>{episode.format}</Tag>
        <Tag dark>{episode.tone}</Tag>
        <Tag dark>{episode.energyLevel}</Tag>
      </div>
    </article>
  );
}

function LibraryScreen({ episodes }) {
  return (
    <motion.section {...fadeUp} className="pb-10">
      <div className="mb-6 flex flex-col justify-between gap-4 rounded-[34px] border border-[#E7B05E]/30 bg-white/70 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.4)] sm:flex-row sm:items-end sm:p-8">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E7B05E]/30 px-3 py-1.5 text-sm font-black text-[#A74921]">
            <Library size={16} />
            Saved for later
          </div>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl">
            Your family audio shelf
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-[#7F3E28]">
            Keep favourite stories, lessons, and calm learning moments ready for
            the next ride, bedtime, or burst of curiosity.
          </p>
        </div>
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1B203A] px-5 py-4 font-black text-white transition hover:bg-[#2a3050]"
        >
          <Sparkles size={18} />
          Create new
        </a>
      </div>
      <LibraryGrid episodes={episodes} />
    </motion.section>
  );
}

function LibraryGrid({ episodes }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {episodes.map((episode) => (
        <SavedEpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  );
}

function SavedEpisodeCard({ episode }) {
  return (
    <article className="rounded-[28px] border border-[#E7B05E]/30 bg-white/70 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="grid size-12 place-items-center rounded-2xl bg-[#E7B05E]/30 text-[#A74921]">
          <Play size={21} fill="currentColor" />
        </div>
        <span className="rounded-full bg-[#E7B05E]/30 px-3 py-1 text-xs font-black text-[#A74921]">
          {episode.date}
        </span>
      </div>
      <h2 className="text-2xl font-black leading-tight">{episode.title}</h2>
      <p className="mt-1 text-xs font-medium text-[#A74921]/50">Tap to replay coming soon</p>
      <p className="mt-2 text-sm font-bold text-[#7F3E28]">{episode.topic}</p>
      <p className="mt-4 text-sm font-semibold leading-6 text-[#7F3E28]">
        Ages {episode.age} · {episode.length} · {episode.situation} ·{" "}
        {episode.format}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6 text-[#7F3E28]">
        {episode.voiceStyle || "Warm narrator"} ·{" "}
        {episode.learningDepth || "Balanced"}
      </p>
    </article>
  );
}

function SafetyNote() {
  return (
    <section className="rounded-[26px] border border-green-300/60 bg-[#d4edda] p-4 text-[#2d6a4f] shadow-[0_14px_50px_rgba(0,0,0,0.3)]">
      <div className="flex gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white text-[#2d6a4f]">
          <ShieldCheck size={21} />
        </div>
        <div>
          <h2 className="font-black">
            Child-safe and parent-approved by design:
          </h2>
          <p className="mt-1 text-sm font-semibold leading-6">
            Language that is appropriate for children based on their age, strict
            child-safe content guidelines, and gentle pacing.
          </p>
        </div>
      </div>
    </section>
  );
}

function ComplexityModal({ check, onDismiss, onEdit }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onEdit} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative mx-auto w-full max-w-md rounded-[32px] border border-orange-300 bg-white p-7 shadow-[0_32px_80px_rgba(0,0,0,0.2)]"
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          <h2 className="text-xl font-black text-[#1B203A]">Let's simplify this a little</h2>
        </div>
        <p className="text-base font-semibold leading-7 text-[#7F3E28]">{check.message}</p>
        <div className="mt-4 rounded-2xl border border-[#E7B05E] bg-[#E7B05E]/20 p-4">
          <p className="text-sm font-black text-[#7F3E28]">Try instead:</p>
          <p className="mt-1 text-sm font-semibold text-[#A74921]">{check.suggestion}</p>
        </div>
        <div className="mt-6">
          <button
            onClick={onEdit}
            className="w-full rounded-2xl bg-[#1B203A] px-4 py-3.5 text-sm font-black text-white transition hover:bg-[#2a3050]"
          >
            Edit my topic
          </button>
          <p className="mt-3 text-center text-xs font-semibold text-orange-500">
            Topics that are too complex can't be turned into a great kids episode — simplifying helps!
          </p>
        </div>
      </motion.div>
    </div>
  );
}


function Tag({ children, dark = false }) {
  return (
    <span
      className={`rounded-full px-3 py-1.5 text-sm font-black ${
        dark ? "bg-[#E7B05E]/20 text-[#FCE7CF]" : "bg-[#E7B05E]/30 text-[#7F3E28]"
      }`}
    >
      {children}
    </span>
  );
}

export default App;
