export default class Model {
  #lastQuery;
  #nextPageToken;

  getLastQuery() {
    return this.#lastQuery;
  }

  getNextPageToken() {
    return this.#nextPageToken;
  }

  setLastQuery(value) {
    if (typeof value !== 'string' || value.length === 0) {
      return;
    }
    this.#lastQuery = value;
  }

  setNextPageToken(value) {
    if (typeof value !== 'string' || value.length === 0) {
      return;
    }
    this.#nextPageToken = value;
  }
}
