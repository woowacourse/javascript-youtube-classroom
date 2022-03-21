/* eslint-disable max-lines-per-function */
import { MAX_RENDER_VIDEOS_COUNT, SERVER_URL, VALIDATION_ERROR_NAME } from './constants/constant';
import VideoItem from './videoItem';
import { consoleErrorWithConditionalAlert, $, hasProperty, requestYoutubeVideos } from './utils';

class SearchModal {
  nextPageToken = null;

  constructor(storage, delegate) {
    this.storage = storage;
    this.delegate = delegate;
  }

  init() {
    this.$modal = $('.search-modal');
    this.$searchKeyWordInput = $('#search-input-keyword', this.$modal);
    this.$searchButton = $('#search-button', this.$modal);
    this.$searchResult = $('.search-result');
    this.$videoList = $('.video-list', this.$searchResult);
    this.renderSkeletonItems(MAX_RENDER_VIDEOS_COUNT);

    this.$searchButton.addEventListener('click', this.handleClickSearchButton);
    this.$videoList.addEventListener('click', this.handleClickVideoList);

    this.observer = this.loadMoreObserver();
  }

  templateSkeletons(videoCount) {
    const skeletonListHtmlString = [...Array(videoCount).keys()]
      .map(
        () => `
          <li class="video-item skeleton">
            <div class="image"></div>
            <p class="line"></p>
            <p class="line"></p>
          </li>
        `
      )
      .join('');
    return skeletonListHtmlString;
  }

  renderSkeletonItems(videoCount) {
    this.$videoList.insertAdjacentHTML('beforeend', this.templateSkeletons(videoCount)); // 그냥 더해도 CSS로 처음에 안보이게 해놨다
  }

  renderVideoItems(videos) {
    const videoListTemplate = videos
      .map(video => {
        const isSavedVideo = hasProperty(this.storage.cache, video.id);
        const disabled = isSavedVideo ? 'disabled' : '';
        return `<li class="video-item" data-video-id="${video.id}" data-testid="search-result-video-item">
          <div class="video-container">
            <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${video.id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <h4 class="video-item__title">
            <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank">${video.title}</a>
          </h4>
          <p class="video-item__channel-name">
            <a href="https://www.youtube.com/channel/${video.channelId}" target="_blank">
              ${video.channelTitle}
            </a>
          </p>
          <p class="video-item__published-date">
            <time datetime="${video.publishedAtAsDateTime}">${video.publishedAt}</time>
          </p>
          <button ${disabled} class="btn video-item__save-button" data-testid="save-video-button">⬇ 저장</button>
        </li>`;
      })
      .join('');
    const $firstSkeleton = this.$videoList.querySelector('.skeleton');
    $firstSkeleton.insertAdjacentHTML('beforebegin', videoListTemplate);

    const lastVideoItem = $('.video-item.skeleton', this.$videoList).previousSibling;
    setTimeout(() => {
      this.observer.observe(lastVideoItem);
    }, 800);
  }

  handleClickSearchButton = async () => {
    this.resetSearchResult();
    this.nextPageToken = null; // 같은 검색어로 또 검색했을때 첫페이지가 보여지도록 한다
    const searchKeyWord = this.$searchKeyWordInput.value;
    const videos = await this.requestVideos(searchKeyWord);
    if (videos === null) {
      this.$searchResult.classList.add('search-result--no-result');
      return;
    }
    this.renderVideoItems(videos);
  };

  handleClickSaveButton = event => {
    const { target } = event;
    const $videoItem = target.closest('.video-item');
    const videoId = $videoItem.getAttribute('data-video-id');
    try {
      this.storage.saveVideo(videoId);
      target.setAttribute('disabled', true);
      this.delegate.handleSaveVideo(videoId);
    } catch (error) {
      consoleErrorWithConditionalAlert(error, VALIDATION_ERROR_NAME);
    }
  };

  handleClickVideoList = event => {
    const { target } = event;
    if (target.tagName.toLowerCase() !== 'button') return;
    this.handleClickSaveButton(event);
  };

  resetSearchResult() {
    this.$videoList.replaceChildren(); // 내용물을 모두 비워준다
    this.renderSkeletonItems(MAX_RENDER_VIDEOS_COUNT); // skeleton을 다시 그려준다
    this.$searchResult.classList.remove('search-result--no-result'); // 결과 없음 class를 삭제한다
  }

  removeSkeleton() {
    [...this.$videoList.querySelectorAll('.skeleton')].forEach($el => $el.remove());
  }

  loadMoreObserver() {
    return new IntersectionObserver(
      async entries => {
        if (entries[0].isIntersecting && this.nextPageToken !== null) {
          this.observer.unobserve(entries[0].target);
          const title = this.$searchKeyWordInput.value;
          const videos = await this.requestVideos(title);
          videos && this.renderVideoItems(videos);
        }
      },
      {
        threshold: 0.95,
      }
    );
  }

  async requestVideos(query) {
    this.$searchResult.classList.add('loading');
    const result = await requestYoutubeVideos(`${SERVER_URL}/youtube-search`, {
      q: query,
      ...(this.nextPageToken && { pageToken: this.nextPageToken }),
    });
    this.$searchResult.classList.remove('loading');
    if (result === null) return null;
    this.nextPageToken = result.nextPageToken;
    const videos = result.items.map(item => {
      const { id } = item;
      const isWatched = hasProperty(this.storage.cache, id) && this.storage.cache[id].watched;
      return new VideoItem(item, isWatched);
    });
    return videos;
  }
}

export default SearchModal;
