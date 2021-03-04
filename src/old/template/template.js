const savedClipTemplate = (video) => {
  const [year, month, day] = new Date(video.snippet.publishTime)
    .toLocaleDateString()
    .split('.');

  return `
  <article class="clip">
    <div class="preview-container">
      <iframe 
        width="100%"
        height="118"
        src=https://www.youtube.com/embed/${video.id.videoId}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div class="content-container pt-2 px-1">
      <h3>${video.snippet.title}</h3>
      <div>
        <a
          href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
          target="_blank"
          class="channel-name mt-1"
        >
          ${video.snippet.channelTitle}
        </a>
        <div class="meta">
          <p>${year}년 ${month}월 ${day}일</p>
        </div>
        <div class="d-flex justify-end">
          <div>
            <span class="opacity-hover">✅</span>
            <span class="opacity-hover">👍</span>
            <span class="opacity-hover">💬</span>
            <span class="opacity-hover">🗑️</span>
          </div>
        </div>
      </div>
    </div>
  </article>
`;
};

const searchResultClipTemplate = (video, index, isSaved = false) => {
  const [year, month, day] = new Date(video.snippet.publishTime)
    .toLocaleDateString()
    .split('.');

  return `
    <article class="clip">
      <div class="preview-container">
        <iframe 
          width="100%"
          height="118"
          src=https://www.youtube.com/embed/${video.id.videoId}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="content-container pt-2 px-1">
        <h3>${video.snippet.title}</h3>
        <div>
          <a
            href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
            target="_blank"
            class="channel-name mt-1"
          >
            ${video.snippet.channelTitle}
          </a>
          <div class="meta">
            <p>${year}년 ${month}월 ${day}일</p>
          </div>
          <div class="d-flex justify-end">
          ${
            isSaved
              ? ''
              : `<button class="btn" data-js="save-button" data-clip-index=${index}>⬇️ 저장</button>`
          }      
          </div>
        </div>
      </div>
    </article>
  `;
};
