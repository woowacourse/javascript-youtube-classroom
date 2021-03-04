export const setRecentKeywords = () => {
  const recentKeywords = localStorage.get('recentKeywords') ?? [];

  $('[data-js="youtube-search-modal__recent-keywords"]').innerHTML =
    recentKeywordsLabel() + recentKeywords.map(recentKeywordTemplate).join('');
};

export const setSaveVideoCount = () => {
  const saveClips = localStorage.get('savedClips') ?? [];

  $(
    '[data-js="youtube-search-modal__save-video-count"]',
  ).innerText = `저장된 영상 갯수: ${saveClips.length}개`;
};

export const setRecentSearchResult = () => {
  const recentSearchResult = localStorage.get('recentSearchResult');

  if (!recentSearchResult) {
    return;
  }

  setVideoItems(recentSearchResult);
};

const $searchButton = document.querySelector('#search-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');

const onModalShow = () => {
  $modal.classList.add('open');
  setRecentKeywords();
  setSaveVideoCount();
  setRecentSearchResult();
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

new SearchModal();
loadSavedClips();

$searchButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);

$form.addEventListener('submit', this.search.bind(this));
$container.addEventListener('click', this.save.bind(this));
document.addEventListener('scroll', () => {
  if (!timer) {
    timer = setTimeout(function () {
      timer = null;
      scroll();
    }, 200);
  }
});

// //
// import SearchModal, {
//   loadSavedClips,
//   setVideoItems,
// } from './SearchModal/index.js';
// import localStorage from './utils/localStorage.js';
// import { onModalClick } from './handler/onModalClick.js';

// const $videoWrapper = $('[data-js=youtube-search-modal__video-wrapper]');
// const $skeletonWrapper = $('[data-js=youtube-search-modal__skeleton-wrapper]');
// const $form = $('[data-js=youtube-search-modal__form]');
// const $input = $('[data-js=youtube-search-modal__input]');
// const $videoWrapper = $('[data-js=youtube-search-modal__video-wrapper]');
// const $skeletonWrapper = $('[data-js=youtube-search-modal__skeleton-wrapper]');

// export const setSaveVideoCount = () => {
//   const saveClips = localStorage.get('savedClips') ?? [];

//   $(
//     '[data-js="youtube-search-modal__save-video-count"]',
//   ).innerText = `저장된 영상 갯수: ${saveClips.length}개`;
// };

// const setRecentSearchResult = () => {
//   const recentSearchResult = localStorage.get('recentSearchResult');

//   if (!recentSearchResult) {
//     return;
//   }

//   setVideoItems(recentSearchResult);
// };

// export const setVideoItems = (videoItems) => {
//   const $videoWrapper = $('[data-js=youtube-search-modal__video-wrapper]');
//   const savedClips = localStorage.get('savedClips') ?? [];
//   const savedClipIds = savedClips.map((savedClip) => savedClip.id.videoId);

//   $videoWrapper.innerHTML = videoItems
//     .map((video, index) => {
//       const isSaved = savedClipIds.includes(video.id.videoId);
//       return searchResultClipTemplate(video, index, isSaved);
//     })
//     .join('');
// };

// $searchButton.addEventListener('click', onModalShow);

// $modalClose.addEventListener('click', onModalClose);

//
// $container.addEventListener('click', save);
// document.addEventListener('scroll', () => {
//   if (!timer) {
//     timer = setTimeout(function () {
//       timer = null;
//       scroll();
//     }, 200);
//   }
// });
