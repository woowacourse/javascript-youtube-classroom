import { isEndOfScroll } from '../utils/scroll.js';
import { $ } from '../utils/querySelector.js';
import YoutubeSearchAPI from '../service/YoutubeSearchAPI.js';
import modalUI from '../views/modal/modalUI.js';
import { validateInput } from '../validates/validate.js';

const youtubeSearchAPI = new YoutubeSearchAPI();

export const handleSearch = () => {
  try {
    youtubeSearchAPI.resetSearchResults();
    modalUI.resetVideoList();
    $('.suggestion').hidden = true;

    const searchKeyword = $('#search-input-keyword').value.trim();
    validateInput(searchKeyword);

    modalUI.renderSkeletonUI();

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

      const searchKeyword = $('#search-input-keyword').value.trim();
      const response = youtubeSearchAPI.callSearchAPI(searchKeyword);
      youtubeSearchAPI.updateSearchResults(response);

      modalUI.renderAdditionalSearchResult(response);
    }
  } catch (error) {
    alert(error.message);
  }
};
