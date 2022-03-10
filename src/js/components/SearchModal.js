import { fetchDataFromKeyword, getNextPageData } from '../utils/apiFetch.js';

export class SearchModal {
  constructor() {
    this.modalContainer = document.getElementById('modal-container');
    this.searchModalDialog = document.getElementsByClassName('search-modal');
    this.searchModalTitle = document.getElementsByClassName('search-modal-title');
    this.searchInputKeyword = document.getElementById('search-input-keyword');
    this.videoList = document.getElementById('video-list');
    this.videoItem = document.querySelectorAll('.video-item');

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
      this.keyword = keyword;
      this.removeSkeleton();
      this.renderIframe();
      this.createObserver();
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
    return `
    <li>
    <div>
      <iframe
          class = "video-item"
          type="text/html"
          src="https://www.youtube.com/embed/${keyword}"
          frameborder="0"
          allowfullscreen="allowfullscreen"
      ></iframe>
      </div>
      <button class="video-item__save-button button">⬇ 저장</button>
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

  createObserver() {
    this.videoItems = [...document.getElementsByClassName('video-item')];
    this.intersectionObserver = new IntersectionObserver((entries, observer) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        this.renderNextPage();
      }
    });

    this.intersectionObserver.observe(this.videoItems[this.videoItems.length - 1]);
  }

  async renderNextPage() {
    this.removePreviousObserver();
    //TODO:skeleton if needed
    this.videos = await getNextPageData(this.keyword, this.videos.nextPageToken);
    this.renderIframe();
    this.createObserver();
  }

  removePreviousObserver() {
    this.intersectionObserver.disconnect();
  }
}
