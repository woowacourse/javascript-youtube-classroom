import date from '../utils/date.js';

const buttonTemplate = (index, type) => {
  const { isModal, isSaved } = type;

  if (isModal) {
    return isSaved
      ? ''
      : `<button class="btn" data-js="save-button" data-clip-index=${index}>⬇️ 저장</button>`;
  }

  return `
    <div>
      <span class="opacity-hover">✅</span>
      <span class="opacity-hover">👍</span>
      <span class="opacity-hover">💬</span>
      <span class="opacity-hover">🗑️</span>
    </div>
  `;
};

const YMDtemplate = (time) => {
  const [year, month, day] = date.toYMDArray(time);

  return `<p>${year}년 ${month}월 ${day}일</p>`;
};

export const clipTemplate = (video, index, type) => {
  return `
      <article class="clip" data-js="youtube-search-modal__clip">
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
              ${YMDtemplate(video.snippet.publishTime)}
            </div>
            <div class="d-flex justify-end" data-clip-index=${index}>
             ${buttonTemplate(index, type)}            
            </div>
          </div>
        </div>
      </article>
    `;
};
