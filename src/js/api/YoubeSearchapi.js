const youtubeSearchAPI = {
  REDIRECT_SERVER_HOST:
    "https://62284284eb9d78b6d6eaa4d6--stupefied-mirzakhani-6cb1fd.netlify.app/", //"https://jsminyoutube.netlify.app",
  async searchByPage(value, pageToken) {
    try {
      const url = new URL("youtube/v3/search", this.REDIRECT_SERVER_HOST);
      const parameter = new URLSearchParams({
        part: "snippet",
        maxResults: 10,
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
