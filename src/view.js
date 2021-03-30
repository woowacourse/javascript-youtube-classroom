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
} from './elements.js';
import LayoutView from './view/LayoutView.js';
import ModalView from './view/ModalView.js';
import VideoView from './view/VideoView.js';

const layout = new LayoutView({ $nav, $snackbarWrapper });

const watchingVideo = new VideoView(
  {
    $videoWrapper: $watchingVideoWrapper,
    $emptyVideoImage: $emptyWatchingVideo,
  },
  false
);

const watchedVideo = new VideoView(
  {
    $videoWrapper: $watchedVideoWrapper,
    $emptyVideoImage: $emptyWatchedVideo,
  },
  true
);

const modal = new ModalView({
  $modal,
  $searchQueries,
  $searchResultVideoWrapper,
  $savedVideoCount,
});

const view = {
  modal,
  watchedVideo,
  watchingVideo,
  layout,
};

export default view;
