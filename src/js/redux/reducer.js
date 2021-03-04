import {
  ADD_VIDEOS,
  ADD_SEARCH_TERM,
  UPDATE_REQUEST_PENDING,
  INCREASE_SAVED_VIDEO_COUNT,
} from './actionType.js';

const searchedVideoReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_VIDEOS:
      return [...payload.videos];
    default:
      return state;
  }
};

const searchHistoryReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_SEARCH_TERM:
      const newStates = [...state];
      const indexOfSearchTerm = newStates.indexOf(payload.searchTerm);
      if (indexOfSearchTerm !== -1) {
        newStates.splice(indexOfSearchTerm, 1);
        newStates.unshift(payload.searchTerm);
        return newStates;
      }
      return [payload.searchTerm, ...state].slice(0, 3);
    default:
      return state;
  }
};

const requestPendingReducer = (state, { type, payload }) => {
  switch (type) {
    case UPDATE_REQUEST_PENDING:
      return payload.pendingState;
    default:
      return state;
  }
};

const savedVideoCountReducer = (state, { type }) => {
  switch (type) {
    case INCREASE_SAVED_VIDEO_COUNT:
      return state + 1;
    default:
      return state;
  }
};

const combineReducers = (states, action) => {
  return {
    searchedVideos: searchedVideoReducer(states.searchedVideos, action),
    searchHistory: searchHistoryReducer(states.searchHistory, action),
    requestPending: requestPendingReducer(states.requestPending, action),
    savedVideoCount: savedVideoCountReducer(states.savedVideoCount, action),
  };
};

export default combineReducers;
