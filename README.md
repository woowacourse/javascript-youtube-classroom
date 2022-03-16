<p align="middle" >
  <img width="200px;" src="./images/laptop_with_youtube_logo.png"/>
</p>
<h2 align="middle">level1 - 나만의 유튜브 강의실</h2>
<p align="middle">자바스크립트와 외부 API를 이용해 구현 하는 나만의 유튜브 강의실</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

---

## 1단계

### 기능 구현

step1

- 문자열이 주어지면 유튜브 검색 API로 10개의 영상을 받을 수 있어야 한다.
- 다음 페이지 토큰이 주어지면 다음 페이지의 10개의 영상을 받을 수 있어야 한다.
- 받은 영상들의 id를 Web Storage에 저장할 수 있어야 한다.
  - 저장 가능한 최대 동영상의 갯수는 100개이다.

step2

- 저장된 영상 정보를 저장한다. (videoId, title, thumbnailUrl, channelTitle, publishTime, watched)
- 영상 카드의 감상 기록(watched)를 변경할 수 있다. (watched)
- 영상 카드를 로컬 스토리지의 저장된 리스트에서 삭제할 수 있다.

### UI

step1

- 엔터키를 눌러 검색할 수 있다.
- 검색 버튼을 클릭해 검색할 수 있다.
- 받아온 검색 결과를 화면에 보여줄 수 있어야 한다.
- 데이터를 불러오는 동안 현재 데이터를 불러오는 중임을 skeleton UI로 보여준다.
- 검색 결과가 없는 경우 결과 없음 이미지를 보여준다.
  - 검색 결과 없음 이미지는 `src/images/status/not_found.png` 경로에 있다.
- 검색 결과 화면에서 유저가 브라우저 스크롤 바를 끝까지 이동시켰을 경우, 그 다음 10개 아이템을 추가로 불러온다.
- 이미 저장된 영상이라면 저장 버튼이 보이지 않도록 한다.

step2

- 가장 처음에는 저장된 영상이 없으므로, 비어있다는 것을 사용자에게 알려주는 상태를 보여준다.
- 이후 페이지를 방문했을 때 기본 메인 화면은 내가 볼 영상들의 리스트를 보여준다.
- 영상 카드의 이모지 버튼을 클릭하여 아래와 같은 상태 변경이 가능해야 한다.
  - ✅ 본 영상으로 체크
  - 🗑️ 버튼으로 저장된 리스트에서 삭제할 수 있다. (삭제 시 사용자에게 정말 삭제할 것인지 물어봅니다.)
- 본 영상, 볼 영상 버튼을 눌러 필터링 할 수 있다.
- 반응형 웹: 유저가 사용하는 디바이스의 가로 길이에 따라 검색결과의 row 당 column 갯수를 변경한다.
  - 1280px 이상: 4개
  - 960px이상~1280px 미만: 3개
  - 600px이상~960px 미만: 2개
  - 600px 미만: 1개

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-youtube-classroom/blob/main/LICENSE) licensed.
