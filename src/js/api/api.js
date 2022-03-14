import { rootStore } from '../store/rootStore.js';
import WebStore from '../store/WebStore.js';
import { REDIRECT_SERVER_HOST } from '../config/config.js';
import { ERROR_MESSAGES, SAVED_VIDEO } from '../config/constants.js';

const request = async (url) => {
  const res = await fetch(url);
  const body = await res.json();

  if (!res.ok) throw new Error(body.error.message);

  return body;
};

const getSearchUrl = (query, nextPageToken) => {
  const url = new URL(
    `${process.env.NODE_ENV === 'development' && 'dummy/'}youtube/v3/search`,
    REDIRECT_SERVER_HOST
  );

  const parameters = new URLSearchParams({
    part: 'snippet',
    type: 'video',
    maxResults: 10,
    regionCode: 'kr',
    safeSearch: 'strict',
    pageToken: nextPageToken || '',
    q: query,
  });

  url.search = parameters.toString();

  return url;
};

export const api = {
  rootStore,
  webStore: new WebStore(SAVED_VIDEO.KEY),
  async searchVideos(query, nextPageToken = null) {
    this.rootStore.setState({ isSearchQuerySubmitted: true });

    try {
      const data = await request(getSearchUrl(query, nextPageToken));

      if (data.items)
        this.updateSearchResult(data.items, {
          query,
          nextPageToken: data.nextPageToken,
        });
    } catch (err) {
      this.rootStore.setState({ isSearchQuerySubmitted: false });

      throw err;
    }
  },
  async loadNextPage() {
    const { query, nextPageToken } = this.rootStore.state.searchOption;

    const data = await request(getSearchUrl(query, nextPageToken));

    if (data.items)
      this.appendSearchResult(data.items, {
        query,
        nextPageToken: data.nextPageToken,
      });
  },
  updateSearchResult(items, searchOption) {
    const savedVideos = this.webStore.load();
    const videos = items.map((item) => {
      return {
        videoId: item.id.videoId,
        thumbnailUrl: item.snippet.thumbnails.default.url,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        publishTime: item.snippet.publishTime,
        saved: savedVideos.includes(item.id.videoId),
      };
    });

    this.rootStore.setState({
      isNoResult: !items.length,
      searchResult: videos,
      searchOption,
    });
  },
  appendSearchResult(items, searchOption) {
    const savedVideos = this.webStore.load();
    const newVideos = items.map((item) => {
      return {
        videoId: item.id.videoId,
        thumbnailUrl: item.snippet.thumbnails.default.url,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        publishTime: item.snippet.publishTime,
        saved: savedVideos.includes(item.id.videoId),
      };
    });

    rootStore.setState({
      searchResult: [...this.rootStore.state.searchResult, ...newVideos],
      searchOption,
    });
  },
  saveVideo(videoId) {
    const prevSavedVideos = this.webStore.load();

    if (prevSavedVideos.length >= SAVED_VIDEO.SAVE_LIMIT)
      throw new Error(ERROR_MESSAGES.SAVED_VIDEOS_OUT_OF_LIMIT);

    const duplicatedRemoved = Array.from(
      new Set([...prevSavedVideos, videoId])
    );

    this.webStore.save(duplicatedRemoved);
  },
};
