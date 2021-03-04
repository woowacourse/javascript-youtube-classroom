import { VALUE } from './constants.js';

export function setRecentChip(keyword) {
  const recentKeywords = getRecentKeywords();

  if (recentKeywords.includes(keyword)) {
    return;
  }

  if (recentKeywords.length >= VALUE.KEYWORD_COUNT) {
    recentKeywords.pop();
  }

  recentKeywords.unshift(keyword);
  localStorage.setItem('searchKeyword', JSON.stringify(recentKeywords));
}

export function getRecentKeywords() {
  return localStorage.getItem('searchKeyword')
    ? JSON.parse(localStorage.getItem('searchKeyword'))
    : [];
}

export function setSavedVideoId(videoId) {
  const savedVideos = getSavedVideoIds();

  savedVideos.push(videoId);
  localStorage.setItem('savedVideos', JSON.stringify(savedVideos));
}

export function getSavedVideoIds() {
  return localStorage.getItem('savedVideos')
    ? JSON.parse(localStorage.getItem('savedVideos'))
    : [];
}
