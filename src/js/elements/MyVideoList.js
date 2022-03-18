class MyVideoList extends HTMLUListElement {}

customElements.define('my-video-list', MyVideoList, { extends: 'ul' });

export default MyVideoList;
