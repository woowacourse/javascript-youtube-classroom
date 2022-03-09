export class Classroom {
  constructor(props) {
    this.props = props;
    this.searchModalButton = document.getElementById('search-modal-button');
    this.searchModalButton.addEventListener('click', this.props.openModal);
  }
}
