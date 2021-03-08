class SavedController {
  // 페이지 접속하면 저장된 영상들 불러오는 메서드
  // 볼 영상 필터링 메서드, 본 영상 필터링 메서드(파라미터 받아서)
  // 볼 영상 -> 본 영상 toggle 메서드
  //// e.target의 info.url 을 가져옴
  //// 이전에 DB에서 불러온 비디오 목록 변수의 해당 info.url의 info의 watched key를 토클해서 setItem
  //// 화면은 다시 리랜더링하지 말고, 그냥, 클래스 추가해주는 방식으로 UI 달라지거 보여줌
  //// 이후 새로고침해도 위에서 그때그때 setItem 해줘서 차이 없음 - 모든 상태 변화를 이런식으로 처리.
  //// 결론 : 새로고침할때만 getItem!. 변화할때 그대끄때 setItem. 바뀌는건 변수만 가지고. 해도되나? - 질문하기
  //// 일단은 전체가 바뀌는 거는 getItem 해주고, info 버튼 뷰 처리 해주는거같은건. 새로고침 일어나면 안되니까 class 이용한 방식으로 적절히 섞어쓰기
  // 영상 삭제 메서드
  // 볼영상 handler - true
  // 본영상 handler
  // 비디오 video-infos button handler들 (이벤트 위임으로 구현하기!!)
}

export default SavedController;
