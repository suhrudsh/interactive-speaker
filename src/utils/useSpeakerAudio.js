import { useRef, useCallback, useState, useEffect } from "react";

export function useSpeakerAudio() {
  const [audioEl, setAudioEl] = useState(null);
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
    if (audioEl) {
      audioEl.removeEventListener("ended", handleEndedRef.current);
      audioEl.removeEventListener("pause", handlePauseRef.current);
      audioEl.removeEventListener("play", handlePlayRef.current);
    }

    trackRef.current = track;

    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const newAudioEl = new Audio(track.src);

    const source = ctxRef.current.createMediaElementSource(newAudioEl);
    const analyser = ctxRef.current.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyser.connect(ctxRef.current.destination);

    analyserRef.current = analyser;
    dataRef.current = new Uint8Array(analyser.frequencyBinCount);

    newAudioEl.addEventListener("ended", handleEndedRef.current);
    newAudioEl.addEventListener("pause", handlePauseRef.current);
    newAudioEl.addEventListener("play", handlePlayRef.current);

    newAudioEl.play();
    setIsPlaying(true);
    setAudioEl(newAudioEl);
  }, []);

  const advanceToNext = useCallback(async () => {
    const tracks = await loadTracks();
    playTrack(pickNextTrack(tracks));
  }, [loadTracks, pickNextTrack, playTrack]);

  handleEndedRef.current = advanceToNext; // keep it current without changing identity

  const handleAudioToggle = useCallback(async () => {
    // Nothing loaded yet — start the shuffle
    if (!audioEl) {
      const tracks = await loadTracks();
      playTrack(pickNextTrack(tracks));
      return;
    }
    // Something loaded — just pause/resume it, never swap tracks
    if (isPlaying) {
      audioEl.pause();
      setIsPlaying(false);
    } else {
      audioEl.play();
      setIsPlaying(true);
    }
  }, [isPlaying, loadTracks, pickNextTrack, playTrack]);

  // cleanup the 'ended' listener when a track is swapped/unmounted
  useEffect(() => {
    return () => {
      audioEl?.removeEventListener("ended", handleEndedRef.current);
      audioEl?.removeEventListener("pause", handlePauseRef.current);
      audioEl?.removeEventListener("play", handlePlayRef.current);
    };
  }, [audioEl]);

  const getLevel = useCallback(() => {
    if (!analyserRef.current) return 0;
    analyserRef.current.getByteFrequencyData(dataRef.current);
    const sum = dataRef.current.reduce((a, b) => a + b, 0);
    return sum / dataRef.current.length / 255;
  }, []);

  return {
    handleAudioToggle,
    getLevel,
    isPlaying,
    audioEl,
    currentTrack: () => trackRef.current,
  };
}
