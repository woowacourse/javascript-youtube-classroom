export const videoListType = {
  value: 'toWatch',

  set(mode) {
    this.value = mode;
  },

  get() {
    return this.value;
  },

  toggle() {
    this.value = this.value === 'toWatch' ? 'watched' : 'toWatch';
  },
};
