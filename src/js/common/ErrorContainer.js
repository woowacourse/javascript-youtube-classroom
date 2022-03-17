const STATUS_TEMPLATE = {
  NO_SEARCH_RESULT: `검색 결과가 없습니다<br />
  다른 키워드로 검색해보세요`,
  EXCEEDED_QUOTA_TEMPLATE: `오늘 검색 할당량을 모두 소진했습니다<br />
  내일 다시 찾아주세요.`,
  'Failed to fetch': `네트워크에 문제가 생겼습니다.<br/>
  인터넷 연결을 확인해 주세요.
  `,
};

export default class ErrorContainer {
  #state;

  constructor(element) {
    this.element = element;
  }

  render() {
    this.element.innerHTML = STATUS_TEMPLATE[this.#state.status];
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.render();
  }
}
