function createVideoSnippetTemplate({ id, snippet }) {
  return `<article class="clip video">
            <div class="preview-container">
              <iframe
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
                <div class="d-flex justify-end">
                  <button class="btn js-save-button">⬇️ 저장</button>
                </div>
              </div>
            </div>
          </article>`;
}

export default createVideoSnippetTemplate;
