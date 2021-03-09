import { VALUE, STORE_KEYS } from './constants.js';

export function updateRecentChips(keyword) {
  const recentKeywords = getStorageData(STORE_KEYS.RECENT_KEYWORDS);

  if (recentKeywords.includes(keyword)) {
    recentKeywords.splice(recentKeywords.indexOf(keyword), 1);
  }

  if (recentKeywords.length >= VALUE.KEYWORD_COUNT) {
    recentKeywords.pop();
  }

  recentKeywords.unshift(keyword);
  localStorage.setItem(STORE_KEYS.RECENT_KEYWORDS, recentKeywords);

  return recentKeywords;
}

export function updateSavedVideoIds(videoId) {
  const savedVideoIds = getStorageData(STORE_KEYS.SAVED_VIDEO_IDS);

  if (savedVideoIds.includes(videoId)) return;

  savedVideoIds.push(videoId);
  localStorage.setItem(STORE_KEYS.SAVED_VIDEO_IDS, savedVideoIds);

  return savedVideoIds;
}

export function updateWatchedVideoIds(videoId) {
  const watchedVideoIds = getStorageData(STORE_KEYS.WATCHED_VIDEO_IDS);
}

export function getStorageData(str, defaultValue = []) {
  try {
    const items = localStorage.getItem(str);

    if (items) return items.split(',');
  } catch (e) {
    return defaultValue;
  }
  return defaultValue;
}
