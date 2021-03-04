import { $, hideElement } from '../util/index.js';
import { getSearchVideoByKeyword } from '../util/index.js';

export class SearchVideoResult {
  constructor({ searchKeywordHistoryManager, savedVideoManager }) {
    this.$container = $('.js-video-result-container');
    this.$wrapper = $('.js-video-result-wrapper');

    this.searchKeywordHistoryManager = searchKeywordHistoryManager;
    this.savedVideoManager = savedVideoManager;
    this.searchKeywordHistoryManager.subscribe(this.reset.bind(this));
    this.searchKeywordHistoryManager.subscribe(this.fetchSearchResultData.bind(this));

    this.searchResultData = {};

    this.initEvent();
  }

  initEvent() {
    this.$container.addEventListener('scroll', this.handleContainerScroll.bind(this));
    this.$wrapper.addEventListener('click', this.handleSaveVideo.bind(this));
  }

  async handleContainerScroll({ target }) {
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      try {
        const searchResultData = await getSearchVideoByKeyword(
          this.searchKeywordHistoryManager.getLastKeyword(),
          this.searchResultData.nextPageToken
        );

        this.setState({ searchResultData });
      } catch (e) {
        console.error(e);
      }
    }
  }

  async fetchSearchResultData() {
    try {
      const searchResultData = await getSearchVideoByKeyword(this.searchKeywordHistoryManager.getLastKeyword());
      this.setState({ searchResultData });
    } catch (e) {
      console.error(e);
      // TODO: 오류났음 보여주는 메세지 띄우기
    }
  }

  handleSaveVideo({ target }) {
    if (target.classList.contains('js-clip-save-button')) {
      const videoData = target.dataset;

      this.savedVideoManager.saveVideo({
        videoId: videoData.videoId,
        title: videoData.title,
        channelId: videoData.channelId,
        channelTitle: videoData.channelTitle,
        publishDate: videoData.publishDate,
        isCompleted: false,
      });

      hideElement(target);
    }
  }

  setState({ searchResultData }) {
    this.searchResultData = searchResultData;
    this.render();
  }

  reset() {
    this.$wrapper.innerHTML = '';
  }

  formatDateTime(inputDateTime) {
    const dateTime = new Date(inputDateTime);

    return `${dateTime.getFullYear()}년 ${dateTime.getMonth()}월 ${dateTime.getDate()}일`;
  }

  makeTemplate({ id, snippet }) {
    const date = this.formatDateTime(snippet.publishTime);

    return `
      <section class="video-wrapper mt-8">
        <article class="clip">
          <div class="preview-container">
            <iframe
              width="100%"
              height="118"
              src="https://www.youtube.com/embed/${id.videoId}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="content-container pt-2 px-1">
            <h3>${snippet.title}</h3>
            <div>
              <a
                href="https://www.youtube.com/channel/${snippet.channelId}"
                target="_blank"
                class="channel-name mt-1"
              >
              ${snippet.channelTitle}
              </a>
              <div class="meta">
                <p>${date}</p>
              </div>
              <div class="d-flex justify-end">
                <button 
                  class="js-clip-save-button btn" 
                  data-video-id="${id.videoId}" 
                  data-title="${snippet.title}" 
                  data-channel-id="${snippet.channelId}" 
                  data-channel-title="${snippet.channelTitle}" 
                  data-publish-date="${date}"
                >⬇️ 저장</button>
              </div>
            </div>
          </div>
        </article>
      </section>
    `;
  }

  render() {
    this.$wrapper.insertAdjacentHTML(
      'beforeend',
      this.searchResultData.items.map(item => this.makeTemplate(item)).join('')
    );
  }
}
