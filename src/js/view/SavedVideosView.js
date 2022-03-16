import storage from '../domain/storage';
import { selectDom } from '../util/util';

class SavedVideosView {
  constructor() {
    this.savedVideos = selectDom('.saved-videos');
    this.videoList = selectDom('.video-list', this.savedVideos);
    this.renderedVideoIdArray = [];
    this.renderVideoList();
  }

  renderVideoList = () => {
    const videos = storage.getSavedVideos();

    if (videos.length === 0) {
      this.#renderNoSavedVideoTemplate();
      return;
    }
    const noSavedVideos = selectDom('.no-saved-videos');
    noSavedVideos?.remove();

    const newVideoIdArray = videos.filter((id) => !this.renderedVideoIdArray.includes(id));
    const videoElementList = this.#createVideoElements(newVideoIdArray);
    this.videoList.append(...videoElementList);
    this.renderedVideoIdArray = [...this.renderedVideoIdArray, ...newVideoIdArray];
  };

  #createVideoElements(videoIdArray) {
    return videoIdArray.map(() => {
      const element = document.createElement('li');
      element.className = 'video-item';
      element.innerHTML = this.#sampleVideoItem;
      return element;
    });
  }

  #renderNoSavedVideoTemplate() {
    this.videoList.innerHTML = '';
    if (!selectDom('.no-saved-videos')) {
      this.savedVideos.insertAdjacentHTML(
        'beforeend',
        `<div class="no-saved-videos">
        <p class="no-saved-videos__emoji">(⊙_⊙;))</p>
        <p class="no-saved-videos__description">
          저장된 영상이 없습니다! <br />
          우측 상단의 검색 버튼을 통해 영상을 검색한 뒤 저장해보세요!
        </p>
      </div>`
      );
    }
  }

  #sampleVideoItem = `
  <img
    src="https://i.ytimg.com/vi/mQhgF7RoUCA/mqdefault.jpg"
    alt="video-item-thumbnail"
    class="video-item__thumbnail"
  />
  <h4 class="video-item__title">우아한테크코스 4기 온라인 교육 설명회</h4>
  <p class="video-item__channel-name">박재성</p>
  <p class="video-item__published-date">2021년 10월 15일</p>

  <div class="video-item__button-wrapper">
    <button
      type="button"
      class="video-item__check-watched-button button"
      data-video-id="{videoId}"
    >
      ✅
    </button>
    <button
      type="button"
      class="video-item__unsave-button button"
      data-video-id="{videoId}"
    >
      🗑
    </button>
  </div>`;
}

export default SavedVideosView;
