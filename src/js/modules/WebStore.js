export default {
  getArrayData(key) {
    return JSON.parse(localStorage.getItem(key) ?? '[]');
  },
  setDataInArray(key, data) {
    const currentData = this.getArrayData(key);
    localStorage.setItem(key, JSON.stringify([...currentData, data]));
  },
  setData(key, dataOrFunction) {
    if (typeof dataOrFunction === 'function') {
      const currentData = this.getArrayData(key);
      localStorage.setItem(key, JSON.stringify(dataOrFunction(currentData)));
    }
    if (typeof dataOrFunction !== 'function') {
      localStorage.setItem(key, JSON.stringify(dataOrFunction));
    }
  },
};
