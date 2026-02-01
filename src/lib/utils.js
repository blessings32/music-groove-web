/**
 * Converts a relative path to an absolute path.
 * Handles paths starting with './', '.\', or no leading slash.
 * @param {string} path - The path to normalize
 * @returns {string} - The absolute path
 */
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
