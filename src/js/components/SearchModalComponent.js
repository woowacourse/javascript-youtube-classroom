import Component from './Component';
import SearchFormComponent from './SearchFormComponent';
import VideoContainerComponent from './VideoContainerComponent';
class SearchModalComponent extends Component {
  searchFormComponent = null;

  videoContainerComponent = null;

  $searchModal = null;

  $modalContainer = null;

  constructor(parentElement, state) {
    super(parentElement, state);
    this.mount();
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  mount() {
    const template = this.generateTemplate();

    this.parentElement.insertAdjacentHTML('beforeend', template);

    this.$modalContainer = document.querySelector('.modal-container');
    this.$searchModal = document.querySelector('.search-modal');

    this.searchFormComponent = new SearchFormComponent(this.$searchModal, {});

    this.videoContainerComponent = new VideoContainerComponent(this.$searchModal, {
      videoList: [],
    });
  }

  render() {
    const { isShow } = this.state;
    if (isShow) {
      this.$modalContainer.classList.remove('hide');
      return;
    }
    this.$modalContainer.classList.add('hide');
  }

  generateTemplate() {
    return `
    <div class="modal-container hide">
    <div class="dimmer"></div>
    <div class="search-modal" role="dialog" aria-labelledby="search-modal-title">
      <h2 id="search-modal-title" class="search-modal__title">🔍 보고싶은 영상 찾기 🔍</h2>
    </div>
  </div>
        `;
  }
}
export default SearchModalComponent;
