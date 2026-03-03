"use client";

import { useState } from "react";

export interface SlideData {
  id: string;
  content: React.ReactNode;
  /** Duration in seconds for this slide's countdown timer */
  durationSeconds: number;
}

function SlideLayout({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center px-12 py-16 ${className}`}
    >
      {children}
    </div>
  );
}

function CouponCode() {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.toUpperCase() === "AIMAKERSVO") {
      setUnlocked(true);
    } else {
      setError(true);
    }
  }

  if (unlocked) {
    return (
      <div className="mt-8 flex flex-col items-center rounded-xl border-2 border-accent bg-accent/5 px-8 py-5">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Step 1 — Redeem your v0 credits
        </p>
        <code className="mt-2 text-3xl font-bold tracking-wider text-accent">
          AI-MAKERS-V0-1
        </code>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter this code at v0.dev to claim your 30 free credits
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col items-center rounded-xl border-2 border-border bg-card px-8 py-5">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Step 1 — Unlock your v0 credits
      </p>
      <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
        <input
          type="password"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false); }}
          placeholder="Enter password"
          className={`w-48 rounded-lg border bg-background px-3 py-2 text-center text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent ${
            error ? "border-destructive" : "border-border"
          }`}
        />
        <button
          type="submit"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
        >
          Unlock
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-destructive">Incorrect password</p>}
      <p className="mt-2 text-sm text-muted-foreground">
        Password will be shared during the session
      </p>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-6 inline-block rounded-full border border-border px-4 py-1.5 text-sm tracking-wide text-muted-foreground">
      {children}
    </span>
  );
}

function TitleSlide() {
  return (
    <SlideLayout>
      <Tag>MakersLounge Toronto</Tag>
      <h1 className="max-w-4xl text-balance text-center text-7xl font-semibold leading-tight tracking-tight text-foreground">
        AI Workshop for Software Developers
      </h1>
      <p className="mt-6 max-w-xl text-balance text-center text-xl leading-relaxed text-muted-foreground">
        Build real AI-powered apps in 90 minutes.
        <br />
        No experience required -- just curiosity.
      </p>
      <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
        <span>March 2, 2026</span>
        <span className="h-1 w-1 rounded-full bg-muted-foreground" />
        <span>7:00 - 8:30 PM ET</span>
        <span className="h-1 w-1 rounded-full bg-muted-foreground" />
        <span>Hosted by Robert Mill</span>
      </div>
    </SlideLayout>
  );
}

function AboutMakersLoungeSlide() {
  return (
    <SlideLayout>
      <Tag>Who We Are</Tag>
      <h2 className="max-w-3xl text-balance text-center text-5xl font-semibold leading-tight tracking-tight text-foreground">
        MakersLounge
      </h2>
      <p className="mt-4 max-w-2xl text-balance text-center text-xl leading-relaxed text-muted-foreground">
        Passionate people can change the world. {"We're"} here to enable them through community.
      </p>
      <div className="mt-10 grid max-w-4xl grid-cols-[1fr_1fr] gap-8">
        <div className="overflow-hidden rounded-xl border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/makerslounge-community.png"
            alt="MakersLounge community at a meetup"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-4">
          {[
            {
              title: "Everyone belongs here",
              desc: "First project or fiftieth — your experience level doesn't matter.",
            },
            {
              title: "No gatekeeping",
              desc: "If you're curious and want to create, you're one of us.",
            },
            {
              title: "Share early, share often",
              desc: "Your half-baked idea deserves to see the light.",
            },
            {
              title: "Real connections",
              desc: "We're about finding people you genuinely want to build with.",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <div>
                <span className="font-semibold text-card-foreground">{item.title}</span>
                <span className="ml-1 text-sm text-muted-foreground">{item.desc}</span>
              </div>
            </div>
          ))}
          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
            <span>500+ members</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground" />
            <span>Toronto-based</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground" />
            <span>Founded by Berto & Katy</span>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}

function WelcomeSlide() {
  return (
    <SlideLayout>
      <Tag>Welcome</Tag>
      <h2 className="max-w-3xl text-balance text-center text-5xl font-semibold leading-tight tracking-tight text-foreground">
        {"Tonight's Format"}
      </h2>
      <div className="mt-12 grid max-w-3xl grid-cols-3 gap-8">
        {[
          {
            time: "25 min",
            label: "Intro & Setup",
            desc: "Get to know each other, learn about v0, and get inspired",
          },
          {
            time: "55 min",
            label: "Build Time",
            desc: "Hands-on building with your $30 in v0 credits",
          },
          {
            time: "10 min",
            label: "Show & Tell",
            desc: "Share what you built and celebrate wins",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center"
          >
            <span className="text-sm font-medium text-accent">{item.time}</span>
            <h3 className="mt-2 text-lg font-semibold text-card-foreground">
              {item.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-lg text-muted-foreground">
        {"Drop where you're joining from in the chat!"}
      </p>
    </SlideLayout>
  );
}

function ParticipationSlide() {
  return (
    <SlideLayout>
      <Tag>Let{"'"}s Chat</Tag>
      <h2 className="max-w-3xl text-balance text-center text-5xl font-semibold leading-tight tracking-tight text-foreground">
        Quick Intros
      </h2>
      <div className="mt-12 flex max-w-2xl flex-col items-center gap-6">
        <div className="w-full rounded-xl border border-accent/20 bg-accent/5 p-8 text-center">
          <p className="text-2xl font-medium leading-relaxed text-foreground">
            {'"What\'s something you wish you could build?"'}
          </p>
        </div>
        <p className="text-lg text-muted-foreground">
          Drop your answer in the chat -- no idea is too big or too small.
        </p>
      </div>
    </SlideLayout>
  );
}

function AIStateSlide() {
  return (
    <SlideLayout>
      <Tag>The Landscape</Tag>
      <h2 className="max-w-3xl text-balance text-center text-5xl font-semibold leading-tight tracking-tight text-foreground">
        Where We Are with AI
      </h2>
      <div className="mt-12 grid max-w-3xl grid-cols-2 gap-6">
        {[
          {
            title: "AI builds full apps from a prompt",
            desc: "Not just code snippets -- entire working applications with UI, APIs, and databases.",
          },
          {
            title: "Ideas to products in minutes",
            desc: "The gap between having an idea and having a working prototype has nearly disappeared.",
          },
          {
            title: "No coding background needed",
            desc: "Natural language is becoming the new programming language. Describe what you want, get what you need.",
          },
          {
            title: "The best time to start is now",
            desc: "These tools are improving every week. Getting comfortable with them now gives you a real advantage.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="text-lg font-semibold text-card-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}

function WhatIsV0Slide() {
  return (
    <SlideLayout>
      <Tag>The Tool</Tag>
      <h2 className="max-w-3xl text-balance text-center text-5xl font-semibold leading-tight tracking-tight text-foreground">
        What is v0?
      </h2>
      <p className="mt-6 max-w-2xl text-balance text-center text-xl leading-relaxed text-muted-foreground">
        {"Vercel's AI-powered development tool that turns your ideas into working applications."}
      </p>
      <div className="mt-12 flex max-w-3xl flex-col gap-4">
        {[
          ["Prompt to app", "Describe what you want in plain English and get a working app"],
          ["Full-stack", "UI, APIs, databases, authentication -- all from one tool"],
          ["Iterate naturally", 'Refine by saying things like "make it darker" or "add a login page"'],
          ["One-click deploy", "Ship your project to a live URL instantly"],
        ].map(([title, desc]) => (
          <div
            key={title}
            className="flex items-start gap-4 rounded-lg border border-border bg-card px-6 py-4"
          >
            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
            <div>
              <span className="font-semibold text-card-foreground">{title}</span>
              <span className="ml-2 text-muted-foreground">{desc}</span>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}

function BranchingSlide() {
  return (
    <SlideLayout>
      <Tag>Git & v0</Tag>
      <h2 className="max-w-3xl text-balance text-center text-5xl font-semibold leading-tight tracking-tight text-foreground">
        Branching in v0
      </h2>
      <p className="mt-6 max-w-2xl text-balance text-center text-xl leading-relaxed text-muted-foreground">
        v0 connects to GitHub and makes branching effortless — no terminal needed.
      </p>
      <div className="mt-10 grid max-w-4xl grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-card-foreground">
            What are branches?
          </h3>
          <div className="flex flex-col gap-3">
            {[
              ["Parallel versions", "A branch is a separate copy of your project where you can make changes without affecting the original."],
              ["Safe experimentation", "Try new ideas freely. If it doesn't work, your main code is untouched."],
              ["main = your source of truth", "The main branch is your stable, working version. Everything else branches off from it."],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-lg border border-border bg-card px-5 py-3"
              >
                <span className="font-semibold text-card-foreground">{title}</span>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-card-foreground">
            How v0 makes it easy
          </h3>
          <div className="flex flex-col gap-3">
            {[
              ["Auto-creates branches", "Every v0 chat creates its own branch automatically — no git commands needed."],
              ["One-click PRs", "When you're happy with your changes, hit \"Open PR\" to merge them back to main."],
              ["Visual diffing", "See exactly what changed before you merge. No surprises."],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-lg border border-accent/20 bg-accent/5 px-5 py-3"
              >
                <span className="font-semibold text-card-foreground">{title}</span>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}

function CollaborationSlide() {
  return (
    <SlideLayout>
      <Tag>The Real Power</Tag>
      <h2 className="max-w-3xl text-balance text-center text-5xl font-semibold leading-tight tracking-tight text-foreground">
        Coders + Creators, One Project
      </h2>
      <p className="mt-6 max-w-2xl text-balance text-center text-xl leading-relaxed text-muted-foreground">
        {"This is where me and my partner found the most value. v0 bridges the gap between hardcore devs and low-code builders."}
      </p>
      <div className="mt-10 grid max-w-4xl grid-cols-3 gap-6">
        <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-2xl">
            {"</>"}
          </div>
          <h3 className="text-lg font-semibold text-card-foreground">The Coder</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Works in VS Code or Cursor. Writes custom logic, APIs, and complex features. Pushes code via Git.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-xl border-2 border-accent bg-accent/5 p-6 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-xl font-bold text-accent">
            v0
          </div>
          <h3 className="text-lg font-semibold text-card-foreground">The Bridge</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Same repo, same project. v0 creates branches automatically. Changes merge together through PRs.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-2xl">
            {"🎨"}
          </div>
          <h3 className="text-lg font-semibold text-card-foreground">The Creator</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Works in v0 with natural language. Builds UI, designs pages, and iterates visually. No terminal needed.
          </p>
        </div>
      </div>
      <div className="mt-8 max-w-2xl rounded-lg border border-border bg-card px-6 py-4 text-center">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-card-foreground">How it works: </span>
          {"The coder builds the backend and complex features in their IDE. The creator designs pages and components in v0. Both push to the same GitHub repo — v0 handles branching and merging automatically."}
        </p>
      </div>
    </SlideLayout>
  );
}

function V0TipsSlide() {
  return (
    <SlideLayout>
      <Tag>Pro Tips</Tag>
      <h2 className="max-w-3xl text-balance text-center text-5xl font-semibold leading-tight tracking-tight text-foreground">
        Getting the Most from v0
      </h2>
      <div className="mt-12 grid max-w-3xl grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-card-foreground">
            Write clear prompts
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {"Be specific about what you want. Instead of \"make a website\", try \"a landing page for a coffee shop with a menu section and contact form\"."}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-card-foreground">
            Iterate in small steps
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {"Build up your app gradually. Start simple, then add features one at a time: \"now add a dark mode toggle\" or \"make the header sticky\"."}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-card-foreground">
            Use images as input
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {"Screenshot a design you like and drop it into v0. It can recreate and adapt existing designs to your needs."}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-card-foreground">
            Deploy and share
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {"When you're happy with your build, hit Publish to get a live URL. Share it in the chat so everyone can see!"}
          </p>
        </div>
      </div>
    </SlideLayout>
  );
}

function TheProjectSlide() {
  return (
    <SlideLayout>
      <Tag>{"Tonight's Project"}</Tag>
      <h2 className="max-w-3xl text-balance text-center text-5xl font-semibold leading-tight tracking-tight text-foreground">
        The MakersLounge Community Wall
      </h2>
      <p className="mt-6 max-w-2xl text-balance text-center text-xl leading-relaxed text-muted-foreground">
        {"We're all building one site together. Each of you creates your own maker profile page — by the end of the night, we'll have a living directory of tonight's builders."}
      </p>
      <div className="mt-10 grid max-w-4xl grid-cols-3 gap-6">
        <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center">
          <span className="mb-2 text-3xl font-bold text-accent">20</span>
          <h3 className="text-lg font-semibold text-card-foreground">Makers</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Each person builds their own page
          </p>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center">
          <span className="mb-2 text-3xl font-bold text-accent">1</span>
          <h3 className="text-lg font-semibold text-card-foreground">Repo</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            All pages live in the same GitHub project
          </p>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center">
          <span className="mb-2 text-3xl font-bold text-accent">{"∞"}</span>
          <h3 className="text-lg font-semibold text-card-foreground">Value</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The more people build, the better it gets for everyone
          </p>
        </div>
      </div>
      <div className="mt-8 max-w-2xl rounded-lg border border-border bg-card px-6 py-4 text-center">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-card-foreground">Your page, your style. </span>
          {"Show off who you are — your name, what you're building, your skills, links, a fun fact. Make it yours."}
        </p>
      </div>
    </SlideLayout>
  );
}

function BuildTimeSlide() {
  return (
    <SlideLayout>
      <Tag>Build Time</Tag>
      <h2 className="max-w-3xl text-balance text-center text-5xl font-semibold leading-tight tracking-tight text-foreground">
        {"Let's Build!"}
      </h2>
      <CouponCode />
      <div className="mt-6 max-w-3xl">
        <div className="flex flex-col gap-3">
          {[
            {
              step: "2",
              title: "Fork the community wall repo",
              desc: "We'll drop the GitHub link in the chat. Connect it to v0.",
            },
            {
              step: "3",
              title: "Create your maker page",
              desc: "Build your profile page in v0 — your name, what you're building, skills, links, personality.",
            },
            {
              step: "4",
              title: "Open a PR when you're ready",
              desc: "Hit \"Open PR\" in v0 to merge your page into the community wall.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex items-start gap-4 rounded-lg border border-border bg-card px-5 py-3"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                {item.step}
              </span>
              <div>
                <span className="font-semibold text-card-foreground">{item.title}</span>
                <span className="ml-2 text-sm text-muted-foreground">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-8 text-lg font-medium text-accent">
        You have 55 minutes. Make it yours!
      </p>
    </SlideLayout>
  );
}

function ShowAndTellSlide() {
  return (
    <SlideLayout>
      <Tag>Show & Tell</Tag>
      <h2 className="max-w-3xl text-balance text-center text-5xl font-semibold leading-tight tracking-tight text-foreground">
        {"Let's See What You Built"}
      </h2>
      <div className="mt-12 flex max-w-2xl flex-col items-center gap-6">
        <div className="w-full rounded-xl border border-border bg-card p-8">
          <div className="flex flex-col gap-4">
            {[
              "Drop your v0 link in the chat",
              "Give us a 1-minute walkthrough",
              "Tell us what you'd add next",
            ].map((step, i) => (
              <div key={step} className="flex items-center gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                  {i + 1}
                </span>
                <span className="text-lg text-card-foreground">{step}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-muted-foreground">
          {"Every project is worth sharing -- no matter how simple or complex."}
        </p>
      </div>
    </SlideLayout>
  );
}

function WrapUpSlide() {
  return (
    <SlideLayout>
      <Tag>Thank You</Tag>
      <h2 className="max-w-3xl text-balance text-center text-5xl font-semibold leading-tight tracking-tight text-foreground">
        Keep Building
      </h2>
      <p className="mt-6 max-w-2xl text-balance text-center text-xl leading-relaxed text-muted-foreground">
        {"Tonight was just the start. The tools are only getting better, and this community is here to build together."}
      </p>
      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="rounded-xl border border-border bg-card px-8 py-6 text-center">
          <h3 className="text-lg font-semibold text-card-foreground">
            MakersLounge Toronto
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            500+ founders, developers, and artists building together
          </p>
          <p className="mt-3 text-sm text-accent">
            makerslounge.to
          </p>
        </div>
      </div>
      <p className="mt-10 text-center text-muted-foreground">
        Thanks for building with us tonight!
      </p>
    </SlideLayout>
  );
}

export const slides: SlideData[] = [
  { id: "title", content: <TitleSlide />, durationSeconds: 3 * 60 },
  { id: "about-makerslounge", content: <AboutMakersLoungeSlide />, durationSeconds: 3 * 60 },
  { id: "welcome", content: <WelcomeSlide />, durationSeconds: 3 * 60 },
  { id: "participation", content: <ParticipationSlide />, durationSeconds: 5 * 60 },
  { id: "ai-state", content: <AIStateSlide />, durationSeconds: 3 * 60 },
  { id: "what-is-v0", content: <WhatIsV0Slide />, durationSeconds: 3 * 60 },
  { id: "branching", content: <BranchingSlide />, durationSeconds: 3 * 60 },
  { id: "collaboration", content: <CollaborationSlide />, durationSeconds: 3 * 60 },
  { id: "v0-tips", content: <V0TipsSlide />, durationSeconds: 3 * 60 },
  { id: "the-project", content: <TheProjectSlide />, durationSeconds: 3 * 60 },
  { id: "build-time", content: <BuildTimeSlide />, durationSeconds: 55 * 60 },
  { id: "show-and-tell", content: <ShowAndTellSlide />, durationSeconds: 10 * 60 },
  { id: "wrap-up", content: <WrapUpSlide />, durationSeconds: 3 * 60 },
];
