import prevSearchResult from '../storage/prevSearchResult.js';
import searchQuery from '../storage/searchQuery.js';
import watchingVideo from '../storage/watchingVideo.js';
import watchedVideo from '../storage/watchedVideo.js';
import { SETTINGS } from '../constants.js';
import modalView from '../view/modalView.js';

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
        controllerUtil.isWatchingVideo(video.videoId) ||
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
    modalView.insertSearchedVideos(videos);
    if (videos.length === 0) {
      modalView.showNotFountImage();
      return;
    }
  },
  loadSearchResult(videos) {
    modalView.renderSearchQueries(searchQuery.getQueries());
    modalView.renderSearchedVideos(controllerUtil.getProcessedVideos(videos));
  },
  loadPrevSearchedVideos(videos) {
    const processedVideos = controllerUtil.getProcessedVideos(videos);
    modalView.renderSearchedVideos(processedVideos);
    modalView.showSearchResultIntersector();
  },
  sendWatchingVideoedVideos(videoId) {
    const sendingVideo = watchingVideo.popVideoByVideoId(videoId);
    if (!sendingVideo) {
      return;
    }
    watchedVideo.pushVideo(sendingVideo);
  },
  sendWatchingVideoingVideos(videoId) {
    const sendingVideo = watchedVideo.popVideoByVideoId(videoId);
    if (!sendingVideo) {
      return;
    }
    watchingVideo.pushVideo(sendingVideo);
  },
  isWatchingVideo(videoId) {
    return watchingVideo.getVideos().some(video => video.videoId === videoId);
  },
  isWatchedVideo(videoId) {
    return watchedVideo.getVideos().some(video => video.videoId === videoId);
  },
};

export default controllerUtil;
