import { emit, AUDIO_EVENTS } from "../audio/audioEvents";
import { toAbsolutePath } from "../lib/utils.js";

class AudioEngine {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = "metadata";
    this.currentTrack = null;
    this.repeatEnabled = false;

    // Event listeners
    this.audio.addEventListener("play", () => {
      emit(AUDIO_EVENTS.PLAY);
    });

    this.audio.addEventListener("pause", () => {
      emit(AUDIO_EVENTS.PAUSE);
    });

    this.audio.addEventListener("timeupdate", () => {
      emit(AUDIO_EVENTS.TIME, {
        currentTime: this.audio.currentTime,
        duration: this.audio.duration || 0,
      });
    });

    this.audio.addEventListener("ended", () => {
      emit(AUDIO_EVENTS.ENDED);
      if (this.repeatEnabled) {
        this.audio.currentTime = 0;
        this.audio.play();
      }
    });
  }
  play(track) {
    if (!track || !track.location) {
      console.error("Invalid track or missing location:", track);
      return;
    }

    if (this.currentTrack?.track_id !== track.track_id) {
      this.currentTrack = track;
      this.audio.src = toAbsolutePath(track.location);
      emit(AUDIO_EVENTS.TRACK, track);
    }

    this.audio.play();
  }

  seek(time) {
    this.audio.currentTime = time;
    emit(AUDIO_EVENTS.TIME, {
      currentTime: this.audio.currentTime,
      duration: this.audio.duration || 0,
    });
  }
  pause() {
    this.audio.pause();
  }

  resume() {
    this.audio.play();
  }
  setVolume(volume) {
    this.audio.volume = volume;
    emit(AUDIO_EVENTS.VOLUME, this.audio.volume);
  }
  toggleRepeat() {
    this.repeatEnabled = !this.repeatEnabled;
    emit(AUDIO_EVENTS.REPEAT, this.repeatEnabled);
  }
}

export default new AudioEngine();
