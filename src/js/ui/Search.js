import { ERROR_MESSAGE } from '../constants';
import { API_KEY } from '../domain/key';
import { request } from '../domain/youtubeApi';
import { $, showExceptionSnackBar } from '../utils/dom';
export default class Search {
  constructor() {
    $('#search-form').addEventListener('submit', e => {
      e.preventDefault();
      if ($('#search-input-keyword').value === '') {
        showExceptionSnackBar(ERROR_MESSAGE.BLANK_SEARCH_INPUT);
        return;
      }

      this.renderVideoList();
      // TODO: 스켈레톤 UI를 보여준다

      // try {
      //   request($('#search-input-keyword').value, API_KEY).then(json =>
      //     console.log(json),
      //   );
      // } catch ({ message }) {
      //   console.log(message);
      // }
    });
  }

  videoTemplate() {
    return `
      <li class="video-item" data-video-id="">
        <img
          src="https://i.ytimg.com/vi/ECfuKi5-Cfs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDvmIcX-TgdcH2g_Bd4AUxw6hjmvQ"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">[Playlist] 너무 좋은데 괜찮으시겠어요?</h4>
        <p class="video-item__channel-name">essential;</p>
        <p class="video-item__published-date">2022년 3월 2일</p>
        <button class="video-item__save-button button">⬇ 저장</button>
      </li>`;
  }

  renderVideoList() {
    $('.video-list').insertAdjacentHTML(
      'beforeend',
      this.videoTemplate().repeat(8),
    );
  }
}
