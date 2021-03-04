import MyYoutubeSearchController from './controller/my-youtube-search.js';
import YoutubeModel from './model/youtube.js';
import MyYoutubeView from './view/my-youtube.js';

const model = new YoutubeModel();
const view = new MyYoutubeView();
const controller = new MyYoutubeSearchController(model, view);
controller.init();

const $searchButton = document.querySelector('#search-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$searchButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
