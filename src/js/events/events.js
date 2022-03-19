/* eslint-disable import/prefer-default-export */
import { SAVED_VIDEO_LIST_KEY } from '../constants/constant';

export const handleClickSaveButton = e => {
  if (!e.target.classList.contains('video-item__save-button')) {
    return;
  }
  const { target } = e;
  const $videoItem = target.closest('.video-item');
  const videoId = $videoItem.getAttribute('data-video-id');
  const videoList = JSON.parse(localStorage.getItem(SAVED_VIDEO_LIST_KEY)) ?? [];
  if (this.isSaveVideo(videoId, videoList)) {
    target.setAttribute('hidden', true);
  }
};
