import { isEndOfScroll } from '../util/scroll.js';
import { $ } from '../util/querySelector.js';
import YoutubeSearchAPI from '../service/YoutubeSearchAPI.js';
import userInterface from '../ui/userInterface.js';

const youtubeSearchAPI = new YoutubeSearchAPI();

export const handleSearch = () => {
  try {
    youtubeSearchAPI.resetSearchResults();
    userInterface.resetVideoList();

    userInterface.renderSkeletonUI();

    const searchKeyword = $('#search-input-keyword').value.trim();
    const response = youtubeSearchAPI.callSearchAPI(searchKeyword);
    youtubeSearchAPI.updateSearchResults(response);

    userInterface.renderSearchResult(response);
  } catch (error) {
    alert(error.message);
  }
};

export const handleScrollSearch = e => {
  try {
    if (isEndOfScroll(e.target)) {
      userInterface.renderSkeletonUI();

      const response = youtubeSearchAPI.callSearchAPI();
      youtubeSearchAPI.updateSearchResults(response);

      userInterface.renderAdditionalSearchResult(response);
    }
  } catch (error) {
    alert(error.message);
  }
};
