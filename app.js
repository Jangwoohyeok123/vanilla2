const canvas = document.getElementById("jsCanvas");

let painting = false;

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
}

function onMouseDown(event) {
  painting = true;
}

function onMouseUp(event) {
  stopPainting();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); // 마우스가 움직일 경우
  canvas.addEventListener("mousedown", onMouseDown); // 눌렀을 경우
  canvas.addEventListener("mouseup", onMouseUp); // 땟을 경우
  canvas.addEventListener("mouseleave", stopPainting); // element 밖으로 이동한 경우
}

/*
1. 통상적인 로직
-> html 문서중 연결시키고픈 곳에 document 따서 리스너와 연결
-> 리스너는 이벤트 발생시킬 경우 실행시킬 콜백함수에 연결
-> 콜백함수를 잘 꾸며서 사용하자


마우스가 움직일 경우 onMouseMove가 실행된다. 이 때 매개변수로 통념상 event를 적어주고 브라우저로부터 받은 event객체 안에 많은 정보들이 들어있다.
Listener를 이용해서 event 를 발생시킨뒤 event를 다루는 함수를 만들면 일반적인 로직이다.


*/
