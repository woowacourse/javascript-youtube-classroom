import { isEndOfScroll } from '../util/scroll.js';
import { $ } from '../util/querySelector.js';
import YoutubeSearch from '../domain/YoutubeSearch.js';
import userInterface from '../ui/userInterface.js';
import videoStorage from '../localStorage/videoStorage.js';
import { ERROR, MAX_SAVED_VIDEOS_NUMBER } from '../constants/constants';

const youtubeSearch = new YoutubeSearch();

export const handleSearch = () => {
  try {
    youtubeSearch.resetSearchResults();
    userInterface.resetVideoList();

    const searchInput = $('#search-input-keyword').value.trim();
    youtubeSearch.searchTarget = searchInput;

    userInterface.renderSkeletonUI();

    const response = youtubeSearch.callSearchAPI();
    youtubeSearch.updateSearchResults(response);

    userInterface.renderSearchResult(response);
  } catch (error) {
    alert(error.message);
  }
};

export const handleScroll = e => {
  if (isEndOfScroll(e.target)) {
    userInterface.renderSkeletonUI();

    const response = youtubeSearch.callSearchAPI();
    youtubeSearch.updateSearchResults(response);

    userInterface.renderNextSearchResult(response);
  }
};

export const handleSaveButtonClick = e => {
  if (!e.target.classList.contains('video-item__save-button')) {
    return;
  }
  try {
    const saveTargetVideo = {
      id: e.target.parentElement.dataset.videoId,
      imgSrc: e.target.parentElement.children[0].currentSrc,
      title: e.target.parentElement.children[1].textContent,
      channelTitle: e.target.parentElement.children[2].textContent,
      publishedDate: e.target.parentElement.children[3].textContent,
      watched: false,
    };

    const savedVideos = videoStorage.getSavedVideos();

    if (!savedVideos) {
      videoStorage.setSavedVideos([saveTargetVideo]);
      return;
    }

    if (savedVideos.length > MAX_SAVED_VIDEOS_NUMBER) {
      throw new Error(ERROR.MESSAGE.OVER_MAX_SAVED_VIDEOS_NUMBER);
    }
    if (savedVideos.some(savedVideo => savedVideo.id === saveTargetVideo.id)) {
      throw new Error(ERROR.MESSAGE.ALREADY_SAVED_VIDEOS);
    }
    videoStorage.setSavedVideos([...savedVideos, saveTargetVideo]);

    e.target.closest('button').hidden = true;
  } catch (error) {
    alert(error.message);
  }
};
