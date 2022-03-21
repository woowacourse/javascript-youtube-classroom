import NotFoundImage from '../assets/images/not_found.png';
import { formatDate } from './utils';

const TEMPLATE = {
  MY_CLASSROOM: `
    <main id="app" class="classroom-container">
      <h1 id="main-title" class="classroom-container__title">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h1>
      <nav class="nav">
        <div class="menu">
          <input id="unwatched-menu" type="radio" name="menu" value="unwatched-menu" checked>
          <label class="menu__button menu__button--left" for="unwatched-menu" data-action="showUnwatchedVideoList">👁️ 볼 영상</label>
          <input id="watched-menu" type="radio" name="menu" value="watched-menu">
          <label class="menu__button menu__button--right" for="watched-menu" data-action="showWatchedVideoList">✅ 본 영상</label>
        </div>
        <button id="search-modal-button" class="button nav__button" type="button">🔍 검색</button>
      </nav>
      <my-result></my-result>
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
        name="keyword"
        placeholder="검색"
        class="search-input__keyword"
        required
      />
      <button id="search-button" class="search-input__search-button button">검색</button>
    </form>
  `,
  SEARCH_RESULT: `
    <h3 hidden>검색 결과</h3>
    <ul is="video-list" id="searched-video-list"></ul>
    <section class="search-result search-result--no-result hidden">
      <h3 hidden>검색 결과</h3>
      <div class="no-result">
        <img src=${NotFoundImage} alt="no result image" class="no-result__image">
        <p class="no-result__description">
          검색 결과가 없습니다<br />
          다른 키워드로 검색해보세요
        </p>
      </div>
    </section>
  `,
  generateVideoItem(video) {
    return `
      <li class="video-item" data-video-id="${video.id}">
        <img
          src="${decodeURI(video.thumbnail)}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">${decodeURI(video.title)}</h4>
        <p class="video-item__channel-name">${decodeURI(video.channelTitle)}</p>
        <p class="video-item__published-date">${formatDate(video.publishedAt)}</p>
        <button id="${
          video.id
        }-save-button" class="video-item__save-button button" type="button">⬇ 저장</button>
      </li>
    `;
  },
  SKELETON: `
    <div class="skeleton">
      <div class="image"></div>
      <h4 class="line"></h4>
      <p class="line"></p>
      <p class="line"></p>
      <button></button>
    </div>
  `,
  MY_RESULT: `
    <ul is="my-video-list" id="unwatched-video-list"></ul>
    <ul is="my-video-list" id="watched-video-list" class="hidden"></ul>
  `,
  // eslint-disable-next-line max-lines-per-function
  generateMyVideoItem(video) {
    return `
      <li class="video-item" data-video-id="${video.id}">
        <img
          src="${decodeURI(video.thumbnail)}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">${decodeURI(video.title)}</h4>
        <p class="video-item__channel-name">${decodeURI(video.channelTitle)}</p>
        <p class="video-item__published-date">${formatDate(video.publishedAt)}</p>
        <div class="video-item__state">
          <button type="button" class="video-item__state-button button${
            video.isWatched ? ' video-item__state-button--watched' : ''
          }" data-action="watch">✅</button>
          <button type="button" class="video-item__state-button button" data-action="remove">🗑️</button>
        <div>
      </li>
    `;
  },
  generateNoVideo(text) {
    return `
      <div class="no-result" style="width: 100%;">
        <img src=${NotFoundImage} alt="no result image" class="no-result__image">
        <p class="no-result__description">${text}</p>
      </div>
    `;
  },
};

export default TEMPLATE;
