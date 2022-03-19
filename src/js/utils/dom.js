export const $ = (selector, parentNode = document) => parentNode.querySelector(selector);
export const $nav = $('.nav');

// modal
export const $modal = $('.search-modal');
export const $modalSearchResult = $('.modal__search-result', $modal);
export const $modalVideoList = $('.video-list', $modalSearchResult);
export const $searchKeyWordInput = $('#search-input-keyword', $modal);
export const $searchButton = $('#search-button', $modal);
export const $saveButton = $('#search-button', $modal);

// main
export const $mainSearchResult = $('.main__search-result');
export const $mainVideoList = $('.video-list', $mainSearchResult);
export const $searchModalButton = $('#search-modal-button', $nav);
export const $watchedVideoMenuButton = $('.nav__watched-button', $nav);
export const $toWatchedVideoMenuButton = $('.nav__no-watched-button', $nav);
export const $dimmer = $('.dimmer');
