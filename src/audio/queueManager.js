class QueueManager {
  constructor({ fetchMore } = {}) {
    this.past = [];
    this.current = null;
    this.playlistId = "Default";
    this.upcoming = [];
    this.counter = 0;
    this.playlistOffset = 0;
    this.shuffle = false;
    this.repeat = "OFF"; // OFF | ONE | ALL;
    this.mode = "RADIO"; // MANUAL | RADIO
    this.fetchMore = fetchMore || null;
  }

  _shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  _dedupe(tracks) {
    const seen = new Set([
      ...this.past.map((t) => t.track_id),
      this.current?.track_id,
    ]);
    return tracks.filter((t) => !seen.has(t.track_id));
  }
  getState() {
    return {
      past: [...this.past],
      current: this.current,
      upcoming: [...this.upcoming],
      shuffle: this.shuffle,
      mode: this.mode,
      playlistId: this.playlistId,
      playlistOffset: Number(this.playlistOffset) + 10,
    };
  }

  /***************  core actions **************/
  load(tracks, mode = "RADIO") {
    this.mode = mode;
    this.past = [];
    this.current = tracks[0] ?? null;
    this.upcoming = tracks.slice(1);

    if (this.shuffle) {
      this._shuffleArray(this.upcoming);
    }
    return this.current;
  }
  play(track) {
    if (!track) return null;
    if (this.current && track.track_id === this.current.track_id) {
      return this.current;
    }
    this.upcoming = this.upcoming.filter((t) => t.track_id !== track.track_id);
    if (this.current) {
      this.past.push(this.current);
    }
    this.current = track;
    return this.current;
  }

  next() {
    if (this.current && this.upcoming.length === 0) {
      if (this.mode === "RADIO" && this.fetchMore) {
        return this._radioNext();
      }
      return null;
    }
    if (this.repeat === "ONE") {
      return this.current;
    }
    if (this.current) {
      this.past.push(this.current);
    }
    if (this.upcoming.length > 0) {
      this.current = this.upcoming.shift();
      return this.current;
    }
    if (this.repeat === "ALL") {
      this.upcoming = this.past.reverse();
      this.past = [];
      this.current = this.upcoming.shift() ?? null;
      return this.current;
    }
    if (this.mode === "RADIO" && this.fetchMore) {
      return this._radioNext();
    }
    this.current = null;
    return null;
  }
  async _radioNext() {
    const tracks = await this.fetchMore();
    const clean = tracks; //this._dedupe(tracks);
    if (this.shuffle) {
      this._shuffleArray(clean);
    }
    this.upcoming.push(...clean);
    this.current = this.upcoming.shift() ?? null;
    return this.current;
  }
  prev() {
    if (this.past.length === 0) {
      return this.current;
    }

    if (this.current) {
      this.upcoming.unshift(this.current);
    }

    this.current = this.past.pop();
    return this.current;
  }

  addnext(track) {
    if (!track || track.track_id === this.current?.track_id)
      return this.upcoming.unshift(track);
  }
  addToEnd(track) {
    if (!track || track.track_id === this.current?.track_id)
      return this.upcoming.push(track);
  }
  enqueue(tracks) {
    const clean = this._dedupe(tracks);
    if (this.shuffle) {
      this._shuffleArray(clean);
    }
    this.upcoming.push(...clean);
  }
  toggleShuffle() {
    this.shuffle = !this.shuffle;
    if (this.shuffle) {
      this._shuffleArray(this.upcoming);
    }
    return this.shuffle;
  }
  setRepeat(mode = "OFF") {
    this.counter = this.counter + 1;
    if (this.counter > 2) this.counter = 0;
    switch (this.counter) {
      case 0:
        mode = "ONE";
        break;
      case 1:
        mode = "ALL";
        break;
      case 2:
        mode = "OFF";
        break;
      default:
        mode = "OFF";
    }

    this.repeat = mode;
    return this.repeat;
  }
}
export default QueueManager;
