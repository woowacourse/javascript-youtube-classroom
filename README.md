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


### 🎲🎲🎲 step3 테스트 기능 구현

- [ ] 저장한 영상의 '좋아요' 버튼을 클릭, "선택한 영상을 좋아요 목록에 저장했습니다" 라는 스낵바 div 3초간 보여진다.
- [ ] '좋아요 한 영상' 목록으로 이동하면, '좋아요' 버튼 안누른 영상은 목록에 보이지 않는다. 


### 🎯🎯🎯 step3 유저 경험 증가 기능

- [ ] 👍 좋아요 버튼을 누른 데이터만 필터링해서 보여줄 수 있는 메뉴를 만든다.
- [ ] 👍 좋아요 버튼을 누른 경우, 로컬에서 데이터를 변경한다.
- [ ] 👍 좋아요 버튼을 다시 클릭해서 해지할 수 있어야 한다.
- [ ] 스크롤 페이징 방식을 이용해서 Lazy loading을 개선한다.
- [ ] 반응형 웹: 유저가 사용하는 디바이스의 가로 길이에 따라 검색결과의 row 당 column 갯수를 변경한다.
  - youtubeCard.css 파일에 있는 .video-wrapper의 css 속성 중 grid-template-columns의 속성을 auto-fill에서 아래의 요구사항에 맞게 변경한다.
  - 1280px 이하: 4개
  - 960px 이하: 3개
  - 600px 이하: 2개
  - 400px 이하: 1개

<br>

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
