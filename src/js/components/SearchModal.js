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
  }

  initState() {
    this.videos = [];
    this.videoList.replaceChildren();
  }

  show = () => {
    this.modalContainer.classList.remove('hide');
  };

  handleSearchButton = () => {
    this.initState();
    this.getDataMatchKeyword(this.searchInputKeyword.value);
  };

  async getDataMatchKeyword(keyword) {
    this.renderSkeleton();
    try {
      this.videos = await fetchDataFromKeyword(keyword);
      this.removeSkeleton();
      this.renderIframe();
    } catch (error) {
      this.renderNoVideosImg();
      console.log('동영상이없어요.');
    }
  }

  renderNoVideosImg() {
    this.imgSrcAddress = `src/assets/images/not_found.png`;
    this.videoList.insertAdjacentHTML('beforeend', `<img src=${this.imgSrcAddress} alt="없음" />`);
  }
  renderIframe() {
    this.resultLabel = document.getElementById('resultLabel');
    this.resultLabel.removeAttribute('hidden');
    this.videoList.insertAdjacentHTML(
      'beforeend',
      this.videos.items.map((video) => this.makeIframeTemplate(video.id.videoId)).join(''),
    );
  }

  renderSkeleton() {
    this.videoList.insertAdjacentHTML(
      'beforeend',
      Array.from({ length: 10 }, () => this.makeSkeletonTemplate()).join(''),
    );
  }

  removeSkeleton() {
    this.skeletonCards = [...document.getElementsByClassName('skeleton')];
    this.skeletonCards.forEach((x) => this.videoList.removeChild(x));
  }

  makeIframeTemplate(keyword) {
    return `<li>
      <iframe
          class = "video-item"
          type="text/html"
          width="720"
          height="405"
          src="https://www.youtube.com/embed/${keyword}"
          frameborder="0"
          allowfullscreen="allowfullscreen"
      ></iframe>
  </li>`;
  }

  makeSkeletonTemplate() {
    return `
    <div class="skeleton">
        <div class="image"></div>
        <p class="line"></p>
        <p class="line"></p>
    </div>
    `;
  }
}
