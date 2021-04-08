import { SLICER } from '../constants';

export default class VideoSlicer {
  #slicerIndex = SLICER.INITIAL_FIRST_INDEX;
  #videoLoadAmount = SLICER.LOAD_VIDEO_AMOUNT;

  getSlicedVideos(videos) {
    const startIndex = this.#slicerIndex * this.#videoLoadAmount;
    return videos.slice(startIndex, startIndex + this.#videoLoadAmount);
  }

  increaseSlicerIndex() {
    this.#slicerIndex += 1;
  }

  decreaseSlicerIndex() {
    this.#slicerIndex += 1;
  }
}
