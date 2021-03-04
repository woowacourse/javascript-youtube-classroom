import { ADD_VIDEOS, ADD_SEARCH_TERM } from './actionType.js';
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

export const addSearchHistory = (searchTerm) => {
  return {
    type: ADD_SEARCH_TERM,
    payload: {
      searchTerm,
    },
  };
};
