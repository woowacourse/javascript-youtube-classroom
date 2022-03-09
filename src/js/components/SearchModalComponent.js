import Component from './Component';
import SearchFormComponent from './SearchFormComponent';
import VideoContainerComponent from './VideoContainerComponent';
import { subscribe } from '../modules/stateStore';

class SearchModalComponent extends Component {
  searchFormComponent = null;

  videoContainerComponent = null;

  $searchModal = null;

  $modalContainer = null;

  $dimmer = null;

  constructor({ parentElement, handlers: { onClickOutsideModal, ...restHandlers } }) {
    super(parentElement);
    this.mount(restHandlers);
    this.bindEventHandler({ onClickOutsideModal });
    subscribe('isModalShow', this);
  }

  wakeUp(stateKey, stateValue) {
    this.render(stateValue);
  }

  mount({ onSubmitSearchKeyword, onClickSaveButton }) {
    const template = this.generateTemplate();
    this.parentElement.insertAdjacentHTML('beforeend', template);
    this.$modalContainer = this.parentElement.querySelector('.modal-container');
    this.$searchModal = this.parentElement.querySelector('.search-modal');
    this.$dimmer = this.parentElement.querySelector('.dimmer');

    this.searchFormComponent = new SearchFormComponent({
      parentElement: this.$searchModal,
      handlers: { onSubmitSearchKeyword },
    });

    this.videoContainerComponent = new VideoContainerComponent({
      parentElement: this.$searchModal,
      handlers: {
        onClickSaveButton,
      },
    });
  }

  render(isModalShow) {
    if (isModalShow) {
      this.$modalContainer.classList.remove('hide');
      return;
    }
    this.$modalContainer.classList.add('hide');
  }

  bindEventHandler({ onClickOutsideModal }) {
    this.$dimmer.addEventListener('click', onClickOutsideModal);
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
