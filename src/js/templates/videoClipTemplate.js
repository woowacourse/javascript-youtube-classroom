function parseDate(dateString) {
  const [year, month, date] = dateString.split("T")[0].split("-");

  return `${year}년 ${month}월 ${date}일`;
}

export default function getVideoClipTemplate(item) {
  const videoArticle = document.createElement("article");
  videoArticle.classList.add("clip");
  videoArticle.classList.add("mt-10");
  videoArticle.innerHTML = `
    <div class="preview-container">
      <iframe
        width="100%"
        height="118"
        src="https://www.youtube.com/embed/${item.videoId}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
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
            class="btn ${item.saved ? "d-none-hard" : ""}"
            >
            ⬇️ 저장
          </button>
        </div>
      </div>
    </div>`;

  return videoArticle;
}
