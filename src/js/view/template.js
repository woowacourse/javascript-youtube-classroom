export const searchVideoTemplate = info => {
  return `<article class="clip">
            <div class="preview-container">
                <iframe
                width="100%"
                height="118"
                src='https://www.youtube.com/embed/${info.url}'
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                ></iframe>
            </div>
            <div class="content-container pt-2 px-1">
                <h3>${info.title}</h3>
                <div>
                <a
                    href="https://www.youtube.com/channel/${info.channelId}"
                    target="_blank"
                    class="channel-name mt-1"
                >
                    ${info.channelTitle}
                </a>
                <div class="meta">
                    <p>${info.publishTime}</p>
                </div>
                <div class="d-flex justify-end">
                    <button class="btn">⬇️ 저장</button>
                </div>
                </div>
            </div>
            </article>
`;
};
