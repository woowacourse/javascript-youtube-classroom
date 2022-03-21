import { $ } from "../utils/dom.js";
import { NUM } from "../utils/contants.js";

export default class Toast {
  constructor() {
    this.toast = $(".toast");
  }

  show(message) {
    this.toast.innerText = message;
    this.toast.classList.add("show");
    this.timer = setTimeout(() => this.toast.classList.remove("show"), NUM.TOAST_DELAY);
  }
}
