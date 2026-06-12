import { Link } from "react-router-dom";
import { Stars, Car, Moon, BookOpen, School, Compass, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: "easeOut" } };

const ageGroups = [
  {
    range: "Ages 3–4",
    emoji: "🌱",
    title: "Early explorers",
    voice: "Very warm, slow, and gentle",
    length: "3 min episodes",
    format: "Bedtime stories",
    topics: ["Animals and nature", "Kindness and sharing", "Colours and shapes", "Simple how-things-work", "Imagination adventures"],
    description: "At this age, wonder is everything. WonderCast creates very short, soothing stories with simple language, gentle repetition, and warm narration. Perfect for winding down at bedtime or keeping little ones calm on a car journey. Every word is carefully chosen to match a toddler's vocabulary and attention span.",
  },
  {
    range: "Ages 5–6",
    emoji: "🌟",
    title: "Curious beginners",
    voice: "Playful and animated",
    length: "5 min episodes",
    format: "Playful stories",
    topics: ["Dinosaurs", "Space and planets", "How rain works", "Friendly characters", "Simple science"],
    description: "Five and six-year-olds are full of questions. WonderCast matches their energy with playful, character-driven stories that sneak in real learning. Episodes use an animated storyteller voice, fun narrative arcs, and memorable moments that children love to replay.",
  },
  {
    range: "Ages 7–8",
    emoji: "🚀",
    title: "Adventure seekers",
    voice: "Adventurous and expressive",
    length: "5–10 min episodes",
    format: "Story adventures",
    topics: ["History and ancient civilisations", "How volcanoes work", "Ocean life", "Space exploration", "Animal behaviours"],
    description: "This age group wants to go deeper. WonderCast creates adventure-driven stories where learning is woven naturally into the narrative. A curious explorer discovers how ancient Egyptians built the pyramids. A young scientist figures out why the sky is blue. Real knowledge, real stories.",
  },
  {
    range: "Ages 9–10",
    emoji: "🔭",
    title: "Young thinkers",
    voice: "Engaging and balanced",
    length: "10 min episodes",
    format: "Story-lessons",
    topics: ["World geography", "The human body", "Climate and weather", "Historical events", "How technology works"],
    description: "Nine and ten-year-olds are ready for more complexity. WonderCast blends storytelling with structured learning, using two-speaker formats that feel like a conversation between knowledgeable friends. Episodes are longer, richer, and designed for children who want to really understand things.",
  },
  {
    range: "Ages 11–12",
    emoji: "📚",
    title: "Independent learners",
    voice: "Clear, teacher-style",
    length: "10 min episodes",
    format: "Educational lessons",
    topics: ["Physics concepts", "World history", "Environmental science", "Maths ideas", "Literature themes"],
    description: "Pre-teens benefit most from clearly structured, in-depth explanations. WonderCast creates lesson-style episodes with a knowledgeable, parent-like narrator who explains things clearly and treats children as the intelligent people they are. Perfect for supplementing school learning.",
  },
  {
    range: "Ages 13–16",
    emoji: "🧠",
    title: "Deep divers",
    voice: "Conversational, peer-like",
    length: "10–15 min episodes",
    format: "Deep dive lessons",
    topics: ["Philosophy and ethics", "Economics basics", "World politics (age-appropriate)", "Advanced science", "Study support for any subject"],
    description: "Teenagers deserve content that treats them as near-adults. WonderCast creates detailed, nuanced lessons with a conversational two-speaker format that feels like a podcast made for them. Ideal for study support, exploring interests outside school, or long car journeys with older teens.",
  },
];

const situations = [
  {
    icon: Moon,
    title: "Bedtime",
    color: "bg-indigo-50 border-indigo-200",
    iconColor: "text-indigo-500",
    description: "WonderCast's bedtime preset uses slower narration, calmer voices, and gentle story pacing designed to ease children toward sleep rather than exciting them. Topics are warm and peaceful — nature, imagination, and gentle adventures with satisfying, calm endings.",
    tips: ["Works best after lights are out", "Keep volume low and consistent", "3–5 min episodes for under-7s, 5–10 min for older children"],
  },
  {
    icon: Car,
    title: "Car Rides",
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    description: "Car ride episodes are designed to hold attention on the go — upbeat pacing, engaging narration, and enough curiosity to keep children asking questions and listening rather than fighting in the back seat. Perfect for journeys of any length.",
    tips: ["Let children pick the topic before you leave", "Pause and discuss at traffic lights", "Great for siblings at different ages — WonderCast can make separate episodes"],
  },
  {
    icon: School,
    title: "School Help",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    description: "Struggling with a homework topic? Type it into WonderCast. The School Help preset generates a clear, structured explanation at exactly your child's age level — no jargon, no oversimplification. Think of it as a patient private tutor who always has time.",
    tips: ["Be specific: 'how photosynthesis works' beats just 'plants'", "Listen together and pause to discuss", "Great for topics your child finds boring in class — a story format can change that"],
  },
  {
    icon: Compass,
    title: "Travel Prep",
    color: "bg-rose-50 border-rose-200",
    iconColor: "text-rose-500",
    description: "Heading somewhere new? WonderCast creates place-based audio episodes about destinations, cultures, history, and geography. Children arrive curious and engaged rather than indifferent. Works brilliantly the night before a trip or on the journey itself.",
    tips: ["Try 'history of [destination]' or 'what [country] is famous for'", "Great for geography homework too", "Combine with looking up photos to make it even richer"],
  },
  {
    icon: Stars,
    title: "Storytime",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-500",
    description: "Classic storytime — but personalised. WonderCast creates original stories on any theme your child loves. Dragons, space explorers, talking animals, magical forests. Every story is built around a real learning idea woven naturally into the adventure.",
    tips: ["Let your child name the main character", "Ask them to predict what happens next", "Replay favourites — children love hearing stories again"],
  },
  {
    icon: BookOpen,
    title: "General Learning",
    color: "bg-sky-50 border-sky-200",
    iconColor: "text-sky-500",
    description: "When there's no specific situation — just a curious child and a question. WonderCast's general learning preset balances storytelling with education, using whatever format works best for the topic and age. The default for everyday curiosity.",
    tips: ["Ask your child what they're curious about right now", "Great for dinner table conversation starters", "Let them listen independently as they get older"],
  },
];

export default function ForFamiliesPage() {
  return (
    <motion.div {...fadeUp} className="pb-20">

      {/* Hero */}
      <section className="mb-16 rounded-[34px] border border-[#E7B05E]/30 bg-white/70 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur sm:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#E7B05E]/30 px-4 py-2 text-sm font-bold text-[#A74921]">
            Ages 3–16 · Every situation
          </div>
          <h1 className="mb-5 text-4xl font-black leading-tight text-[#1B203A] sm:text-5xl">
            Made for your family,<br className="hidden sm:block" /> exactly as it is
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-medium leading-8 text-[#7F3E28]">
            Every family is different. WonderCast works across every age, every situation, and every kind of curious child — from toddlers who love animals to teenagers who want to understand the world.
          </p>
        </div>
      </section>

      {/* Age groups */}
      <section className="mb-20" aria-labelledby="ages-heading">
        <h2 id="ages-heading" className="mb-2 text-center text-sm font-black uppercase tracking-[0.15em] text-[#A74921]">By age</h2>
        <p className="mb-10 text-center text-3xl font-black text-[#1B203A]">Right for every stage of growing up</p>
        <div className="space-y-5">
          {ageGroups.map(({ range, emoji, title, voice, length, format, topics, description }) => (
            <div key={range} className="rounded-[28px] border border-[#E7B05E]/30 bg-white/70 p-6 backdrop-blur sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-3xl">{emoji}</span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-[#A74921]">{range}</p>
                      <h3 className="text-xl font-black text-[#1B203A]">{title}</h3>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-[#7F3E28]">🎙️ {voice}</p>
                    <p className="text-sm font-semibold text-[#7F3E28]">⏱️ {length}</p>
                    <p className="text-sm font-semibold text-[#7F3E28]">📖 {format}</p>
                  </div>
                </div>
                <div>
                  <p className="mb-4 text-base font-medium leading-7 text-[#7F3E28]">{description}</p>
                  <div className="flex flex-wrap gap-2">
                    {topics.map(t => (
                      <span key={t} className="rounded-full bg-[#E7B05E]/30 px-3 py-1 text-xs font-black text-[#7F3E28]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Situations */}
      <section className="mb-16" aria-labelledby="situations-heading">
        <h2 id="situations-heading" className="mb-2 text-center text-sm font-black uppercase tracking-[0.15em] text-[#A74921]">By situation</h2>
        <p className="mb-10 text-center text-3xl font-black text-[#1B203A]">The right episode for every moment</p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {situations.map(({ icon: Icon, title, color, iconColor, description, tips }) => (
            <div key={title} className={`rounded-[28px] border ${color} p-6 backdrop-blur`}>
              <div className={`mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-white ${iconColor}`}>
                <Icon size={20} />
              </div>
              <h3 className="mb-3 text-lg font-black text-[#1B203A]">{title}</h3>
              <p className="mb-4 text-sm font-medium leading-6 text-[#7F3E28]">{description}</p>
              <div className="space-y-1.5">
                {tips.map(tip => (
                  <p key={tip} className="flex gap-2 text-xs font-semibold text-[#7F3E28]">
                    <span className="text-[#A74921]">→</span> {tip}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <p className="mb-5 text-xl font-black text-[#1B203A]">Find the right episode for your child right now</p>
        <Link to="/" className="inline-flex items-center gap-2 rounded-2xl bg-[#A74921] px-8 py-4 text-lg font-black text-white shadow-[0_12px_30px_rgba(167,73,33,0.3)] transition hover:bg-[#8a3a1a]">
          <Sparkles size={20} /> Create an episode
        </Link>
      </div>

    </motion.div>
  );
}
