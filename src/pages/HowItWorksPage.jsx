import { Link } from "react-router-dom";
import { Sparkles, Headphones, ShieldCheck, Zap, Clock, Brain } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: "easeOut" } };

export default function HowItWorksPage() {
  return (
    <motion.div {...fadeUp} className="pb-20">

      {/* Hero */}
      <section className="mb-16 rounded-[34px] border border-[#E7B05E]/30 bg-white/70 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur sm:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#E7B05E]/30 px-4 py-2 text-sm font-bold text-[#A74921]">
            <Sparkles size={15} />
            Powered by Claude AI + ElevenLabs
          </div>
          <h1 className="mb-5 text-4xl font-black leading-tight text-[#1B203A] sm:text-5xl">
            A personalised audio episode<br className="hidden sm:block" /> in under a minute
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-medium leading-8 text-[#7F3E28]">
            WonderCast combines two of the world's best AI systems to turn any topic into a safe, engaging, age-appropriate audio episode — tailored to your child, ready to play anywhere.
          </p>
          <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#1B203A] px-6 py-3.5 font-black text-white transition hover:bg-[#2a3050]">
            <Headphones size={18} /> Try it now — it's free
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="mb-16" aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="mb-2 text-center text-sm font-black uppercase tracking-[0.15em] text-[#A74921]">The process</h2>
        <p className="mb-10 text-center text-3xl font-black text-[#1B203A]">Three steps from curiosity to audio</p>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Choose age and topic",
              body: "Select your child's age band — from 3–4 all the way to 15–16. WonderCast instantly adjusts vocabulary, pacing, tone, and learning depth. Then type any topic: 'how volcanoes work', 'ancient Egypt', 'why we feel scared', or anything else they're curious about.",
              detail: "Age presets configure 8 settings automatically — voice style, tone, energy, learning depth, length, and more.",
            },
            {
              step: "02",
              title: "Review the AI script",
              body: "Claude AI writes a fully personalised, fact-aware script. For stories, it creates characters, a narrative arc, and a warm resolution. For lessons, it structures clear explanations with real-world examples. You can read the full script, regenerate it, or adjust any setting before committing.",
              detail: "Every script is checked against child-safe content filters before you ever see it.",
            },
            {
              step: "03",
              title: "Listen anywhere, screen-free",
              body: "ElevenLabs converts the script into natural, engaging audio with a voice matched to the situation — calm and slow for bedtime, upbeat for car rides, clear and measured for school help. The episode is ready to play instantly, from any device.",
              detail: "No app download. No account required. Works on any phone, tablet, or smart speaker browser.",
            },
          ].map(({ step, title, body, detail }) => (
            <div key={step} className="relative rounded-[28px] border border-[#E7B05E]/30 bg-white/70 p-7 backdrop-blur">
              <div className="mb-5 text-5xl font-black text-[#E7B05E]">{step}</div>
              <h3 className="mb-3 text-xl font-black text-[#1B203A]">{title}</h3>
              <p className="mb-4 text-base font-medium leading-7 text-[#7F3E28]">{body}</p>
              <p className="rounded-xl bg-[#E7B05E]/20 px-4 py-2.5 text-sm font-semibold text-[#A74921]">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why it's different */}
      <section className="mb-16" aria-labelledby="why-heading">
        <h2 id="why-heading" className="mb-2 text-center text-sm font-black uppercase tracking-[0.15em] text-[#A74921]">Why WonderCast</h2>
        <p className="mb-10 text-center text-3xl font-black text-[#1B203A]">Not a library. A generator.</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Child-safe by design", body: "Every topic passes two layers of safety checks — a client-side filter before you even submit, and a server-side check before Claude touches it. Explicit content, sensitive topics, and age-inappropriate material are blocked automatically. No parent moderation required." },
            { icon: Sparkles, title: "Truly personalised", body: "There is no content library. Every episode is generated from scratch for your child's exact age, chosen topic, and the moment you're in. A bedtime story for a 4-year-old about frogs is completely different from a car-ride lesson for a 12-year-old on the same subject." },
            { icon: Headphones, title: "Screen-free learning", body: "Audio-only means no screen time. Research consistently shows that listening and imagining activates more of the brain than passive video watching — better for language development, attention, and creative thinking." },
            { icon: Clock, title: "Ready in under a minute", body: "No playlist to curate. No subscription box to wait for. No browsing through catalogues. Type a topic, press create, and your child has a brand new episode in about 30 seconds." },
            { icon: Brain, title: "Age-aware intelligence", body: "WonderCast uses different word counts, sentence complexity, narrative structures, and voice settings for each age band. A 3-year-old's episode uses 90 words per minute with simple repetition. A 15-year-old's uses 130 wpm with nuanced reasoning." },
            { icon: Zap, title: "Works in every situation", body: "Six built-in situation presets — Storytime, Car Ride, Bedtime, General Learning, School Help, and Travel Prep — each tune the episode's energy, pacing, and voice style to match where you are and what you need." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-[28px] border border-[#E7B05E]/30 bg-white/70 p-6 backdrop-blur">
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-[#E7B05E]/30 text-[#A74921]">
                <Icon size={20} />
              </div>
              <h3 className="mb-2 text-lg font-black text-[#1B203A]">{title}</h3>
              <p className="text-sm font-medium leading-6 text-[#7F3E28]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="mb-16 rounded-[28px] border border-[#E7B05E]/30 bg-white/70 p-8 backdrop-blur" aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="mb-2 text-sm font-black uppercase tracking-[0.15em] text-[#A74921]">Under the hood</h2>
        <p className="mb-8 text-2xl font-black text-[#1B203A]">Built on the world's best AI</p>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-black text-[#1B203A]">Script generation — Claude by Anthropic</h3>
            <p className="text-sm font-medium leading-7 text-[#7F3E28]">Claude is one of the most capable and safety-focused AI models available. WonderCast uses Claude to write scripts that are factually grounded, age-appropriate, and genuinely engaging — not generic or robotic. Every script is written from scratch for each episode.</p>
          </div>
          <div>
            <h3 className="mb-2 font-black text-[#1B203A]">Voice synthesis — ElevenLabs</h3>
            <p className="text-sm font-medium leading-7 text-[#7F3E28]">ElevenLabs produces some of the most natural-sounding AI voices available. WonderCast selects from a curated set of warm, engaging voices matched to each episode's style — from animated storytellers for young children to calm, measured guides for teenagers.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <p className="mb-5 text-xl font-black text-[#1B203A]">Ready to try it?</p>
        <Link to="/" className="inline-flex items-center gap-2 rounded-2xl bg-[#A74921] px-8 py-4 text-lg font-black text-white shadow-[0_12px_30px_rgba(167,73,33,0.3)] transition hover:bg-[#8a3a1a]">
          <Sparkles size={20} /> Create your first episode
        </Link>
        <p className="mt-3 text-sm font-medium text-[#7F3E28]">Free to use. No account required.</p>
      </div>

    </motion.div>
  );
}
