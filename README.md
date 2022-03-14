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

- 문자열이 주어지면 유튜브 검색 API로 10개의 영상을 받을 수 있어야 한다.
- 다음 페이지 토큰이 주어지면 다음 페이지의 10개의 영상을 받을 수 있어야 한다.
- 받은 영상들의 id를 Web Storage에 저장할 수 있어야 한다.
  - 저장 가능한 최대 동영상의 갯수는 100개이다.

### UI

- 엔터키를 눌러 검색할 수 있다.
- 검색 버튼을 클릭해 검색할 수 있다.
- 받아온 검색 결과를 화면에 보여줄 수 있어야 한다.
- 데이터를 불러오는 동안 현재 데이터를 불러오는 중임을 skeleton UI로 보여준다.
- 검색 결과가 없는 경우 결과 없음 이미지를 보여준다.
  - 검색 결과 없음 이미지는 `src/images/status/not_found.png` 경로에 있다.
- 검색 결과 화면에서 유저가 브라우저 스크롤 바를 끝까지 이동시켰을 경우, 그 다음 10개 아이템을 추가로 불러온다.
- 이미 저장된 영상이라면 저장 버튼이 보이지 않도록 한다.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-youtube-classroom/blob/main/LICENSE) licensed.
