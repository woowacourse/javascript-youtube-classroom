import date from '../utils/date.js';
import { LOCAL_STORAGE_VALUE } from '../utils/constant.js';

const buttonTemplate = (index, type) => {
  const { isModal, isSaved } = type;

  if (isModal) {
    return isSaved
      ? ''
      : `<button class="btn" data-js="save-button" data-clip-index=${index}>⬇️ 저장</button>`;
  }

  return `
    <div class="button-container" data-js="saved-clip-button-container">
      <button class="opacity-hover" data-js="saved-clip-button-container__check">✅</button>
      <button class="opacity-hover" data-js="saved-clip-button-container__like">👍</button>
      <button class="opacity-hover" data-js="saved-clip-button-container__delete">🗑️</button>
    </div>
  `;
};

const YMDtemplate = (time) => {
  const [year, month, day] = date.toYMDArray(time);

  return `<p>${year}년 ${month}월 ${day}일</p>`;
};

export const clipTemplate = (video, index, type) => {
  const { isModal } = type;

  return `
      <article class="clip  ${
        video.isWatched ? 'watched-clip' : 'unwatched-clip'
      }${video.isLiked ? 'like-clip' : ''}
        " 
        data-js=${isModal ? 'youtube-search-modal__clip' : 'saved-page__clip'}
        data-clip-index=${index}
      >
        <div class="preview-container">
          <iframe 
            width="100%"
            height="118"
            src=https://www.youtube.com/embed/${video.id.videoId}
            frameborder="0"
            loading="lazy"
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
              rel="noopener noreferer nofollow"
              class="channel-name mt-1"
            >
              ${video.snippet.channelTitle}
            </a>
            <div class="meta">
              ${YMDtemplate(video.snippet.publishTime)}
            </div>
            <div class="d-flex justify-end">
             ${buttonTemplate(index, type)}            
            </div>
          </div>
        </div>
      </article>
    `;
};
