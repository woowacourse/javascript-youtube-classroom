import { $ } from './utils.js';
import { searchYoutube, searchYoutubeById, searchYoutubeDummyData } from './api.js';
import { ALERT_MESSAGE } from './constants.js';
import Store from './store.js';

const $searchButton = document.querySelector('#search-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const store = new Store();
let pageToken;

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$searchButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);

const showSnackbar = (message, second = 3) => {
  $('#snackbar').textContent = message;
  $('#snackbar').classList.add('show');

  setTimeout(() => {
    $('#snackbar').classList.remove('show');
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
      const isSaved = store.load('watchList').includes(videoId);

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
              <h3>${title}</h3>
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

  $('.youtube-search-result-list').insertAdjacentHTML('beforeend', resultTemplate);
};

const renderSavedVideos = (items) => {
  const resultTemplate = items
    .map((item) => {
      const { channelId, title, channelTitle, publishedAt } = item.snippet;
      const { videoId } = item.id;
      $('.watch-list').insertAdjacentHTML(
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
            <h3>${title}</h3>
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

  $('.watch-list').insertAdjacentHTML('beforeend', resultTemplate);
};

$('#youtube-search-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const keyword = event.target.elements.keyword.value;
  if (!keyword) {
    showSnackbar(ALERT_MESSAGE.EMPTY_SEARCH_KEYWORD);
    return;
  }

  $('.youtube-search-result').innerHTML = `<div class="youtube-search-result-list video-wrapper"></div>`;
  renderSkeletonUI('.youtube-search-result-list', 10);

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
    $('.youtube-search-result').innerHTML = `
      <div class="no-result">
        <img src="./src/images/status/not_found.png" alt="검색 결과 없음" />
        <p><strong>검색 결과가 없습니다</strong></p>
      </div>
    `;
    return;
  }

  const searchResult = response.items;

  pageToken = response.nextPageToken;

  $('.youtube-search-result').scrollTo(0, 0);
  $('.youtube-search-result').innerHTML = `<div class="youtube-search-result-list video-wrapper"></div>`;

  renderSearchResult(searchResult);
});

// TODO: 과도한 scroll 이벤트 방지를 위해 debounce 적용 필요
$('.youtube-search-result').addEventListener('scroll', async (event) => {
  const $videoWrapper = event.target;
  const isScrollBottom =
    Math.round($videoWrapper.scrollTop) === $videoWrapper.scrollHeight - $videoWrapper.offsetHeight;

  if (isScrollBottom) {
    const keyword = $('#youtube-search-keyword-input').value;
    const response = await searchYoutubeDummyData(keyword, pageToken);
    const searchResult = response.items;

    pageToken = response.nextPageToken;
    renderSearchResult(searchResult);
  }
});

$('.youtube-search-result').addEventListener('click', async (event) => {
  const selectedVideoId = event.target.dataset.videoId;
  const $selectedButton = event.target;
  console.log(selectedVideoId);
  if (!event.target.classList.contains('btn-save')) return;

  store.pushItem('watchList', selectedVideoId);
  showSnackbar(ALERT_MESSAGE.VIDEO_SAVED);
  $selectedButton.classList.add('hidden');

  const selectedVideo = await searchYoutubeById([selectedVideoId]);
  renderSavedVideos(selectedVideo.items);
});

const initVideos = async () => {
  const ids = store.load('watchList');
  renderSkeletonUI('.watch-list', ids.length);
  const selectedVideos = await searchYoutubeById(ids);
  $('main').innerHTML = `<div class="watch-list video-wrapper"></div>`;
  renderSavedVideos(selectedVideos.items);
};

initVideos();
