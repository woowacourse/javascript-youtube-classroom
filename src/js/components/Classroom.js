import { getVideoItemsFromLocalStorage } from '../utils/localStorage.js';
import { makeThumbnailTemplate } from '../utils/templates.js';

export class Classroom {
  constructor(props) {
    this.props = props;

    this.openModalButton = document.getElementById('search-modal-button');
    this.openModalButton.addEventListener('click', this.props.openModal);

    this.contentsContainer = document.getElementById('classroom-contents-container');
    this.willSeeVideoButton = document.getElementById('will-see-video-button');
    this.willSeeVideoButton.addEventListener('click', this.handleWillSeeVideoButton);
  }

  handleWillSeeVideoButton = async () => {
    this.clearClassroomContentsContainer();
    const videoList = getVideoItemsFromLocalStorage();
    console.log(videoList);
    this.contentsContainer.insertAdjacentHTML(
      'beforeend',
      videoList.map((video) => makeThumbnailTemplate(video)).join(''),
    );
  };

  clearClassroomContentsContainer() {
    this.contentsContainer.innerHTML = ``;
  }
}
