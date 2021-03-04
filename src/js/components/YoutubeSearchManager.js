import { searchYoutube, searchYoutubeDummyData } from '../api.js';
import { $, showSnackbar } from '../utils.js';
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

  getTemplate() {
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

  getResultTemplate(response) {
    const searchResult = response.items;
    this.pageToken = response.nextPageToken;

    return `
      ${searchResult
        .map((item) => {
          const { channelId, title, channelTitle, publishedAt } = item.snippet;
          const { videoId } = item.id;
          const { watchList } = this.store.get();
          const isSaved = watchList.includes(videoId);

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
                    <p>${publishedAt}</p>
                  </div>
                </div>
                <div class="d-flex justify-end">
                  <button class="btn btn-save ${isSaved ? 'hidden' : ''}" data-video-id="${videoId}">⬇️ 저장</button>
                </div>
              </div>
            </article>
          `;
        })
        .join('')}
    `;
  }

  render() {
    $(this.selector).innerHTML = this.getTemplate();

    this.bindEvents();
  }

  renderResults(template) {
    $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_LIST).insertAdjacentHTML('beforeend', template);
  }

  renderSkeletonUI(selector, repeatCount) {
    const skeletonUITemplate = `
      <div class="youtube-search-result-list video-wrapper">
        ${`
          <div class="skeleton">
            <div class="image"></div>
            <p class="line"></p>
            <p class="line"></p>
          </div>
        `.repeat(repeatCount)}
      </div>
    `;

    $(selector).innerHTML = skeletonUITemplate;
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

  bindEvents() {
    $(SELECTORS.ID.YOUTUBE_SEARCH_FORM).addEventListener('submit', async (event) => {
      event.preventDefault();

      const keyword = event.target.elements.keyword.value;
      if (!keyword) {
        showSnackbar(ALERT_MESSAGE.EMPTY_SEARCH_KEYWORD);
        return;
      }

      $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT).innerHTML = `
        <div class="youtube-search-result-list video-wrapper"></div>
      `;

      this.renderSkeletonUI(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT, 6);

      // TODO: 테스트 코드 - 추후 삭제 요망
      let response;

      if (keyword === '무야호') {
        response = await searchYoutubeDummyData();
      } else {
        response = await searchYoutubeDummyData(true);
      }

      if (response.pageInfo.totalResults === 0) {
        $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT).innerHTML = this.getNoResultTemplate();
        return;
      }

      // TODO: 실제로 사용될 API 호출 코드
      // const response = await searchYoutube(keyword);
      $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT).innerHTML = `
        <div class="youtube-search-result-list video-wrapper"></div>
      `;

      let recentKeywordList = this.store.get().recentKeywordList;
      recentKeywordList = recentKeywordList.filter((item) => item !== keyword);

      if (recentKeywordList.length >= 3) {
        recentKeywordList.pop();
      }

      recentKeywordList.unshift(keyword);
      this.store.update({
        [LOCAL_STORAGE_KEYS.RECENT_KEYWORD_LIST]: recentKeywordList,
      });

      // let recentKeywordList = store.load(LOCAL_STORAGE_KEYS.RECENT_KEYWORD_LIST);
      // recentKeywordList = recentKeywordList.filter((item) => item !== keyword);

      // if (recentKeywordList.length >= 3) {
      //   recentKeywordList.pop();
      // }

      // recentKeywordList.unshift(keyword);
      // store.save(LOCAL_STORAGE_KEYS.RECENT_KEYWORD_LIST, recentKeywordList);

      $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT).scrollTo(0, 0);

      if (response.pageInfo.totalResults <= 0) {
      }
      const template = this.getResultTemplate(response);
      this.renderResults(template);
    });

    // TODO: 과도한 scroll 이벤트 방지를 위해 debounce 적용 필요
    $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT).addEventListener('scroll', async (event) => {
      const $videoWrapper = event.target;
      const isScrollBottom =
        Math.round($videoWrapper.scrollTop) === $videoWrapper.scrollHeight - $videoWrapper.offsetHeight;

      if (isScrollBottom) {
        const keyword = $(SELECTORS.ID.YOUTUBE_SEARCH_KEYWORD_INPUT).value;
        const response = await searchYoutubeDummyData();
        const searchResult = response.items;

        this.pageToken = response.nextPageToken;
        const template = this.getResultTemplate(response);
        this.renderResults(template);
      }
    });
  }

  update() {
    this.renderRecentKeywordList();
  }
}
