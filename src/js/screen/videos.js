import StorageEngine from '../domain/storageEngine.js';

import { $$, $ } from '../util/domHelper.js';
import { SKELETON_TEMPLATE } from '../util/template.js';
import { preprocessDate } from '../util/common.js';

export default class VideosScreen {
  #storageEngine;

  constructor(searchResult) {
    this.#storageEngine = new StorageEngine();

    searchResult.addEventListener('click', this.#handleSaveVideo.bind(this));
  }

  #handleSaveVideo(e) {
    if (e.target.classList.contains('video-item__save-button')) {
      const video = VideosScreen.extractDataForStorage(e);

      try {
        this.#storageEngine.saveVideo(video);
        e.target.classList.add('hide');
      } catch (error) {
        alert(error.message);
      }
    }
  }

  renderSkeleton() {
    const videoList = $('.video-list');
    videoList.insertAdjacentHTML('beforeend', SKELETON_TEMPLATE);
  }

  render(data) {
    const skeletonList = $$('.skeleton');
    const preprocessedData = VideosScreen.preprocessData(data);

    skeletonList.forEach((element, index) => {
      const { videoId, channelTitle, thumbnails, title, publishTime } = preprocessedData[index];

      element.dataset.videoId = videoId;

      $('.video-item__thumbnail', element).src = thumbnails;
      $('.video-item__title', element).textContent = title;
      $('.video-item__channel-name', element).textContent = channelTitle;
      $('.video-item__published-date', element).textContent = publishTime;
      this.#storageEngine.getSpecificVideo(videoId) &&
        $('.video-item__save-button', element).classList.add('hide');

      element.classList.remove('skeleton');
    });
  }

  static preprocessData(data) {
    return data.map((datum) => {
      const thumbnails = datum.snippet.thumbnails.high.url;
      const { title, channelTitle, publishTime } = datum.snippet;
      const { videoId } = datum.id;

      return {
        thumbnails,
        title,
        channelTitle,
        publishTime: preprocessDate(publishTime),
        videoId,
      };
    });
  }

  static extractDataForStorage(e) {
    const parentElement = e.target.closest('.video-item');
    const { videoId } = parentElement.dataset;
    const thumbnail = $('.video-item__thumbnail', parentElement).src;
    const title = $('.video-item__title', parentElement).textContent;
    const channelTitle = $('.video-item__channel-name', parentElement).textContent;
    const publishTime = $('.video-item__published-date', parentElement).textContent;

    return { videoId, thumbnail, title, channelTitle, publishTime };
  }
}
