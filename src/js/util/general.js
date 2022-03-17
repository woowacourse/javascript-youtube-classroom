import { ERROR } from '../constants/constants.js';

export const $ = selector => document.querySelector(selector);

export const $$ = selector => document.querySelectorAll(selector);

export const validateInput = input => {
  if (input === '') {
    throw new Error(ERROR.MESSAGE.EMPTY_INPUT);
  }
};

export const quickModalElement = e => {
  e.preventDefault();
  if (!$('.modal-container').classList.contains('hide')) {
    $('.modal-container').classList.toggle('hide');
  }
};

export const confrimVideoDelete = () => {
  return window.confirm('정말로 삭제하시겠습니까?');
};
