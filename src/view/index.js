import {
  $modal,
  $searchQueries,
  $searchResultVideoWrapper,
  $nav,
  $snackbarWrapper,
  $savedVideoCount,
} from "../elements.js";
import LayoutView from "./LayoutView.js";
import ModalView from "./ModalView.js";
import VideoView from "./VideoView.js";

const layoutView = new LayoutView({ $nav, $snackbarWrapper });

const videoView = new VideoView();

const modalView = new ModalView({
  $modal,
  $searchQueries,
  $searchResultVideoWrapper,
  $savedVideoCount,
});

export { layoutView, videoView, modalView };
