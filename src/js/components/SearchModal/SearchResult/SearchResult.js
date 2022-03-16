import Component from '../../../core/Component.js';
import VideoCardList from './VideoCardList.js';

export default class SearchResult extends Component {
  template() {
    return `
      <ul id="video-list" class="video-list"></ul>
    `;
  }

  afterMounted() {
    new VideoCardList(this.$('#video-list'));
  }
}
