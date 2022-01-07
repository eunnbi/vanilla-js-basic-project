let level = 1;  // level
let row = 2;    // the number of row of array
let cnt = row;
let colors; // color 2D array
let time = 15;   // seconds
let timerId;
let colorWeight = 40;
const main = document.querySelector("main");
const timeGuide = document.querySelector(".guide__time");
const levelGuide = document.querySelector(".guide__level");
const failure = document.querySelector(".fail");
const HIDDEN_CLASSNAME = "hidden";
const ANSWER_CLASSNAME = "answer";

// countdown 시간 초기화 (레벨에 따라 다르게)
function initTime(){
    clearInterval(timerId);
    if (level >= 1 && level <= 10){
        time = 15;
    }
    else if (level >= 11 && level <= 20){
        time = 13;
    }
    else if (level  >= 21 && level <= 30){
        time = 11;
    }
    else if (level >= 41 && level <= 60){
        time = 9;
    }
    else if (level >= 61 && level <= 90){
        time = 7;
    }
    else if (level >= 91){
        time = 5;
    }
}

// countdown 시간이 1초마다 줄어들고 화면에 표시
function updateTime(){
    timeGuide.innerText = `${time}sec`;
    time--;
    timerId = setInterval(function(){
        timeGuide.innerText = `${time}sec`;
        time--;
        // 시간 초과하여 실패한 경우
        if (time < 0){
            clearInterval(timerId);
            failure.classList.remove(HIDDEN_CLASSNAME);
        }
    }, 1000);
}

// 레벨을 화면에 표시
function setLevel(level){
    levelGuide.innerText = `Lv.${level}`;
}

function updateColorWeight(){
    if (colorWeight > 10){
        colorWeight = colorWeight - 8;
    }
}

// 랜덤 컬러 (메인 컬러, 정답 컬러) 생성
function getRandomColor(){
    const num1 = getRandomNumber(80, 206);
    const num2 = getRandomNumber(80, 206);
    const num3 = getRandomNumber(80, 206);
    return {
        mainColor: `rgb(${num1}, ${num2}, ${num3})`,
        differentColor: `rgb(${num1 + colorWeight}, ${num2 + colorWeight}, ${num3 + colorWeight})`,
    };
}

function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

// colors 2차원 배열 생성
function createArray(){
    colors = new Array(row);
    for (let i = 0; i < colors.length; i++){
        colors[i] = new Array(row);
    }
}

// colors 2차원 배열에 값(색상 및 정답 여부) 넣기
// 정답 색상은 무작위로 행과 열 인덱스를 구해 그 자리에 넣기
function setArray(){
    const color = getRandomColor();
    const rowIndex = getRandomNumber(0, row);
    const columnIndex = getRandomNumber(0, row);
    for (let i = 0 ; i < row; i++){
        for (let j = 0; j < row; j++){
            colors[i][j] = {
                color: color.mainColor,
                answer: false,
            }
        }
    }
    colors[rowIndex][columnIndex] = {
        color: color.differentColor,
        answer: true,
    }
}

// colors 2차원 배열 값을 화면에 표시
// 배경색 및 이벤트 리스너
function createGrid(){
    main.style.gridTemplateColumns = `repeat(${row}, 1fr)`;
    for (let i = 0 ; i < row; i++){
        for (let j = 0; j < row; j++){
            const box = document.createElement("div");
            box.style.backgroundColor = colors[i][j].color;
            box.classList.add("box");
            // 정답 요소에 클래스 추가
            if (colors[i][j].answer){              
                box.classList.add(ANSWER_CLASSNAME);
            }
            box.addEventListener("click", clickBox);
            main.appendChild(box);
        }
    }
}

// 박스를 클릭하는 이벤트 발생하는 반응하는 함수
function clickBox(e){
    // 정답 요소를 클릭했을 경우
    if (e.target.classList.contains(ANSWER_CLASSNAME)){
        cnt--;
        if (cnt === 0){
            row++;
            cnt = row;
            updateColorWeight();
        }
        main.innerHTML = "";
        createArray();
        setArray();
        createGrid();
        initTime();
        updateTime();
        setLevel(++level);
    }
    // 정답이 아닌 요소를 클릭했을 경우 실패
    else{
        failure.classList.remove(HIDDEN_CLASSNAME);
        clearInterval(timerId);
    }
} 


createArray();
setArray();
createGrid();
initTime();
updateTime();
setLevel(level);
