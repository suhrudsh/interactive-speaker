import { useEffect, useState } from "react";

export function SongDetails({ audioEl, track, isPlaying }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!audioEl) return;

    function handleTimeUpdate() {
      if (!audioEl.duration) return;
      setProgress(audioEl.currentTime / audioEl.duration);
    }

    setProgress(0);
    audioEl.addEventListener("timeupdate", handleTimeUpdate);
    return () => audioEl.removeEventListener("timeupdate", handleTimeUpdate);
  }, [audioEl]);

  if (!track) return null;

  return (
    <div className="absolute top-4 left-1/2 z-10 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col justify-center gap-2 rounded-xl bg-neutral-800/90 p-4 sm:left-4 sm:w-auto sm:max-w-none sm:min-w-80 sm:translate-x-0 sm:gap-4 sm:p-6">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.75">
          <span
            className="eq-bar w-0.75 rounded-full bg-[#00C2FF]"
            style={{
              animationDelay: "0s",
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          />
          <span
            className="eq-bar w-0.75 rounded-full bg-[#00C2FF]"
            style={{
              animationDelay: "0.2s",
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          />
          <span
            className="eq-bar w-0.75 rounded-full bg-[#1500CA]"
            style={{
              animationDelay: "0.4s",
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          />
          <span
            className="eq-bar w-0.75 rounded-full bg-[#00C2FF]"
            style={{
              animationDelay: "0.1s",
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          />
        </div>
        <span className="text-[11px] tracking-wider text-neutral-400 uppercase">
          {isPlaying ? "Now playing" : "Paused"}
        </span>
      </div>

      <div className="flex flex-col">
        <p className="font-serif text-lg leading-tight font-medium text-pretty text-neutral-100 sm:text-xl">
          {track.title}
        </p>
        <p className="text-sm text-neutral-400">{track.artist}</p>
      </div>
      <div className="h-1.25 w-full overflow-hidden rounded-full bg-neutral-700/50">
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, #00C2FF, #1500CA)",
          }}
        />
      </div>
    </div>
  );
}
