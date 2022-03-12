const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const getData = (key) => JSON.parse(localStorage.getItem(key));

export default class Storage {
  #videoIds;

  constructor() {
    this.#videoIds = getData('id') || [];
  }

  get videoIds() { return this.#videoIds; }

  saveVideoById(id) {
    this.#videoIds.push(id);
    setData('id', this.#videoIds);
  }
  
  findVideoById(id) {
    return this.#videoIds.includes(id);
  }
}
