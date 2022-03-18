import SearchVideoManager from '../Manager/SearchVideoManager';

describe('youtube 검색 기능 테스트', () => {
  it('키워드를 사용하여 검색할 수 있다. 결과 있음', () => {
    const keyword = '키워드';

    const searchVideoManager = new SearchVideoManager();

    searchVideoManager.search(keyword).then((data) => {
      expect(data).not.toBe(null);
    });
  });

  it('키워드를 사용하여 검색할 수 있다. 결과 없음', () => {
    const keyword =
      '!@#!@$!#%@$^#%&$^%!@#!$!#%&(^#%$!@#!@$#$!#@!#))&%^)&%^)&@!@#!#$@#$%$@#^%&$%^&#$@$^#%&$%^$^%*$^&^@#$@#$@#%@#$^#%&^**#^#$%@#$@#$^@#$!$@#%@#$%#$^#$%^$%@#$!@#!@#%)^&)%^$%#$%#$^#%^#%^#^&%^)&#$)%)#$)%#$%!@#!@$#$!#@!#))&%^)&%^)&%)^&)%^&%^)&#$)%)#$)%#$%';

    const searchVideoManager = new SearchVideoManager();

    searchVideoManager.search(keyword).then((data) => {
      expect(data).toEqual([]);
    });
  });
});
