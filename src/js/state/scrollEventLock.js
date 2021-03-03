export default {
  scrollEventLock: false,

  isLocked() {
    return this.scrollEventLock;
  },

  lock() {
    this.scrollEventLock = true;
  },

  unlock() {
    this.scrollEventLock = false;
  },
};
