export const GetVideoIframeMixin = (superClass) =>
  class extends (superClass) {
    _getIframe(videoItem) {
      const videoUrl =
        `https://www.youtube.com/embed/${videoItem.videoId}`
      return `
      <iframe
      width="100%"
      height="118"
      scrolling="no"
      src="${videoUrl}"
      srcdoc=
      "${this.#getSrcDoc(videoUrl, videoItem.thumbnailUrl)}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      ></iframe>
      `
    }

    #getSrcDoc(videoUrl, thumbnailUrl) {
      return `<body style=''>
        <header>
          <link rel='stylesheet' href='./src/assets/css/index.css'>
        </header>
        <div class='thumbnail'>
          <a href='${videoUrl}'>
            <img 
            class='thumbnail__image' 
            src=${thumbnailUrl} />
            <div class='d-flex justify-center items-center  thumbnail__play-button'>
              <span>▶</span>
            <div>
          </a>
        <div>
      </body>`
    }
  }

