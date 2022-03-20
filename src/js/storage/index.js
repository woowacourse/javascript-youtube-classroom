export default class Storage {
  constructor(key, storage = localStorage) {
    this.key = key;
    this.storage = storage;
  }

  #set(items) {
    this.storage.setItem(this.key, JSON.stringify(items));
  }

  create(item) {
    const items = this.read();
    this.#set([...items, item]);
  }

  read() {
    const items = this.storage.getItem(this.key) ?? '[]';
    return JSON.parse(items);
  }

  update(id, newItem) {
    const updatedItems = this.read().map(item => {
      if (item.id === id) {
        return { id, ...newItem };
      }
      return item;
    });
    this.#set(updatedItems);
  }

  delete(targetId) {
    this.#set(this.read().filter(({ id }) => targetId !== id));
  }
}
