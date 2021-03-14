import { fetchSearchResult } from './API.js';
import intersectionObserver from './states/intersectionObserver.js';
import pageToken from './states/pageToken.js';
import videoInfos from './states/videoInfos.js';
import { $ } from './utils/DOM.js';

function createVideoInfo(videoDataset) {
  const { videoId, title, channelId, channelTitle, publishTime } = videoDataset;

  return {
    id: { videoId },
    snippet: { title, channelId, channelTitle, publishTime },
    watchType: 'toWatch',
  };
}

async function searchVideo(keyword) {
  const { nextPageToken, items: videoList } = await fetchSearchResult(keyword);
  const filteredVideoList = videoList.filter(video => video.id.videoId);
  pageToken.set(nextPageToken);

  return filteredVideoList;
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

export { saveVideo, cancelVideoSave, searchVideo, initInfiniteScroll };
