let currentObserver = null;

export const observe = (fn) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

const observable = (target) => {
  Object.keys(target).forEach((key) => {
    const observers = new Set();
    let cache = target[key];

    Object.defineProperty(target, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);

        return cache;
      },
      set(value) {
        cache = value;
        observers.forEach((fn) => fn());
      },
    });
  });

  return target;
};

export const rootStore = {
  state: observable({
    isLoading: false,
    searchOption: {
      query: '',
      pageToken: null,
    },
    videos: [],
    notFound: false,
  }),
  setState(newState) {
    Object.entries(newState).forEach(([key, value]) => {
      if (!Object.prototype.hasOwnProperty.call(this.state, key)) return;

      this.state[key] = value;
    });
  },
};
