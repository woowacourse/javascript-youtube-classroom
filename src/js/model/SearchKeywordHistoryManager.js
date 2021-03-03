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

  // TODO : 중복 검사 추가
  updateKeywordHistory(newKeyword) {
    this.setState({ searchKeywordHistory: [newKeyword, ...this.searchKeywordHistory].slice(0, 3) });
  }

  setState({ searchKeywordHistory }) {
    this.searchKeywordHistory = searchKeywordHistory;
    console.log(this.searchKeywordHistory);
    this.notify();
  }

  notify() {
    this.subscribers.forEach(subscriber => subscriber());
  }
}
