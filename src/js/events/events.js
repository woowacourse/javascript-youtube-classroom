/* eslint-disable import/prefer-default-export */
import { LOCAL_STORAGE_VIDEO_LIST_KEY } from '../constants/constant';

export const handleClickSaveButton = e => {
  const { target } = e;
  const $videoItem = target.closest('.video-item');
  const videoId = $videoItem.getAttribute('data-video-id');
  const videoList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_VIDEO_LIST_KEY)) ?? [];
  if (this.isSaveVideo(videoId, videoList)) {
    target.setAttribute('hidden', true);
  }
};
