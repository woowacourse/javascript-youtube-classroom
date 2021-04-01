import { BROWSER_HASH } from '../constants';

const controllerUtil = {
  setObserver($element, callback) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          callback();
        }
      });
    });
    observer.observe($element);
  },

  parseHash(hash) {
    if (hash === '') {
      return BROWSER_HASH.WATCHING;
    }

    return hash.substr(1);
  },
};

export default controllerUtil;
