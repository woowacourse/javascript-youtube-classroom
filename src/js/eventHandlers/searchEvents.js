import { $, isEndOfScroll } from '../util/general.js';
import YoutubeSearchClient from '../domain/YoutubeSearchClient.js';
import userInterface from '../ui/userInterface.js';
import storage from '../storage/storage.js';

const youtubeSearchClient = new YoutubeSearchClient();

export const handleSearch = () => {
  try {
    youtubeSearchClient.resetSearchResults();
    userInterface.resetVideoList();

    const searchInput = $('#search-input-keyword').value.trim();
    youtubeSearchClient.searchTarget = searchInput;

    userInterface.renderSkeletonUI();

    const response = youtubeSearchClient.callSearchAPI();
    youtubeSearchClient.updateSearchResults(response);

    userInterface.renderSearchResult(response);
  } catch (error) {
    alert(error.message);
  }
};

export const handleScroll = e => {
  if (isEndOfScroll(e.target)) {
    userInterface.renderSkeletonUI();

    const response = youtubeSearchClient.callSearchAPI();
    youtubeSearchClient.updateSearchResults(response);

    userInterface.renderNextSearchResult(response);
  }
};

export const handleSaveButtonClick = e => {
  if (!e.target.classList.contains('video-item__save-button')) {
    return;
  }
  try {
    const saveTargetVideo = e.target.parentElement.dataset;
    storage.updateSavedVideos(saveTargetVideo);

    e.target.closest('button').hidden = true;
  } catch (error) {
    alert(error.message);
  }
};
