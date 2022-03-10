import '../css/index.css';
import { $ } from './util/domHelper.js';
import SearchEngine from './searchEngine.js';

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

async function handleSearchVideos(e) {
  if (e.key === 'Enter' || e.type === 'click') {
    const keyword = searchInputKeyword.value;
    const searchEngine = new SearchEngine();

    try {
      const result = await searchEngine.searchKeyword(keyword);
    } catch (error) {
      alert(error);
    }
  }
}

searchButton.addEventListener('click', handleSearchVideos);
searchInputKeyword.addEventListener('keydown', handleSearchVideos);
