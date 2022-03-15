import storage from '../domain/storage';
import { selectDom } from '../util/util';

class SavedVideosView {
  constructor() {
    this.savedVideos = selectDom('.saved-videos');
  }

  renderVideoList() {
    const videos = storage.getSavedVideos();
    if (videos.length === 0) {
      this.#renderNoSavedVideoTemplate();
      return;
    }
    selectDom('.no-saved-videos').remove();
  }

  #renderNoSavedVideoTemplate() {
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
}

export default SavedVideosView;
