import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export default class SearchEngine {
  async searchKeyword(keyword) {
    const BASE_URL = `https://www.googleapis.com/youtube/v3/search?maxResults=1&key=${process.env.YOUTUBE_API_KEY}&q=${keyword}&part=snippet`;

    const response = await fetch(BASE_URL);

    if (response.ok) {
      const json = await response.json();
      return json.items;
    }

    return null;
  }
}
