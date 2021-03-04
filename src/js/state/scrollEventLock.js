const scrollEventLock = {
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

export default scrollEventLock;
