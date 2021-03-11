import { fetchLatestVideoInfos } from '../API.js';
import { VIDEO_INFOS } from '../constants/localStorage.js';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage.js';

const videoInfos = {
  value: new Set(),

  async init() {
    const oldVideoInfos = getLocalStorage(VIDEO_INFOS) ?? [];
    const latestVideoInfos = await this.update(oldVideoInfos);

    this.set(latestVideoInfos);
  },

  add(newVideoInfo) {
    this.value.add(newVideoInfo);
    setLocalStorage(VIDEO_INFOS, [...this.value]);
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
  },

  toggleWatchType(targetId) {
    const newVideoInfos = [...this.value].map(videoInfo =>
      videoInfo.id.videoId === targetId
        ? {
            ...videoInfo,
            watchType:
              videoInfo.watchType === 'toWatch' ? 'watched' : 'toWatch',
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

  async update(videoInfos) {
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
  },
};

export default videoInfos;
