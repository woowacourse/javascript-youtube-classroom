export class SearchKeywordHistoryManager {
  constructor() {
    this.subscribers = [];
    this.searchKeywordHistory = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    const subscriberIndex = this.subscribers.indexOf(subscriber);
    this.subscribers.splice(subscriberIndex, 1);
  }

  getSearchKeywordHistory() {
    return [...this.searchKeywordHistory];
  }

  getLastKeyword() {
    return this.searchKeywordHistory[0];
  }

  updateKeywordHistory(newKeyword) {
    const index = this.searchKeywordHistory.indexOf(newKeyword);
    const temp = [...this.searchKeywordHistory];

    if (index !== -1) {
      temp.splice(index, 1);
    }

    this.setState({ searchKeywordHistory: [newKeyword, ...temp].slice(0, 3) });
  }

  setState({ searchKeywordHistory }) {
    this.searchKeywordHistory = searchKeywordHistory;

    this.notify();
  }

  notify() {
    this.subscribers.forEach(subscriber => subscriber());
  }
}
