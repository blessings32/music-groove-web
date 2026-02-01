/**
 * Converts a relative path to an absolute path.
 * Handles paths starting with './', '.\', or no leading slash.
 * @param {string} path - The path to normalize
 * @returns {string} - The absolute path
 */

import axios from "axios";
export function toAbsolutePath(path) {
  if (!path) return path;

  if (path.startsWith("./") || path.startsWith(".\\")) {
    return "/" + path.slice(2);
  }

  if (!path.startsWith("/") && !path.startsWith("http")) {
    return "/" + path;
  }

  return path;
}

export async function setRecentlyPlayed(track) {
  await axios
    .post("/api/recently-played", { trackId: track.track_id })
    .then((res) => {
      console.log(res.data.message);
    })
    .catch((error) => {
      console.error("Error setting recently played track:", error);
    });
}

export async function likeTrack(track) {
  console.log("like track called", track.track_id);
  await axios
    .post("/api/like-track", { trackId: track.track_id })
    .then((res) => {
      console.log(res.data.message);
    })
    .catch((error) => {
      console.error("Error liking track:", error);
    });
}

export async function unLikeTrack(track) {
  console.log("unlike track called", track.track_id);
  await axios
    .delete(`/api/unlike-track?id=${track.track_id}`)
    .then((res) => {
      console.log(res.data.message);
    })
    .catch((error) => {
      console.error("Error unliking track:", error);
    });
}
