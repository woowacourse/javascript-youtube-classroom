import { fetchSearchResult } from './API.js';
import intersectionObserver from './states/intersectionObserver.js';
import pageToken from './states/pageToken.js';
import videoInfos from './states/videoInfos.js';
import $ from './utils/DOM.js';

function createVideoInfo(videoDataset) {
  const { videoId, title, channelId, channelTitle, publishTime } = videoDataset;

  return {
    id: { videoId },
    snippet: { title, channelId, channelTitle, publishTime },
    watchType: 'toWatch',
  };
}

function saveVideo($video) {
  const videoInfo = createVideoInfo($video.dataset);
  videoInfos.add(videoInfo);
}

function cancelVideoSave($video) {
  const { videoId } = $video.dataset;

  videoInfos.remove(videoId);
}

function initInfiniteScroll() {
  const $lastVideo = $('#video-search-result .js-video:last-child');

  intersectionObserver.disconnect();
  intersectionObserver.observe($lastVideo);
}

async function searchVideo(keyword) {
  const { nextPageToken, items } = await fetchSearchResult(keyword);
  pageToken.set(nextPageToken);

  return items.filter(item => item.id.videoId);
}

export { saveVideo, cancelVideoSave, searchVideo, initInfiniteScroll };
