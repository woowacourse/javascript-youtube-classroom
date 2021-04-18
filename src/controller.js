import HashController from './controller/HashController.js';
import VideoController from './controller/VideoController.js';
import ModalController from './controller/ModalController.js';

const video = new VideoController();
const modal = new ModalController();
const hash = new HashController();

const controller = {
  video,
  modal,
  hash,
};

export default controller;
