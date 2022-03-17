import { STATE_STORE_KEY } from '../constants/stateStore';

const getInitialState = () => ({
  [STATE_STORE_KEY.IS_MODAL_SHOW]: false,
  [STATE_STORE_KEY.SEARCH_RESULT]: {
    videoList: [],
    keyword: null,
    prevVideoListLength: 0,
    nextPageToken: null,
  },
  [STATE_STORE_KEY.IS_SEARCH_VIDEO_WAITING]: false,
  [STATE_STORE_KEY.SAVED_VIDEO]: {
    videoList: [],
    prevVideoListLength: 0,
  },
  [STATE_STORE_KEY.CURRENT_APP_SECTION]: 'watch-video-section-button',
  [STATE_STORE_KEY.IS_SAVED_VIDEO_WAITING]: false,
});
const getInitialSubcribeList = () => ({
  [STATE_STORE_KEY.IS_MODAL_SHOW]: new Set(),
  [STATE_STORE_KEY.SEARCH_RESULT]: new Set(),
  [STATE_STORE_KEY.IS_SEARCH_VIDEO_WAITING]: new Set(),
  [STATE_STORE_KEY.SAVED_VIDEO]: new Set(),
  [STATE_STORE_KEY.CURRENT_APP_SECTION]: new Set(),
  [STATE_STORE_KEY.IS_SAVED_VIDEO_WAITING]: new Set(),
});
export const { subscribe, setState, getState } = (function () {
  const state = getInitialState();
  const subcribeList = getInitialSubcribeList();

  function notify(stateKey) {
    const subscribedComponents = subcribeList[stateKey];
    subscribedComponents.forEach((component) => component.wakeUp(stateKey));
  }

  return {
    subscribe: (key, component) => {
      subcribeList[key].add(component);
      return state[key];
    },
    setState(key, valueOrFunction) {
      if (typeof valueOrFunction === 'function') {
        state[key] = valueOrFunction(state[key]);
        notify(key);
      }
      if (typeof valueOrFunction !== 'function') {
        state[key] = valueOrFunction;
        notify(key);
      }
    },
    getState(key) {
      return state[key];
    },
  };
})();
