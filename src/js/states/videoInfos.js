import { renderSavedVideoList } from '../viewControllers/app.js';
import { renderSavedVideoCount } from '../viewControllers/searchModal.js';
import { fetchLatestVideoInfos } from '../API.js';
import { VIDEO_INFOS } from '../constants/localStorage.js';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage.js';
import isWatchedMode from './isWatchedMode.js';

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
    isWatched: videoInfos.find(videoInfo => videoInfo.id.videoId === id)
      .isWatched,
  }));
}

const videoInfos = {
  value: new Set(),

  async init() {
    const oldVideoInfos = getLocalStorage(VIDEO_INFOS) ?? [];
    const latestVideoInfos = await updateVideoInfos(oldVideoInfos);

    this.set(latestVideoInfos);
  },

  add(newVideoInfo) {
    this.value.add(newVideoInfo);
    setLocalStorage(VIDEO_INFOS, [...this.value]);

    renderSavedVideoCount(this.value.size);
    renderSavedVideoList(this.value, isWatchedMode.get());
  },

  remove(targetId) {
    const newVideoInfos = [...this.value].filter(
      ({ id }) => id.videoId !== targetId
    );

    this.set(newVideoInfos);
  },

  set(newVideoInfos) {
    this.value = new Set(newVideoInfos);
    setLocalStorage(VIDEO_INFOS, [...this.value]);

    renderSavedVideoCount(this.value.size);
    renderSavedVideoList(this.value, isWatchedMode.get());
  },

  toggleIsWatched(targetId) {
    const newVideoInfos = [...this.value].map(videoInfo =>
      videoInfo.id.videoId === targetId
        ? {
            ...videoInfo,
            isWatched: !videoInfo.isWatched,
          }
        : videoInfo
    );

    this.set(newVideoInfos);
  },

  get() {
    return this.value;
  },

  get size() {
    return this.value.size;
  },
};

export default videoInfos;
