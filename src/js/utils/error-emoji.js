import { ERROR_EMOJIS } from '../constants/constant';

const randomErrorEmoji = () => {
  return ERROR_EMOJIS[Math.floor(ERROR_EMOJIS.length * Math.random())];
};

export default randomErrorEmoji;
