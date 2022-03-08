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
        <section class="search-input">
          <h3 hidden>검색어 입력</h3>
          <input
            id="search-input-keyword"
            type="text"
            placeholder="검색"
            class="search-input__keyword"
          />
          <button id="search-button" class="search-input__search-button button">검색</button>
        </section>
      </div>
    </div>
  `,
};

export default TEMPLATE;
