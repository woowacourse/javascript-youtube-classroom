import $ from './library/utils/DOM.js';
import handleVideoSearch from './handlers/videoSearch.js';
import handleVideoSave from './handlers/videoSave.js';
import createIntersectionObserver from './library/intersectionObserver.js';
import state from './library/state.js';
import { openModal, closeModal } from './viewControllers/app.js';
import handleLatestKeywordSearch from './handlers/latestKeywordSearch.js';
import { fetchLatestVideoInfos } from './library/API.js';

async function updateVideoInfos(videoInfos) {
  const videoIds = videoInfos.map(videoInfo => videoInfo.id.videoId);
  const { items } = await fetchLatestVideoInfos(videoIds);

  return items.map(({ id, snippet }) => ({
    id: { videoId: id },
    snippet: {
      title: snippet.title,
      channelId: snippet.channelId,
      channelTitle: snippet.channelTitle,
      publishTime: snippet.publishedAt,
    },
    isWatched: false, // TODO: 필터 할 때 localStorage에서 받아오기 - 2단계.
  }));
}

async function initState() {
  const videoInfos = JSON.parse(localStorage.getItem('videoInfos')) ?? [];
  const latestKeywords =
    JSON.parse(localStorage.getItem('latestKeywords')) ?? [];
  const intersectionObserver = createIntersectionObserver();
  const latestVideoInfos = await updateVideoInfos(videoInfos);

  state.setVideoInfos(latestVideoInfos);
  state.setLatestKeywords(latestKeywords);
  state.setIntersectionObserver(intersectionObserver);
}

function initEvent() {
  $('#search-button').addEventListener('click', openModal);
  $('#modal-close-button').addEventListener('click', closeModal);
  $('#video-search-form').addEventListener('submit', handleVideoSearch);
  $('#video-search-result').addEventListener('click', handleVideoSave);
  $('#latest-keyword-list').addEventListener(
    'click',
    handleLatestKeywordSearch
  );
}

export { initState, initEvent };
