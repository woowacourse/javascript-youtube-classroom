let currentObserver = null;

export const setCurrentObserver = observer => {
  currentObserver = observer;
};

let i = 0;

const observable = target => {
  Object.keys(target).forEach(key => {
    const observers = {};
    let cache = target[key];

    Object.defineProperty(target, key, {
      get() {
        if (currentObserver) {
          observers[currentObserver.constructor.name] = currentObserver;
        }

        return cache;
      },
      set(value) {
        cache = value;
        Object.keys(observers).map(key => observers[key].render());
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
