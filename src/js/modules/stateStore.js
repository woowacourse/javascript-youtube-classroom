import { STATE_STORE_KEY } from '../constants/stateStore';
import { WEB_STORE_KEY } from '../constants/webStore';
import webStore from './webStore';
const getInitialState = () => ({
  [STATE_STORE_KEY.IS_MODAL_SHOW]: false,
  [STATE_STORE_KEY.SEARCH_RESULT]: {
    videoList: [],
    keyword: null,
    prevVideoListLength: 0,
    nextPageToken: null,
  },
  [STATE_STORE_KEY.IS_WAITING_RESPONSE]: false,
  [STATE_STORE_KEY.SAVED_VIDEO]: webStore.getArrayData(WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY) ?? [],
});
const getInitialSubcribeList = () => ({
  [STATE_STORE_KEY.IS_MODAL_SHOW]: new Set(),
  [STATE_STORE_KEY.SEARCH_RESULT]: new Set(),
  [STATE_STORE_KEY.IS_WAITING_RESPONSE]: new Set(),
  [STATE_STORE_KEY.SAVED_VIDEO]: new Set(),
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
