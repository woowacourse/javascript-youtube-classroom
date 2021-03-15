const videoListType = {
  value: 'toWatch',

  set(mode) {
    this.value = mode;
  },

  get() {
    return this.value;
  },

  toggle(targetId) {
    if (targetId === 'liked-video-display-button') {
      this.value = 'liked';
    }
    if (targetId === 'to-watch-video-display-button') {
      this.value = 'toWatch';
    }
    if (targetId === 'watched-video-display-button') {
      this.value = 'watched';
    }
  },
};

export default videoListType;
