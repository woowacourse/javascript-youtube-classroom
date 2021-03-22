import { fetchLatestVideoInfos } from '../API.js';
import { VIDEO_INFOS } from '../constants/localStorage.js';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage.js';

const videoInfos = {
  value: [],

  async init() {
    const oldVideoInfos = getLocalStorage(VIDEO_INFOS) ?? [];
    const latestVideoInfos = await this.update(oldVideoInfos);

    this.set(latestVideoInfos);
  },

  add(newVideoInfo) {
    this.value.push(newVideoInfo);
    setLocalStorage(VIDEO_INFOS, this.value);
  },

  remove(targetId) {
    const newVideoInfos = this.value.filter(
      ({ id }) => id.videoId !== targetId
    );

    this.set(newVideoInfos);
  },

  set(newVideoInfos) {
    this.value = Array.from(newVideoInfos);
    setLocalStorage(VIDEO_INFOS, this.value);
  },

  toggleWatchType(targetId) {
    const newVideoInfos = this.value.map(videoInfo =>
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

  toggleLikeType(targetId) {
    const newVideoInfos = this.value.map(videoInfo =>
      videoInfo.id.videoId === targetId
        ? {
            ...videoInfo,
            likeType: videoInfo.likeType === 'toLike' ? 'liked' : 'toLike',
          }
        : videoInfo
    );

    this.set(newVideoInfos);
  },

  get() {
    return this.value;
  },

  get length() {
    return this.value.length;
  },

  async update(oldVideoInfos) {
    const videoIds = oldVideoInfos.map(videoInfo => videoInfo.id.videoId);
    const { items: latestVideoInfos } = await fetchLatestVideoInfos(videoIds);

    return latestVideoInfos.map(({ id, snippet }) => ({
      id: { videoId: id },
      snippet: {
        title: snippet.title,
        channelId: snippet.channelId,
        channelTitle: snippet.channelTitle,
        publishTime: snippet.publishedAt,
      },
      watchType:
        oldVideoInfos.find(videoInfo => videoInfo.id.videoId === id)
          .watchType ?? `toWatch`,
      likeType:
        oldVideoInfos.find(videoInfo => videoInfo.id.videoId === id).likeType ??
        `toLike`,
    }));
  },
};

export default videoInfos;
