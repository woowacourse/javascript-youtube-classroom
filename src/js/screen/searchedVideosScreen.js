import StorageEngine from '../domain/storageEngine.js';

import { $$, $ } from '../util/domHelper.js';
import { SKELETON_TEMPLATE } from '../util/template.js';
import { preprocessDate } from '../util/date.js';
import { VIDEOS_TYPE } from '../util/constants.js';

export default class SearchedVideosScreen {
  #storageEngine;
  #myVideosScreen;

  constructor(parentElement, myVideosScreen) {
    this.#storageEngine = StorageEngine.instance;
    this.#myVideosScreen = myVideosScreen;

    parentElement.addEventListener('click', this.#handleSaveVideo);
  }

  #handleSaveVideo = (e) => {
    if (e.target.classList.contains('video-item__save-button')) {
      const video = SearchedVideosScreen.extractDataForStorage(e);

      try {
        this.#storageEngine.saveVideo(video, VIDEOS_TYPE.VIDEOS_TO_VIEW);
        e.target.classList.add('hide');
        this.#renderMyVideos();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  renderSkeleton() {
    const videoList = $('.video-list');
    videoList.insertAdjacentHTML('beforeend', SKELETON_TEMPLATE);
  }

  allocate(data) {
    const skeletonList = $$('.skeleton');
    const preprocessedData = SearchedVideosScreen.preprocessData(data);

    skeletonList.forEach((element, index) => {
      const { videoId, channelTitle, thumbnails, title, publishTime } = preprocessedData[index];

      element.dataset.videoId = videoId;

      $('.video-item__thumbnail', element).src = thumbnails;
      $('.video-item__title', element).textContent = title;
      $('.video-item__channel-name', element).textContent = channelTitle;
      $('.video-item__published-date', element).textContent = publishTime;
      (this.#storageEngine.getSpecificVideo(videoId, 'videosToView') ||
        this.#storageEngine.getSpecificVideo(videoId, 'viewedVideos')) &&
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

  #renderMyVideos() {
    if (this.#myVideosScreen.currentFilter === VIDEOS_TYPE.VIDEOS_TO_VIEW) {
      const videosToView = this.#storageEngine.getVideosToView();

      this.#myVideosScreen.clear();
      this.#myVideosScreen.render(videosToView);
    }
  }
}
