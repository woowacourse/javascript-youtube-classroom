import VideoListComponent from '.';
import { VIDEO_COMPONENT_TYPE } from '../../constants/components';
import { CUSTOM_EVENT_KEY } from '../../constants/events';
import { dispatch } from '../../modules/eventFactory';
import SavedVideoComponent from '../VideoComponent/SavedVideoComponent';

class SavedVideoListComponent extends VideoListComponent {
  /** 깜빡거림이 신경쓰인다. */
  constructor(parentElement, type) {
    super(parentElement, type);
    this.$videoList.addEventListener('click', this.#onClickVideoList);
  }

  render({ videoList: savedVideoList }, watchedVideoIdList) {
    this.$videoList.innerHTML = '';

    const { watchVideoList, watchedVideoList } = this.#parseWatchAndWahtchedVideo(
      savedVideoList,
      watchedVideoIdList
    );
    this.videoComponents = this.#generateVideoComponents(
      this.componentType === VIDEO_COMPONENT_TYPE.WATCH ? watchVideoList : watchedVideoList
    );
  }

  #onClickVideoList = (e) => {
    const {
      target: { className },
    } = e;
    const { dataset } = e.target.closest('.video-item');

    if (className.includes('video-item__delete-button')) {
      dispatch(CUSTOM_EVENT_KEY.CLICK_SAVED_DELETE_BUTTON, {
        detail: {
          savedVideoId: dataset.videoId,
        },
      });
    }
    if (className.includes('video-item__check-button')) {
      dispatch(CUSTOM_EVENT_KEY.CLICK_SAVED_CHECK_BUTTON, {
        detail: {
          savedVideoId: dataset.videoId,
          element: e.target,
        },
      });
    }
  };

  #generateVideoComponents(savedVideoList) {
    return savedVideoList.map(
      (savedVideo, idx) =>
        new SavedVideoComponent(this.$videoList, {
          video: savedVideo,
          notLazyLoad: idx < 10,
          type: this.componentType,
        })
    );
  }

  #parseWatchAndWahtchedVideo(savedVideoList, watchedVideoIdList) {
    return savedVideoList.reduce(
      (prev, savedVideo) => {
        const { videoId } = savedVideo.getVideoInfo();
        const isWatched = watchedVideoIdList.includes(videoId);

        return {
          ...prev,
          watchVideoList: isWatched ? prev.watchVideoList : [...prev.watchVideoList, savedVideo],
          watchedVideoList: isWatched
            ? [...prev.watchedVideoList, savedVideo]
            : prev.watchedVideoList,
        };
      },
      {
        watchVideoList: [],
        watchedVideoList: [],
      }
    );
  }
}
export default SavedVideoListComponent;
