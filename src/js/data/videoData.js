class VideoData {
  #datas;

  constructor() {
    this.#datas = [];
  }

  appendData(datas) {
    this.#datas.push(datas)
  }

  getData() {
    return this.#datas;
  }
}