import ERROR_MESSAGES from '../../constants/errorMessages';
import VIDEO from '../../constants/video';

const isEmpty = (target) => target === '';

const isLengthZero = (target) => target.length === 0;

const isUndefined = (target) => typeof target === 'undefined';

export const checkEmpty = (value) => {
  if (isEmpty(value)) {
    throw new Error(ERROR_MESSAGES.EMPTY);
  }
};

export const checkLengthExist = (value) => {
  if (isUndefined(value)) {
    throw new Error(ERROR_MESSAGES.NOT_FOUND);
  }
  if (isLengthZero(value)) {
    throw new Error(ERROR_MESSAGES.NOT_FOUND);
  }
};

export const checkExceedLimit = (items) => {
  if (items.length >= VIDEO.LIMIT_SAVE_VIDEO_COUNT) {
    throw new Error(ERROR_MESSAGES.EXCEED_LIMIT);
  }
};
