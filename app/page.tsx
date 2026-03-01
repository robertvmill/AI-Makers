"use client";

import { useState, useEffect, useCallback } from "react";
import { slides } from "@/components/slides";
import { Timer } from "@/components/timer";
import { LinksPanel } from "@/components/links-panel";

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timerVisible, setTimerVisible] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);

  const totalSlides = slides.length;

  const goNext = useCallback(() => {
    setCurrentSlide((s) => Math.min(s + 1, totalSlides - 1));
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setCurrentSlide((s) => Math.max(s - 1, 0));
  }, []);

  const toggleTimer = useCallback(() => {
    setTimerVisible((v) => !v);
  }, []);

  const toggleLinks = useCallback(() => {
    setLinksVisible((v) => !v);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "t" || e.key === "T") {
        toggleTimer();
      } else if (e.key === "l" || e.key === "L") {
        toggleLinks();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, toggleTimer, toggleLinks]);

  return (
    <main className="relative flex h-screen w-screen flex-col overflow-hidden bg-background">
      {/* Slide content */}
      <div className="flex-1 overflow-hidden">
        {slides[currentSlide].content}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between border-t border-border bg-card px-6 py-3">
        {/* Left: controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTimer}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
              timerVisible
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted-foreground hover:bg-secondary"
            }`}
            aria-label="Toggle timer"
          >
            Timer (T)
          </button>
          <button
            onClick={toggleLinks}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
              linksVisible
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted-foreground hover:bg-secondary"
            }`}
            aria-label="Toggle links panel"
          >
            Links (L)
          </button>
        </div>

        {/* Center: navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={goPrev}
            disabled={currentSlide === 0}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Previous slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 4l-6 6 6 6" />
            </svg>
          </button>
          <span className="min-w-[4rem] text-center font-mono text-sm tabular-nums text-muted-foreground">
            {currentSlide + 1} / {totalSlides}
          </span>
          <button
            onClick={goNext}
            disabled={currentSlide === totalSlides - 1}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Next slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 4l6 6-6 6" />
            </svg>
          </button>
        </div>

        {/* Right: progress */}
        <div className="flex items-center gap-3">
          <div className="h-1 w-24 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent transition-all duration-300"
              style={{
                width: `${((currentSlide + 1) / totalSlides) * 100}%`,
              }}
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {Math.round(((currentSlide + 1) / totalSlides) * 100)}%
          </span>
        </div>
      </div>

      {/* Timer overlay -- resets & auto-starts on each slide change */}
      <Timer
        visible={timerVisible}
        onToggle={toggleTimer}
        durationSeconds={slides[currentSlide].durationSeconds}
        slideId={slides[currentSlide].id}
        slideName={slides[currentSlide].id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      />

      {/* Links panel */}
      <LinksPanel visible={linksVisible} onToggle={toggleLinks} />
    </main>
  );
}
