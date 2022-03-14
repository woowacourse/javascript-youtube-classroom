
import { fetchData, stringQuery } from "../api";
import { ERROR_MESSAGE } from "../constants";


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

   
    // global.fetch = jest.fn(() =>
    //     Promise.resolve({
    //         json: () => Promise.resolve(props),
    //         // json: ()=> Promise.resolve(fetch(stringQuery(props))),
    //     })
    // );

    // beforeEach(() => {
    //     fetch.mockClear();
    // });

    it('전달된 매개변수로 올바른 Query string을 생성한다.', async () => {
        const query = stringQuery(props)
        expect(query).toStrictEqual('https://competent-haibt-c82cf4.netlify.app/youtube/v3/search?q=코카콜라&part=snippet&maxResults=10&order=relevance&type=video&')
    });

    
    // it('api 요청 성공시, 올바른 JSON 데이터를 반환한다.', async () => {
    //     // const response = await fetchData(props)
    //     // console.log(response)
    //     // request()

    //     const mock = jest.fn();

    //     let result = mock('foo');

    //     expect(result).toBeUndefined();
    //     expect(mock).toHaveBeenCalled();
    //     expect(mock).toHaveBeenCalledTimes(1);
    //     expect(mock).toHaveBeenCalledWith('foo');
        
    //     // global.fetch = jest.fn(() =>
    //     //     Promise.resolve({
    //     //         json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
    //     //     })
    //     // );

    //     const test = await fetchData(props)
    //     console.log(test)
    // });
})

