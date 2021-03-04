export default class Video {
  constructor(item) {
    this.videoId = item.id.videoId;
    this.videoTitle = item.snippet.title;
    this.videoEmbedUrl = this.parseVideoEmbedUrl();
    this.channelTitle = item.snippet.channelTitle;
    this.channelId = item.snippet.channelId;
    this.channelUrl = this.parseChannelUrl();
    this.uploadTime = this.parseVideoUploadDate(item.snippet.publishTime);
  }

  parseVideoEmbedUrl() {
    return `https://www.youtube.com/embed/${this.videoId}`;
  }

  parseChannelUrl() {
    return `https://www.youtube.com/channel/${this.channelId}`;
  }

  parseVideoUploadDate(date) {
    const newDate = new Date(date);
    return `${newDate.getFullYear()}년 ${newDate.getMonth()}월 ${newDate.getDate()}일`;
  }

  toString() {
    return `
    <article class="clip">
    <div class="preview-container">
      <iframe width="100%" height="118" src="${this.videoEmbedUrl}" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>
    <div class="content-container pt-2 d-flex flex-col justify-between w-100">
    
      <div class="d-flex flex-col video-info">
        <h3 class="video-title">${this.videoTitle}</h3>
        <a href="${this.channelUrl}" target="_blank"
          class="channel-name mt-1">
          ${this.channelTitle}
        </a>
        <div class="meta">
          <p>${this.uploadTime}</p>
        </div>
      </div>

      <button type="button" class="save-btn btn">⬇️ 저장</button>
    </div>
  </article>
    `;
  }
}
