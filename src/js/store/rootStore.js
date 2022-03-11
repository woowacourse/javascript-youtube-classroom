import Subject from '../core/Subject.js';

const rootStore = {
  state: Subject.observable({
    searchOption: {
      query: '',
      nextPageToken: null,
    },
    searchResult: [],
  }),
  setState(newState) {
    Object.entries(newState).forEach(([key, value]) => {
      if (!Object.prototype.hasOwnProperty.call(this.state, key)) return;

      this.state[key] = value;
    });
  },
};

Object.seal(rootStore);

const observe = (observer) => {
  Subject.currentObserver = observer;
  observer.notify();
  Subject.currentObserver = null;
};

export { rootStore, observe };
