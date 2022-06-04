const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // 요소를 연결하는데 document 말고도 여러가지 방법이 존재한다. // mdn에서 따오면 됨
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const CANVAS_SIZE = 700;
const INITIAL_COLOR = "#2c2c2c";

// init value
let painting = false;
let filling = false;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath(); // 다음 begin 되기 전까지 하나의 도형이다. // ㅋㅋ close가 된다고 그 지점이 begin지점이 되는 것은 아니다.
    ctx.moveTo(x, y); // 계속해서 시작지점을 정해주고 있다.
  } else {
    ctx.lineTo(x, y);
    ctx.stroke(); // 선 그리기 // 애초에 눈에 보이게 하는 것이 목적이 아니었을 수도 있기때문에 존재하는 함수이다.
  }
}

function onMouseDown(event) {
  painting = true;
}

function onMouseUp(event) {
  stopPainting();
}

function handleColorClik(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); // 마우스가 움직일 경우
  canvas.addEventListener("mousedown", onMouseDown); // 눌렀을 경우
  canvas.addEventListener("mouseup", stopPainting); // 땟을 경우
  canvas.addEventListener("mouseleave", stopPainting); // element 밖으로 이동한 경우
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClik)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

/*
1. 통상적인 로직
-> html 문서중 연결시키고픈 곳에 document 따서 리스너와 연결
-> 리스너는 이벤트 발생시킬 경우 실행시킬 콜백함수에 연결
-> 콜백함수를 잘 꾸며서 사용하자

마우스가 움직일 경우 onMouseMove가 실행된다. 이 때 매개변수로 통념상 event를 적어주고 브라우저로부터 받은 event객체 안에 많은 정보들이 들어있다.
Listener를 이용해서 event 를 발생시킨뒤 event를 다루는 함수를 만들면 일반적인 로직이다.
*/
