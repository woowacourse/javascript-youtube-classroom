import { $ } from '../utils/querySelector.js';
import date from '../utils/date.js';

const $modal = $('[data-js="youtube-search-modal"]');

const YMDtemplate = (time) => {
  const [year, month, day] = date.toYMDArray(time);

  return `<p>${year}년 ${month}월 ${day}일</p>`;
};

const searchResultClipTemplate = (video, index, isSaved = false) => {
  return `
    <article class="clip" data-js="youtube-search-modal__clip">
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
            ${YMDtemplate(video.snippet.publishTime)}
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

export const openModal = () => {
  $modal.classList.add('open');
};

export const closeModal = () => {
  $modal.classList.remove('open');
};

const recentKeywordsLabel = () => {
  return `<span class="text-gray-700">최근 검색어: </span>`;
};

const recentKeywordTemplate = (keyword) => {
  return `<a class="chip" data-js="youtube-search-modal__chip">${keyword}</a>`;
};

export const renderRecentKeywords = (recentKeywords) => {
  $('[data-js="youtube-search-modal__recent-keywords"]').innerHTML =
    recentKeywordsLabel() + recentKeywords.map(recentKeywordTemplate).join('');
};

export const renderSaveVideoCount = (saveClips) => {
  $(
    '[data-js="youtube-search-modal__save-video-count"]',
  ).innerText = `저장된 영상 갯수: ${saveClips.length}개`;
};

export const renderExtraClips = (videoItems, savedClipIds) => {
  $('[data-js=youtube-search-modal__video-wrapper]').innerHTML += videoItems
    .map((video, index) => {
      const isSaved = savedClipIds.includes(video.id.videoId);
      return searchResultClipTemplate(video, index, isSaved);
    })
    .join('');
};

export const renderClips = (videoItems, savedClipIds) => {
  $('[data-js=youtube-search-modal__video-wrapper]').innerHTML = videoItems
    .map((video, index) => {
      const isSaved = savedClipIds.includes(video.id.videoId);
      return searchResultClipTemplate(video, index, isSaved);
    })
    .join('');
};

export const setRecentKeywords = (recentKeywords) => {
  $('[data-js="youtube-search-modal__recent-keywords"]').innerHTML =
    recentKeywordsLabel() + recentKeywords.map(recentKeywordTemplate).join('');
};

export const clearSearchResult = () => {
  $('[data-js=youtube-search-modal__video-wrapper]').innerHTML = '';
};
