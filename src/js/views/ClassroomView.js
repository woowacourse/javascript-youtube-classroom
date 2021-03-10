import { $ } from '../utils/DOM';

export default class SearchView {
  constructor() {
    this.selectDOMs();
  }

  selectDOMs() {
    this.$classroomNav = $('.js-classroom-nav');
  }
}
