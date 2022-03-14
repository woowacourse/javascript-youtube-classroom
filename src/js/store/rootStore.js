import Subject from '../core/Subject.js';

const initState = {
  searchOption: {
    query: '',
    nextPageToken: null,
  },
  isSearchQuerySubmitted: false,
  searchResult: [],
  isNoResult: null,
};

const rootStore = {
  state: Subject.observable(initState),
  setState(newState) {
    Object.entries(newState).forEach(([key, value]) => {
      if (!Object.prototype.hasOwnProperty.call(this.state, key)) return;

      this.state[key] = value;
    });
  },
  clear() {
    this.setState(initState);
  },
};

Object.seal(rootStore);

const observe = (observer) => {
  Subject.currentObserver = observer;
  observer.notify();
  Subject.currentObserver = null;
};

export { rootStore, observe };
