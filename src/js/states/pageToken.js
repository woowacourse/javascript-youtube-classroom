const pageToken = {
  value: '',

  get() {
    return this.value;
  },

  set(newToken) {
    this.value = newToken;
  },
};

export default pageToken;
