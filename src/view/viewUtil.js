import view from '../view';

const viewUtil = {
  hideAllEmptyVideoImage() {
    view.watchedVideo.hideEmptyVideoImage();
    view.watchingVideo.hideEmptyVideoImage();
  },
};

export default viewUtil;
