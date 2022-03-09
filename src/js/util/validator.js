import { getLocalStorage } from "../storage/localStorage.js";

const validator = {
  isEmptyInput: (value) => value === "",
};

export const checkValidSearchInput = (value) => {
  if (validator.isEmptyInput(value)) {
    throw new Error("검색어를 입력해주세요");
  }
};

export const checkMaxStorageVolume = () => {
  if (getLocalStorage("save").length >= 100) {
    throw new Error("최대 저장 개수는 100개입니다.");
  }
};
