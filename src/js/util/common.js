import { SERVER_ERROR } from './constants';

export const preprocessDate = (date) => {
  const [year, month, day] = date.slice(0, 10).split('-');

  return `${year}년 ${month}월 ${day}일`;
};

export const throttle = (func, delay) => {
  let timerId;

  return () => {
    if (!timerId) {
      timerId = setTimeout(() => {
        timerId = null;
        func();
      }, delay);
    }
  };
};

export const isServerError = (status) => {
  return Math.floor(parseInt(status, 10) / 100) === SERVER_ERROR;
};
