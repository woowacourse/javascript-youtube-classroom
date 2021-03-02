<p align="middle" >
  <img width="200px;" src="./src/images/readme/laptop_with_youtube_logo.png"/>
</p>
<h2 align="middle">level1 - 나만의 유튜브 강의실</h2>
<p align="middle">자바스크립트와 외부 API를 이용해 구현 하는 나만의 유튜브 강의실</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <a href="https://github.com/daybrush/moveable/blob/master/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/daybrush/moveable.svg?style=flat-square&label=license&color=08CE5D"/>
  </a>
</p>

## 🔥 Projects!

<p align="middle">
  <img src="./src/images/readme/youtube_classroom_preview.png">
</p>

### 🎯 step1 검색 기능

- [ ] [유튜브 검색 API](https://developers.google.com/youtube/v3/getting-started?hl=ko)를 통해서, 내가 추가로 보고 싶은 영상들을 검색할 수 있다.
  - [ ] 검색 시 엔터키를 눌렀을 때와 마우스로 검색 버튼을 눌렀을 때 검색 동작이 이루어진다.
- [ ] 로딩컴포넌트: 데이터를 불러오는 중일 때, 현재 데이터를 불러오는 중임을 skeleton UI로 보여준다.
- [ ] 검색 결과가 없는 경우 결과 없음 이미지를 추가하여, 사용자에게 메시지를 보여준다.
  - [ ] 검색 결과 없음 이미지는 `src/images/status/not_found.png` 경로에 있다.
- [ ] 최초 검색결과는 10개까지만 보여준다. 더 많은 데이터는 스크롤을 내릴 때 추가로 불러온다.
  - 검색 결과 화면에서 유저가 브라우저 스크롤 바를 끝까지 이동시켰을 경우, 그다음 10개 아이템을 추가로 api요청하여 불러온다.
- [ ] 내가 검색한 영상들의 json 데이터를 `저장`할 수 있다. (실제 저장이 아닌 영상 id를 Web Storage에 저장). 단 이미 저장된 경우는 저장 버튼이 보이지 않게 한다.
- [ ] 저장 가능한 최대 동영상의 갯수는 100개이다.
- [ ] 검색 모달에 다시 접근했을 때 가장 마지막에 검색한 키워드로 검색한 결과를 보여준다.
- [ ] 최근 검색 키워드를 3개까지 화면상에 검색창 하단에 보여준다.

### 📝 기능 및 테스트 구현 목록

- [ ] 유튜브 영상 검색기능

  - [ ] API를 이용해서 영상들을 검색한다.
  - [ ] 데이터를 불러오는 중일 때 로딩 컴포넌트를 보여준다.
    1. Given: 유저가 동영상 검색 버튼을 클릭한다.
    2. When: 검색 모달에서 검색할 동영상 이름을 작성하고 검색 버튼을 누른다.
    3. Then
       - 데이터를 불러오는 중일 때 로딩 컴포넌트가 보여진다.
       - 검색 결과가 없는 경우 결과 없음 이미지와 텍스트가 보여진다.
       - 최초 동영상 검색 결과는 최대 10개까지만 보여진다.
         - 스크롤 바를 끝까지 이동한 경우 그다음 10개 아이템을 추가로 api 요청하고 보여준다.

- [ ] 영상들의 json 데이터를 Web Storage에 저장한다.
- [ ] 저장 가능한 최대 동영상의 갯수는 100개로 제한한다.
- [ ] 검색모달에서 최근에 검색한 키워드를 보여준다.
  - [ ] 최근 검색 키워드를 3개까지 검색창 하단에 보여준다.
    1. Given: 유저가 동영상 검색을 완료한다.
    2. When: 동영상 검색 버튼을 다시 클릭하고 검색 모달이 나타난다.08CE5D
    3. Then: 검색 모달에서 최근에 검색한 키워드를 3개까지 검색창 하단에 보여준다.
