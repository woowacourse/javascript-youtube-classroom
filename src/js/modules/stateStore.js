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

// state 변경을 하고
// component.setState(); 호출해야된다?

// 구독
// state 변경되면 구독된 컴포넌트에게 알려준다.
// 구독 신청 메서드
//
