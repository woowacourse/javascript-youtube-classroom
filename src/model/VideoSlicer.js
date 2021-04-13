import { SLICER } from '../constants';

export default class VideoSlicer {
  #slicerIndex = SLICER.INITIAL_FIRST_INDEX;
  #videoLoadAmount = SLICER.LOAD_VIDEO_AMOUNT;
  #sliceRatio = SLICER.SLICE_RATIO;

  getSlicedVideos(videos) {
    const startIndex = Math.round(this.#slicerIndex * this.#videoLoadAmount * this.#sliceRatio);
    return videos.slice(startIndex, startIndex + this.#videoLoadAmount);
  }

  increaseSlicerIndex() {
    this.#slicerIndex += 1;
  }

  decreaseSlicerIndex() {
    this.#slicerIndex -= 1;
  }

  initSlicerIndex() {
    this.#slicerIndex = 0;
  }

  get firstVideoIndex() {
    return Math.round(this.#slicerIndex * this.#videoLoadAmount * this.#sliceRatio);
  }

  get lastVideoIndex() {
    return Math.round(this.#slicerIndex * this.#videoLoadAmount * this.#sliceRatio + this.#videoLoadAmount);
  }
}
