import {
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

const video = new VideoView();

const modal = new ModalView({
  $modal,
  $searchQueries,
  $searchResultVideoWrapper,
  $savedVideoCount,
});

const view = {
  modal,
  video,
  layout,
};

export default view;
