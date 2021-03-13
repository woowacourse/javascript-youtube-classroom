import loadingSearchResults from "../state/loadingSearchResults.js";
import { NULL_DATE, INVALID_DATE } from "../utils/constants.js";

function parseDate(dateString) {
  const date = new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return date === INVALID_DATE ? NULL_DATE : date;
}

function getSrcDocTemplate(item) {
  return `
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

      .embeded-clip img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    </style>
    <a href='https://www.youtube.com/embed/${item.videoId}' class='embeded-clip'>
      <img src='${item.thumbnail}'><span>►</span>
    </a>

  `;
}

function getSaveButtons(item) {
  return `
    <div class="save-button-container">
      <button 
        data-video-id=${item.videoId}
        data-video-saved=""
        class="btn btn-hover-cyan-700 bg-cyan-500 ${
          item.saved ? "d-none-hard" : ""
        }"
        >
        ⬇️ 저장
      </button>
      <button 
        data-video-id=${item.videoId}
        data-video-saved="saved" 
        class="btn btn-hover-gray-300 ${item.saved ? "" : "d-none-hard"}"
        >
        저장 취소
      </button>
    </div>`;
}

function getClipButtons(item) {
  return `
    <div class="clip-buttons">
      <button 
        data-watched-button=${item.videoId} 
        class=${item.watched ? "" : "opacity-hover"}>
        ✅
      </button>
      <button 
        data-liked-button=${item.videoId} 
        class=${item.liked ? "" : "opacity-hover"}>
        👍
      </button>
      <button 
        data-delete-button=${item.videoId} 
        class="opacity-hover">
        🗑️
      </button>
    </div>`;
}

function getVideoClipInnerTemplate(item, buttonsContainer) {
  return `
    <div class="preview-container">
      <iframe
        width="100%"
        height="118"
        onload="() => ${loadingSearchResults.load()}"
        srcdoc="${getSrcDocTemplate(item)}"
        src="https://www.youtube.com/embed/${item.videoId}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
        </iframe>
    </div>
    <div class="content-container pt-2 px-1">
      <h3>${item.title}</h3>
      <div>
        <a
          href="https://www.youtube.com/channel/${item.channelId}"
          target="_blank"
          class="channel-name mt-1"
        >
          ${item.channelTitle}
        </a>
        <div class="meta">
          <p>${parseDate(item.publishedAt)}</p>
        </div>
        ${buttonsContainer}
      </div>
    </div>`;
}

export function createSavedClipTemplate(item) {
  const videoArticle = document.createElement("article");
  videoArticle.classList.add("clip");
  videoArticle.classList.add("mt-10");
  videoArticle.insertAdjacentHTML(
    "beforeend",
    getVideoClipInnerTemplate(item, getClipButtons(item))
  );

  return videoArticle;
}

export function createSearchedClipTemplate(item) {
  const videoArticle = document.createElement("article");
  videoArticle.classList.add("clip");
  videoArticle.classList.add("mt-10");
  videoArticle.insertAdjacentHTML(
    "beforeend",
    getVideoClipInnerTemplate(item, getSaveButtons(item))
  );

  return videoArticle;
}
