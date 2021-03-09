import formatDate from '../utils/date.js';

function createVideoSnippetTemplate({ id, snippet }, isSaved = false) {
  return `<article class="clip js-video"
            data-video-id=${id.videoId}
            data-title=${encodeURIComponent(snippet.title)}
            data-channel-id=${snippet.channelId}
            data-channel-title=${encodeURIComponent(snippet.channelTitle)}
            data-publish-time=${snippet.publishTime}
          >
            <div class="preview-container">
              <iframe
                class="js-preview"
                width="100%"
                height="118"
                src="https://www.youtube.com/embed/${id.videoId}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div class="content-container pt-2 px-1">
              <h3>${decodeURIComponent(snippet.title)}</h3>
              <div>
                <a
                  href="https://www.youtube.com/channel/${snippet.channelId}"
                  target="_blank"
                  class="channel-name mt-1"
                >
                ${decodeURIComponent(snippet.channelTitle)}
                </a>
                <div class="meta">
                  <p>${formatDate(snippet.publishTime)}</p>
                </div>
                <div class="d-flex justify-end">
                  <button 
                    class="btn js-save-button" 
                    ${isSaved ? 'hidden' : ''}
                    >
                      ⬇️ 저장
                  </button>
                </div>
              </div>
            </div>
          </article>`;
}

function isSavedVideo(item, videoInfos) {
  return [...videoInfos].some(
    videoInfo => videoInfo.id.videoId === item.id.videoId
  );
}

function createVideoListTemplate(resultItems = [], videoInfos) {
  return [...resultItems]
    .map(item =>
      createVideoSnippetTemplate(item, isSavedVideo(item, videoInfos))
    )
    .join('');
}

function createSavedVideoListTemplate(savedVideoInfos = []) {
  return [...savedVideoInfos]
    .map(item => createVideoSnippetTemplate(item, true))
    .join('');
}

const emptyVideoListTemplate = `<span id="empty-video-list" class="stretch text-center">저장된 영상이 없습니다. 😥</span>`;

/*
 * data-attirbue 로 다 할당
 * 이미 존재하는 속성들을 그대로 활용 (선택자 접근, 문자열 파싱)
 */

export {
  createVideoListTemplate,
  createSavedVideoListTemplate,
  emptyVideoListTemplate,
};
