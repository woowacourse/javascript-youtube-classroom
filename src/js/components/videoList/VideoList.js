import Component from '../../core/Component.js';
import Video from '../../model/Video.js';
import {
  $$,
  localStorageGetItem,
  localStorageSetItem,
} from '../../utils/utils.js';
import { LOCALSTORAGE_KEYS } from '../../constants/constants.js';

export default class VideoList extends Component {
  setup() {
    this.savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);
  }

  initRender() {
    if (this.savedVideos) {
      const fragment = document.createDocumentFragment();
      Object.keys(this.savedVideos).forEach((videoId) => {
        fragment.appendChild(
          new Video({
            videoId,
            videoTitle: this.savedVideos[videoId].videoTitle,
            channelTitle: this.savedVideos[videoId].channelTitle,
            channelId: this.savedVideos[videoId].channelId,
            publishedAt: this.savedVideos[videoId].publishedAt,
            thumbnailURL: this.savedVideos[videoId].thumbnailURL,
            watched: this.savedVideos[videoId].watched,
          }).createTemplate('management')
        );
      });
      this.$target.appendChild(fragment);
    } else {
      console.log('저장된 동영상 없음');
    }
  }

  // watch-later / watched 필터링 => 렌더 따로 해주기.
  render() {
    $$('.clip', this.$target).forEach(($clip) => {
      $clip.classList.toggle('d-none');
    });
  }

  bindEvent() {
    this.$target.addEventListener('click', (event) => {
      // closest or button 에 data-video-id 부여.
      if (event.target.classList.contains('watched-button')) {
        const clip = event.target.closest('.clip');

        this.savedVideos[clip.dataset.videoId].watched = true;
        localStorageSetItem(LOCALSTORAGE_KEYS.VIDEOS, this.savedVideos);

        clip.classList.toggle('d-none');
      }
    });
  }
}
