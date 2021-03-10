import {
  $emptyWatchedVideo,
  $watchedVideoWrapper,
  $watchingVideoWrapper,
} from '../elements';
import { getWatchingVideoListTemplate } from './templates';
import viewUtil from './viewUtil';

const watchedVideoView = {
  renderWatchedVideo(videos) {
    viewUtil.renderHTML($watchingVideoWrapper, '');
    viewUtil.renderHTML(
      $watchedVideoWrapper,
      getWatchingVideoListTemplate(videos, true)
    );
  },
  eraseWatchedVideo() {
    viewUtil.renderHTML($watchedVideoWrapper, '');
  },
  showEmptyWatchedVideo() {
    viewUtil.showElement($emptyWatchedVideo);
  },
  hideEmptyWatchedVideo() {
    viewUtil.hideElement($emptyWatchedVideo);
  },
};

export default watchedVideoView;
