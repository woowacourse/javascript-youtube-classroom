import storage from '../storage/storage.js';
import YoutubeMachine from '../domain/YoutubeMachine.js';
import searchModalInterface from '../ui/serachModalInterface.js';
import { $ } from '../util/general.js';

export class SearchEventHandler {
  youtubeMachine = new YoutubeMachine();
  handleSearch = () => {
    try {
      this.youtubeMachine.resetSearchResult();
      searchModalInterface.resetVideoList();
      const searchInput = $('#search-input-keyword').value.trim();
      searchModalInterface.renderSkeletonUI();
      this.youtubeMachine.search(searchInput);
      searchModalInterface.renderSearchResult(this.youtubeMachine.searchResult);
    } catch (error) {
      alert(error.message);
    }
  };

  handleScroll = e => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      searchModalInterface.renderSkeletonUI();
      this.youtubeMachine.searchScrollingResult();
      searchModalInterface.renderNextSearchResult(this.youtubeMachine.searchResult);
    }
  };

  handleSaveButtonClick = e => {
    if (!e.target.classList.contains('video-item__save-button')) {
      return;
    }
    e.target.closest('button').hidden = true;
    const { videoId } = e.target.parentElement.dataset;
    storage.saveVideo(videoId);
  };
}
