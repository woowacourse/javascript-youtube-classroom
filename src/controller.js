import HashController from './controller/HashController.js';
import VideoController from './controller/VideoController.js';
import ModalController from './controller/ModalController.js';
import { CONTROLLER_KEYWORD } from './constants.js';

const watchingVideo = new VideoController(CONTROLLER_KEYWORD.WATCHING);
const watchedVideo = new VideoController(CONTROLLER_KEYWORD.WATCHED);
const modal = new ModalController();
const hash = new HashController();

const controller = {
  watchingVideo,
  watchedVideo,
  modal,
  hash,
};

export default controller;
