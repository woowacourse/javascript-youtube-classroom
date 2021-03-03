import { $ } from './utils.js';
import { searchYoutube, searchYoutubeDummyData } from './api.js';

const $searchButton = document.querySelector('#search-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
let pageToken;

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$searchButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);

const renderSkeletonUI = () => {
  const skeletonUITemplate = `
    <div class="skeleton">
      <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
    </div>
  `.repeat(10);

  $('.youtube-search-result-list').insertAdjacentHTML('beforeend', skeletonUITemplate);
};

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
              allowfullscreen>
            </iframe>
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

  $('.youtube-search-result-list').insertAdjacentHTML('beforeend', resultTemplate);
};

$('#youtube-search-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  $('.youtube-search-result').innerHTML = `<div class="youtube-search-result-list video-wrapper"></div>`;
  renderSkeletonUI();

  const keyword = event.target.elements.keyword.value;

  // TODO: 테스트 코드 - 추후 삭제 요망
  let response;
  if (keyword === '무야호') {
    response = await searchYoutubeDummyData(keyword);
  } else {
    response = await searchYoutubeDummyData(keyword, '', true);
  }

  if (response.pageInfo.totalResults === 0) {
    $('.youtube-search-result').innerHTML = `
      <div class="no-result">
        <img src="./src/images/status/not_found.png" alt="검색 결과 없음" />
        <p><strong>검색 결과가 없습니다</strong></p>
      </div>
    `;
    return;
  }

  const searchResult = response.items;

  pageToken = response.nextPageToken;

  $('.youtube-search-result').scrollTo(0, 0);
  $('.youtube-search-result').innerHTML = `<div class="youtube-search-result-list video-wrapper"></div>`;

  renderSearchResult(searchResult);
});

// TODO: 과도한 scroll 이벤트 방지를 위해 debounce 적용 필요
$('.youtube-search-result').addEventListener('scroll', async (event) => {
  const $videoWrapper = event.target;
  const isScrollBottom =
    Math.round($videoWrapper.scrollTop) === $videoWrapper.scrollHeight - $videoWrapper.offsetHeight;

  if (isScrollBottom) {
    const keyword = $('#youtube-search-keyword-input').value;
    const response = await searchYoutubeDummyData(keyword, pageToken);
    const searchResult = response.items;

    pageToken = response.nextPageToken;
    renderSearchResult(searchResult);
  }
});
