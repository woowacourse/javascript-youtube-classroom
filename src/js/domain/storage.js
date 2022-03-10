const STORAGE_KEY = 'idObj';

function getSavedVideos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function setSavedVideos(videoId) {
  const idObj = getSavedVideos() || {};
  if (Object.keys(idObj).length >= 100) {
    throw new Error('저장된 비디오의 개수가 100개를 초과했습니다.');
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...idObj, [videoId]: true }));
}

const storage = {
  getSavedVideos,
  setSavedVideos,
};

export default storage;
