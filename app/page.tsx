// app/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";


const BUSINESS = "Thacker Excavating";
const CITY = "Coffeen, Illinois";

// TODO: Replace placeholders
const EXPERIENCE = "10+";
const PROJECTS = "200+";

const PHONE_DISPLAY = "(217) 555-0123";
const PHONE_TEL = "+12175550123";
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const SERVICES = [
  {
    title: "Excavation",
    desc: "Footings, pads, utilities, and general digging—careful, clean, and to spec.",
  },
  {
    title: "Grading & Site Prep",
    desc: "Smooth, stable bases and proper slope so your project lasts.",
  },
  {
    title: "Trenching",
    desc: "Water, electric, and drainage trenches with accurate depth and tidy backfill.",
  }
];

const TESTIMONIALS = [
  {
    quote:
      "We called and they were out fast. Clear quote, honest timeline, and the site was left neat.",
    name: "Homeowner",
    meta: "Coffeen, IL",
  },
  {
    quote:
      "They graded our pad exactly how the builder wanted it. No rework, no drama—just solid work.",
    name: "Local Builder",
    meta: "Montgomery County",
  },
  {
    quote: "Good people. Fair price. They treated our farm like it mattered.",
    name: "Farmer",
    meta: "Surrounding area",
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
        className={cn(id ? "scroll-mt-24 sm:scroll-mt-28" : "", className)}
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
      whileHover={
        reduce
          ? {}
          : {
              y: -6,
              scale: 1.01,
            }
      }
      whileTap={reduce ? {} : { scale: 0.99 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_1px_0_rgba(255,255,255,0.06)]"
    >
      {/* hover glow */}
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
  const isHashLink = href.startsWith("#");
  const buttonClassName =
    "group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-[0_12px_30px_rgba(16,185,129,0.18)] transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/40";
  return (
    <motion.div
      whileHover={reduce ? {} : { y: -2 }}
      whileTap={reduce ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 520, damping: 30 }}
      className="w-full sm:w-auto"
    >
      {isHashLink ? (
        <a href={href} className={buttonClassName}>
          {/* animated highlight */}
          <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span className="absolute -left-1/3 top-0 h-full w-1/2 skew-x-[-18deg] bg-white/20 blur-[1px] animate-[shine_1.2s_ease-in-out_infinite]" />
          </span>
          <span className="relative">{children}</span>
        </a>
      ) : (
        <Link href={href} className={buttonClassName}>
          {/* animated highlight */}
          <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span className="absolute -left-1/3 top-0 h-full w-1/2 skew-x-[-18deg] bg-white/20 blur-[1px] animate-[shine_1.2s_ease-in-out_infinite]" />
          </span>
          <span className="relative">{children}</span>
        </Link>
      )}
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
  const isHashLink = href.startsWith("#");
  const buttonClassName =
    "inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/85 shadow-sm transition hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-white/15";
  return (
    <motion.div
      whileHover={reduce ? {} : { y: -2 }}
      whileTap={reduce ? {} : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 520, damping: 32 }}
      className="w-full sm:w-auto"
    >
      {isHashLink ? (
        <a href={href} className={buttonClassName}>
          {children}
        </a>
      ) : (
        <Link href={href} className={buttonClassName}>
          {children}
        </Link>
      )}
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
      transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
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

export default function Page() {
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
      {/* Page-level keyframes (kept inside this file so you can paste-and-go) */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-60%) skewX(-18deg); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateX(220%) skewX(-18deg); opacity: 0; }
        }
      `}</style>

      {/* Top bar */}
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.6, ease: EASE_OUT }}
        className="sticky top-0 z-30 border-b border-white/10 bg-[#070B0A]/80 backdrop-blur"
      >
        <Container>
          <div className="flex items-center justify-between gap-6 py-4">
            <motion.div
              whileHover={reduce ? {} : { y: -2 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              className="flex items-center gap-3"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] ring-1 ring-white/12">
                <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 to-lime-300/10" />
                <span className="relative text-xs font-semibold tracking-[0.2em]">TE</span>
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight">{BUSINESS}</div>
                <div className="text-xs text-white/60">Excavation • {CITY}</div>
              </div>
            </motion.div>

            <nav className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
              {[
                { href: "#services", label: "Services" },
                { href: "#about", label: "About" },
                { href: "#testimonials", label: "Reviews" },
                { href: "#estimate", label: "Estimate" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <motion.a
                whileHover={reduce ? {} : { y: -2 }}
                whileTap={reduce ? {} : { scale: 0.99 }}
                transition={{ type: "spring", stiffness: 520, damping: 32 }}
                href={`tel:${PHONE_TEL}`}
                className="hidden items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/90 shadow-sm transition hover:bg-white/[0.06] sm:inline-flex"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400/80" />
                Call {PHONE_DISPLAY}
              </motion.a>
              <PrimaryButton href="#estimate">Free Estimate</PrimaryButton>
            </div>
          </div>
        </Container>
      </motion.div>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* animated glows */}
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
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_25%,transparent_75%,rgba(255,255,255,0.03))]" />
        </div>

        <Container>
          <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12">
            <motion.div
              className="lg:col-span-7"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                <Badge>Licensed & insured</Badge>
                <Badge>Local Coffeen, IL</Badge>
                <Badge>Honest, no-gimmicks work</Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                Hometown excavation you can trust. Done right the first time.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg"
              >
                {BUSINESS} is based in {CITY}. We’re the kind of crew that answers
                the phone, shows up when we say we will, and leaves your place
                better than we found it.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <div className="w-full sm:w-auto">
                  <PrimaryButton href={`tel:${PHONE_TEL}`}>
                    Call Now: {PHONE_DISPLAY}
                  </PrimaryButton>
                </div>
                <SecondaryButton href="#services">See Services</SecondaryButton>
              </motion.div>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Stat value={`${EXPERIENCE}`} label="Years experience" />
                <Stat value={`${PROJECTS}`} label="Projects completed" />
                <Stat value="5★" label="Local reputation" />
              </div>

              <motion.p variants={fadeUp} className="mt-3 text-xs text-white/55">
                *Placeholders—swap these with your real numbers anytime.
              </motion.p>
            </motion.div>

            <div className="lg:col-span-5">
              <AnimatedSection delay={0.05}>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/thackerhome.jpg"
                    alt="Thacker Excavating equipment on site in Coffeen, IL"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* optional dark overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                </div>
              </div>

                <GlowCard
                  title="Quick note for homeowners & builders"
                  desc="Tell us what you’re trying to accomplish and your timeline—we’ll recommend the best approach and give you a clear estimate."
                  delay={0.06}
                >
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <PrimaryButton href="#estimate">Request Estimate</PrimaryButton>
                    <div className="w-full sm:w-auto">
                      <SecondaryButton href={`tel:${PHONE_TEL}`}>
                        Call {PHONE_DISPLAY}
                      </SecondaryButton>
                    </div>
                  </div>
                </GlowCard>
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </section>

      {/* ABOUT */}
      <AnimatedSection className="hidden border-t border-white/10">
        <Container>
          <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <SectionTitle
                eyebrow="About"
                title="Local roots. Solid workmanship."
                subtitle={`We’re based in ${CITY} and we take pride in doing work our neighbors feel good about.`}
              />
            </div>

            <div className="lg:col-span-7">
              <GlowCard
                title="Simple, honest, and done with care"
                desc="Around here, your name matters. That’s why we keep things straightforward: fair pricing, clear communication, and quality work you don’t have to redo."
              >
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Whether it’s a driveway, trenching, grading, or site prep, we
                  treat your property with respect and keep the job moving. Our
                  goal is to be the contractor you feel comfortable calling
                  again—and recommending.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm font-semibold text-white">
                      What you can expect
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-white/70">
                      <li>• Dependable scheduling & follow-through</li>
                      <li>• Clean work areas and careful equipment movement</li>
                      <li>• Proper slope, drainage, and base preparation</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm font-semibold text-white">Good fit for</p>
                    <ul className="mt-2 space-y-2 text-sm text-white/70">
                      <li>• Homeowners</li>
                      <li>• Farmers & landowners</li>
                      <li>• Local builders & contractors</li>
                      <li>• Small commercial owners</li>
                    </ul>
                  </div>
                </div>
              </GlowCard>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/workerstemp.jpg"
                    alt="Thacker Excavating equipment on site in Coffeen, IL"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* optional dark overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/workerstogether.jpeg"
                    alt="Thacker Excavating equipment on site in Coffeen, IL"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* optional dark overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                </div>
              </div>
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* ABOUT (v2) */}
      <AnimatedSection id="about" className="border-t border-white/10">
        <Container>
          <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <SectionTitle
                eyebrow="About"
                title="Precision first. No surprises."
                subtitle={`Based in ${CITY}, we run a focused crew that sets grades, protects access, and leaves a clean finish.`}
              />
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className="mt-6 space-y-4 text-sm text-white/70"
              >
                <p>
                  We map the job before we move equipment. That means confirming
                  elevations, utility locates, access, and where material will go.
                </p>
                <p>
                  The result is a tidy site and a finish that is ready for the next
                  trade or final use.
                </p>
              </motion.div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Clear scope and schedule",
                  "Clean edges and haul paths",
                  "Drainage-minded grading",
                  "Respectful site care",
                ].map((item, idx) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                    transition={{ duration: 0.5, ease: EASE_OUT, delay: idx * 0.04 }}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Scope-first planning",
                    desc: "Access, elevations, haul paths, and finish targets are defined before work starts.",
                  },
                  {
                    title: "Clean site discipline",
                    desc: "Orderly work zones with controlled equipment movement and tidy edges.",
                  },
                  {
                    title: "Grade accuracy",
                    desc: "We set final grades to move water and keep bases stable.",
                  },
                  {
                    title: "Straight scheduling",
                    desc: "A clear work window and steady updates as the job progresses.",
                  },
                ].map((item, idx) => (
                  <GlowCard
                    key={item.title}
                    title={item.title}
                    desc={item.desc}
                    delay={0.05 + idx * 0.04}
                  />
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src="/images/workerstemp.jpg"
                      alt="Thacker Excavating team on site in Coffeen, IL"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  </div>
                  <motion.div
                    aria-hidden
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                    className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-emerald-400/60 via-white/10 to-transparent"
                  />
                  <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                    On site
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.05 }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src="/images/workerstogether.jpeg"
                      alt="Thacker Excavating crew coordinating work in Coffeen, IL"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  </div>
                  <motion.div
                    aria-hidden
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                    transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
                    className="absolute inset-0 bg-[radial-gradient(220px_120px_at_70%_20%,rgba(16,185,129,0.18),transparent_70%)]"
                  />
                  <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                    Crew
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* SERVICES */}
      <AnimatedSection id="services" className="border-t border-white/10">
        <Container>
          <div className="py-10 sm:py-12">
            <SectionTitle
              eyebrow="Services"
              title="Straightforward excavation and site work."
              subtitle="Not sure what you need? Tell us what you’re building or fixing—we’ll help scope it out."
            />

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
              Looking for a service you do not see here? We offer more options
              on our full services page.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s, idx) => (
                <GlowCard
                  key={s.title}
                  title={s.title}
                  desc={s.desc}
                  delay={0.05 + idx * 0.04}
                />
              ))}
            </div>

            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
              whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: reduce ? 0 : 0.6, ease: EASE_OUT, delay: 0.06 }}
              className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.06] via-white/[0.04] to-emerald-400/[0.08] p-6"
            >
              <div className="grid gap-5 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                    More Services Available
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    Need something not shown above?
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    Visit the full services page to see additional excavation,
                    grading, and site prep options.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
                  <SecondaryButton href="/services">View All Services</SecondaryButton>
                  <PrimaryButton href="#estimate">Get Estimate</PrimaryButton>
                </div>
              </div>
            </motion.div>

            <div className="mt-6 grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/servicespage.jpg"
                    alt="Thacker Excavating equipment on site in Coffeen, IL"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* optional dark overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                </div>
              </div>
              </div>
              <div className="lg:col-span-5">
                <GlowCard
                  title="Our approach"
                  desc="We focus on the parts that make the job last—proper base prep, correct slope, and tidy finish work."
                  delay={0.06}
                >
                  <p className="text-sm leading-relaxed text-white/70">
                    It’s the difference between “looks fine today” and “holds up
                    for years.”
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <div className="w-full sm:w-auto">
                      <PrimaryButton href={`tel:${PHONE_TEL}`}>
                        Call {PHONE_DISPLAY}
                      </PrimaryButton>
                    </div>
                    <SecondaryButton href="#estimate">Get a Quote</SecondaryButton>
                  </div>
                </GlowCard>
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* WHY US */}
      <AnimatedSection className="border-t border-white/10">
        <Container>
          <div className="py-10 sm:py-12">
            <SectionTitle
              eyebrow="Why us"
              title="The kind of contractor you don’t have to worry about."
              subtitle="Professional work, friendly communication, and a reputation built right here in the community."
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Licensed & insured",
                  desc: "Protected, accountable, and handled the right way.",
                },
                {
                  title: "Honest pricing",
                  desc: "Clear estimates and straight answers—no pressure.",
                },
                {
                  title: "On-time completion",
                  desc: "We respect your schedule and keep the job moving.",
                },
                {
                  title: "Local reputation",
                  desc: "Known for clean, dependable work in and around Coffeen.",
                },
              ].map((w, idx) => (
                <GlowCard
                  key={w.title}
                  title={w.title}
                  desc={w.desc}
                  delay={0.05 + idx * 0.04}
                />
              ))}
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* SERVICE AREA */}
      <AnimatedSection className="border-t border-white/10">
        <Container>
          <div className="grid gap-8 py-10 sm:py-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <SectionTitle
                eyebrow="Service area"
                title="Coffeen and surrounding communities."
                subtitle="If you’re nearby, there’s a good chance we can help. Call to confirm scheduling."
              />
            </div>

            <div className="lg:col-span-7">
              <GlowCard
                title="Local service that keeps it simple"
                desc="We serve homeowners, farms, and small commercial properties throughout the area."
              >
                <p className="text-sm leading-relaxed text-white/70">
                  If you want, list nearby towns here for extra local SEO.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm font-semibold text-white">Great for</p>
                    <ul className="mt-2 space-y-2 text-sm text-white/70">
                      <li>• Driveways & culverts</li>
                      <li>• House pads & additions</li>
                      <li>• Utility trenches</li>
                      <li>• Drainage correction</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm font-semibold text-white">
                      Typical clients
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-white/70">
                      <li>• Homeowners</li>
                      <li>• Farmers & landowners</li>
                      <li>• Builders & contractors</li>
                      <li>• Small businesses</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/62049.png"
                    alt="Thacker Excavating equipment on site in Coffeen, IL"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* optional dark overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                </div>
              </div>
                </div>
              </GlowCard>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* REVIEWS (v2) */}
      <AnimatedSection id="testimonials" className="border-t border-white/10">
        <Container>
          <div className="py-10 sm:py-12">
            <SectionTitle
              eyebrow="Reviews"
              title="Feedback that speaks to the work."
              subtitle="Clear scope, clean finishes, and steady communication. Replace these with your real reviews anytime."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { value: "2 days", label: "Typical start window" },
                { value: "Tight", label: "Final grade tolerance" },
                { value: "Clean", label: "Site handoff standard" },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.55, ease: EASE_OUT, delay: idx * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center"
                >
                  <div className="text-xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/55">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={`${t.name}-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.04 + i * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_1px_0_rgba(255,255,255,0.06)]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -top-16 -left-20 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
                    <div className="absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-lime-300/10 blur-3xl" />
                  </div>
                  <div className="relative">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                      {t.meta}
                    </div>
                    <h3 className="mt-2 text-base font-semibold text-white">
                      {t.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/75">
                      “{t.quote}”
                    </p>
                    <motion.div
                      aria-hidden
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 + i * 0.05 }}
                      className="mt-6 h-px w-full origin-left bg-gradient-to-r from-emerald-400/50 via-white/10 to-transparent"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/excavating.webp"
                    alt="Thacker Excavating equipment on site in Coffeen, IL"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                </div>
                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                  Recent work
                </div>
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* TESTIMONIALS */}
      <AnimatedSection className="hidden border-t border-white/10">
        <Container>
          <div className="py-12 sm:py-14">
            <SectionTitle
              eyebrow="Word of mouth"
              title="Neighbors notice good work."
              subtitle="Replace these with real reviews as you collect them."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <GlowCard
                  key={`${t.name}-${i}`}
                  title={t.name}
                  desc={t.meta}
                  delay={0.04 + i * 0.04}
                >
                  <p className="text-sm leading-relaxed text-white/75">
                    “{t.quote}”
                  </p>
                </GlowCard>
              ))}
            </div>

            <div className="mt-8">
<div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/excavating.webp"
                    alt="Thacker Excavating equipment on site in Coffeen, IL"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* optional dark overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection id="estimate" className="border-t border-white/10">
        <Container>
          <div className="py-10 sm:py-12">
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
                  title="Tell us what you’re working on—let’s get it done the right way."
                  subtitle="Call for a quick conversation or send an estimate request. We’ll get back to you promptly."
                />

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <div className="w-full sm:w-auto">
                    <PrimaryButton href={`tel:${PHONE_TEL}`}>
                      Call Now: {PHONE_DISPLAY}
                    </PrimaryButton>
                  </div>
                  <SecondaryButton href="/contact">Request an Estimate</SecondaryButton>
                </div>

              </div>
            </motion.div>
          </div>
        </Container>
      </AnimatedSection>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <Container>
          <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold">{BUSINESS}</div>
              <div className="mt-1 text-sm text-white/60">{CITY}</div>
              <div className="mt-2 flex flex-wrap gap-3 text-sm">
                <motion.a
                  whileHover={reduce ? {} : { y: -2 }}
                  whileTap={reduce ? {} : { scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 520, damping: 32 }}
                  className="text-white/85 underline-offset-4 hover:underline"
                  href={`tel:${PHONE_TEL}`}
                >
                  {PHONE_DISPLAY}
                </motion.a>
                <span className="text-white/25">•</span>
                <motion.div
                  whileHover={reduce ? {} : { y: -2 }}
                  transition={{ type: "spring", stiffness: 520, damping: 32 }}
                >
                  <Link
                    className="text-white/85 underline-offset-4 hover:underline"
                    href="/contact"
                  >
                    Request an estimate
                  </Link>
                </motion.div>
              </div>
            </div>

            <div className="text-xs text-white/55">
              © {new Date().getFullYear()} {BUSINESS}. All rights reserved.
              <div className="mt-2">
                Proud to serve our neighbors—honest work, clean results.
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </main>
  );
}
