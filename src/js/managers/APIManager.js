const APIManger = {
  baseURL: 'https://www.googleapis.com/youtube/v3/search?',

  fetchData: async inputValue => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${inputValue}&pageToken=&maxResults=10&key=AIzaSyALIhA-Z7E0jyNzThoiJzDSItGkc1cuaoE`
      );
      if (!response.ok) {
        throw new Error('입력하신 검색어로 데이터를 가지오지 못했습니다.');
      }
      const json = await response.json();
      return json;
    } catch (e) {
      throw new Error('입력하신 검색어로 데이터를 가지오지 못했습니다.');
    }
  },
};

export default APIManger;
