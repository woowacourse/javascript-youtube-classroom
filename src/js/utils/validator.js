import EXCEPTION from '../../constants/exception';
import VIDEO from '../../constants/video';

const isEmpty = (target) => target === '';

const isLengthZero = (target) => target.length === 0;

export const checkEmpty = (value) => {
  if (isEmpty(value)) {
    throw new Error(EXCEPTION.EMPTY_ERROR_MESSAGE);
  }
};

export const checkLengthExist = (value) => {
  if (isLengthZero(value)) {
    throw new Error(EXCEPTION.NOT_FOUND_ERROR_MESSAGE);
  }
};

export const checkExceedLimit = (items) => {
  if (items.length >= VIDEO.LIMIT_SAVE_VIDEO_COUNT) {
    throw new Error(EXCEPTION.EXCEED_LIMIT_ERROR_MESSAGE);
  }
};
