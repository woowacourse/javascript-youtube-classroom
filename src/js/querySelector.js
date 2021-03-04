import { CLASSNAME } from "./constants.js";

export const $ = (parameter) => {
  const selector = Object.values(CLASSNAME).includes(parameter)
    ? `.${parameter}`
    : parameter;

  return document.querySelector(selector);
};

export const $$ = (parameter) => {
  const selector = Object.values(CLASSNAME).includes(parameter)
    ? `.${parameter}`
    : parameter;

  return document.querySelectorAll(selector);
};
