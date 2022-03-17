import { isEndOfScroll } from '../utils/scroll.js';
import { $ } from '../utils/querySelector.js';
import YoutubeSearchAPI from '../service/YoutubeSearchAPI.js';
import modalUI from '../ui/modal/modalUI.js';

const youtubeSearchAPI = new YoutubeSearchAPI();

export const handleSearch = () => {
  try {
    youtubeSearchAPI.resetSearchResults();
    modalUI.resetVideoList();

    modalUI.renderSkeletonUI();

    const searchKeyword = $('#search-input-keyword').value.trim();
    const response = youtubeSearchAPI.callSearchAPI(searchKeyword);
    youtubeSearchAPI.updateSearchResults(response);

    modalUI.renderSearchResult(response);
  } catch (error) {
    alert(error.message);
  }
};

export const handleScrollSearch = e => {
  try {
    if (isEndOfScroll(e.target)) {
      modalUI.renderSkeletonUI();

      const response = youtubeSearchAPI.callSearchAPI();
      youtubeSearchAPI.updateSearchResults(response);

      modalUI.renderAdditionalSearchResult(response);
    }
  } catch (error) {
    alert(error.message);
  }
};
