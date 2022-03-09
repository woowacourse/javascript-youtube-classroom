export const { subscribe, setState, getState } = (function () {
  const state = {
    isModalShow: false,
    videoList: null,
    isWaitingResponse: false,
  };
  const components = {
    isModalShow: new Set(),
    videoList: new Set(),
    isWaitingResponse: new Set(),
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
