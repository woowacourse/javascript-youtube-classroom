import { DARK_MODE } from '../constants/localStorage.js';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage.js';

const darkMode = {
  value: false,

  init() {
    this.value = getLocalStorage(DARK_MODE);
  },

  get() {
    return this.value;
  },

  set(newToken) {
    this.value = newToken;
    setLocalStorage(DARK_MODE, this.value);
  },
};

export default darkMode;
