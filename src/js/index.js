import { $ } from './utils.js';
import { searchYoutube } from './api.js';

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

const renderSearchResult = (result) => {
  const resultTemplate = result
    .map((item) => {
      const { channelId, title, channelTitle, publishedAt } = item.snippet;
      const { videoId } = item.id;

      return `
        <article class="clip d-flex flex-col">
          <div class="preview-container">
            <iframe
              width="100%"
              height="118"
              src="https://www.youtube.com/embed/${videoId}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="content-container pt-2 px-1 d-flex flex-col justify-between flex-1">
            <div>
              <h3>${title}</h3>
              <a
                href="https://www.youtube.com/channel/${channelId}"
                target="_blank"
                class="channel-name mt-1"
              >
                ${channelTitle}
              </a>
              <div class="meta">
                <p>${publishedAt}</p>
              </div>
            </div>
            <div class="d-flex justify-end">
              <button class="btn btn-save">⬇️ 저장</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  $('.youtube-search-result').innerHTML = resultTemplate;
};

$('#youtube-search-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const keyword = event.target.elements.keyword.value;
  const response = await searchYoutube(keyword);
  const searchResult = response.items;

  renderSearchResult(searchResult);
});
