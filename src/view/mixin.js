export const GetVideoIframeMixin = superClass =>
  class extends superClass {
    _getIframe(videoItem) {
      return `
      <iframe
      width="100%"
      height="118"
      scrolling="no"
      src="https://www.youtube.com/embed/${videoItem.videoId}"
      srcdoc=
      "${this.#getSrcDoc(videoItem)}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      ></iframe>
      `;
    }

    #getSrcDoc(videoItem) {
      return `
      <body style=''>
        <header>
          <link rel='stylesheet' href='./src/assets/css/index.css'>
        </header>
        <div class='thumbnail'>
          <a href='https://www.youtube.com/embed/${videoItem.videoId}' 
          aria-label='유튜브 재생 버튼입니다. 제목은 ${videoItem.title}입니다.'>
            <img 
            class='thumbnail__image' 
            src=${videoItem.thumbnailUrl} />
            <div class='d-flex justify-center items-center  thumbnail__play-button'>
              <span>▶</span>
            <div>
          </a>
        <div>
      </body>
      `;
    }
  };
