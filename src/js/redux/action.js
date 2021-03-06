import Video from '../model/Video.js';
import {
  UPDATE_VIDEOS_TO_BE_SHOWN,
  ADD_SEARCH_TERM,
  UPDATE_REQUEST_PENDING,
  INCREASE_SAVED_VIDEO_COUNT,
} from './actionType.js';

export const updateVideosToBeShown = (items) => {
  const videos = items.map(item => new Video(item));
  
  return {
    type: UPDATE_VIDEOS_TO_BE_SHOWN,
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
