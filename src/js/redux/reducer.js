import { ADD_VIDEOS, ADD_SEARCH_TERM } from './actionType.js';

const searchedVideoReducer = (states, { type, payload }) => {
  switch (type) {
    case ADD_VIDEOS:
      return [...payload.videos];
    default:
      return states;
  }
};

const searchHistoryReducer = (states, { type, payload }) => {
  switch (type) {
    case ADD_SEARCH_TERM:
      const newStates = [...states];
      const indexOfSearchTerm = newStates.indexOf(payload.searchTerm);
      if (indexOfSearchTerm !== -1) {
        newStates.splice(indexOfSearchTerm, 1);
        newStates.unshift(payload.searchTerm);
        return newStates;
      }
      return [payload.searchTerm, ...states].slice(0, 3);
    default:
      return states;
  }
};

const combineReducers = (states, action) => {
  return {
    searchedVideos: searchedVideoReducer(states.searchedVideos, action),
    searchHistory: searchHistoryReducer(states.searchHistory, action),
  };
};

export default combineReducers;
