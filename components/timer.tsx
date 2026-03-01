"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function Timer({
  visible,
  onToggle,
  durationSeconds,
  slideId,
  slideName,
}: {
  visible: boolean;
  onToggle: () => void;
  /** Total countdown duration for the current slide */
  durationSeconds: number;
  /** Unique slide identifier -- changing this resets and auto-starts the timer */
  slideId: string;
  /** Human-readable slide name for the label */
  slideName: string;
}) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const [running, setRunning] = useState(true);
  const prevSlideId = useRef(slideId);

  // Reset and auto-start when the slide changes
  useEffect(() => {
    if (prevSlideId.current !== slideId) {
      prevSlideId.current = slideId;
      setSecondsLeft(durationSeconds);
      setRunning(true);
    }
  }, [slideId, durationSeconds]);

  // Tick the countdown
  useEffect(() => {
    if (!running || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [running, secondsLeft]);

  const reset = useCallback(() => {
    setRunning(false);
    setSecondsLeft(durationSeconds);
  }, [durationSeconds]);

  const toggleRunning = useCallback(() => {
    setRunning((r) => !r);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progress = 1 - secondsLeft / durationSeconds;
  const isLow = secondsLeft <= Math.min(60, durationSeconds * 0.15) && secondsLeft > 0;
  const isFinished = secondsLeft <= 0;

  if (!visible) return null;

  return (
    <div className="fixed right-6 top-6 z-50 flex flex-col items-end gap-2">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3 shadow-sm">
        <div className="flex flex-col items-end">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            {slideName}
          </span>
          <span
            className={`font-mono text-3xl font-semibold tabular-nums ${
              isFinished
                ? "animate-pulse text-destructive"
                : isLow
                  ? "text-destructive"
                  : "text-foreground"
            }`}
          >
            {isFinished
              ? "00:00"
              : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <button
            onClick={toggleRunning}
            disabled={isFinished}
            className="rounded-md bg-accent px-3 py-1 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50"
            aria-label={running ? "Pause timer" : "Start timer"}
          >
            {running ? "Pause" : "Start"}
          </button>
          <button
            onClick={reset}
            className="rounded-md border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary"
            aria-label="Reset timer"
          >
            Reset
          </button>
        </div>
      </div>
      {/* Progress bar */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isFinished || isLow ? "bg-destructive" : "bg-accent"
          }`}
          style={{ width: `${Math.min(progress, 1) * 100}%` }}
        />
      </div>
      {/* Close button */}
      <button
        onClick={onToggle}
        className="text-xs text-muted-foreground hover:text-foreground"
        aria-label="Hide timer"
      >
        Hide (T)
      </button>
    </div>
  );
}
