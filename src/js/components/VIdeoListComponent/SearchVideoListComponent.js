import VideoListComponent from '.';
import { VIDEO_COMPONENT_TYPE } from '../../constants/components';
import { CUSTOM_EVENT_KEY } from '../../constants/events';
import { dispatch } from '../../modules/eventFactory';
import { isFirstSearchByKeyword } from '../../utils/validation';
import SearchVideoComponent from '../VideoComponent/SearchVideoComponent';

class SearchVideoListComponent extends VideoListComponent {
  #searchVideoObserver = null;

  constructor(parentElement, type = VIDEO_COMPONENT_TYPE.SEARCH) {
    super(parentElement, type);

    this.$videoList.addEventListener('click', this.#onClickVideoList);
    this.#searchVideoObserver = new IntersectionObserver(this.#observeEntries, {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    });
  }

  render({ videoList, prevVideoListLength }) {
    if (isFirstSearchByKeyword(prevVideoListLength)) {
      this.videoComponents = [];
      this.$videoList.innerHTML = '';
    }

    this.$videoList.classList.remove('hide');
    this.videoComponents = this.#generateVideoComponents(videoList, prevVideoListLength);
  }

  #observeEntries(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        dispatch(CUSTOM_EVENT_KEY.LOAD_NEW_VIDEO_LIST);
      }
    });
  }

  #onClickVideoList = (e) => {
    const {
      target: { className },
    } = e;
    const { dataset } = e.target.closest('.video-item');

    if (className.includes('video-item__save-button')) {
      dispatch(CUSTOM_EVENT_KEY.CLICK_SAVE_BUTTON, {
        detail: {
          saveVideoId: dataset.videoId,
        },
      });
    }
  };

  #generateVideoComponents(videoList, prevVideoListLength) {
    return [
      ...this.videoComponents,
      ...videoList.slice(prevVideoListLength).map(
        (video, idx, arr) =>
          new SearchVideoComponent(this.$videoList, {
            video,
            observer: idx === arr.length - 1 ? this.#searchVideoObserver : null,
            notLazyLoad: prevVideoListLength === 0,
          })
      ),
    ];
  }
}
export default SearchVideoListComponent;
