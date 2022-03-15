import StorageEngine from '../domain/storageEngine';

import { $ } from '../util/domHelper';

export default class VideoManualScreen {
  constructor() {
    this.storageEngine = new StorageEngine();

    this.searchResult = $('.search-result');

    this.searchResult.addEventListener('click', this.handleSaveVideo);
  }

  handleSaveVideo = (e) => {
    if (e.target.classList.contains('video-item__save-button')) {
      const { videoId } = e.target.closest('.video-item').dataset;

      this.storageEngine.saveVideo(videoId);
      e.target.classList.add('saved');
    }
  };
}
