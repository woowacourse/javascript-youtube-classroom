import { on } from '../utils';

export function getVideos() {
  return localStorage.getItem('videos') ? JSON.parse(localStorage.getItem('videos')) : [];
}

function storeVideo(videoId) {
  const videos = getVideos();

  localStorage.setItem('videos', JSON.stringify([...videos, { videoId }]));
}

export function subscribeEvents(videoItem) {
  on('.video-item__save-button', '@store', (e) => storeVideo(e.detail.videoId), videoItem);
}
