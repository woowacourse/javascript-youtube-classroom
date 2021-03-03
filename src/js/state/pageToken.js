export default {
  pageToken: "",

  set(newToken) {
    this.pageToken = newToken;
  },

  get() {
    return this.pageToken;
  },
};
