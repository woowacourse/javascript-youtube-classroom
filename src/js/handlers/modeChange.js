import { videoInfos } from '../states/videoInfos.js';
import { videoListType } from '../states/videoListType.js';
import { renderSavedVideoList } from '../viewControllers/app.js';

export function handleModeChange({ target }) {
  if (target.id === 'search-button') return;
  const $$videoDisplayButtons = document.querySelectorAll(
    '.video-display-button'
  );
  $$videoDisplayButtons.forEach($button =>
    $button.classList.remove('bg-cyan-100')
  );
  target.classList.add('bg-cyan-100');
  const type = target.id.replace('-video-display-button', '');
  videoListType.set(type);
  renderSavedVideoList([...videoInfos.get()]);
}
