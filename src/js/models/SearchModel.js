import { setListToLocalStorage, getListFromLocalStorage } from '../utils/localStorage.js';

/*
로컬스토리지 데이터 저장구조
  {
    videosToWatch: [ { videoId: 'TVUNi0zi1yw', ... }, ... ],
    videosWatched: [ { videoId: '0nxsS4B85E8', ... }, ... ],
    recentKeywords: [ 'keyword1', 'keyword2', 'keyword3' ],
  }
*/

export default class SearchModel {
  getListByKey(key) {
    try {
      return JSON.parse(getListFromLocalStorage(key)) || [];
    } catch (e) {
      return [];
    }
  }

  setListByKey(key, list) {
    setListToLocalStorage(key, JSON.stringify(list));
  }

  insertItemByKey(key, item) {
    const list = this.getListByKey(key);
    list.push(item);
    this.setListByKey(key, list);
  }

  insertItemAtFirstByKey(key, item) {
    const list = this.getListByKey(key);
    list.unshift(item);
    this.setListByKey(key, list);
  }

  deleteLastItemByKey(key) {
    const list = this.getListByKey(key);

    this.setListByKey(key, list.slice(0, list.length - 1));
  }

  deleteTargetItemByKey(key, secondKey, target) {
    const list = this.getListByKey(key);
    const filteredList = list.filter((item) => item[secondKey] !== target[secondKey]);

    this.setListByKey(key, filteredList);
  }
}
