import storage from '../storage/storage.js';
import YoutubeMachine from '../domain/YoutubeMachine.js';
import searchModalInterface from '../ui/serachModalInterface.js';
import { $ } from '../util/general.js';

export class SearchEventHandler {
  youtubeMachine = new YoutubeMachine();
  handleSearch = async () => {
    try {
      this.youtubeMachine.resetSearchResult();
      searchModalInterface.resetVideoList();

      const searchInput = $('#search-input-keyword').value.trim();
      this.youtubeMachine.search(searchInput);

      searchModalInterface.renderSkeletonUI();

      const response = await this.youtubeMachine.callSearchAPI();
      this.youtubeMachine.updateSearchResult(response);

      searchModalInterface.renderSearchResult(this.youtubeMachine.searchResult);
    } catch (error) {
      alert(error.message);
    }
  };

  handleScroll = async e => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      searchModalInterface.renderSkeletonUI();
      const response = await this.youtubeMachine.callSearchAPI();

      this.youtubeMachine.updateSearchResult(response);
      searchModalInterface.renderNextSearchResult(this.youtubeMachine.searchResult);
    }
  };

  handleSaveButtonClick = e => {
    if (!e.target.classList.contains('video-item__save-button')) {
      return;
    }
    e.target.closest('button').hidden = true;
    this.youtubeMachine.searchResult.items.forEach(item => {
      if (item.id.videoId === e.target.parentElement.dataset.videoId) {
        storage.saveVideo(item);
      }
    });
  };
}
