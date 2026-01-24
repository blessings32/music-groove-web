import { createContext, useContext, useEffect, useState } from "react";

import AudioEngine from "../audio/AudioEngine";
import { on, off, AUDIO_EVENTS } from "../audio/audioEvents.js";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);

  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTrack = (track) => setCurrentTrack(track);
    const handleTime = ({ currentTime, duration }) => {
      setCurrentTime(currentTime);
      setDuration(duration);
    };
    const handleRepeat = (isEnabled) => setIsRepeatEnabled(isEnabled);
    //const handleVolume = (vol) => setVolume(vol);
    on(AUDIO_EVENTS.PLAY, handlePlay);
    on(AUDIO_EVENTS.PAUSE, handlePause);
    on(AUDIO_EVENTS.TRACK, handleTrack);
    on(AUDIO_EVENTS.TIME, handleTime);
    on(AUDIO_EVENTS.REPEAT, handleRepeat);
    //on(AUDIO_EVENTS.VOLUME, handleVolume);

    return () => {
      off(AUDIO_EVENTS.PLAY, handlePlay);
      off(AUDIO_EVENTS.PAUSE, handlePause);
      off(AUDIO_EVENTS.TRACK, handleTrack);
      off(AUDIO_EVENTS.TIME, handleTime);
      off(AUDIO_EVENTS.REPEAT, handleRepeat);
      //off(AUDIO_EVENTS.VOLUME, handleVolume);
    };
  }, []);

  const api = {
    play: (track) => AudioEngine.play(track),
    pause: () => AudioEngine.pause(),
    resume: () => AudioEngine.resume(),
    seek: (time) => {
      AudioEngine.seek(time);
    },
    setVolume: (vol) => AudioEngine.setVolume(vol),
    toggleRepeat: () => AudioEngine.toggleRepeat(),
  };

  return (
    <AudioContext.Provider
      value={{
        ...api,
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
