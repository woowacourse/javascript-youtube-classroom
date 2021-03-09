import { $ } from '../utils/dom.js';
import clipMaker from '../utils/clipMaker.js';
import View from './View.js';

export default class SavedVideosView extends View {
  constructor($element) {
    super($element);
  }

  renderSavedVideoClips(videos) {
    const savedVideoClips = videos
      .map((video) => clipMaker(video, { isModal: false }))
      .join('');

    $('#main-videos').addInnerHTML(savedVideoClips);
  }

  addSavedVideoClip(video) {
    $('#main-videos').addInnerHTML(clipMaker(video, { isModal: false }));
  }
}
