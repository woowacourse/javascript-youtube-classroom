import {
  $savedVideoNotFound,
  $savedVideoWrapper,
  $nav,
  $snackbarWrapper,
  $modal,
  $searchQueries,
  $searchContentVideoWrapper,
  $searchContentSavedVideoCount,
  $searchContentIntersector,
  $searchContentVideoNotFound,
  $savedVideoUpIntersector,
  $savedVideoDownIntersector,
} from '../elements';
import LayoutView from './LayoutView.js';
import ModalView from './ModalView.js';
import VideoView from './VideoView.js';

export const layoutView = new LayoutView($nav, $snackbarWrapper);

export const savedVideoView = new VideoView({
  $videoWrapper: $savedVideoWrapper,
  $emptyVideoImage: $savedVideoNotFound,
  $upVideoIntersector: $savedVideoUpIntersector,
  $downVideoIntersector: $savedVideoDownIntersector,
});

export const searchModalView = new ModalView({
  $modal,
  $searchQueries,
  $searchContentVideoWrapper,
  $searchContentSavedVideoCount,
  $searchContentIntersector,
  $searchContentVideoNotFound,
});
