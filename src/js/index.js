import API_KEY from './apiKey.js';
import YOUTUBE_SEARCH_API from './library/constants/api.js';
import dom from './library/DOMelements.js';
import createVideoSnippetTemplate from './library/templates/videoSnippet.js';

dom.$searchButton.addEventListener('click', () =>
  dom.$searchModal.classList.add('open')
);

dom.$modalCloseButton.addEventListener('click', () =>
  dom.$searchModal.classList.remove('open')
);

function fetchSearchResult(keyword) {
  return fetch(`${YOUTUBE_SEARCH_API}&key=${API_KEY}&q=${keyword}`).then(data =>
    data.json()
  );
}

dom.$videoSearchForm.addEventListener('submit', async e => {
  e.preventDefault();

  const keyword = e.target.elements['video-search-input'].value;
  const { items: resultItems } = await fetchSearchResult(keyword);

  dom.$videoSearchResult.innerHTML = resultItems
    .map(item => createVideoSnippetTemplate(item))
    .join('');
});
