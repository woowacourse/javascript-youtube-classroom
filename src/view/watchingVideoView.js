import { $watchingVideoWrapper, $emptyWatchingVideo } from '../elements.js';
import { getWatchingVideoListTemplate } from './templates.js';
import viewUtil from './viewUtil.js';

const watchingVideoView = {
  renderWatchingVideoItems(videos) {
    viewUtil.renderHTML(
      $watchingVideoWrapper,
      getWatchingVideoListTemplate(videos)
    );
  },

  renderWatchingVideo(videos) {
    viewUtil.renderHTML(
      $watchingVideoWrapper,
      getWatchingVideoListTemplate(videos)
    );
  },
  eraseWatchingVideo() {
    viewUtil.renderHTML($watchingVideoWrapper, '');
  },

  showEmptyWatchingVideo() {
    viewUtil.showElement($emptyWatchingVideo);
  },

  hideEmptyWatchingVideo() {
    viewUtil.hideElement($emptyWatchingVideo);
  },
};

export default watchingVideoView;
