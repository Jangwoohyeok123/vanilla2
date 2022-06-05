// body - canvas tag
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //canvas에 2d 모형이 들어가 있는 모음집

// 변수
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// eventListener
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); // 마우스가 움직일 경우
  canvas.addEventListener("mousedown", onMouseDown); // 눌렀을 경우
  canvas.addEventListener("mouseup", stopPainting); // 땟을 경우
  canvas.addEventListener("mouseleave", stopPainting); // element 밖으로 이동한 경우
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

// callback 함수
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y); // 계속해서 시작지점을 정해주고 있다.
  } else {
    ctx.lineTo(x, y);
    ctx.stroke(); // 선 그리기 // 애초에 눈에 보이게 하는 것이 목적이 아니었을 수도 있기때문에 존재하는 함수이다.
  }
}

function onMouseDown(event) {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function handleColorClik(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

// body - div class = "controls" - div class = "controls_range"
const range = document.getElementById("jsRange");

// init value
ctx.lineWidth = 2.5; // 초기 선굵기

// eventListenr
if (range) {
  range.addEventListener("input", handleRangeChange);
}

// callback canvas 줄 사이즈 바꿈
function handleRangeChange(event) {
  const size = event.target.value; // event target 속성은 이벤트가 발생한 대상 객체를 가리킨다.
  ctx.lineWidth = size; // canvas 쪽 line 크기를 바꿔줌
}

// body - div class = "controls" - div class = "controls_btns" - <button tag> Fill
const mode = document.getElementById("jsMode");

// init value
let painting = false;
let filling = false;

// eventListener
if (mode) {
  mode.addEventListener("click", handleModeClick);
}

// callback
function handleModeClick() {
  if (filling === true) {
    // 배경을 칠하기
    filling = false;
    mode.innerText = "Fill";
  } else {
    // 선 그리기
    filling = true;
    mode.innerText = "Paint";
  }
}

// body - div class = "controls" - div class = "controls_btns" - <button tag> save
const saveBtn = document.getElementById("jsSave");

// eventListener
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

// callback
function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

const colors = document.getElementsByClassName("jsColor");

const INITIAL_COLOR = "#2c2c2c";

// init value

ctx.strokeStyle = INITIAL_COLOR;

function startPainting() {
  painting = true;
}

function onMouseUp(event) {
  stopPainting();
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClik)
);

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
