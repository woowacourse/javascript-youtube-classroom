import {
  ADD_VIDEOS,
  ADD_SEARCH_TERM,
  UPDATE_REQUEST_PENDING,
} from './actionType.js';

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

const requestPendingReducer = (states, { type, payload }) => {
  switch (type) {
    case UPDATE_REQUEST_PENDING:
      console.log('reducer : ', payload.pendingState);
      return payload.pendingState;
    default:
      return states;
  }
};

const combineReducers = (states, action) => {
  return {
    searchedVideos: searchedVideoReducer(states.searchedVideos, action),
    searchHistory: searchHistoryReducer(states.searchHistory, action),
    requestPending: requestPendingReducer(states.requestPending, action),
  };
};

export default combineReducers;
