import storage from '../storage/storage.js';
import YoutubeMachine from '../domain/YoutubeMachine.js';
import userInterface from '../ui/userInterface.js';
import { $ } from '../util/general.js';

export class SearchEventHandler {
  youtubeMachine = new YoutubeMachine();
  handleSearch = () => {
    try {
      this.youtubeMachine.resetSearchResult();
      userInterface.resetVideoList();
      const searchInput = $('#search-input-keyword').value.trim();
      userInterface.renderSkeletonUI();
      this.youtubeMachine.search(searchInput);
      userInterface.renderSearchResult(this.youtubeMachine.searchResult);
    } catch (error) {
      alert(error.message);
    }
  };

  handleScroll = e => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      userInterface.renderSkeletonUI();
      this.youtubeMachine.searchScrollingResult();
      userInterface.renderNextSearchResult(this.youtubeMachine.searchResult);
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
