import { SELECTOR } from './constants/index.js';
import { $ } from './utils/index.js';

$(SELECTOR.SEARCH_MODAL_BUTTON).addEventListener('click', () => {
  $(SELECTOR.SEARCH_MODAL).classList.remove('hide');
});

const closeModal = () => $(SELECTOR.SEARCH_MODAL).classList.add('hide');

$(SELECTOR.MODAL_BACKGROUND).addEventListener('click', closeModal);

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

const REDIRECT_SERVER_HOST = 'https://pensive-allen-3f5673.netlify.app/';
let nextPageToken = '';

const requestYoutubeAPI = async (keyword) => {
  const url = new URL('youtube/v3/search', REDIRECT_SERVER_HOST);
  const parameters = new URLSearchParams({
    part: 'snippet',
    type: 'video',
    maxResults: 10,
    regionCode: 'kr',
    safeSearch: 'strict',
    pageToken: nextPageToken,
    q: keyword,
  });
  url.search = parameters.toString();

  const response = await fetch(url, { method: 'GET' });
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error.message); //  <-- 이렇게 하시면 디버깅하실때 매우 편합니다.
  }

  return body;
};

$('#search-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const keyword = $('#search-input-keyword').value;
  const data = await requestYoutubeAPI(keyword);
  const html = data.items
    .map(
      ({ id, snippet }) =>
        `<li class="video-item" data-video-id="${id.videoId}">
        <img
          src="${snippet.thumbnails.default.url}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">[Playlist] ${snippet.title}</h4>
        <p class="video-item__channel-name">${snippet.channelTitle}</p>
        <p class="video-item__published-date">${snippet.pulishTime}</p>
        <button class="video-item__save-button button">⬇ 저장</button>
      </li>`
    )
    .join('');

  $('#videos').insertAdjacentHTML('beforeend', html);
  nextPageToken = data.nextPageToken;
});
