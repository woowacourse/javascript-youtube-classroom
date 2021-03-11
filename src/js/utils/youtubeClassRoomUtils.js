import { localStorageGetItem, $, localStorageSetItem } from './utils.js';
import { LOCALSTORAGE_KEYS, VALUES } from '../constants/constants.js';

export const loadIframe = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const video = $('iframe', entry.target);
      const src = video.getAttribute('data-src');
      const srcdoc = video.getAttribute('data-srcdoc');

      video.setAttribute('src', src);
      video.setAttribute('srcdoc', srcdoc);

      observer.unobserve(entry.target);
    }
  });
};

export const saveHistoryToLocalStorage = (searchTerm) => {
  const history = localStorageGetItem(LOCALSTORAGE_KEYS.SEARCH_HISTORY);

  if (history.includes(searchTerm)) {
    const indexOfSearchTerm = history.indexOf(searchTerm);

    history.splice(indexOfSearchTerm, 1);
  }

  history.unshift(searchTerm);
  localStorageSetItem(
    LOCALSTORAGE_KEYS.SEARCH_HISTORY,
    history.slice(0, VALUES.MAXIMUM_SEARCH_HISTORY_COUNT)
  );
};

export const showSnackBar = ($snackbar, text) => {
  $snackbar.textContent = text;
  $snackbar.classList.add('show');
  setTimeout(() => {
    $snackbar.classList.remove('show');
  }, 3000);
};

export const pauseAllIframeVideo = () => {
  document
    .querySelectorAll('iframe')
    .forEach((iframe) =>
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*'
      )
    );
};
