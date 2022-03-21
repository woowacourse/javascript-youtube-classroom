import { STATE_STORE_KEY } from '../constants/stateStore';
import { WEB_STORE_KEY } from '../constants/webStore';
import { SAVED_VIDEO_FILTER_TYPE } from '../constants/video';
import webStore from './webStore';
import Video from './video';

export const { subscribe, setState, getState } = (function () {
  const state = {
    [STATE_STORE_KEY.IS_MODAL_SHOW]: false,
    [STATE_STORE_KEY.SEARCH_RESULT]: {
      videoList: [],
      keyword: null,
      prevVideoListLength: 0,
      nextPageToken: null,
    },
    [STATE_STORE_KEY.IS_WAITING_RESPONSE]: false,
    [STATE_STORE_KEY.SAVED_VIDEO]: initializeSavedVideo(),
    [STATE_STORE_KEY.SAVED_VIDEO_FILTER]: SAVED_VIDEO_FILTER_TYPE.WATCH_LATER,
  };

  const components = {
    [STATE_STORE_KEY.IS_MODAL_SHOW]: new Set(),
    [STATE_STORE_KEY.SEARCH_RESULT]: new Set(),
    [STATE_STORE_KEY.IS_WAITING_RESPONSE]: new Set(),
    [STATE_STORE_KEY.SAVED_VIDEO]: new Set(),
    [STATE_STORE_KEY.SAVED_VIDEO_FILTER]: new Set(),
  };

  function notify(stateKey) {
    const subscribedComponents = components[stateKey];
    subscribedComponents.forEach((component) => component.render(stateKey));
  }

  function initializeSavedVideo() {
    const savedVideoInfoList = webStore.getData(WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY) ?? [];

    return savedVideoInfoList.map((videoInfo) => Video.create(videoInfo));
  }

  return {
    subscribe: (key, component) => {
      components[key].add(component);
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
