export default function clipMaker(video, type) {
  return `
    <article class="clip">
      <div class="preview-container">
        <iframe
          width="100%"
          height="118"
          src="https://www.youtube.com/embed/${video.id}"
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
            class="channel-name mt-1"
          >
            ${video.channelTitle}
          </a>
          <div class="meta">
            <p>${video.publishedAt}</p>
          </div>
        </div>
        </div>
      ${type.isModal ? saveButtonTemplate(video.id) : buttonPackTemplate()}
    </article>
  `;
}

function saveButtonTemplate(videoId) {
  return `
    <div class="d-flex justify-end clip-save">
      <button data-video-id="${videoId}" class="btn clip-save-btn">⬇️ 저장</button>
    </div>
  `;
}

function buttonPackTemplate() {
  return `
    <div>
      <span class="opacity-hover">✅</span>
      <span class="opacity-hover">👍</span>
      <span class="opacity-hover">💬</span>
      <span class="opacity-hover">🗑️</span>
    </div>
  `;
}
