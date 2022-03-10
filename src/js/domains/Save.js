import { on } from '../utils';

export function loadVideos() {
  return localStorage.getItem('videos') ? JSON.parse(localStorage.getItem('videos')) : [];
}

function saveVideo(videoId) {
  const videos = loadVideos();

  localStorage.setItem('videos', JSON.stringify([...videos, { videoId }]));
}

export function subscribeEvents(videoItem) {
  on('.video-item__save-button', '@save', (e) => saveVideo(e.detail.videoId), videoItem);
}
