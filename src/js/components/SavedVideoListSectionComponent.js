class SavedVideoListSection {
  #parentElement = null;

  constructor(parentElement) {
    this.#parentElement = parentElement;

    this.#mount();
  }

  #mount() {
    const template = this.#generateTemplate();

    this.#parentElement.insertAdjacentHTML('beforeend', template);
  }

  #generateTemplate() {
    return `
      <div class="saved-video-list__no-result">
        <img src="./not_found.png" alt="no result image" class="no-result__image">
        <p class="no-result__description">아직 저장된 영상이 없습니다.</p>
      </div>
    `;
  }
}

export default SavedVideoListSection;
