import { SETTINGS } from '../constants';
import {
  watchedVideoModel,
  watchingVideoModel,
  prevSearchResultModel,
  searchQueryModel,
} from '../store.js';

const modalService = {
  getPrevSearchInfo() {
    return {
      lastQuery: prevSearchResultModel.getItem().lastQuery,
      pageToken: prevSearchResultModel.getItem().nextPageToken,
    };
  },
  getProcessedVideos(videos) {
    return videos.map(video => ({
      ...video,
      isSaved:
        isVideoIdExist(watchingVideoModel.getItem(), video.videoId) ||
        isVideoIdExist(watchedVideoModel.getItem(), video.videoId),
    }));
  },
  saveSearchQuery(searchQuery) {
    const filteredQueries = searchQueryModel
      .getItem()
      .filter(query => searchQuery !== query);
    filteredQueries.push(searchQuery);
    if (filteredQueries.length > SETTINGS.MAX_SAVED_SEARCH_QUERY_COUNT) {
      filteredQueries.shift();
    }
    searchQueryModel.setItem(filteredQueries);
  },
  savePrevSearchInfo({ lastQuery, nextPageToken }) {
    if (lastQuery) {
      prevSearchResultModel.setItem({ lastQuery });
    }
    if (nextPageToken) {
      prevSearchResultModel.setItem({ nextPageToken });
    }
  },
  savePrevSearchedVideos(videos) {
    prevSearchResultModel.setItem({ prevSearchedVideos: videos });
  },
  onWatchingVideoSave({ target }) {
    if (!target.classList.contains(SELECTOR_CLASS.SEARCHED_CLIP_SAVE_BUTTON)) {
      return;
    }
    // TODO: watching + watched 비디오 합쳐서 100개 이하여야함
    if (!watchingVideoService.isVideoCountUnderLimit()) {
      layoutView.showSnackbar(SNACKBAR_MESSAGE.SAVE_LIMIT_EXCEEDED, false);
      return;
    }

    if (watchingVideoService.isVideosEmpty()) {
      watchingVideoView.hideEmptyVideoImage();
      watchedVideoView.hideEmptyVideoImage();
    }
    watchingVideoService.pushNewVideo(target.dataset);

    if (controllerUtil.parseHash(location.hash) === BROWSER_HASH.WATCHING) {
      watchingVideoView.renderVideos(watchingVideoModel.getItem());
    }
    modalView.hideVideoSaveButton(target);
    layoutView.showSnackbar(SNACKBAR_MESSAGE.WATCHING_VIDEO_SAVE_SUCCESS, true);
  }
};

function isVideoIdExist(videos, videoId) {
  return videos.some(video => video.videoId === videoId);
}

export default modalService;
