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
  $searchResultIntersector,
  $searchedVideoNotFound
} from '../elements';
import LayoutView from './LayoutView';
import ModalView from './ModalView';
import VideoView from './VideoView';

export const layoutView = new LayoutView($nav, $snackbarWrapper);

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
  $searchResultIntersector,
  $searchedVideoNotFound
});
