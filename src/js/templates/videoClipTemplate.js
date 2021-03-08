import loadingSearchResults from "../state/loadingSearchResults.js";

function parseDate(dateString) {
  const [year, month, date] = dateString.split("T")[0].split("-");

  return `${year}년 ${month}월 ${date}일`;
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

function getVideoClipInnerTemplate(item) {
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
        <div class="d-flex justify-end">
          <button 
            data-video-id=${item.videoId}
            data-video-saved=""
            class="btn save-btn bg-cyan-500 ${item.saved ? "d-none-hard" : ""}"
            >
            ⬇️ 저장
          </button>
          <button 
            data-video-id=${item.videoId}
            data-video-saved="saved" 
            class="btn saved-btn ${item.saved ? "" : "d-none-hard"}"
            >
            저장 취소
          </button>
        </div>
      </div>
    </div>`;
}

export default function createVideoClipTemplate(item) {
  const videoArticle = document.createElement("article");
  videoArticle.classList.add("clip");
  videoArticle.classList.add("mt-10");
  videoArticle.insertAdjacentHTML("beforeend", getVideoClipInnerTemplate(item));

  return videoArticle;
}
