import { API_KEY } from 'old/utils/env';
import { YOUTUBE } from 'old/utils/constant';
import localStorage from 'old/utils/localStorage';
import { hideElement, showElement } from 'old/utils/setAttribute';
import { $ } from 'old/utils/querySelector';

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

const recentKeywordsLabel = () => {
  return `<span class="text-gray-700">최근 검색어: </span>`;
};

const recentKeywordTemplate = (keyword) => {
  return `<a class="chip">${keyword}</a>`;
};

const BASE_URL = `https://www.googleapis.com/youtube/v3`;

const request = async (URL) => {
  try {
    const response = await fetch(`${BASE_URL}${URL}`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (err) {
    alert(`💣 Error : ${err} 💣`);
  }
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

const setRecentKeywords = () => {
  const recentKeywords = localStorage.get('recentKeywords') ?? [];

  $('[data-js="youtube-search-modal__recent-keywords"]').innerHTML =
    recentKeywordsLabel() + recentKeywords.map(recentKeywordTemplate).join('');
};

export const handleSearchItem = async (event) => {
  event.preventDefault();

  const $skeletonWrapper = $(
    '[data-js=youtube-search-modal__skeleton-wrapper]',
  );
  const $input = $('[data-js=youtube-search-modal__input]');

  showElement($skeletonWrapper);

  const keyword = $input.value;
  const URL = `/search?&part=snippet&maxResults=${YOUTUBE.NUMBER_TO_LOAD}&q=${keyword}&key=${API_KEY}`;
  const response = await request(URL);
  const videoItems = response.items;

  hideElement($skeletonWrapper);

  if (videoItems.length === 0) {
    $('data-js=youtube-search-modal__not-found').classList.remove('d-none');
  }
  setVideoItems(videoItems);

  localStorage.set('recentKeywords', keyword);
  localStorage.set('currentKeyword', keyword);
  localStorage.set('nextPageToken', response.nextPageToken);
  localStorage.set('recentSearchResult', videoItems);
  setRecentKeywords();
};
