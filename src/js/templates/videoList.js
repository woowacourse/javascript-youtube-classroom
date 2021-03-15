import formatDate from '../utils/date.js';

function createVideoSnippetTemplate({ id, snippet }, buttonListTemplate) {
  return `<article class="clip js-video mb-8 d-flex flex-col"
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
                loading="lazy"
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
              </div>
            </div>
            <div class="d-flex justify-end mt-auto js-btn-list">
              ${buttonListTemplate}
            </div>
          </article>`;
}

// search modal 내 video templates
function createSaveButtonTemplate(isSaved) {
  return isSaved
    ? `<button class="btn js-save-cancel-button"}>저장 취소</button>`
    : `<button class="btn bg-cyan-100 js-save-button"}>저장</button>`;
}

function isSavedVideo(item, videoInfos) {
  return videoInfos.some(videoInfo => videoInfo.id.videoId === item.id.videoId);
}

function createSearchVideoListTemplate(resultItems = [], videoInfos) {
  return resultItems
    .map(item =>
      createVideoSnippetTemplate(
        item,
        createSaveButtonTemplate(isSavedVideo(item, videoInfos))
      )
    )
    .join('');
}

// main page 내 video templates
function createControlButtonsTemplate(watchType, likeType) {
  return [
    {
      content: '✅',
      className: 'js-watched-button',
      isChecked: watchType === 'watched',
    },
    {
      content: '👍',
      className: 'js-like-button',
      isChecked: likeType === 'liked',
    },
    { content: '🗑️', className: 'js-delete-button', isChecked: false },
  ]
    .map(
      ({ content, className, isChecked }) =>
        `<span class="${isChecked ? '' : 'opacity-hover'} ml-2 ${className}">
          ${content}
        </span>`
    )
    .join('');
}

function createSavedVideoListTemplate(savedVideoInfos = []) {
  return savedVideoInfos
    .map(item =>
      createVideoSnippetTemplate(
        item,
        createControlButtonsTemplate(item.watchType, item.likeType)
      )
    )
    .join('');
}

const emptyVideoListTemplate = `<span id="empty-video-list" class="stretch text-center">영상이 없습니다. 😥</span>`;

export {
  createSearchVideoListTemplate,
  createSavedVideoListTemplate,
  emptyVideoListTemplate,
};
