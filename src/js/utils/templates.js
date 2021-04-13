import { changeDateFormat } from "./common.js";
import { SECTION } from "./constants.js";

export const createVideoTemplate = (video, wrapperName, liked) => `
<article class="clip">
  <div class="preview-container">
    <iframe
      loading="lazy"
      width="100%"
      height="118"
      srcdoc="${getSrcDocAttribute(video)}"
      src="https://www.youtube.com/embed/${video.videoId}"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
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
        ${wrapperName === SECTION.MAIN && liked ? "" : createActionBtnTemplate(video)}
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
  <span class="clip__liked-check ${video.isLiked ? "opacity-1" : "opacity-hover"}">👍</span>
  <span class="clip__trash-can opacity-hover">🗑️</span>
</div>
`;

const getSrcDocAttribute = video => `
    <style>
      * {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }

      body {
        height: 100%;
      }

      span {
        position: absolute;
        top: -390%;
        left: 45%;
        color: rgba(238, 238, 238, 0.9);
        font-size: 2rem;
        transition: transform 0.2s ease-in-out
      }

      span:hover {
        transform: scale(1.6);
      }

      .embeded-clip {
        position: relative;
        width:236px;
        height:120px;
        cursor: pointer;
      }

      .embeded-clip img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    </style>
    <a href='https://www.youtube.com/embed/${video.videoId}' class='embeded-clip'>
      <img src='${video.thumbnail}'><span>►</span>
    </a>
  `;
