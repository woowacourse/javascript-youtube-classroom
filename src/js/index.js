import API_KEY from './apiKey.js';
import YOUTUBE_SEARCH_API from './library/constants/api.js';
import dom from './library/DOMelements.js';
import createVideoSnippetTemplate from './library/templates/videoSnippet.js';
import createVideoSkeletonTemplate from './library/templates/videoSkeleton.js';
import state from './library/state.js';

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

function isSavedVideo(item) {
  return [...state.videoInfos].some(
    videoInfo => videoInfo.id.videoId === item.id.videoId
  );
}

dom.$videoSearchForm.addEventListener('submit', async e => {
  e.preventDefault();

  const keyword = e.target.elements['video-search-input'].value;
  dom.$videoSearchResult.innerHTML = createVideoSkeletonTemplate().repeat(10);
  const { items: resultItems } = await fetchSearchResult(keyword);
  // TODO: 결과 없음 이미지 출력 (resultItems가 빈 배열임)
  dom.$videoSearchResult.innerHTML = resultItems
    .map(item => createVideoSnippetTemplate(item, isSavedVideo(item)))
    .join('');
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
  if (!e.target.classList.contains('js-save-button')) return;

  const $video = e.target.closest('.js-video');
  const videoInfo = createVideoInfo($video.dataset);

  state.addVideoInfo(videoInfo);
  dom.$videoList.innerHTML = [...state.videoInfos]
    .map(videoInfo => createVideoSnippetTemplate(videoInfo, true))
    .join('');
  e.target.hidden = true;
});
