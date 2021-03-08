import Component from '../../core/Component.js';
import Video from '../../model/Video.js';
import { localStorageGetItem } from '../../utils/utils.js';
import { LOCALSTORAGE_KEYS } from '../../constants/constants.js';

export default class VideoList extends Component {
  setup() {
    this.savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);

    /*
      {
          videoId1: {},
          videoId2: {},
          videoId3: {},
      }
      */
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
          }).createTemplate('management')
        );
      });
      this.$target.appendChild(fragment);
    } else {
      console.log('저장된 동영상 없음');
      // 저장된 동영상이 없다는 표시
    }
  }
}
