import { STATE_STORE_KEY } from '../constants/stateStore';

export const { subscribe, setState, setStateInArray, getState } = (function () {
  const state = {
    [STATE_STORE_KEY.IS_MODAL_SHOW]: false,
    [STATE_STORE_KEY.SEARCH_RESULT]: {
      videoList: null,
      keyword: null,
      prevVideoListLength: 0,
      nextPageToken: null,
    },
    [STATE_STORE_KEY.IS_WAITING_RESPONSE]: false,
  };
  const components = {
    [STATE_STORE_KEY.IS_MODAL_SHOW]: new Set(),
    [STATE_STORE_KEY.SEARCH_RESULT]: new Set(),
    [STATE_STORE_KEY.IS_WAITING_RESPONSE]: new Set(),
  };
  function notify(stateKey, nofifyKey) {
    const subscribedComponents = components[stateKey];
    subscribedComponents.forEach((component) => component.wakeUp(state[stateKey], nofifyKey));
  }
  return {
    subscribe: (key, component) => {
      components[key].add(component);
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
