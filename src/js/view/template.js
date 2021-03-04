export const searchVideoTemplate = info => {
  return `<article class="clip skeleton">
            <div class="preview-container image">
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
                <h3 class="line"">${info.title}</h3>
                <div>
                    <a
                        href="https://www.youtube.com/channel/${info.channelId}"
                        target="_blank"
                        class="channel-name mt-1 line"
                    >
                        ${info.channelTitle}
                    </a>
                    <div class="meta">
                        <p class="line">${info.publishTime}</p>
                    </div>
                    <div class="d-flex justify-end">
                        <button class="btn js-save-button" data-info='${JSON.stringify(
                          info
                        ).replace("'", '&#039;')}'>⬇️ 저장</button>
                    </div>
                </div>
            </div>
            </article>`;
};

export const searchNotFoundTemplate = () => {
  return `
        <img id="search-not-found" src="./src/images/status/not_found.png" />
    `;
};
