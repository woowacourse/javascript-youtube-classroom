import {
  API_SEARCH_ENDPOINT,
  YOUTUBE_VIDEO_ENDPOINT,
  YOUTUBE_CHANNEL_ENDPOINT,
  PART_TYPE,
  SEARCH_TYPE_VIDEO,
  MAX_RESULT_COUNT,
  REGION_CODE,
} from './constants.js';
import { YOUTUBE_API_KEY } from './env.js';

export default function App() {
  const $searchSection = document.querySelector('#search-section');
  const $searchKeywordForm = document.querySelector('#search-keyword-form');
  const $searchButton = document.querySelector('#search-button');
  const $modalCloseButton = document.querySelector('#modal-close-button');

  const onShowModal = () => {
    $searchSection.classList.add('open');
  };

  const onCloseModal = () => {
    $searchSection.classList.remove('open');
  };

  const request = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch (e) {
      console.error(e);
    }
  };

  const getURLQueryStringApplied = (queryStrings) => {
    const queryStringFlattened = Object.keys(queryStrings)
      .map((key) => `&${key}=${queryStrings[key]}`)
      .join('');

    return `${API_SEARCH_ENDPOINT}?key=${YOUTUBE_API_KEY}`.concat(queryStringFlattened);
  };

  const processJSON = (rawData) => {
    return rawData.items.map((item) => ({
      videoId: item.id.videoId,
      videoTitle: item.snippet.title,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
    }));
  };

  const getSearchResultTemplate = ({ videoId, videoTitle, channelId, channelTitle, publishedAt }) => {
    return `
        <article class="clip">
        <div class="preview-container image">
          <iframe
            width="100%"
            height="118"
            src=${YOUTUBE_VIDEO_ENDPOINT}${videoId}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
        <div class="content-container pt-2 px-1">
          <h3 class="video-title line">${videoTitle}</h3>
          <div class="channel-title line">
            <a
              href=${YOUTUBE_CHANNEL_ENDPOINT}${channelId}
              target="_blank"
              class="channel-name mt-1"
            >
              ${channelTitle}
            </a>
            <div class="published-at meta line">
              <p>${publishedAt}</p>
            </div>
            <div class="d-flex justify-end">
              <button class="save-button btn" 
              data-video-id="${videoId}"
              data-video-title="${videoTitle}"
              data-channel-id="${channelId}" 
              data-channel-title="${channelTitle}"
              data-published-at="${publishedAt}"
              >⬇️ 저장</button>
            </div>
          </div>
        </div>
      </article>
    `;
  };

  const renderSearchResult = (articlesInfo) => {
    const $videoWrapper = document.querySelector('#search-result-video-wrapper');

    $videoWrapper.innerHTML = articlesInfo.map((articleInfo) => getSearchResultTemplate(articleInfo)).join('');
  };

  const onSearchKeyword = (e) => {
    e.preventDefault();

    const url = getURLQueryStringApplied({
      part: PART_TYPE,
      q: e.target.elements['search-keyword-input'].value,
      type: SEARCH_TYPE_VIDEO,
      maxResults: MAX_RESULT_COUNT,
      regionCode: REGION_CODE,
    });

    request(url)
      .then((response) => {
        return processJSON(response);
      })
      .then((articlesInfo) => renderSearchResult(articlesInfo))
      .catch((error) => console.error(error));
  };

  $searchButton.addEventListener('click', onShowModal);
  $modalCloseButton.addEventListener('click', onCloseModal);
  $searchKeywordForm.addEventListener('submit', onSearchKeyword);
}

App();
