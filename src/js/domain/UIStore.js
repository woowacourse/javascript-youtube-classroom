import { UI_ACTION, PAGE_NAME } from '@Constants';

const initialState = {
  isModalOpened: false,
  selectedPage: PAGE_NAME.WATCH_LATER,
};

const reducer = {
  [UI_ACTION.OPEN_MODAL]: state => ({
    ...state,
    isModalOpened: true,
  }),
  [UI_ACTION.CLOSE_MODAL]: state => ({
    ...state,
    isModalOpened: false,
  }),
  [UI_ACTION.SELECT_PAGE]: (state, page) => ({
    ...state,
    selectedPage: page,
  }),
};

const isStateChanged = ({ dependedStates, beforeState, newState }) =>
  dependedStates.length === 0 ||
  dependedStates.some(state => beforeState[state] !== newState[state]);

class UIStore {
  state = {};

  subscribers = [];

  constructor({ initialState, reducer }) {
    this.state = initialState;
    this.reducer = reducer;
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    const beforeState = this.state;
    this.state = newState;
    this.subscribers.forEach(({ subscriber, dependedStates }) => {
      if (isStateChanged({ dependedStates, beforeState, newState })) {
        subscriber();
      }
    });
  }

  dispatch(type, payload) {
    if (!this.reducer[type]) return;
    this.setState(this.reducer[type](this.state, payload) ?? this.state);
  }

  addSubscriber(subscriber, dependedStates = []) {
    this.subscribers.push({ subscriber, dependedStates });
  }
}

export default new UIStore({ initialState, reducer });
