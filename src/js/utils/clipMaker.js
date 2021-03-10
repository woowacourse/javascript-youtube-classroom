export default function clipMaker(video, type) {
  const { isModal, isSaved, isWatched } = type;

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
            rel="noopener noreferrer"
            class="channel-name mt-1"
          >
            ${video.channelTitle}
          </a>
          <div class="meta">
            <p>${video.publishedAt}</p>
          </div>
        </div>
        </div>
      ${
        isModal
          ? saveButtonTemplate(video.id, isSaved)
          : buttonPackTemplate(video.id, isWatched)
      }
    </article>
  `;
}

function saveButtonTemplate(videoId, isSaved) {
  return `
    <div class="d-flex justify-end clip-save">
      <button
        type="button"
        data-video-save="${videoId}" 
        class="btn clip-save-btn" 
        ${isSaved ? 'disabled' : ''}
      >⬇️ 저장
      </button>
    </div>
  `;
}

function buttonPackTemplate(videoId, isWatched) {
  return `
    <div class="video-button-pack">
      <span
        data-video-watched=${videoId}
        class="pack-button ${isWatched ? '' : 'opacity-hover'}"
      >✅
      </span>
      <span data-video-like=${videoId} class="pack-button opacity-hover">👍</span>
      <span data-video-comment=${videoId} class="pack-button opacity-hover">💬</span>
      <span data-video-delete=${videoId} class="pack-button opacity-hover">🗑️</span>
    </div>
  `;
}
