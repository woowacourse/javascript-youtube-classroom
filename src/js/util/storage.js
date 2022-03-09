const STORAGE_KEY = 'idObj';

export function getSavedVideos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

export function setSavedVideos(videoId) {
  const idObj = getSavedVideos() || {};
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...idObj, [videoId]: true }));
}
