export class Classroom {
  constructor(props) {
    this.props = props;
    this.openModalButton = document.getElementById('search-modal-button');
    this.openModalButton.addEventListener('click', this.props.openModal);
  }
}
