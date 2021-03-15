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

- [x] [유튜브 검색 API](https://developers.google.com/youtube/v3/getting-started?hl=ko)를 통해서, 내가 추가로 보고 싶은 영상들을 검색할 수 있다.
  - [x] 검색 시 엔터키를 눌렀을 때와 마우스로 검색 버튼을 눌렀을 때 검색 동작이 이루어진다.
- [x] 로딩컴포넌트: 데이터를 불러오는 중일 때, 현재 데이터를 불러오는 중임을 skeleton UI로 보여준다.
- [x] 검색 결과가 없는 경우 결과 없음 이미지를 추가하여, 사용자에게 메시지를 보여준다.
  - [x] 검색 결과 없음 이미지는 `src/images/status/not_found.png` 경로에 있다.
- [x] 최초 검색결과는 10개까지만 보여준다. 더 많은 데이터는 스크롤을 내릴 때 추가로 불러온다.
  - [x] 검색 결과 화면에서 유저가 브라우저 스크롤 바를 끝까지 이동시켰을 경우, 그다음 10개 아이템을 추가로 api요청하여 불러온다.
- [x] 내가 검색한 영상들의 json 데이터를 `저장`할 수 있다. (실제 저장이 아닌 영상 id를 Web Storage에 저장). 단 이미 저장된 경우는 저장 버튼이 보이지 않게 한다.
- [x] 저장 가능한 최대 동영상의 갯수는 100개이다.
- [x] 검색 모달에 다시 접근했을 때 가장 마지막에 검색한 키워드로 검색한 결과를 보여준다.
- [x] 최근 검색 키워드를 3개까지 화면상에 검색창 하단에 보여준다.

### step1 유즈케이스

1. 유투브 검색을 선택한다. [x]
2. 유투브 검색창에 보고싶은 영상을 입력한다. [x]
3. 유투브 api를 통해서 결과를 가져온다 => 영상을 가져와야 함(영상, 제작자, 제목, 날짜)

   - 3.1. 결과가 없을 경우 없다는 이미지를 보여준다. [x]
   - 3.2. 결과가 있을 경우, 10개까지만 보여준다. + 스크롤을 내릴때 추가로 가져온다.[x]
   - 3.3. skeleton을 UI 구현 [x]

4. 검색 결과에서 맘에 드는 영상을 저장할 수 있다.

   - 4.1. 저장을 하면 localStorage에 videoItem을 저장한다. [x]
   - 4.2. 저장한 영상은 저장 버튼을 숨긴다. [x]
   - 4.3. 저장은 최대 100개까지 할 수 있다. [x]
   - 4.4. 저장한 영상의 개수를 보여준다. [x]

5. 다시 검색하기를 누르면, 마지막에 검색한 키워드로 검색한 결과를 보여준다.

   - 프로그램을 재시작하면 reset해준다. [x]
   - 검색 결과를 초기 10개만 보여준다. [x]

6. 최근 검색어를 최대 3개까지 보여준다.

   - 6.1. 방금 검색한 단어도 바로 보여준다. [x]
   - 6.2. 프로그램을 재시작해도, 최근 검색어의 기록은 남아있다. [x]

### 🎯🎯 step2 강의실 관리 기능

- [x] 가장 처음에는 저장된 영상이 없음으로, 비어있다는 것을 사용자에게 알려주는 상태를 보여준다.
- [x] 이후 페이지를 방문했을 때 기본 메인 화면은 내가 **볼 영상**들의 리스트를 보여준다.
- [x] 영상 카드의 이모지 버튼을 클릭하여 아래와 같은 상태 변경이 가능해야 한다.
  - [x] ✅ 본 영상으로 체크
  - [x] 🗑️ 버튼으로 저장된 리스트에서 삭제할 수 있습니다. (삭제 시 사용자에게 정말 삭제할 것인지 물어봅니다.)
- [x] 사용자가 버튼을 클릭했을 때 해당 행위가 정상적으로 동작하거나, 실패하였음을 `snackbar`를 통해 보여준다.
- [x] 본 영상, 볼 영상 버튼을 눌러 필터링 할 수 있다.

### step2 유즈케이스

1. 영상을 저장하지 않은 사용자는, '볼 영상'과 '본 영상'의 목록이 비어있음을 확인한다. [x]
2. 사용자는 검색 결과 영상을 저장할 수 있다. [x]

   - 저장한 영상은 '볼 영상' 목록에 추가된다. [x]
   - 저장을 성공하거나 실패할 때, snackbar로 사용자에게 알린다. [x]

3. 사용자는 '볼 영상'에서 각 영상의 체크 버튼을 선택할 수 있다.

   - 영상이 '본 영상' 목록으로 이동한다. [x]
   - 사용자에게 영상을 봤음을 snackbar로 알린다. [x]
   - '본 영상'에서의 체크 버튼은 opacity가 항상 1이다. [x]

4. 사용자는 '본 영상'에서 각 영상의 체크 버튼을 선택할 수 있다.

   - 영상이 '볼 영상' 목록으로 이동한다. [x]
   - 사용자에게 '볼 영상으로 이동합니다.'라는 알림을 snackbar로 보여준다. [x]

5. 사용자는 저장된 영상의 삭제 버튼(휴지통 모양)을 선택할 수 있다.

   - 영상이 저장 목록에서 삭제됨을 snackbar로 알린다. [x]
   - 영상이 목록에서 삭제된다. [x]

### 🎯🎯🎯 step3 유저 경험 증가 기능

- [ ] 👍 좋아요 버튼을 누른 데이터만 필터링해서 보여줄 수 있는 메뉴를 만든다.
  - [ ] 👍 좋아요 버튼을 누른 경우, 로컬에서 데이터를 변경해야한다.
  - [ ] 👍 좋아요 버튼을 다시 클릭해서 해지할 수 있다.
- [ ] 스크롤 페이징 방식을 이용해서 Lazy loading을 개선한다.
- [ ] 반응형 웹: 유저가 사용하는 디바이스의 가로 길이에 따라 검색 결과의 row 당 column 개수를 변경한다.
  - youtubeCard.css 파일에 있는 .video-wrapper의 css 속성 중 grid-template-columns의 auto-fill 속성에서 아래의 요구사항에 맞게 변경한다.
  - 1280px 이하 : 4개
  - 960px 이하: 3개
  - 600px 이하: 2개
  - 400px 이하: 1개

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-youtube-classroom/blob/main/LICENSE) licensed.
