let currentObserver = null;

export const setCurrentObserver = observer => {
  currentObserver = observer;
};

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

// flux - 하나의 상태가 변경되면, 모든 컴포넌트를 리렌더링 시켜준다.
export const rootStore = {
  state: observable({
    isSearchModalOpened: false, //
    isLoading: false, // SearchBar, VideoCardList
    searchOption: {
      query: '',
      pageToken: null,
    },
    videos: [],
    savedVideos: [],
    hasWatchedVideo: false,
    hasWatchingVideo: false,
    status: {
      notFound: false,
      statusCode: 200,
    },
  }),
  setState(newState) {
    Object.entries(newState).forEach(([key, value]) => {
      if (!Object.prototype.hasOwnProperty.call(this.state, key)) return;

      this.state[key] = value;
    });
  },
};
