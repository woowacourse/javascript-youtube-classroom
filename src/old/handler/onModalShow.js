import { openModal } from '../view/viewModal';
import { $ } from 'old/utils/querySelector';
import localStorage from 'old/utils/localStorage';

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

const setRecentKeywords = () => {
  console.log('init');
  const recentKeywords = localStorage.get('recentKeywords') ?? [];
  console.log(recentKeywords);

  $('[data-js="youtube-search-modal__recent-keywords"]').innerHTML =
    recentKeywordsLabel() + recentKeywords.map(recentKeywordTemplate).join('');
};

const setSaveVideoCount = () => {
  const saveClips = localStorage.get('savedClips') ?? [];

  $(
    '[data-js="youtube-search-modal__save-video-count"]',
  ).innerText = `저장된 영상 갯수: ${saveClips.length}개`;
};

export const onModalShow = () => {
  openModal();
  setRecentKeywords();
  setSaveVideoCount();
  setRecentSearchResult();
};
