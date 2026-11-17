import { useEffect, useRef, useState } from "react";
import { VolumeX } from "lucide-react";

/**
 * Background soundtrack for the StarSense case.
 * Drop the audio file at public/audio/starsense-theme.mp3.
 * Browsers block autoplay with sound, so playback starts on the first
 * click/tap/key (the intro's click-to-skip counts). Loops, fades in/out,
 * stops when leaving the page, and has a mute toggle.
 */

const SRC = "/audio/starsense-theme.mp3";
const TARGET_VOLUME = 0.35;
const FADE_MS = 2000;

const fade = (audio: HTMLAudioElement, to: number, ms: number, done?: () => void) => {
  const from = audio.volume;
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min((now - start) / ms, 1);
    audio.volume = from + (to - from) * t;
    if (t < 1) requestAnimationFrame(step);
    else done?.();
  };
  requestAnimationFrame(step);
};

const StarSenseAmbient = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [available, setAvailable] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem("starsense-muted") === "1";
    } catch {
      return false;
    }
  });
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  useEffect(() => {
    const audio = new Audio(SRC);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audioRef.current = audio;

    const onError = () => setAvailable(false);
    audio.addEventListener("error", onError);

    const start = () => {
      if (mutedRef.current) return;
      audio
        .play()
        .then(() => {
          setPlaying(true);
          setBlocked(false);
          window.dispatchEvent(new Event("starsense-audio-playing"));
          fade(audio, TARGET_VOLUME, FADE_MS);
          removeGestures();
        })
        .catch(() => {
          // Browser blocked autoplay: wait for the first click/tap/key.
          setBlocked(true);
          window.dispatchEvent(new Event("starsense-audio-blocked"));
        });
    };

    const events = ["pointerdown", "mousedown", "click", "keydown", "touchstart", "touchend"] as const;
    const removeGestures = () => events.forEach((e) => window.removeEventListener(e, start));
    events.forEach((e) => window.addEventListener(e, start));
    start();

    return () => {
      removeGestures();
      audio.removeEventListener("error", onError);
      fade(audio, 0, 400, () => {
        audio.pause();
        audio.src = "";
      });
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    setMuted(next);
    try {
      localStorage.setItem("starsense-muted", next ? "1" : "0");
    } catch {
      /* ignore */
    }
    if (next) {
      fade(audio, 0, 500, () => audio.pause());
      setPlaying(false);
    } else {
      audio.play().then(() => {
        setPlaying(true);
        fade(audio, TARGET_VOLUME, 800);
      }).catch(() => {});
    }
  };

  if (!available) return null;

  const label = playing ? "Desligar som" : "Ligar som";

  return (
    <>
      <style>{`
        @keyframes ss-eq { 0%,100% { transform: scaleY(.35) } 50% { transform: scaleY(1) } }
        .ss-eq-bar { transform-origin: bottom; animation: ss-eq 1.1s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .ss-eq-bar { animation: none; transform: scaleY(.6) } }
      `}</style>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={!playing}
        aria-label={label}
        title={label}
        className="group fixed bottom-5 left-5 z-[90] flex h-10 items-center gap-0 overflow-hidden rounded-full border border-white/10 bg-[#070B1A]/60 pl-[11px] pr-[11px] text-[#5CC8FF] opacity-60 shadow-[0_0_20px_rgba(92,200,255,0.15)] backdrop-blur-md transition-all duration-300 hover:gap-2 hover:border-[#5CC8FF]/50 hover:pr-4 hover:opacity-100 focus-visible:gap-2 focus-visible:pr-4 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5CC8FF]"
      >
        {playing ? (
          <span className="flex h-4 w-4 items-end justify-center gap-[2px]" aria-hidden="true">
            {[0, 0.25, 0.5, 0.15].map((d, i) => (
              <span key={i} className="ss-eq-bar block h-4 w-[2.5px] rounded-full bg-[#5CC8FF]" style={{ animationDelay: `${d}s` }} />
            ))}
          </span>
        ) : (
          <VolumeX className="h-4 w-4 text-[#A8C8FF]" aria-hidden="true" />
        )}
        <span className="max-w-0 whitespace-nowrap text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 group-hover:max-w-[8rem] group-focus-visible:max-w-[8rem]">
          {label}
        </span>
      </button>
      {blocked && !muted && !playing && (
        <span
          aria-hidden="true"
          className="pointer-events-none fixed bottom-[1.6rem] left-[4.25rem] z-[90] animate-pulse whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#A8C8FF]/80"
        >
          Clique na página para ouvir
        </span>
      )}
    </>
  );
};

export default StarSenseAmbient;
