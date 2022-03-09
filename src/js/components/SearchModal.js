import { fetchDataFromKeyword } from '../utils/apiFetch.js';

export class SearchModal {
  constructor() {
    this.modalContainer = document.getElementById('modal-container');
    this.searchModalDialog = document.getElementsByClassName('search-modal');
    this.searchModalTitle = document.getElementsByClassName('search-modal-title');
    this.searchInputKeyword = document.getElementById('search-input-keyword');
    this.videoList = document.getElementById('video-list');

    this.searchButton = document.getElementById('search-button');
    this.searchButton.addEventListener('click', this.handleSearchButton);

    this.initState();
  }

  initState() {
    this.videos = [];
  }

  show = () => {
    this.modalContainer.classList.remove('hide');
  };

  handleSearchButton = () => {
    this.getDataMatchKeyword(this.searchInputKeyword.value);
  };

  async getDataMatchKeyword(keyword) {
    this.videos = await fetchDataFromKeyword(keyword);
    this.renderIframe();
  }

  renderIframe() {
    this.resultLabel = document.getElementById('resultLabel');
    this.resultLabel.removeAttribute('hidden');
    this.videoList.insertAdjacentHTML(
      'beforeend',
      this.videos.items
        .map(
          (video) => `<li>
    <iframe
        class = "video-item"
        type="text/html"
        width="720"
        height="405"
        src="https://www.youtube.com/embed/${video.id.videoId}"
        frameborder="0"
        allowfullscreen="allowfullscreen"
    ></iframe>
</li>`,
        )
        .join(''),
    );
  }
}
