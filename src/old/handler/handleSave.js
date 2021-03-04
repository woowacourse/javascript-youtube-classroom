import { $ } from 'old/utils/querySelector';

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

const loadSavedClips = () => {
  const savedClips = localStorage.get('savedClips') ?? [];

  $(
    '[data-js=saved-page__video-wrapper]',
  ).innerHTML = savedClips
    .map((savedClip, index) => savedClipTemplate(savedClip, index))
    .join('');
};

export const handleSave = ({ target }) => {
  if (target.dataset.js !== 'save-button') {
    return;
  }

  const clipIndex = target.dataset.clipIndex;
  const recentSearchResult = localStorage.get('recentSearchResult') ?? [];
  const savedClips = localStorage.get('savedClips') ?? [];

  if (savedClips.length >= YOUTUBE.MAXIMUM_SAVE_CLIPS) {
    alert('클립을 100개 이상 저장할 수 없습니다');
    return;
  }

  localStorage.set('savedClips', [
    ...savedClips,
    recentSearchResult[clipIndex],
  ]);
  loadSavedClips();
};
