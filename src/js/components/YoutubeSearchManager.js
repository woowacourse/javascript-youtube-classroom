import { searchYoutube, searchYoutubeDummyData } from '../api.js';
import { $, showSnackbar, renderSkeletonUI, formatDate, closeModal } from '../utils.js';
import { ALERT_MESSAGE, SELECTORS, LOCAL_STORAGE_KEYS } from '../constants.js';
import Observer from '../lib/Observer.js';

export default class YoutubeSearchManager extends Observer {
  constructor(store) {
    super();
    this.store = store;
    this.pageToken = '';
    this.keyword = '';
    this.selector = SELECTORS.CLASS.YOUTUBE_SEARCH_FORM_CONTAINER;
  }

  getFormTemplate() {
    return `
      <form id="youtube-search-form" class="d-flex">
        <input
          type="text"
          id="youtube-search-keyword-input"
          class="w-100 mr-2 pl-2"
          name="keyword"
          placeholder="검색"
        />
        <button type="submit" class="btn bg-cyan-500">검색</button>
      </form>
    `;
  }

  getNoResultTemplate() {
    return `
      <div class="no-result">
        <img src="./src/images/status/not_found.png" alt="검색 결과 없음" />
        <p><strong>검색 결과가 없습니다</strong></p>
      </div>
    `;
  }

  getResultTemplate(result) {
    return result
      .map((item) => {
        const { channelId, title, channelTitle, publishedAt } = item.snippet;
        const { videoId } = item.id;
        const { watchList } = this.store.get();
        const isSaved = watchList.includes(videoId);

        const dateString = formatDate(publishedAt);

        return `
            <article class="clip d-flex flex-col">
              <div class="preview-container">
                <iframe
                  width="100%"
                  height="118"
                  src="https://www.youtube.com/embed/${videoId}"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
                </iframe>
              </div>
              <div class="content-container pt-2 px-1 d-flex flex-col justify-between flex-1">
                <div>
                  <h3 class="video-title">${title}</h3>
                  <a
                    href="https://www.youtube.com/channel/${channelId}"
                    target="_blank"
                    class="channel-name mt-1"
                  >
                    ${channelTitle}
                  </a>
                  <div class="meta">
                    <p>${dateString}</p>
                  </div>
                </div>
                <div class="d-flex justify-end">
                  <button class="btn btn-save ${isSaved ? 'hidden' : ''}" data-video-id="${videoId}">⬇️ 저장</button>
                </div>
              </div>
            </article>
          `;
      })
      .join('');
  }

  render() {
    $(this.selector).innerHTML = this.getFormTemplate();

    this.renderRecentKeywordList();
    this.renderSavedVideoCount();
    this.bindEvents();
  }

  renderResults(template) {
    $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT).insertAdjacentHTML('beforeend', template);
  }

  renderRecentKeywordList() {
    const { recentKeywordList } = this.store.get();
    $(SELECTORS.CLASS.RECENT_KEYWORD_LIST).innerHTML = recentKeywordList
      .map(
        (item) => `
          <a class="chip">${item}</a>
        `
      )
      .join('');
  }

  renderSavedVideoCount() {
    $(SELECTORS.CLASS.SAVED_VIDEO_COUNT).textContent = this.store.get()[LOCAL_STORAGE_KEYS.WATCH_LIST].length;
  }

  renderEmptySearchResult() {
    $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_CONTAINER).innerHTML = `
      <div class="youtube-search-result video-wrapper"></div>
    `;
  }

  updateRecentKeywordList(keyword) {
    let { recentKeywordList } = this.store.get();
    recentKeywordList = recentKeywordList.filter((item) => item !== keyword);

    if (recentKeywordList.length >= 3) {
      recentKeywordList.pop();
    }
    recentKeywordList.unshift(keyword);

    this.store.update({
      [LOCAL_STORAGE_KEYS.RECENT_KEYWORD_LIST]: recentKeywordList,
    });
  }

  async handleSearch(event) {
    event.preventDefault();

    const keyword = event.target.elements.keyword.value;
    if (!keyword) {
      showSnackbar(ALERT_MESSAGE.EMPTY_SEARCH_KEYWORD);
      return;
    }

    this.renderEmptySearchResult();
    renderSkeletonUI(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT, 8);

    const response = await searchYoutube(keyword);
    this.pageToken = response.nextPageToken;

    this.updateRecentKeywordList(keyword);

    if (response.pageInfo.totalResults === 0) {
      $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_CONTAINER).innerHTML = this.getNoResultTemplate();
      return;
    }

    this.renderEmptySearchResult();

    $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_CONTAINER).scrollTo(0, 0);

    const template = this.getResultTemplate(response.items);
    this.renderResults(template);
  }

  async handleScroll(event) {
    const $videoWrapper = event.target;
    const isScrollBottom =
      Math.round($videoWrapper.scrollTop) === $videoWrapper.scrollHeight - $videoWrapper.offsetHeight;

    if (isScrollBottom) {
      const keyword = $(SELECTORS.ID.YOUTUBE_SEARCH_KEYWORD_INPUT).value;
      const response = await searchYoutube(keyword, this.pageToken);
      this.pageToken = response.nextPageToken;

      const template = this.getResultTemplate(response.items);
      this.renderResults(template);
    }
  }

  async handleSaveVideo(event) {
    const selectedVideoId = event.target.dataset.videoId;
    const $selectedButton = event.target;

    if (!event.target.classList.contains('btn-save')) return;

    this.store.update({
      [LOCAL_STORAGE_KEYS.WATCH_LIST]: [...this.store.get()[LOCAL_STORAGE_KEYS.WATCH_LIST], selectedVideoId],
    });

    $selectedButton.classList.add(SELECTORS.STATUS.HIDDEN);

    showSnackbar(ALERT_MESSAGE.VIDEO_SAVED);
  }

  handleClickRecentKeyword(event) {
    if (event.target.classList.contains('chip')) {
      const keyword = event.target.textContent;
      $(SELECTORS.ID.YOUTUBE_SEARCH_KEYWORD_INPUT).value = keyword;
      $(SELECTORS.ID.YOUTUBE_SEARCH_FORM).requestSubmit();
    }
  }

  handleClickDimmer(event) {
    if (event.target.classList.contains('modal')) {
      closeModal();
    }
  }

  bindEvents() {
    // TODO: 일부 너무 긴 메소드들 하위 메소드 여러 개로 분리
    $(SELECTORS.ID.YOUTUBE_SEARCH_FORM).addEventListener('submit', this.handleSearch.bind(this));

    // TODO: 과도한 scroll 이벤트 방지를 위해 debounce 적용 필요
    $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_CONTAINER).addEventListener('scroll', this.handleScroll.bind(this));
    $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_CONTAINER).addEventListener('click', this.handleSaveVideo.bind(this));
    $(SELECTORS.CLASS.RECENT_KEYWORD_LIST).addEventListener('click', this.handleClickRecentKeyword.bind(this));
    $(SELECTORS.CLASS.MODAL).addEventListener('click', this.handleClickDimmer.bind(this));
  }

  update() {
    this.renderRecentKeywordList();
    this.renderSavedVideoCount();
  }
}
