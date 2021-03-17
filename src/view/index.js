import {
  $emptyWatchingVideo,
  $watchingVideoWrapper,
  $modal,
  $searchQueries,
  $searchResultVideoWrapper,
  $nav,
  $savedVideoCount,
  $searchResultIntersector,
  $searchedVideoNotFound
} from '../elements';
import LayoutView from './LayoutView';
import ModalView from './ModalView';
import VideoView from './VideoView';

export const layoutView = new LayoutView($nav);

export const watchingVideoView = new VideoView(
  {
    $videoWrapper: $watchingVideoWrapper,
    $emptyVideoImage: $emptyWatchingVideo,
  },
  false
);

export const modalView = new ModalView({
  $modal,
  $searchQueries,
  $searchResultVideoWrapper,
  $savedVideoCount,
  $searchResultIntersector,
  $searchedVideoNotFound
});
