import { STATE_STORE_KEY } from '../constants/stateStore';

export const { subscribe, setState, getState } = (function () {
  const state = {
    [STATE_STORE_KEY.IS_MODAL_SHOW]: false,
    [STATE_STORE_KEY.VIDEO_LIST]: null,
    [STATE_STORE_KEY.IS_WAITING_RESPONSE]: false,
  };
  const components = {
    [STATE_STORE_KEY.IS_MODAL_SHOW]: new Set(),
    [STATE_STORE_KEY.VIDEO_LIST]: new Set(),
    [STATE_STORE_KEY.IS_WAITING_RESPONSE]: new Set(),
  };
  function notify(key) {
    const subscribedComponents = components[key];
    subscribedComponents.forEach((component) => component.wakeUp(key, state[key]));
  }
  return {
    subscribe: (key, component) => {
      components[key].add(component);
    },
    setState(key, value) {
      state[key] = value;
      notify(key);
    },
    getState(key) {
      return state[key];
    },
  };
})();
