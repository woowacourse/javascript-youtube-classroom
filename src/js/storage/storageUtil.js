const storageUtil = {
  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  },

  setItem(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
  },
};

export default storageUtil;
