export const ageOptions = ["3-4", "5-6", "7-8", "9-10", "11-12", "13-14", "15-16"];
export const lengthOptions = ["3 min", "5 min", "10 min", "15 min"];
export const toneOptions = ["Calm", "Playful", "Silly", "Adventurous", "Thoughtful"];
export const voiceStyleOptions = [
  "Warm female voice",
  "Warm male voice",
  "Animated storyteller",
  "Calm narrator",
  "Teacher-style guide",
];
export const speakerSetupOptions = [
  "One narrator",
  "Two speakers",
  "Narrator + character",
  "Parent-style explainer",
];
export const learningDepthOptions = [
  "Light and fun",
  "Balanced",
  "More educational",
  "Deeper dive",
];
export const energyLevelOptions = ["Gentle", "Balanced", "High energy"];
export const safetySensitivityOptions = [
  "Standard child-safe",
  "Extra gentle",
  "Avoid anything scary",
  "Parent-review recommended",
];

export const agePresets = {
  "3-4": { situation: "Storytime", format: "Story", length: "3 min", tone: "Calm", voiceStyle: "Calm narrator", speakerSetup: "One narrator", learningDepth: "Light and fun", energyLevel: "Gentle", safetySensitivity: "Extra gentle" },
  "5-6": { situation: "Storytime", format: "Story", length: "5 min", tone: "Playful", voiceStyle: "Animated storyteller", speakerSetup: "Narrator + character", learningDepth: "Light and fun", energyLevel: "Balanced", safetySensitivity: "Standard child-safe" },
  "7-8": { situation: "Storytime", format: "Story", length: "5 min", tone: "Adventurous", voiceStyle: "Animated storyteller", speakerSetup: "Narrator + character", learningDepth: "Balanced", energyLevel: "Balanced", safetySensitivity: "Standard child-safe" },
  "9-10": { situation: "Storytime", format: "Story", length: "10 min", tone: "Adventurous", voiceStyle: "Warm male voice", speakerSetup: "Two speakers", learningDepth: "More educational", energyLevel: "Balanced", safetySensitivity: "Standard child-safe" },
  "11-12": { situation: "General Learning", format: "Lesson", length: "10 min", tone: "Thoughtful", voiceStyle: "Teacher-style guide", speakerSetup: "Parent-style explainer", learningDepth: "More educational", energyLevel: "Balanced", safetySensitivity: "Standard child-safe" },
  "13-14": { situation: "General Learning", format: "Lesson", length: "10 min", tone: "Thoughtful", voiceStyle: "Teacher-style guide", speakerSetup: "Two speakers", learningDepth: "Deeper dive", energyLevel: "Balanced", safetySensitivity: "Standard child-safe" },
  "15-16": { situation: "General Learning", format: "Lesson", length: "15 min", tone: "Thoughtful", voiceStyle: "Teacher-style guide", speakerSetup: "Two speakers", learningDepth: "Deeper dive", energyLevel: "Balanced", safetySensitivity: "Standard child-safe" },
};

export const situations = [
  { label: "Storytime", icon: "Stars", note: "Imaginative, warm, and story-led." },
  { label: "Car Ride", icon: "Car", note: "Energetic, engaging, easy to follow." },
  { label: "Bedtime", icon: "Moon", note: "Calm, gentle, never overstimulating." },
  { label: "General Learning", icon: "BookOpen", note: "Balanced, curious, and clear." },
  { label: "School Help", icon: "School", note: "Clear explanations with examples." },
  { label: "Travel Prep", icon: "Compass", note: "Place-based, historical, sensory." },
];

export const explicitBlockedTerms = [
  "sex","sexual","porn","nude","naked","rape","assault","abuse","incest",
  "self harm","suicide","kill myself","gore","graphic violence","murder","terrorism","hate speech",
];

export const sensitiveUnder16Terms = [
  "war","death","violence","disaster","shooting","blood","weapon","gun","drugs",
  "alcohol","eating disorder","medical advice","legal advice","political persuasion","scary horror",
];
