import MainVideoList from '../common/Main/MainVideoList';

const TAB_BASE_CLASSLIST = 'button nav__button';

export default class Main {
  constructor(element) {
    this.element = element;
    this.searchModalButton = this.element.querySelector('#search-modal-button');
    this.videoList = this.element.querySelector('.watch-later-video-list');
    this.tabs = this.element.querySelector('#classroom-tabs');

    this.searchModalButton.addEventListener('click', this.openModalHandler);
    this.tabs.addEventListener('click', this.changeTab);

    this.MainVideoList = new MainVideoList(this.videoList);
    this.activeTab = 'watch-later-videos';
    this.renderStoredVideoList();
  }

  changeTab = (e) => {
    if (e.target.classList.contains('button')) {
      this.activeTab = e.target.dataset.tab;
      Array.from(this.tabs.children).forEach((tab) => {
        tab.className =
          tab.dataset.tab === this.activeTab ? `${TAB_BASE_CLASSLIST} focus` : TAB_BASE_CLASSLIST;
      });
      this.renderStoredVideoList();
    }
  };

  renderStoredVideoList() {
    this.MainVideoList.setState({ activeTab: this.activeTab });
  }

  openModalHandler = () => {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.remove('hide');
  };
}
