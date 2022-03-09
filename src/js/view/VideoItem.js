export default class VideoItem {
  constructor($element) {
    this.$element = $element;
  }

  getVideoItemTemplate(data) {
    this.$element.innerHTML = `
    <li class="video-item" data-video-id="">
      <img
        src=${data ? data.url : ''}
        alt="video-item-thumbnail" class="video-item__thumbnail ${data ? '' : 'skeleton'}"
        loading="lazy">
      <h4 class="video-item__title ${data ? '' : 'skeleton'}">${data ? data.title : ''}</h4>
      <p class="video-item__channel-nagetVideoItemTemplateme ${data ? '' : 'skeleton'}">${
      data ? data.channelName : ''
    }</p>
      <p class="video-item__published-date ${data ? '' : 'skeleton'}">${
      data ? data.publishedDate : ''
    }</p>
      <button class="video-item__save-button button ${data ? '' : 'skeleton'}">${
      data ? data.saveButton : ''
    }</button>
    </li>
    `;
  }
}
