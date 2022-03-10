import { on } from '../utils';
import { ERROR_MESSAGE, VIDEO } from '../constants';

export function loadVideos() {
  return localStorage.getItem('videos') ? JSON.parse(localStorage.getItem('videos')) : [];
}

function saveVideo(videoId) {
  try {
    const videos = loadVideos();

    if (videos.length >= VIDEO.MAX_SAVABLE_COUNT) {
      throw new Error(ERROR_MESSAGE.EXCEED_MAX_SAVABLE_COUNT);
    }

    localStorage.setItem('videos', JSON.stringify([...videos, { videoId }]));
  } catch (error) {
    alert(error.message);
  }
}

export function subscribeEvents(videoItem) {
  on('.video-item__save-button', '@save', (e) => saveVideo(e.detail.videoId), videoItem);
}
