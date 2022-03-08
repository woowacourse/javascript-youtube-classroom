// singleton
export default {
  getData(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  setDataInArray(key, value) {
    const currentData = this.getData(key) ?? [];

    if (currentData.length === 100) {
      throw new Error('100개까지만 저장이 가능합니다.');
    }

    localStorage.setItem(key, JSON.stringify([...currentData, value]));
  },
  // clear 하는 함수가 있으면 좋을 것 같다..?
};
