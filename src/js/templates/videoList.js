import formatDate from '../utils/date.js';

function createVideoSnippetTemplate({ id, snippet }, buttonListTemplate) {
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
                <div class="d-flex justify-end" >
                  ${buttonListTemplate}
                </div>
              </div>
            </div>
          </article>`;
}

function createSaveButtonTemplate(isSaved) {
  return isSaved
    ? `<button class="btn js-save-cancel-button"}>↪️ 저장 취소</button>`
    : `<button class="btn js-save-button"}>⬇️ 저장</button>`;
}

function isSavedVideo(item, videoInfos) {
  return [...videoInfos].some(
    videoInfo => videoInfo.id.videoId === item.id.videoId
  );
}

function createVideoListTemplate(resultItems = [], videoInfos) {
  return [...resultItems]
    .map(item =>
      createVideoSnippetTemplate(
        item,
        createSaveButtonTemplate(isSavedVideo(item, videoInfos))
      )
    )
    .join('');
}

function createControlButtonsTemplate() {
  return [
    { content: '✅', className: 'js-watched-button' },
    { content: '👍', className: 'js-like-button' },
    { content: '💬', className: 'js-comment-button' },
    { content: '🗑️', className: 'js-delete-button' },
  ]
    .map(
      ({ content, className }) =>
        `<span class="opacity-hover ml-2 ${className}">${content}</span>`
    )
    .join('');
}

function createSavedVideoListTemplate(savedVideoInfos = []) {
  return [...savedVideoInfos]
    .map(item =>
      createVideoSnippetTemplate(item, createControlButtonsTemplate())
    )
    .join('');
}

const emptyVideoListTemplate = `<span id="empty-video-list" class="stretch text-center">영상이 없습니다. 😥</span>`;

/*
 * data-attirbue 로 다 할당
 * 이미 존재하는 속성들을 그대로 활용 (선택자 접근, 문자열 파싱)
 */

export {
  createVideoListTemplate,
  createSavedVideoListTemplate,
  emptyVideoListTemplate,
};
