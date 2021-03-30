import HashController from './controller/HashController.js';
import VideoController from './controller/VideoController.js';
import ModalController from './controller/ModalController.js';

const watchingVideo = new VideoController('watching');
const watchedVideo = new VideoController('watched');
const modal = new ModalController();
const hash = new HashController();

const controller = {
  watchingVideo,
  watchedVideo,
  modal,
  hash,
};

export default controller;
