const youtubeSearchAPI = {
  REDIRECT_SERVER_HOST:
    'https://62284284eb9d78b6d6eaa4d6--stupefied-mirzakhani-6cb1fd.netlify.app/', //"https://jsminyoutube.netlify.app",
  async searchByPage(value, pageToken) {
    const url = new URL('dummy/youtube/v3/search', this.REDIRECT_SERVER_HOST);
    const parameter = new URLSearchParams({
      part: 'snippet',
      maxResults: 10,
      pageToken: pageToken || '',
      q: value,
      type: 'video',
    });
    url.search = parameter.toString();
    const response = await fetch(url, { method: 'GET' });

    if (response.status === 403) {
      const error = new Error('오늘의 할당량을 모두 사용했습니다😅');
      error.name = '403 Error';
      throw error;
    }
    return await response.json();
  },
};

export default youtubeSearchAPI;
