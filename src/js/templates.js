const TEMPLATE = {
  MY_CLASSROOM: `
    <main id="app" class="classroom-container">
      <h1 class="classroom-container__title">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h1>
      <nav class="nav">
        <button id="search-modal-button" class="button nav__button">🔍 검색</button>
      </nav>
    </main>
  `,
  SEARCH_MODAL: `
    <div class="modal-container hide">
      <div class="dimmer"></div>
      <div class="search-modal" role="dialog" aria-labelledby="search-modal-title">
        <h2 id="search-modal-title" class="search-modal__title">🔍 보고싶은 영상 찾기 🔍</h2>
        <search-form></search-form>
        <search-result></search-result>
      </div>
    </div>
  `,
  SEARCH_FORM: `
    <form>
      <h3 hidden>검색어 입력</h3>
      <input
        id="search-input-keyword"
        type="text"
        placeholder="검색"
        class="search-input__keyword"
      />
      <button id="search-button" class="search-input__search-button button">검색</button>
    </form>
  `,
  SEARCH_RESULT: `
    <h3 hidden>검색 결과</h3>
    <ul class="video-list"></ul>
  `,
  generateVideoItem(video) {
    return `
      <li class="video-item" data-video-id="${video.id}">
        <img
          src="${decodeURI(video.thumbnail)}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">${decodeURI(video.title)}</h4>
        <p class="video-item__channel-name">${decodeURI(video.channelTitle)}</p>
        <p class="video-item__published-date">${video.publishedAt}</p>
        <button class="video-item__save-button button">⬇ 저장</button>
      </li>
    `;
  },
};

export default TEMPLATE;
