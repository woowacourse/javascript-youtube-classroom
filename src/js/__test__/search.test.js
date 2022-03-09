// - [ ] 보고싶은 영상을 검색할 수 있다.
// - [ ] 입력을 하지않고 버튼을 누른 경우
// - [ ] 입력된 제목으로 유튜브 API 데이터를 요청한다.

// - [ ] response 데이터 상태를 확인할 수 있다.

// - [ ] 200, 300번대면 정상적인 데이터 받은 것 확인한다.
// - [ ] 400, 500번대면 에러를 확인할 수 있다. 필요하면 alert나 메세지를 전달할 수 있다.

// - [ ] 데이터를 분리할 수 있다.

// - [ ] 썸네일 이미지 url, 제목, 작성자, 작성요일, id

// - [ ] API로 받은 데이터가 존재하면

// - [ ] request 수를 최적화하기 위해 적절하게 영상 수를 조절한다.

// - [ ] 저장하기 버튼을 클릭하면 해당 영상을 Web Storage에 저장한다.
// - [ ] 저장은 최대 100개까지 가능하다.

// 1. API Caller Search?
// 2. Data Parsing Parser?
// 4. Web Storage - Storage

import validator from '../utils/validator.js';
import APIManger from '../managers/APIManager.js';
import { fetchData } from '../utils/constants.js';

describe('보고 싶은 영상을 검색 했을 때', () => {
  test('입력 없이 버튼을 눌렀다면 error를 throw한다.', () => {
    const inputValue = '';
    expect(() => validator.isValidSearchInput(inputValue)).toThrowError();
  });
});
