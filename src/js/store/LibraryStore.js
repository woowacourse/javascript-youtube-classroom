import Storage from '@Storage';
import { LIBRARY_ACTION, YOUTUBE_SETTING, MESSAGE } from '@Constants';

const libraryStorage = new Storage('YOUTUBE_CLASSROOM_LIBRARY');

const initialState = {
  videoList: libraryStorage.read(),
};

const reducer = {
  [LIBRARY_ACTION.TOGGLE_WATCH_STATUS]: (state, id) => {
    const originItem = state.videoList.find(({ id: videoId }) => videoId === id);
    const updatedItem = { ...originItem, watched: !originItem.watched };
    libraryStorage.update(id, updatedItem);
    return { ...state, videoList: libraryStorage.read() };
  },
  [LIBRARY_ACTION.SAVE_VIDEO]: (state, item) => {
    if (state.videoList.length >= YOUTUBE_SETTING.MAX_SAVE_NUMBER) {
      throw new Error(MESSAGE.MAX_SAVE_VIDEO);
    }
    libraryStorage.create(item);
    return { ...state, videoList: libraryStorage.read() };
  },
  [LIBRARY_ACTION.REMOVE_VIDEO]: (state, id) => {
    libraryStorage.delete(id);
    return { ...state, videoList: libraryStorage.read() };
  },
};

class LibraryStore {
  state = {};

  subscribers = [];

  constructor(initialState, reducer) {
    this.state = initialState;
    this.reducer = reducer;
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    this.subscribers.forEach(subscriber => subscriber());
  }

  dispatch(type, payload) {
    if (!this.reducer[type]) return;
    this.setState(this.reducer[type](this.state, payload));
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }
}

export default new LibraryStore(initialState, reducer);
