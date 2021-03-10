const isWatchedMode = {
  value: false,

  set(mode) {
    this.value = mode;
  },

  get() {
    return this.value;
  },
};

export default isWatchedMode;
