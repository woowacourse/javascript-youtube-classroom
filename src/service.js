import modalService from './service/modalService';
import watchedVideoService from './service/watchedVideoService';
import watchingVideoService from './service/watchingVideoService';

const service = {
  modal: modalService,
  watchedVideo: watchedVideoService,
  watchingVideo: watchingVideoService,
};

export default service;
