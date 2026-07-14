import { useRef, useCallback, useState, useEffect } from "react";

export function useSpeakerAudio() {
  const audioElRef = useRef(null);
  const analyserRef = useRef(null);
  const dataRef = useRef(null);
  const trackRef = useRef(null);
  const tracksRef = useRef(null); // cache the fetched list
  const ctxRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePauseRef = useRef(() => setIsPlaying(false));
  const handlePlayRef = useRef(() => setIsPlaying(true));
  const handleEndedRef = useRef();

  const loadTracks = useCallback(async () => {
    if (!tracksRef.current) {
      const res = await fetch(`${import.meta.env.BASE_URL}audio/tracks.json`);
      tracksRef.current = await res.json();
    }
    return tracksRef.current;
  }, []);

  const pickNextTrack = useCallback((tracks) => {
    if (tracks.length === 1) return tracks[0];
    let next;
    do {
      next = tracks[Math.floor(Math.random() * tracks.length)];
    } while (next.id === trackRef.current?.id); // avoid immediate repeat
    return next;
  }, []);

  const playTrack = useCallback((track) => {
    // clean up listeners on the previous element before swapping
    if (audioElRef.current) {
      audioElRef.current.removeEventListener("ended", handleEndedRef.current);
      audioElRef.current.removeEventListener("pause", handlePauseRef.current);
      audioElRef.current.removeEventListener("play", handlePlayRef.current);
    }

    trackRef.current = track;

    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const audioEl = new Audio(track.src);
    audioElRef.current = audioEl;

    const source = ctxRef.current.createMediaElementSource(audioEl);
    const analyser = ctxRef.current.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyser.connect(ctxRef.current.destination);

    analyserRef.current = analyser;
    dataRef.current = new Uint8Array(analyser.frequencyBinCount);

    audioEl.addEventListener("ended", handleEndedRef.current);
    audioEl.addEventListener("pause", handlePauseRef.current);
    audioEl.addEventListener("play", handlePlayRef.current);

    audioEl.play();
    setIsPlaying(true);
  }, []);

  const advanceToNext = useCallback(async () => {
    const tracks = await loadTracks();
    playTrack(pickNextTrack(tracks));
  }, [loadTracks, pickNextTrack, playTrack]);

  handleEndedRef.current = advanceToNext; // keep it current without changing identity

  const toggle = useCallback(async () => {
    // Nothing loaded yet — start the shuffle
    if (!audioElRef.current) {
      const tracks = await loadTracks();
      playTrack(pickNextTrack(tracks));
      return;
    }
    // Something loaded — just pause/resume it, never swap tracks
    if (isPlaying) {
      audioElRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying, loadTracks, pickNextTrack, playTrack]);

  // cleanup the 'ended' listener when a track is swapped/unmounted
  useEffect(() => {
    return () => {
      audioElRef.current?.removeEventListener("ended", handleEndedRef.current);
      audioElRef.current?.removeEventListener("pause", handlePauseRef.current);
      audioElRef.current?.removeEventListener("play", handlePlayRef.current);
    };
  }, []);

  const getLevel = useCallback(() => {
    if (!analyserRef.current) return 0;
    analyserRef.current.getByteFrequencyData(dataRef.current);
    const sum = dataRef.current.reduce((a, b) => a + b, 0);
    return sum / dataRef.current.length / 255;
  }, []);

  return {
    toggle,
    getLevel,
    isPlaying,
    audioEl: audioElRef.current,
    currentTrack: () => trackRef.current,
  };
}
