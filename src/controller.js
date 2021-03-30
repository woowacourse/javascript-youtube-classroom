import HashController from './controller/HashController.js';
import VideoController from './controller/VideoController.js';
import ModalController from './controller/ModalController.js';

export const watchingVideoController = new VideoController('watching');
export const watchedVideoController = new VideoController('watched');
export const modalController = new ModalController();
export const hashController = new HashController();
