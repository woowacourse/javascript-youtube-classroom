// eslint-disable-next-line max-classes-per-file
import CLASSNAME from "../constants/classname.js";
import { $ } from "../utils/index.js";
import VideoWrapper from "./MainVideoWrapper.js";

export default class Container {
  #$container = $(`.${CLASSNAME.MAIN_CONTAINER}`);

  #videoWrapper = new VideoWrapper();

  show() {
    $.show(this.#$container);
  }

  hide() {
    $.hide(this.#$container);
  }
}
