import { TO_WATCH_TYPE } from '../constants/filterType.js';

const videoListType = {
  value: TO_WATCH_TYPE,

  set(mode) {
    this.value = mode;
  },

  get() {
    return this.value;
  },
};

export default videoListType;
