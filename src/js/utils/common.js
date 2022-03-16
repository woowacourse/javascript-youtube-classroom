import { NUM } from "./contants";
import { $ } from "./dom.js";

export const changeDateFormat = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
};

export const toastMessage = (message) => {
  const toast = $(".toast");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), NUM.TOAST_DELAY);
};
