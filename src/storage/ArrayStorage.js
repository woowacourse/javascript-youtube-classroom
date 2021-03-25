import BasicStorage from './BasicStorage.js';

export default class ArrayStorage extends BasicStorage {
  constructor(key) {
    super(key);
  }

  getItem() {
    return super.getItem(this._key) || [];
  }

  setItem(items) {
    if (!Array.isArray(items)) {
      return;
    }

    super.setItem(items);
  }

  pushItem(newItem) {
    const items = this.getItem();

    items.push(newItem);
    this.setItem(items);
  }
}
