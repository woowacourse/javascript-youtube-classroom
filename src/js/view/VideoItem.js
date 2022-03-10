export default class VideoItem {
  constructor($element) {
    this.$element = $element;
  }

  getVideoItemTemplate(parseData) {
    this.$element.innerHTML = `
    <li class="video-item" data-video-id="">
      <img
        src=${parseData ? parseData.url : ''}
        alt="video-item-thumbnail" class="video-item__thumbnail ${parseData ? '' : 'skeleton'}"
        loading="lazy">
      <h4 class="video-item__title ${parseData ? '' : 'skeleton'}">${
      parseData ? parseData.title : ''
    }</h4>
      <p class="video-item__channel-nagetVideoItemTemplateme ${parseData ? '' : 'skeleton'}">${
      parseData ? parseData.channelTitle : ''
    }</p>
      <p class="video-item__published-date ${parseData ? '' : 'skeleton'}">${
      parseData ? parseData.publishedAt : ''
    }</p>
      <button class="video-item__save-button button ${parseData ? '' : 'skeleton'}">${
      parseData ? '⬇ 저장' : ''
    }</button>
    </li>
    `;
  }
}
