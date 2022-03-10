import { NOTIFY_KEY, STATE_STORE_KEY } from '../constants/stateStore';

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
  function notify(stateKey, nofifyKey) {
    const subscribedComponents = components[stateKey];
    subscribedComponents.forEach((component) => component.wakeUp(state[stateKey], nofifyKey));
  }
  return {
    subscribe: (key, component) => {
      components[key].add(component);
    },
    setState(key, value) {
      state[key] = value;
      notify(key, NOTIFY_KEY.REPLACE_STATE);
    },
    setStateInArray(key, value) {
      state[key] = [...state[key], ...value];
      notify(key, NOTIFY_KEY.ADD_STATE);
    },
    getState(key) {
      return state[key];
    },
  };
})();
