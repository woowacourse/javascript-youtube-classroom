import {
  $emptyWatchedVideo,
  $emptyWatchingVideo,
  $watchedVideoWrapper,
  $watchingVideoWrapper,
  $modal,
  $searchQueries,
  $searchResultVideoWrapper,
  $nav,
  $snackbarWrapper,
  $savedVideoCount,
} from '../elements.js';
import LayoutView from './LayoutView.js';
import ModalView from './ModalView.js';
import VideoView from './VideoView.js';

export const layoutView = new LayoutView({ $nav, $snackbarWrapper });

export const watchingVideoView = new VideoView(
  {
    $videoWrapper: $watchingVideoWrapper,
    $emptyVideoImage: $emptyWatchingVideo,
  },
  false
);
export const watchedVideoView = new VideoView(
  {
    $videoWrapper: $watchedVideoWrapper,
    $emptyVideoImage: $emptyWatchedVideo,
  },
  true
);

export const modalView = new ModalView({
  $modal,
  $searchQueries,
  $searchResultVideoWrapper,
  $savedVideoCount,
});
