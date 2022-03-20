import Store, { observe } from '../store/Store.js';
import WebStore from '../store/WebStore.js';
import { request, getSearchUrl } from '../utils/api.js';
import { removeDuplicatedElements } from '../utils/commons.js';
import { ERROR_MESSAGES, SAVED_VIDEO } from '../config/constants.js';

class VideoService {
  constructor(initState) {
    this.rootStore = new Store(initState);
    this.webStore = new WebStore(SAVED_VIDEO.KEY);

    this.init();
  }

  init() {
    const savedVideos = this.webStore.load();

    this.rootStore.setState({ savedVideos });
  }

  clear() {
    this.rootStore.clear();
    this.webStore.clear();
  }

  async searchVideos(query, nextPageToken = null, requestStrategy = request) {
    this.rootStore.setState({ isSearchQuerySubmitted: true });

    try {
      const data = await requestStrategy(getSearchUrl(query, nextPageToken));

      if (data.items)
        this.updateSearchResult(data.items, {
          query,
          nextPageToken: data.nextPageToken,
        });
    } catch (err) {
      this.rootStore.setState({ isSearchQuerySubmitted: false });

      throw err;
    }
  }

  async loadNextPage(requestStrategy = request) {
    const { query, nextPageToken } = this.rootStore.state.searchOption;

    const data = await requestStrategy(getSearchUrl(query, nextPageToken));

    if (data.items)
      this.appendSearchResult(data.items, {
        query,
        nextPageToken: data.nextPageToken,
      });
  }

  updateSearchResult(items, searchOption) {
    const savedVideos = this.webStore.load();
    const videos = items.map((item) => {
      return {
        videoId: item.id.videoId,
        thumbnailUrl: item.snippet.thumbnails.default.url,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        publishTime: item.snippet.publishTime,
      };
    });

    this.rootStore.setState({
      isNoResult: !items.length,
      searchResult: videos,
      searchOption,
    });
  }

  appendSearchResult(items, searchOption) {
    const savedVideos = this.webStore.load();
    const newVideos = items.map((item) => {
      return {
        videoId: item.id.videoId,
        thumbnailUrl: item.snippet.thumbnails.default.url,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        publishTime: item.snippet.publishTime,
      };
    });

    this.rootStore.setState({
      searchResult: [...this.rootStore.state.searchResult, ...newVideos],
      searchOption,
    });
  }

  saveVideo(video) {
    const prevSavedVideos = this.webStore.load();

    if (prevSavedVideos.length >= SAVED_VIDEO.SAVE_LIMIT)
      throw new Error(ERROR_MESSAGES.SAVED_VIDEOS_OUT_OF_LIMIT);

    const duplicatedRemoved = removeDuplicatedElements(
      [...prevSavedVideos, video],
      'videoId'
    );

    this.webStore.save(duplicatedRemoved);
    this.rootStore.setState({
      savedVideos: duplicatedRemoved,
    });
  }

  removeSavedVideo(videoId) {
    const updated = this.rootStore.state.savedVideos.filter(
      (video) => video.videoId !== videoId
    );

    this.webStore.save(updated);
    this.rootStore.setState({
      savedVideos: updated,
    });
  }

  toggleVideoWatched(videoId) {
    const updated = this.rootStore.state.savedVideos.map((video) => {
      if (video.videoId === videoId) {
        return { ...video, watched: !video.watched ?? true };
      }

      return video;
    });

    this.webStore.save(updated);
    this.rootStore.setState({
      savedVideos: updated,
    });
  }

  toggleSavedVideosFilter(filterLabel) {
    if (
      !Object.prototype.hasOwnProperty.call(
        this.rootStore.state.savedVideosFilter,
        filterLabel
      )
    )
      return;

    const currentFilter = JSON.parse(
      JSON.stringify(this.rootStore.state.savedVideosFilter)
    );

    currentFilter[filterLabel] = !currentFilter[filterLabel];

    this.rootStore.setState({ savedVideosFilter: currentFilter });
  }

  toggleSearchModal() {
    this.rootStore.setState({
      isSearchModalOpened: !this.rootStore.state.isSearchModalOpened,
    });
  }
}

const initState = {
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
};

const videoService = new VideoService(initState);
const useStore = (callback) => {
  return callback(videoService.rootStore.state);
};

export default videoService;
export { useStore };
