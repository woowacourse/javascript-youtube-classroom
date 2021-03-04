import {
  ADD_VIDEOS,
  ADD_SEARCH_TERM,
  UPDATE_REQUEST_PENDING,
  INCREASE_SAVED_VIDEO_COUNT,
} from './actionType.js';
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

export const updateRequestPending = (pendingState) => {
  return {
    type: UPDATE_REQUEST_PENDING,
    payload: {
      pendingState,
    },
  };
};

export const increaseSavedVideoCount = () => {
  return {
    type: INCREASE_SAVED_VIDEO_COUNT,
  };
};
