import { YOUTUBE } from '../../utils/constant.js';
import { $ } from '../../utils/querySelector.js';
import { API_KEY } from '../../utils/index.js';
import localStorage from '../../utils/localStorage.js';
import { setRecentKeywords, setRecentSearchResult } from '../../index.js';
import {showElemen,hideElement} from 'old/utils/setAttribute'

const request = async(URL)=> {
  try {
    const response = await fetch(`${BASE_URL}${URL}`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (err) {
    alert(`💣 Error : ${err} 💣`);
  }
}

const searchResultClipTemplate = (video, index, isSaved = false) => {
  const [year, month, day] = new Date(video.snippet.publishTime)
    .toLocaleDateString()
    .split('.');

  return `
    <article class="clip">
      <div class="preview-container">
        <iframe 
          width="100%"
          height="118"
          src=https://www.youtube.com/embed/${video.id.videoId}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="content-container pt-2 px-1">
        <h3>${video.snippet.title}</h3>
        <div>
          <a
            href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
            target="_blank"
            class="channel-name mt-1"
          >
            ${video.snippet.channelTitle}
          </a>
          <div class="meta">
            <p>${year}년 ${month}월 ${day}일</p>
          </div>
          <div class="d-flex justify-end">
          ${
            isSaved
              ? ''
              : `<button class="btn" data-js="save-button" data-clip-index=${index}>⬇️ 저장</button>`
          }      
          </div>
        </div>
      </div>
    </article>
  `;
};


const setVideoItems = (videoItems) => {
  const $videoWrapper = $('[data-js=youtube-search-modal__video-wrapper]');
  const savedClips = localStorage.get('savedClips') ?? [];
  const savedClipIds = savedClips.map((savedClip) => savedClip.id.videoId);

  $videoWrapper.innerHTML = videoItems
    .map((video, index) => {
      const isSaved = savedClipIds.includes(video.id.videoId);
      return searchResultClipTemplate(video, index, isSaved);
    })
    .join('');
};

const setRecentSearchResult = () => {
  const recentSearchResult = localStorage.get('recentSearchResult');

  if (!recentSearchResult) {
    return;
  }

  setVideoItems(recentSearchResult);
};
const lazyLoading = async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight < scrollHeight) {
    return;
  }

  showElement($$skeletonWrapper)
  const $skeletonWrapper = $(
    '[data-js=youtube-search-modal__skeleton-wrapper]',
  );

  $skeletonWrapper.classList.remove('d-none');

  const keyword = localStorage.get('recentKeyword');
  const pageToken = localStorage.get('nextPageToken')
    ? `&pageToken=${localStorage.get('nextPageToken')}`
    : '';

  const URL = `/search?&part=snippet${pageToken}&maxResults=${YOUTUBE.NUMBER_TO_LOAD}&q=${keyword}&key=${API_KEY}`;
  const response = await request(URL);
  const recentSearchResult = localStorage.get('recentSearchResult');
  recentSearchResult.push(...response.items);
  localStorage.set('recentSearchResult', recentSearchResult);

  hideElement( $skeletonWrapper)
  setRecentSearchResult();
};

const throttling = (func) => {
  let timer;
  if (!timer) {
    timer = setTimeout(function () {
      timer = null;
      func();
    }, 200);
  }
}


export const throttling(lazyLoading)
