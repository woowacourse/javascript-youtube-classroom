class StorageModel {
  #myVideo;

  constructor() {
    this.#myVideo = [];
  }

  init() {
    localStorage.setItem('myVideo', JSON.stringify(this.#myVideo));
  }

  saveVideo = json => {
    // TODO : util에 addItem(변수명, 넣어줄요소) 만들기
    const myVideo = JSON.parse(localStorage.getItem('myVideo'));
    myVideo.push(json);
    localStorage.setItem('myVideo', JSON.stringify(myVideo));
    console.log(JSON.parse(localStorage.getItem('myVideo')));
  };
}

export default StorageModel;
