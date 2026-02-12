// app/services/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const BUSINESS = "Thacker Excavating";
const CITY = "Coffeen, Illinois";

const PHONE_DISPLAY = "(217) 555-0123";
const PHONE_TEL = "+12175550123";
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const SERVICES = [
  {
    title: "Excavation & Foundations",
    desc: "Footings, basements, crawlspaces, and pads with clean lines and the right depth.",
    bestFor: ["New builds", "Additions", "Garage pads"],
  },
  {
    title: "Grading & Site Prep",
    desc: "Smooth, stable bases and correct slope so water moves away from your structure.",
    bestFor: ["House pads", "Driveway prep", "Yard regrade"],
  },
  {
    title: "Trenching & Utilities",
    desc: "Accurate depth and tidy backfill for water, electric, and drainage lines.",
    bestFor: ["Water lines", "Electric runs", "Drain tile"],
  },
  {
    title: "Driveways & Culverts",
    desc: "New installs and repairs that hold up to daily traffic and heavy equipment.",
    bestFor: ["Gravel driveways", "Culvert replacement", "Farm lanes"],
  },
  {
    title: "Drainage & Water Control",
    desc: "Fix standing water, reroute runoff, and improve site performance.",
    bestFor: ["Yard drainage", "Swales", "French drains"],
  },
  {
    title: "Land Clearing & Cleanup",
    desc: "Brush, small trees, and debris removal to make land usable again.",
    bestFor: ["Lot prep", "Pastures", "Fence lines"],
  },
];

const FAQS = [
  {
    q: "How do I get a quote?",
    a: "Call us or request an estimate. We will ask a few quick questions and set a time to look at the site if needed.",
  },
  {
    q: "Do you handle permits or utility locates?",
    a: "We can coordinate utility locates and can advise on permit steps if your project requires it.",
  },
  {
    q: "What should I do before you arrive?",
    a: "Clear vehicles and personal items from the work area. We will mark the planned work zone on arrival.",
  },
  {
    q: "How far do you travel?",
    a: "We serve Coffeen and nearby communities. Call to confirm scheduling for your location.",
  },
];

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6">{children}</div>;
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function AnimatedSection({
  children,
  id,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : reduce
          ? { opacity: 1 }
          : { opacity: 0, y: 18 }
      }
      transition={{
        duration: reduce ? 0 : 0.65,
        ease: EASE_OUT,
        delay,
      }}
    >
      {children}
    </motion.section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/80 shadow-sm"
    >
      {children}
    </motion.span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const center = align === "center";
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-3 text-pretty text-sm leading-relaxed text-white/70 sm:text-base",
            center ? "mx-auto max-w-2xl" : "max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function GlowCard({
  title,
  desc,
  children,
  delay = 0,
}: {
  title: string;
  desc?: string;
  children?: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: reduce ? 0 : 0.55,
        delay,
        ease: EASE_OUT,
      }}
      whileHover={reduce ? {} : { y: -6, scale: 1.01 }}
      whileTap={reduce ? {} : { scale: 0.99 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_1px_0_rgba(255,255,255,0.06)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -top-16 -left-20 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-lime-300/10 blur-3xl" />
      </div>

      <div className="relative">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        {desc ? (
          <p className="mt-2 text-sm leading-relaxed text-white/70">{desc}</p>
        ) : null}
        {children ? <div className="mt-4">{children}</div> : null}
      </div>
    </motion.div>
  );
}

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      whileHover={reduce ? {} : { y: -2 }}
      whileTap={reduce ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 520, damping: 30 }}
      className="w-full sm:w-auto"
    >
      <Link
        href={href}
        className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-[0_12px_30px_rgba(16,185,129,0.18)] transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/40"
      >
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="absolute -left-1/3 top-0 h-full w-1/2 skew-x-[-18deg] bg-white/20 blur-[1px] animate-[shine_1.2s_ease-in-out_infinite]" />
        </span>
        <span className="relative">{children}</span>
      </Link>
    </motion.div>
  );
}

function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      whileHover={reduce ? {} : { y: -2 }}
      whileTap={reduce ? {} : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 520, damping: 32 }}
      className="w-full sm:w-auto"
    >
      <Link
        href={href}
        className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/85 shadow-sm transition hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-white/15"
      >
        {children}
      </Link>
    </motion.div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: reduce ? 0 : 0.55, ease: EASE_OUT }}
      whileHover={reduce ? {} : { y: -4 }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center"
    >
      <div className="text-2xl font-semibold tracking-tight text-white">
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/55">
        {label}
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const reduce = useReducedMotion();

  const stagger = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: { staggerChildren: 0.08, delayChildren: 0.06 },
      },
    }),
    []
  );

  const fadeUp = useMemo(
    () => ({
      hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
      show: reduce
        ? { opacity: 1, y: 0 }
        : {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: EASE_OUT },
          },
    }),
    [reduce]
  );

  return (
    <main className="min-h-screen bg-[#070B0A] text-white">
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-60%) skewX(-18deg); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateX(220%) skewX(-18deg); opacity: 0; }
        }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            aria-hidden
            className="absolute -top-28 left-1/2 h-96 w-[56rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
            animate={reduce ? {} : { scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
            transition={reduce ? {} : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-28 right-[-10%] h-96 w-96 rounded-full bg-lime-300/10 blur-3xl"
            animate={reduce ? {} : { y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
            transition={reduce ? {} : { duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_20%_0%,rgba(16,185,129,0.06),transparent_60%),radial-gradient(900px_450px_at_80%_20%,rgba(163,230,53,0.05),transparent_55%)]" />
        </div>

        <Container>
          <div className="grid gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-12">
            <motion.div
              className="lg:col-span-7"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                <Badge>Licensed & insured</Badge>
                <Badge>Local service</Badge>
                <Badge>Clear, honest estimates</Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                Excavation and site work that stays on schedule and on spec.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg"
              >
                From site prep to drainage, we keep it simple: clear scope, clean
                work, and durable results. {BUSINESS} serves {CITY} and nearby
                communities with dependable, professional service.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <a href={`tel:${PHONE_TEL}`} className="w-full sm:w-auto">
                  <PrimaryButton href={`tel:${PHONE_TEL}`}>
                    Call Now: {PHONE_DISPLAY}
                  </PrimaryButton>
                </a>
                <SecondaryButton href="#services-list">View Services</SecondaryButton>
              </motion.div>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Stat value="10+" label="Years experience" />
                <Stat value="200+" label="Projects completed" />
                <Stat value="Local" label="Trusted crew" />
              </div>
            </motion.div>

            <div className="lg:col-span-5">
              <AnimatedSection delay={0.05}>
                <GlowCard
                  title="What you get"
                  desc="A clear scope, honest pricing, and clean job sites that respect your property."
                  delay={0.06}
                >
                  <ul className="text-sm text-white/70">
                    <li>• On-time arrival and proactive updates</li>
                    <li>• Careful equipment movement and protection</li>
                    <li>• Proper base prep and drainage planning</li>
                  </ul>
                </GlowCard>
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICES LIST */}
      <AnimatedSection id="services-list" className="border-t border-white/10">
        <Container>
          <div className="py-12 sm:py-14">
            <SectionTitle
              eyebrow="Services"
              title="Full-service excavation and site work."
              subtitle="Choose a service or tell us your goal and we will recommend the best approach."
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s, idx) => (
                <GlowCard
                  key={s.title}
                  title={s.title}
                  desc={s.desc}
                  delay={0.05 + idx * 0.04}
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                    Best for
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {s.bestFor.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/70"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* PROCESS */}
      <AnimatedSection id="process" className="border-t border-white/10">
        <Container>
          <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <SectionTitle
                eyebrow="Process"
                title="A simple process that keeps your project moving."
                subtitle="Clear communication and clean execution from start to finish."
              />
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "1. Quick call",
                    desc: "We learn your goals, timeline, and site details.",
                  },
                  {
                    title: "2. Site review",
                    desc: "We confirm access, elevations, and drainage needs.",
                  },
                  {
                    title: "3. Clear quote",
                    desc: "Straight pricing, scope, and schedule.",
                  },
                  {
                    title: "4. Clean finish",
                    desc: "We wrap up tidy and confirm final grading.",
                  },
                ].map((step, idx) => (
                  <GlowCard
                    key={step.title}
                    title={step.title}
                    desc={step.desc}
                    delay={0.05 + idx * 0.04}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* EQUIPMENT */}
      <AnimatedSection className="border-t border-white/10">
        <Container>
          <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <SectionTitle
                eyebrow="Equipment"
                title="Right-size equipment for clean, efficient work."
                subtitle="We use equipment that fits the site, minimizes disruption, and finishes clean."
              />
            </div>
            <div className="lg:col-span-7">
              <GlowCard
                title="Focused, not oversized"
                desc="We match the machine to the job so you get precise cuts and a neat site."
              >
                <div className="mt-4 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    • Compact excavator for tight access
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    • Skid steer for grading and cleanup
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    • Attachments for trenching and shaping
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    • Hauling support when needed
                  </div>
                </div>
              </GlowCard>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection id="faq" className="border-t border-white/10">
        <Container>
          <div className="py-12 sm:py-14">
            <SectionTitle
              eyebrow="FAQ"
              title="Common questions before we get started."
              subtitle="If you have a unique situation, just call us."
            />

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {FAQS.map((faq, idx) => (
                <GlowCard
                  key={faq.q}
                  title={faq.q}
                  desc={faq.a}
                  delay={0.04 + idx * 0.04}
                />
              ))}
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection id="estimate" className="border-t border-white/10">
        <Container>
          <div className="py-12 sm:py-14">
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
              whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: reduce ? 0 : 0.65, ease: EASE_OUT }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_1px_0_rgba(255,255,255,0.06)] sm:p-10"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-20 left-1/2 h-56 w-[38rem] -translate-x-1/2 rounded-full bg-emerald-500/12 blur-3xl" />
                <div className="absolute -bottom-24 right-[-10%] h-60 w-60 rounded-full bg-lime-300/10 blur-3xl" />
              </div>

              <div className="relative">
                <SectionTitle
                  align="center"
                  eyebrow="Free estimate"
                  title="Tell us what you are working on and we will build the right plan."
                  subtitle="Call for a quick conversation or send an estimate request. We respond quickly."
                />

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a href={`tel:${PHONE_TEL}`} className="w-full sm:w-auto">
                    <PrimaryButton href={`tel:${PHONE_TEL}`}>
                      Call Now: {PHONE_DISPLAY}
                    </PrimaryButton>
                  </a>
                  <SecondaryButton href="/contact">Request an Estimate</SecondaryButton>
                </div>

                <p className="mt-6 text-center text-xs text-white/55">
                  Tip: update your phone number once and it updates everywhere.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </AnimatedSection>
    </main>
  );
}
