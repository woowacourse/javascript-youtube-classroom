import { TO_WATCH_TYPE, WATCHED_TYPE } from '../constants/filterType.js';

const videoListType = {
  value: TO_WATCH_TYPE,

  set(mode) {
    this.value = mode;
  },

  get() {
    return this.value;
  },

  toggle() {
    this.value = this.value === TO_WATCH_TYPE ? WATCHED_TYPE : TO_WATCH_TYPE;
  },
};

export default videoListType;
