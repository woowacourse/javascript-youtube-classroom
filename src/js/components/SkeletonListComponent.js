import Component from './Component.js';

class SkeletonListComponent extends Component {
  $skeletonList;

  constructor(parentElement) {
    super(parentElement);
    this.mount();
    this.initDOM();
  }

  mount() {
    const template = this.generateTemplate();
    this.parentElement.insertAdjacentHTML('beforeend', template);
  }

  initDOM() {
    this.$skeletonList = this.parentElement.querySelectorAll('.skeleton-item');
  }

  unmount() {
    this.$skeletonList.forEach(($skeletonItem) => {
      this.parentElement.removeChild($skeletonItem);
    });
  }

  generateTemplate() {
    return `
        <li class="skeleton-item">
            <div class="image"></div>
            <p class="line big"></p>
            <p class="line middle"></p>
            <p class="line small"></p>
            <div><p class="line thick"></p></div>
        </li>
      `.repeat(10);
  }
}

export default SkeletonListComponent;
