import view from '../view/view.js';
import prevSearchResult from '../storage/prevSearchResult.js';
import searchQuery from '../storage/searchQuery.js';
import videoToWatch from '../storage/videoToWatch.js';
import watchedVideo from '../storage/watchedVideo.js';
import { SETTINGS } from '../constants.js';

const controllerUtil = {
  setObserver($element, callback) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          callback();
        }
      });
    });
    observer.observe($element);
  },
  getProcessedVideos(videos) {
    return videos.map(video => ({
      ...video,
      isSaved:
        controllerUtil.isVideoToWatch(video.videoId) ||
        controllerUtil.isWatchedVideo(video.videoId),
    }));
  },
  getNewVideo(dataset) {
    return {
      title: dataset.title,
      channelTitle: dataset.channelTitle,
      publishedAt: dataset.publishedAt,
      videoId: dataset.videoId,
      isSaved: true,
    };
  },
  savePrevSearchInfo(lastQuery, nextPageToken) {
    prevSearchResult.setLastQuery(lastQuery);
    prevSearchResult.setNextPageToken(nextPageToken);
  },
  pushSearchQuery(input) {
    const filteredQueries = searchQuery
      .getQueries()
      .filter(query => input !== query);
    filteredQueries.push(input);
    if (filteredQueries.length > SETTINGS.MAX_SAVED_SEARCH_QUERY_COUNT) {
      filteredQueries.shift();
    }
    searchQuery.setQueries(filteredQueries);
  },
  loadAdditionalVideos(videos) {
    view.insertSearchedVideos(videos);
    if (videos.length === 0) {
      view.showNotFountContent();
      return;
    }
  },
  loadSearchResult(videos) {
    view.renderSearchQueries(searchQuery.getQueries());
    view.renderSearchedVideos(controllerUtil.getProcessedVideos(videos));
  },
  loadPrevSearchedVideos(videos) {
    const processedVideos = controllerUtil.getProcessedVideos(videos);
    view.renderSearchedVideos(processedVideos);
    view.showSearchResultIntersector();
  },
  sendVideoToWatchedVideos(videoId) {
    const sendingVideo = videoToWatch.popVideoByVideoId(videoId);
    if (!sendingVideo) {
      return;
    }
    watchedVideo.pushVideo(sendingVideo);
  },
  isVideoToWatch(videoId) {
    return videoToWatch.getVideos().some(video => video.videoId === videoId);
  },
  isWatchedVideo(videoId) {
    return watchedVideo.getVideos().some(video => video.videoId === videoId);
  },
};

export default controllerUtil;
