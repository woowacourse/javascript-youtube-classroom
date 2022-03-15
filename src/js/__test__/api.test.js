import { stringQuery } from "../api";

describe('api 테스트', () => {
    const props = {
        keyword: '코카콜라',
        pageToken: '',
        url: YOUTUBE_URL,
        options: {
          part: 'snippet',
          maxResults: 10,
          order: 'relevance',
          type: 'video'
        }
      };

    it('전달된 매개변수로 올바른 Query string을 생성한다.', async () => {
        const query = stringQuery(props)
        expect(query).toStrictEqual('https://competent-haibt-c82cf4.netlify.app/youtube/v3/search?q=코카콜라&part=snippet&maxResults=10&order=relevance&type=video&')
    });
})
