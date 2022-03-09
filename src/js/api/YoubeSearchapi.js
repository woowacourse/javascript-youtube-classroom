const youtubeSearchAPI = {
  REDIRECT_SERVER_HOST: "https://jsminyoutube.netlify.app",
  async searchByPage(value, pageToken) {
    try {
      const url = new URL(
        "/dummy/youtube/v3/search",
        this.REDIRECT_SERVER_HOST
      );
      const parameter = new URLSearchParams({
        part: "snippet",
        maxResults: 2,
        pageToken: pageToken || "",
        q: value,
        type: "video",
      });
      url.search = parameter.toString();
      const response = await fetch(url, { method: "GET" });
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.error.message);
      }
      return body;
    } catch (err) {
      console.log(err);
    }
  },
};

export default youtubeSearchAPI;
