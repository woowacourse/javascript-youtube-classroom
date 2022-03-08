import Component from '../../core/Component.js';
import VideoCardList from './VideoCardList.js';

export default class SearchResult extends Component {
  template() {
    return `
      <h3 hidden>검색 결과</h3>
      <ul id="video-list" class="video-list"></ul>
    `;
  }

  afterMounted() {
    const { items } = this.props;

    new VideoCardList(this.$('#video-list'), { items });
  }
}
