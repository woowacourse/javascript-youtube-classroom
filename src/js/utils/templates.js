import { changeDateFormat } from "./common.js";
import { SECTION } from "./constants.js";

export const createVideoTemplate = (video, wrapperName) => `
<article class="clip">
  <div class="preview-container">
    <iframe
      width="100%"
      height="118"
      src="https://www.youtube.com/embed/${video.videoId}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <div class="content-container pt-2 px-1">
    <h3>${video.title}</h3>
    <div>
      <a
        href="https://www.youtube.com/channel/${video.channelId}"
        target="_blank"
        rel="noopener noreferrer nofollow"
        class="channel-name mt-1"
      >
      ${video.channelTitle}
      </a>
      <div class="meta">
        <p>${changeDateFormat(video.publishedAt)}</p>
      </div>
        ${wrapperName === SECTION.MODAL ? createSaveBtnTemplate(video) : ""}
        ${wrapperName === SECTION.MAIN ? createActionBtnTemplate(video) : ""}
    </div>
  </div>
</article>`;

const createSaveBtnTemplate = video => `
<div class="d-flex justify-end">
  <button class="clip__save-btn btn ${video.isSaved ? "hidden" : ""}" data-video-id="${
  video.videoId
}">⬇️ 저장</button>
</div>
`;

const createActionBtnTemplate = video => `
<div class="clip__actions" data-video-id="${video.videoId}">
  <span class="clip__watched-check ${video.isWatched ? "opacity-1" : "opacity-hover"}">✅</span>
  <span class="clip__thumbs-up opacity-hover">👍</span>
  <span class="clip__comment opacity-hover">💬</span>
  <span class="clip__trash-can opacity-hover">🗑️</span>
</div>
`;
