import API_KEY from './apiKey.js';
import YOUTUBE_SEARCH_API from './library/constants/api.js';
import dom from './library/DOMelements.js';
import createVideoListTemplate from './library/templates/videoList.js';
import createVideoSkeletonTemplate from './library/templates/videoSkeleton.js';
import state from './library/state.js';
import createNotFoundTemplate from './library/templates/notFound.js';
import createKeywordList from './library/templates/keywordList.js';

dom.$searchButton.addEventListener('click', () =>
  dom.$searchModal.classList.add('open')
);

dom.$modalCloseButton.addEventListener('click', () =>
  dom.$searchModal.classList.remove('open')
);

function fetchSearchResult(keyword, nextPageToken = '') {
  return fetch(
    `${YOUTUBE_SEARCH_API}&key=${API_KEY}&pageToken=${nextPageToken}&q=${keyword}`
  )
    .then(data => {
      return data.json();
    })
    .catch(e => {
      console.error(e);
    });
}

dom.$videoSearchForm.addEventListener('submit', async e => {
  e.preventDefault();

  const keyword = e.target.elements['video-search-input'].value;
  state.addLatestKeyword(keyword);
  dom.$latestKeywordList.innerHTML = createKeywordList(state.latestKeywords);
  dom.$videoSearchResult.innerHTML = createVideoSkeletonTemplate();
  const { nextPageToken, items: resultItems } = await fetchSearchResult(
    keyword
  );

  state.setNextPageToken(nextPageToken);
  dom.$videoSearchResult.innerHTML = resultItems.length
    ? createVideoListTemplate(resultItems, state.videoInfos)
    : createNotFoundTemplate();

  if (resultItems.length) {
    const last = document.querySelector(
      '#video-search-result .js-video:last-child'
    );

    state.intersectionObserver.disconnect();
    state.intersectionObserver.observe(last);
  }
});

function createVideoInfo({
  videoId,
  title,
  channelId,
  channelTitle,
  publishTime,
}) {
  return {
    id: { videoId },
    snippet: { title, channelId, channelTitle, publishTime },
    isWatched: false,
  };
}

dom.$videoSearchResult.addEventListener('click', e => {
  if (!e.target.classList.contains('js-save-button')) {
    return;
  }
  if (state.videoInfos.size >= 1) {
    alert('최대 저장 개수는 100개입니다.');
    return;
  }

  const $video = e.target.closest('.js-video');
  const videoInfo = createVideoInfo($video.dataset);

  state.addVideoInfo(videoInfo);
  dom.$videoList.innerHTML = createVideoListTemplate(
    [...state.videoInfos],
    state.videoInfos
  );
  e.target.hidden = true;
});

function createIntersectionObserver() {
  const options = {
    root: document.getElementsByClassName('modal-inner')[0],
    rootMargin: '0px',
    threshold: 0.85,
  };

  return new IntersectionObserver(async entries => {
    const $lastVideo = entries[0];

    if ($lastVideo.isIntersecting) {
      state.intersectionObserver.disconnect();

      const { nextPageToken, items: searchResult } = await fetchSearchResult(
        state.latestKeywords[state.latestKeywords.length - 1],
        state.nextPageToken
      );

      state.setNextPageToken(nextPageToken);
      dom.$videoSearchResult.innerHTML += createVideoListTemplate(
        searchResult,
        state.videoInfos
      );
      const last = document.querySelector(
        '#video-search-result .js-video:last-child'
      );

      state.intersectionObserver.observe(last);
    }
  }, options);
}

function initState() {
  state.setLatestKeywords(
    JSON.parse(localStorage.getItem('latestKeywords')) ?? []
  );
  state.setVideoInfos(JSON.parse(localStorage.getItem('videoInfos')) ?? []);
  state.setIntersectionObserver(createIntersectionObserver());
}

initState();
