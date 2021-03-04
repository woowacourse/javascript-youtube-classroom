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
  };

  // info를 받아 getItem해서 getItem에 해당 요소가 있는지 반환 (T/F)
  findVideoByInfo = info => {
    return JSON.parse(localStorage.getItem('myVideo')).includes(info);
  };
}

export default StorageModel;
