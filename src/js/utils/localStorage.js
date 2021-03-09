import { VALUE, STORAGE_KEYS } from './constants.js';

export function setRecentChip(keyword) {
  const recentKeywords = getValidJson(STORAGE_KEYS.RECENT_KEYWORDS, []);

  if (recentKeywords.includes(keyword)) {
    recentKeywords.splice(recentKeywords.indexOf(keyword), 1);
  }

  if (recentKeywords.length >= VALUE.KEYWORD_COUNT) {
    recentKeywords.pop();
  }

  recentKeywords.unshift(keyword);
  localStorage.setItem(STORAGE_KEYS.RECENT_KEYWORDS, recentKeywords);
}

export function setSavedVideoId(videoId) {
  const savedVideoIds = getValidJson(STORAGE_KEYS.SAVED_VIDEO_IDS, []);

  if (savedVideoIds.includes(videoId)) return;

  savedVideoIds.push(videoId);
  localStorage.setItem(STORAGE_KEYS.SAVED_VIDEO_IDS, savedVideoIds);
}

export function getValidJson(str, defaultValue) {
  try {
    const items = localStorage.getItem(str);

    if (items) return items.split(',');
  } catch (e) {
    return defaultValue;
  }
  return defaultValue;
}
