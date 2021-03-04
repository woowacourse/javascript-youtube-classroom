import { $ } from './utils.js';
import { searchYoutube, searchYoutubeById, searchYoutubeDummyData } from './api.js';
import { ALERT_MESSAGE, SELECTORS, LOCAL_STORAGE_KEYS } from './constants.js';
import Store from './store.js';

const $searchButton = document.querySelector(SELECTORS.ID.SEARCH_BUTTON);
const $modalClose = document.querySelector(SELECTORS.CLASS.MODAL_CLOSE);
const $modal = document.querySelector(SELECTORS.CLASS.MODAL);
const store = new Store();
let pageToken;

const onModalShow = () => {
  $modal.classList.add(SELECTORS.STATUS.MODAL_OPEN);
};

const onModalClose = () => {
  $modal.classList.remove(SELECTORS.STATUS.MODAL_OPEN);
};

$searchButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);

const showSnackbar = (message, second = 3) => {
  $(SELECTORS.ID.SNACKBAR).textContent = message;
  $(SELECTORS.ID.SNACKBAR).classList.add(SELECTORS.STATUS.SNACKBAR_SHOW);

  setTimeout(() => {
    $(SELECTORS.ID.SNACKBAR).classList.remove(SELECTORS.STATUS.SNACKBAR_SHOW);
  }, second * 1000);
};

const renderSkeletonUI = (selector, repeatCount) => {
  const skeletonUITemplate = `
    <div class="skeleton">
      <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
    </div>
  `.repeat(repeatCount);

  $(selector).insertAdjacentHTML('beforeend', skeletonUITemplate);
};

const renderSearchResult = (result) => {
  const resultTemplate = result
    .map((item) => {
      const { channelId, title, channelTitle, publishedAt } = item.snippet;
      const { videoId } = item.id;
      const isSaved = store.load(LOCAL_STORAGE_KEYS.WATCH_LIST).includes(videoId);

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
    .join('');

  $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_LIST).insertAdjacentHTML('beforeend', resultTemplate);
};

const renderSavedVideos = (items) => {
  const resultTemplate = items
    .map((item) => {
      const { channelId, title, channelTitle, publishedAt } = item.snippet;
      const { videoId } = item.id;
      $(SELECTORS.CLASS.WATCH_LIST).insertAdjacentHTML(
        'beforeend',
        `<article class="clip d-flex flex-col">
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
            <div>
              <span class="opacity-hover">✅</span>
              <span class="opacity-hover">👍</span>
              <span class="opacity-hover">💬</span>
              <span class="opacity-hover">🗑️</span>
            </div>
          </div>
        </div>
      </article>`
      );
    })
    .join('');

  $(SELECTORS.CLASS.WATCH_LIST).insertAdjacentHTML('beforeend', resultTemplate);
};

$(SELECTORS.ID.YOUTUBE_SEARCH_FORM).addEventListener('submit', async (event) => {
  event.preventDefault();

  const keyword = event.target.elements.keyword.value;

  if (!keyword) {
    showSnackbar(ALERT_MESSAGE.EMPTY_SEARCH_KEYWORD);
    return;
  }

  let recentKeywordList = store.load(LOCAL_STORAGE_KEYS.RECENT_KEYWORD_LIST);
  recentKeywordList = recentKeywordList.filter((item) => item !== keyword);

  if (recentKeywordList.length >= 3) {
    recentKeywordList.pop();
  }

  recentKeywordList.unshift(keyword);
  store.save(LOCAL_STORAGE_KEYS.RECENT_KEYWORD_LIST, recentKeywordList);

  $(SELECTORS.CLASS.RECENT_KEYWORD_LIST).innerHTML = recentKeywordList
    .map(
      (item) => `
        <a class="chip">${item}</a>
      `
    )
    .join('');

  $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT).scrollTo(0, 0);
  $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT).innerHTML = `<div class="youtube-search-result-list video-wrapper"></div>`;
  renderSkeletonUI(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_LIST, 10);

  // TODO: 테스트 코드 - 추후 삭제 요망
  let response;
  if (keyword === '무야호') {
    response = await searchYoutubeDummyData();
  } else {
    response = await searchYoutubeDummyData(true);
  }
  // TODO: 실제로 사용될 API 호출 코드
  // const response = await searchYoutube(keyword);

  if (response.pageInfo.totalResults === 0) {
    $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT).innerHTML = `
      <div class="no-result">
        <img src="./src/images/status/not_found.png" alt="검색 결과 없음" />
        <p><strong>검색 결과가 없습니다</strong></p>
      </div>
    `;
    return;
  }

  const searchResult = response.items;

  pageToken = response.nextPageToken;

  $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT).innerHTML = `<div class="youtube-search-result-list video-wrapper"></div>`;

  renderSearchResult(searchResult);
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

    pageToken = response.nextPageToken;
    renderSearchResult(searchResult);
  }
});

$(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT).addEventListener('click', async (event) => {
  const selectedVideoId = event.target.dataset.videoId;
  const $selectedButton = event.target;

  if (!event.target.classList.contains('btn-save')) return;

  store.pushItem(LOCAL_STORAGE_KEYS.WATCH_LIST, selectedVideoId);
  showSnackbar(ALERT_MESSAGE.VIDEO_SAVED);
  $selectedButton.classList.add(SELECTORS.STATUS.HIDDEN);

  const selectedVideo = await searchYoutubeById([selectedVideoId]);
  renderSavedVideos(selectedVideo.items);
});

const initVideos = async () => {
  const ids = store.load(LOCAL_STORAGE_KEYS.WATCH_LIST);
  if (!ids || ids.length <= 0) return;

  renderSkeletonUI(SELECTORS.CLASS.WATCH_LIST, ids.length);
  const selectedVideos = await searchYoutubeById(ids);

  $('main').innerHTML = `<div class="watch-list video-wrapper"></div>`;
  renderSavedVideos(selectedVideos.items);
};

initVideos();
