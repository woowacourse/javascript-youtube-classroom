import { ADD_VIDEOS } from './actionType.js';

const searchedVideoReducer = (states, { type, payload }) => {
  switch (type) {
    case ADD_VIDEOS:
      return [...states, ...payload.videos];
    default:
      return states;
  }
};

const combineReducers = (states, action) => {
  return {
    searchedVideos: searchedVideoReducer(states.searchedVideos, action),
  };
};

export default combineReducers;
