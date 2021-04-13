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

- [x] 검색 모달에서 검색어를 바탕으로 영상을 검색하여 그 결과를 보여준다.
  - 검색 시 엔터키를 눌렀을 때와 마우스로 검색 버튼을 눌렀을 때 검색 동작이 이루어진다.
  - 데이터를 불러오는 중일 때, 현재 데이터를 불러오는 중임을 UI로 보여준다.
- [x] 검색 모달에 다시 접근했을 때 이전에 검색한 결과를 보여준다.
- [x] 검색 결과가 없는 경우 결과 없음 이미지를 추가하여, 사용자에게 메시지를 보여준다.
- [x] 최초 검색결과는 10개까지만 보여준다. 더 많은 데이터는 스크롤을 내릴 때 추가로 불러온다.
  - 검색 결과 화면에서 유저가 브라우저 스크롤 바를 끝까지 이동시켰을 경우에 새 데이터를 불러온다.
- [x] 검색한 영상들 중 특정 영상 데이터를 저장 버튼을 눌러 저장할 수 있다.
  - 이미 저장된 경우는 저장 버튼이 보이지 않는다.
- [x] 최근 검색한 3가지 검색 키워드를 볼 수 있다.

- 🔧 예외
  - [x] 저장 가능한 최대 동영상의 갯수는 100개여야한다.
  - [x] 빈 검색어를 입력할 경우 검색이 이루어지지 않는다.
  - [x] 이전과 같은 검색어를 입력할 경우 검색이 이루어지지 않는다.

<br>

### 🎯🎯 step2 강의실 관리 기능

- [x] 볼 영상에 저장된 영상이 없으면 이를 화면상의 이미지로 알려준다.
- [x] 이후 페이지를 방문했을 때 기본 메인 화면은 내가 **볼 영상**들의 리스트를 보여준다.
- 영상 카드의 이모지 버튼을 클릭하여 아래와 같은 상태 변경이 가능해야 한다.
  - [x] ✅ 버튼을 누르면 본 영상으로 체크된다.
  - [x] 동영상 검색 결과에서 '본' 영상에 존재하는 경우 저장 버튼을 지운다.
  - [x] 🗑️ 버튼으로 저장된 리스트에서 삭제할 수 있다.
    - 삭제 시 사용자에게 정말 삭제할 것인지 물어봅니다.
- [x] 클립 안의 버튼을 클릭시 동작 결과를 `snackbar`를 통해 보여준다.
- [x] 본 영상 버튼을 눌러 본 영상만을 필터링 할 수 있다.
  - 버튼을 클릭시, 클릭 표시로 버튼 색이 변한다.

### 🎯🎯🎯 step3 유저 경험 향상 기능

- [x] 👍 좋아요 버튼을 누른 클립만 필터링해서 보여줄 수 있다.
  - 👍 좋아요 버튼을 다시 클릭해서 해지할 수 있다.
- [x] 유튜브 영상 섬네일을 영상보다 먼저 렌더링(영상이 로드되지 않더라도 어떤 영상인지를 섬네일을 통해 파악할 수 있도록 한다)
- [x] 반응형 웹: 유저가 사용하는 디바이스의 가로 길이에 따라 검색결과의 row 당 column 갯수를 변경한다.
  - 1280px 이하: 4개
  - 960px 이하: 3개
  - 600px 이하: 2개
  - 400px 이하: 1개
- [x] 스크롤 페이징 방식을 이용해서 Lazy loading을 개선한다.

### 프로젝트 컨벤션

- 이 프로젝트는 MVC 패턴을 따른다.
- prefix
  - view 에서 render 는 요소의 내부 요소를 조작함을 의미
  - view 에서 show 는 요소의 style.display 값을 조작함을 의미
- 언더스코어(\_)는 protected의 의미를 가진다.

## ⚙️ Before Started

#### <img alt="Tip" src="https://img.shields.io/static/v1.svg?label=&message=Tip&style=flat-square&color=673ab8"> 로컬에서 서버 띄워서 손쉽게 static resources 변경 및 확인하는 방법

로컬에서 웹서버를 띄워 html, css, js 등을 실시간으로 손쉽게 테스트해 볼 수 있습니다. 이를 위해서는 우선 npm이 설치되어 있어야 합니다. 구글에 `npm install` 이란 키워드로 각자의 운영체제에 맞게끔 npm을 설치해주세요. 이후 아래의 명령어를 통해 실시간으로 웹페이지를 테스트해볼 수 있습니다.

```
npm install -g live-server
```

실행은 아래의 커맨드로 할 수 있습니다.

```
live-server 폴더명
```

<br>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/woowacourse/javascript-youtube-classroom/issues)에 등록해주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-youtube-classroom/blob/main/LICENSE) licensed.
