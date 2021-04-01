export const GetVideoIframeMixin = superClass =>
  class extends superClass {
    _getIframe(videoItem) {
      return `
      <iframe
      width="100%"
      height="118"
      scrolling="no"
      src="https://www.youtube.com/embed/${videoItem.videoId}"
      loading="lazy"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      ></iframe>
      `;
    }
  };
