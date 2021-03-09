import { $ } from '../utils/dom.js';
import clipMaker from '../utils/clipMaker.js';
import View from './View.js';

export default class SavedVideosView extends View {
  constructor($element) {
    super($element);
  }

  renderSavedVideoClips(videos) {
    const savedVideoClips = videos
      .map((video) => clipMaker(video, { isModal: false }))
      .join('');

    this.$element.addInnerHTML(savedVideoClips);
  }

  addSavedVideoClip(video) {
    this.$element.addInnerHTML(clipMaker(video, { isModal: false }));
  }

  showNoVideos() {
    this.$element.setInnerHTML(
      `
        <div class="empty-videos stretch d-flex flex-col items-center">
          <img width="50%" src="./src/images/status/empty_tung.png" alt="empty-videos-img"></img>
          <h2>저장된 동영상이 없읍니다 🙄</h2>
          <p>동영상 검색 탭을 눌러 키워드를 검색 후 마음에 드는 동영상을 저장해 보세요 ☺️</p>
        </div>
      `,
    );
  }

  hideNoVideos() {
    $('.empty-videos').removeElement();
  }
}
