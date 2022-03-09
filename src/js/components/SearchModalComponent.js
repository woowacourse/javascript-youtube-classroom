import Component from './Component';
import SearchFormComponent from './SearchFormComponent';
import VideoContainerComponent from './VideoContainerComponent';
import Video from '../modules/video';
class SearchModalComponent extends Component {
  searchFormComponent = null;

  videoContainerComponent = null;

  target = null;

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

    this.target = document.querySelector('.search-modal');

    this.searchFormComponent = new SearchFormComponent(this.target, {});
    this.videoContainerComponent = new VideoContainerComponent(this.target, {
      videoList: [
        Video.create({
          videoId: '1',
          videoTitle: '빅터의 브이로그',
          channelTitle: '무비비빅터',
          publishTime: '2016-03-01',
          thumbnail: '1.jpg',
        }),
        Video.create({
          videoId: '1',
          videoTitle: '빅터의 브이로그',
          channelTitle: '무비비빅터',
          publishTime: '2016-03-01',
          thumbnail: '1.jpg',
        }),
        Video.create({
          videoId: '1',
          videoTitle: '빅터의 브이로그',
          channelTitle: '무비비빅터',
          publishTime: '2016-03-01',
          thumbnail: '1.jpg',
        }),

        Video.create({
          videoId: '1',
          videoTitle: '빅터의 브이로그',
          channelTitle: '무비비빅터',
          publishTime: '2016-03-01',
          thumbnail: '1.jpg',
        }),
        Video.create({
          videoId: '1',
          videoTitle: '빅터의 브이로그',
          channelTitle: '무비비빅터',
          publishTime: '2016-03-01',
          thumbnail: '1.jpg',
        }),
      ],
    });
  }

  render() {
    const { isShow } = this.state;
    const $modaContainer = document.querySelector('.modal-container');

    if (isShow) {
      $modalContainer.classList.remove('hide');

      return;
    }

    $modalContainer.classList.add('hide');
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
