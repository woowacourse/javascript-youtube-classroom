import { ADD_VIDEOS } from './actionType.js';
import Video from '../model/Video.js';

export const addVideos = (items) => {
  const videos = [];

  items.forEach((item) => {
    videos.push(new Video(item));
  });

  return {
    type: ADD_VIDEOS,
    payload: {
      videos,
    },
  };
};
