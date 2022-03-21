export default {
  getArrayData(key) {
    const dataBeforeParse = localStorage.getItem(key) ?? '[]';
    try {
      const data = JSON.parse(dataBeforeParse);
      return data;
    } catch (error) {
      throw new Error('JSON Parse가 불가능합니다');
    }
  },
  setData(key, dataOrFunction) {
    if (typeof dataOrFunction === 'function') {
      try {
        const currentData = this.getArrayData(key);
        localStorage.setItem(key, JSON.stringify(dataOrFunction(currentData)));
      } catch ({ message }) {
        alert(message);
      }
    }
    if (typeof dataOrFunction !== 'function') {
      localStorage.setItem(key, JSON.stringify(dataOrFunction));
    }
  },
};
