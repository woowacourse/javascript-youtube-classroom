import { MAX_SAVE_AMOUNT, ERROR_MESSAGES } from '../constants/constants';

const key = 'videoObjects';

export function getAllFromStorage() {
  return JSON.parse(localStorage.getItem(key)) || {};
}

export function getFilteredIdFromStorage(filterBy, value) {
  const videoObjects = getAllFromStorage();

  const filteredObjects = Object.keys(videoObjects).filter(
    (id) => videoObjects[id][filterBy] === value
  );

  return filteredObjects;
}

export function saveToStorage(insertObject) {
  const videoObjects = getAllFromStorage(key);
  if (Object.keys(videoObjects).length >= MAX_SAVE_AMOUNT) {
    throw new Error(ERROR_MESSAGES.EXCEED_MAX_SAVE_AMOUNT);
  }
  videoObjects[insertObject.videoId] = insertObject;
  localStorage.setItem(key, JSON.stringify(videoObjects));
}

export function removeFromStorage(id) {
  const videoObjects = getAllFromStorage(key);
  delete videoObjects[id];
  localStorage.setItem(key, JSON.stringify(videoObjects));
}

export function toggleWatchStatus(id) {
  const videoObject = getAllFromStorage()[id];
  videoObject.watched = !videoObject.watched;
  saveToStorage(videoObject);
}
