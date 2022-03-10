/* eslint-disable max-lines-per-function */
import '../css/index.css';
import { $ } from './util/domHelper.js';
import { videoListTemplate, NO_RESULT_TEMPLATE } from './util/template.js';

import SearchEngine from './searchEngine.js';
import StorageEngine from './storageEngine.js';

const searchModalButton = $('#search-modal-button');
const modalContainer = $('.modal-container');

function handleOpenModal() {
  modalContainer.classList.remove('hide');
}

searchModalButton.addEventListener('click', handleOpenModal);

function handleCloseModal(e) {
  if (e.target.matches('#search-modal-button')) {
    return;
  }

  if (!e.target.closest('.search-modal')) {
    modalContainer.classList.add('hide');
  }
}

document.addEventListener('click', handleCloseModal);

const searchButton = $('#search-button');
const searchInputKeyword = $('#search-input-keyword');

function preprocessPublishTime(publishTime) {
  const [year, month, day] = publishTime.slice(0, 10).split('-');

  return `${year}년 ${month}월 ${day}일`;
}

function preprocessData(data) {
  return data.map((datum) => {
    const thumbnails = datum.snippet.thumbnails.high.url;
    const { title, channelTitle, publishTime } = datum.snippet;
    const { videoId } = datum.id;

    return {
      thumbnails,
      title,
      channelTitle,
      publishTime: preprocessPublishTime(publishTime),
      videoId,
    };
  });
}

function clearSearchList() {
  const searchResult = $('.search-result');
  searchResult.removeChild(searchResult.lastElementChild);
}

async function handleSearchVideos(e) {
  if (e.key === 'Enter' || e.type === 'click') {
    const keyword = searchInputKeyword.value;
    const searchEngine = new SearchEngine();

    try {
      const data = await searchEngine.searchKeyword(keyword);
      const searchResult = $('.search-result');

      clearSearchList();
      searchResult.classList.remove('search-result--no-result');

      if (data === null) {
        searchResult.insertAdjacentHTML('beforeend', NO_RESULT_TEMPLATE);
        searchResult.classList.add('search-result--no-result');

        return;
      }

      const preprocessedData = preprocessData(data);
      searchResult.insertAdjacentHTML('beforeend', videoListTemplate(preprocessedData));
    } catch (error) {
      alert(error);
    }
  }
}

searchButton.addEventListener('click', handleSearchVideos);
searchInputKeyword.addEventListener('keydown', handleSearchVideos);

const searchResult = $('.search-result');

function handleSaveVideo(e) {
  if (e.target.classList.contains('video-item__save-button')) {
    const storageEngine = new StorageEngine();
    const { videoId } = e.target.closest('.video-item').dataset;

    storageEngine.saveData(videoId);
    e.target.classList.add('hide');
  }
}

searchResult.addEventListener('click', handleSaveVideo);
