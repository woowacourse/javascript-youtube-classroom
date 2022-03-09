class View {
  constructor() {
    this.searchModalButton = document.querySelector('#search-modal-button');
    this.modalContainer = document.querySelector('.modal-container');
    this.searchInputKeyword = document.querySelector('#search-input-keyword');
    this.searchForm = document.querySelector('#search-form');
    this.videoList = document.querySelector('.video-list');

    this.searchModalButton.addEventListener('click', this.#openModal);
    this.searchForm.addEventListener('submit', this.#handleSearch);
    this.sendSearchRequest = () => {};
  }

  attachHandler(searchHandler) {
    this.sendSearchRequest = searchHandler;
  }

  #openModal = () => {
    this.modalContainer.classList.remove('hide');
  };

  #handleSearch = async (event) => {
    event.preventDefault();
    const { value: keyword } = this.searchInputKeyword;
    if (this.#isBlankInput(keyword)) {
      return;
    }
    this.#loadSkeleton();
    const searchResultArray = await this.sendSearchRequest(keyword);
    // video view render (searchResultArray)
  };

  #isBlankInput = (input) => input.trim() === '';

  #skeletonTemplate = () =>
    `<div class="skeleton">
      <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
    </div>`.repeat(10);

  #loadSkeleton = () => {
    this.videoList.insertAdjacentHTML('beforeend', this.#skeletonTemplate());
  };
}

export default View;
