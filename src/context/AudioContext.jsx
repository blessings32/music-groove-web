import { createContext, useContext, useEffect, useState, useRef } from "react";
import QueueManager from "../audio/queueManager.js";
import AudioEngine from "../audio/AudioEngine";
import { on, off, AUDIO_EVENTS } from "../audio/audioEvents.js";
import axios from "../lib/axios.js";
const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const queueRef = useRef(
    new QueueManager({
      fetchMore: async () => {
        const res = await axios.get("api/tracks/suggested/");
        return res.data.data;
      },
    }),
  );

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);

  const handleNext = async () => {
    const nextTrack = await queueRef.current.next();
    if (nextTrack) {
      AudioEngine.play(nextTrack);
    }
  };
  const handlePrev = () => {
    const prevTrack = queueRef.current.prev();

    if (prevTrack) {
      AudioEngine.play(prevTrack);
    }
  };
  useEffect(() => {
    const handleEnded = async () => {
      const nextTrack = await handleNext();

      if (nextTrack) {
        AudioEngine.play(nextTrack);
      }
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTrack = (track) => {
      setCurrentTrack(track);
    };
    const handleTime = ({ currentTime, duration }) => {
      setCurrentTime(currentTime);
      setDuration(duration);
    };
    const handleRepeat = (isEnabled) => setIsRepeatEnabled(isEnabled);
    const handleVolume = (vol) => {
      setVolume(vol);
    };
    on(AUDIO_EVENTS.PLAY, handlePlay);
    on(AUDIO_EVENTS.PAUSE, handlePause);
    on(AUDIO_EVENTS.TRACK, handleTrack);
    on(AUDIO_EVENTS.TIME, handleTime);
    on(AUDIO_EVENTS.REPEAT, handleRepeat);
    on(AUDIO_EVENTS.VOLUME, handleVolume);
    on(AUDIO_EVENTS.ENDED, handleEnded);

    return () => {
      off(AUDIO_EVENTS.PLAY, handlePlay);
      off(AUDIO_EVENTS.PAUSE, handlePause);
      off(AUDIO_EVENTS.TRACK, handleTrack);
      off(AUDIO_EVENTS.TIME, handleTime);
      off(AUDIO_EVENTS.REPEAT, handleRepeat);
      off(AUDIO_EVENTS.VOLUME, handleVolume);
      off(AUDIO_EVENTS.ENDED, handleEnded);
    };
  }, []);
  const toggleShuffle = () => {
    return queueRef.current.toggleShuffle();
  };
  const api = {
    initializeQueue: (tracks) => {
      queueRef.current.load(tracks);
    },
    next: async () => {
      handleNext();
    },
    prev: () => {
      handlePrev();
    },
    play: (track) => AudioEngine.play(track),
    pause: () => AudioEngine.pause(),
    resume: () => AudioEngine.resume(),
    seek: (time) => {
      AudioEngine.seek(time);
    },
    toggleShuffle: () => toggleShuffle(),
    setVolume: (vol) => AudioEngine.setVolume(vol),
    toggleRepeat: () => {
      queueRef.current.setRepeat();
    },
  };

  return (
    <AudioContext.Provider
      value={{
        ...api,
        queueRef,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isRepeatEnabled,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export function useAudio() {
  return useContext(AudioContext);
}
