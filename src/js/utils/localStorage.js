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
  localStorage.setItem(
    STORE_KEYS.RECENT_KEYWORDS,
    JSON.stringify(recentKeywords),
  );

  return recentKeywords;
}

export function pushSavedVideoIds(videoId) {
  const savedVideoIds = getStorageData(STORE_KEYS.SAVED_VIDEO_IDS);

  if (savedVideoIds.includes(videoId)) return savedVideoIds;

  savedVideoIds.push(videoId);
  localStorage.setItem(
    STORE_KEYS.SAVED_VIDEO_IDS,
    JSON.stringify(savedVideoIds),
  );

  return savedVideoIds;
}

export function popSavedVideoId(videoId) {
  const savedVideoIds = getStorageData(STORE_KEYS.SAVED_VIDEO_IDS);

  if (!savedVideoIds.includes(videoId)) return savedVideoIds;

  const updatedSavedVideoIds = savedVideoIds.filter(
    (savedVideoId) => savedVideoId !== videoId,
  );

  localStorage.setItem(
    STORE_KEYS.SAVED_VIDEO_IDS,
    JSON.stringify(updatedSavedVideoIds),
  );

  return updatedSavedVideoIds;
}

export function updateWatchedVideoIds(videoId) {
  const watchedVideoIds = getStorageData(STORE_KEYS.WATCHED_VIDEO_IDS);
  let updatedWatchedVideoIds;

  if (watchedVideoIds.includes(videoId)) {
    updatedWatchedVideoIds = watchedVideoIds.filter(
      (watchedVideoId) => watchedVideoId !== videoId,
    );
  } else {
    watchedVideoIds.push(videoId);
    updatedWatchedVideoIds = [...watchedVideoIds];
  }

  localStorage.setItem(
    STORE_KEYS.WATCHED_VIDEO_IDS,
    JSON.stringify(updatedWatchedVideoIds),
  );

  return updatedWatchedVideoIds;
}

export function popWatchedVideoId(videoId) {
  const watchedVideoIds = getStorageData(STORE_KEYS.WATCHED_VIDEO_IDS);

  if (!watchedVideoIds.includes(videoId)) return watchedVideoIds;

  const updatedWatchedVideoIds = watchedVideoIds.filter(
    (watchedVideoId) => watchedVideoId !== videoId,
  );

  localStorage.setItem(
    STORE_KEYS.WATCHED_VIDEO_IDS,
    JSON.stringify(updatedWatchedVideoIds),
  );

  return updatedWatchedVideoIds;
}

export function updateLikedVideoIds(videoId) {
  const likedVideoIds = getStorageData(STORE_KEYS.LIKED_VIDEO_IDS);
  let updatedLikedVideoIds;

  if (likedVideoIds.includes(videoId)) {
    updatedLikedVideoIds = likedVideoIds.filter(
      (likedVideoId) => likedVideoId !== videoId,
    );
  } else {
    likedVideoIds.push(videoId);
    updatedLikedVideoIds = [...likedVideoIds];
  }

  localStorage.setItem(
    STORE_KEYS.LIKED_VIDEO_IDS,
    JSON.stringify(updatedLikedVideoIds),
  );

  return updatedLikedVideoIds;
}

export function popLikedVideoId(videoId) {
  const likedVideoIds = getStorageData(STORE_KEYS.LIKED_VIDEO_IDS);

  if (!likedVideoIds.includes(videoId)) return likedVideoIds;

  const updatedLikedVideoIds = likedVideoIds.filter(
    (likedVideoId) => likedVideoId !== videoId,
  );

  localStorage.setItem(
    STORE_KEYS.LIKED_VIDEO_IDS,
    JSON.stringify(updatedLikedVideoIds),
  );

  return updatedLikedVideoIds;
}

export function getStorageData(str, defaultValue = []) {
  try {
    const items = JSON.parse(localStorage.getItem(str));

    return items || defaultValue;
  } catch (e) {
    console.error(e);

    return defaultValue;
  }
}
