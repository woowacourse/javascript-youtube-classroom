import { REVALIDATION_TIME } from '../constants/cacheStore';

export const { getCacheData, setCacheData } = (function () {
  const cacheStore = {};
  return {
    getCacheData(cacheKey) {
      return cacheStore[cacheKey];
    },
    setCacheData(cacheKey, data) {
      /** revalidation을 위한 */
      setTimeout(() => {
        cacheStore[cacheKey] = undefined;
      }, REVALIDATION_TIME);
      cacheStore[cacheKey] = data;
    },
  };
})();
