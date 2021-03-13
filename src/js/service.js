import { fetchSearchResult } from './API.js';
import pageToken from './states/pageToken.js';
import videoInfos from './states/videoInfos.js';

function createVideoInfo(videoDataset) {
  const { videoId, title, channelId, channelTitle, publishTime } = videoDataset;

  return {
    id: { videoId },
    snippet: { title, channelId, channelTitle, publishTime },
    isWatched: false,
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

async function searchVideo(keyword) {
  const { nextPageToken, items } = await fetchSearchResult(keyword);
  pageToken.set(nextPageToken);

  return items.filter(item => item.id.videoId);
}

export { saveVideo, cancelVideoSave, searchVideo };
