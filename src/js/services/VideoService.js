import AppStore from '../store/AppStore.js';
import WebStore from '../store/WebStore.js';
import { request, getSearchUrl } from '../utils/api.js';
import { removeDuplicatedElements } from '../utils/commons.js';
import { ERROR_MESSAGES, SAVED_VIDEO } from '../config/constants.js';

class VideoService {
  constructor(initState) {
    this.rootStore = new AppStore(null, initState.rootStore);
    this.webStore = new WebStore(SAVED_VIDEO.KEY, initState.webStore);

    this.init();
  }

  init() {
    const savedVideos = this.webStore.load((state) => state.savedVideos);

    this.rootStore.update({ savedVideos });
  }

  clear() {
    this.rootStore.clear();
    this.webStore.clear();
  }

  async searchVideos(query, nextPageToken = null, requestStrategy = request) {
    this.rootStore.update({ isSearchQuerySubmitted: true });

    try {
      const data = await requestStrategy(getSearchUrl(query, nextPageToken));

      if (data.items)
        this.updateSearchResult(data.items, {
          query,
          nextPageToken: data.nextPageToken,
        });
    } catch (err) {
      this.rootStore.update({ isSearchQuerySubmitted: false });

      throw err;
    }
  }

  async loadNextPage(requestStrategy = request) {
    const { query, nextPageToken } = this.rootStore.load(
      (state) => state.searchOption
    );

    const data = await requestStrategy(getSearchUrl(query, nextPageToken));

    if (data.items)
      this.appendSearchResult(data.items, {
        query,
        nextPageToken: data.nextPageToken,
      });
  }

  updateSearchResult(items, searchOption) {
    const videos = items.map((item) => {
      return {
        videoId: item.id.videoId,
        thumbnailUrl: item.snippet.thumbnails.default.url,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        publishTime: item.snippet.publishTime,
      };
    });

    this.rootStore.update({
      isNoResult: !items.length,
      searchResult: videos,
      searchOption,
    });
  }

  appendSearchResult(items, searchOption) {
    const prevVideos = this.rootStore.load((state) => state.searchResult);
    const newVideos = items.map((item) => {
      return {
        videoId: item.id.videoId,
        thumbnailUrl: item.snippet.thumbnails.default.url,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        publishTime: item.snippet.publishTime,
      };
    });

    this.rootStore.update({
      searchResult: [...prevVideos, ...newVideos],
      searchOption,
    });
  }

  saveVideo(video) {
    const prevSavedVideos = this.webStore.load((state) => state.savedVideos);

    if (prevSavedVideos.length >= SAVED_VIDEO.SAVE_LIMIT)
      throw new Error(ERROR_MESSAGES.SAVED_VIDEOS_OUT_OF_LIMIT);

    const duplicatedRemoved = removeDuplicatedElements(
      [...prevSavedVideos, video],
      'videoId'
    );

    this.webStore.update({
      savedVideos: duplicatedRemoved,
    });
    this.rootStore.update({
      savedVideos: duplicatedRemoved,
    });
  }

  removeSavedVideo(videoId) {
    const updated = this.rootStore
      .load((state) => state.savedVideos)
      .filter((video) => video.videoId !== videoId);

    this.webStore.update({
      savedVideos: updated,
    });
    this.rootStore.update({
      savedVideos: updated,
    });
  }

  toggleVideoWatched(videoId) {
    const updated = this.rootStore
      .load((state) => state.savedVideos)
      .map((video) => {
        if (video.videoId === videoId) {
          return { ...video, watched: !video.watched ?? true };
        }

        return video;
      });

    this.webStore.update({
      savedVideos: updated,
    });
    this.rootStore.update({
      savedVideos: updated,
    });
  }

  toggleSavedVideosFilter(filterLabel) {
    const currentFilter = JSON.parse(
      JSON.stringify(this.rootStore.load((state) => state.savedVideosFilter))
    );

    if (!Object.prototype.hasOwnProperty.call(currentFilter, filterLabel))
      return;

    currentFilter[filterLabel] = !currentFilter[filterLabel];

    this.rootStore.update({ savedVideosFilter: currentFilter });
  }

  toggleSearchModal() {
    this.rootStore.update({
      isSearchModalOpened: !this.rootStore.state.isSearchModalOpened,
    });
  }
}

const initState = {
  rootStore: {
    searchOption: {
      query: '',
      nextPageToken: null,
    },
    isSearchQuerySubmitted: false,
    searchResult: [],
    isNoResult: null,
    savedVideos: new Map(),
    savedVideosFilter: {
      watching: true,
      watched: false,
    },
    isSearchModalOpened: false,
  },
  webStore: {
    savedVideos: [],
  },
};
const videoService = new VideoService(initState);
const useStore = (callback) => {
  return callback(videoService.rootStore.load((state) => state));
};

export default videoService;
export { useStore };
