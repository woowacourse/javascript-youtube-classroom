const videoListType = {
  value: 'toWatch',
  typeTable: {
    'liked-video-display-button': 'liked',
    'to-watch-video-display-button': 'toWatch',
    'watched-video-display-button': 'watched',
  },

  set(mode) {
    this.value = mode;
  },

  get() {
    return this.value;
  },

  toggle(targetId) {
    this.value = this.typeTable[targetId];
  },
};

export default videoListType;
