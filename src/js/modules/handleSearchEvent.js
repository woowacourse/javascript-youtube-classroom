import storage from '../storage/storage.js';
import YoutubeMachine from '../domain/YoutubeMachine.js';
import searchModalView from '../ui/serachModalView.js';
import { $, toggleSnackBar } from '../util/general.js';
import { SNACK_BAR } from '../constants/constants.js';
import { removeSearchInput } from '../util/render.js';

export class SearchEventHandler {
  youtubeMachine = new YoutubeMachine();
  handleSearch = async () => {
    try {
      this.youtubeMachine.resetSearchResult();
      searchModalView.resetVideoList();

      const searchInput = $('#search-input-keyword').value.trim();
      this.youtubeMachine.search(searchInput);

      searchModalView.renderSkeletonUI();

      const response = await this.youtubeMachine.callSearchAPI();
      this.youtubeMachine.updateSearchResult(response);

      searchModalView.renderSearchResult(this.youtubeMachine.searchResult);
    } catch ({ message: status }) {
      toggleSnackBar(status);
      removeSearchInput();
    }
  };

  handleScroll = async e => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      searchModalView.renderSkeletonUI();
      const response = await this.youtubeMachine.callSearchAPI();

      this.youtubeMachine.updateSearchResult(response);
      searchModalView.renderNextSearchResult(this.youtubeMachine.searchResult);
    }
  };

  handleSaveButtonClick = e => {
    if (!e.target.classList.contains('video-item__save-button')) {
      return;
    }
    e.target.closest('button').hidden = true;
    toggleSnackBar(SNACK_BAR.SAVE_MESSAGE);
    this.youtubeMachine.searchResult.items.forEach(item => {
      if (item.id.videoId === e.target.parentElement.dataset.videoId) {
        storage.saveVideo(item);
      }
    });
  };
}
