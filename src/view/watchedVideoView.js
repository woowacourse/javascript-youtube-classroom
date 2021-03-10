import { $watchingVideoWrapper } from '../elements';
import { getSelectedVideoListTemplate } from './templates';
import viewUtil from './viewUtil';

const watchedVideoView = {
  // TODO : Item 없애기
  renderWatchedVideoItems(videos) {
    viewUtil.renderByElement($watchingVideoWrapper, '');
    viewUtil.renderByElement(
      $watchingVideoWrapper,
      getSelectedVideoListTemplate(videos)
    );
  },
};

export default watchedVideoView;
