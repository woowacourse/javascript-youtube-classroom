function createVideoSnippetTemplate({ id, snippet }, isSaved = false) {
  return `<article class="clip js-video"
            data-video-id=${id.videoId}
            data-title=${encodeURIComponent(snippet.title)}
            data-channel-id=${snippet.channelId}
            data-channel-title=${encodeURIComponent(snippet.channelTitle)}
            data-publish-time=${snippet.publishTime}
          >
            <div class="preview-container">
              <iframe
                class="js-preview"
                width="100%"
                height="118"
                src="https://www.youtube.com/embed/${id.videoId}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div class="content-container pt-2 px-1">
              <h3>${snippet.title}</h3>
              <div>
                <a
                  href="https://www.youtube.com/channel/${snippet.channelId}"
                  target="_blank"
                  class="channel-name mt-1"
                >
                ${snippet.channelTitle}
                </a>
                <div class="meta">
                  <p>${snippet.publishTime}</p>
                </div>
                ${
                  isSaved
                    ? ''
                    : `<div class="d-flex justify-end">
                    <button class="btn js-save-button">⬇️ 저장</button>
                  </div>`
                }
              </div>
            </div>
          </article>`;
}

/*
 * data-attirbue 로 다 할당
 * 이미 존재하는 속성들을 그대로 활용 (선택자 접근, 문자열 파싱)
 */

export default createVideoSnippetTemplate;
