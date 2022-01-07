const guideText = document.querySelector(".guide__text");
const startBtn = document.querySelector(".start-btn");
const gameOver = document.querySelector(".game-over");
const boxContainer = document.querySelector(".box-container");

let level = 2;
// box 구별 id
let id = new Date().getTime();
let minId = id;
const boxArray = [
    [id, ++id, ++id],
    [++id, ++id, ++id],
    [++id, ++id, ++id]
];
const cnt = 3; // row, column 개수
const elements = [id]; // answer
let clickedBoxNum = 0;

const HIDDEN_CLASSNAME = "hidden";

startBtn.addEventListener("click", function(){
    startBtn.classList.add(HIDDEN_CLASSNAME);
    showHowToClick(level);
})

function setBoxArray(){
    for (let i = 0; i < cnt; i++){
        for (let j = 0; j < cnt; j++){
            const box = document.createElement("div");
            box.classList.add("box");
            box.dataset.id = boxArray[i][j];
            box.addEventListener("click", clickBox);
            boxContainer.appendChild(box);
        }
    }
}

function showHowToClick(level){
    // update elements array
    const randomId = getRandomNumber(minId, id + 1);
    elements.push(randomId);

    // elements 배열에 있는 컬러 순서대로 바꾸기
    const boxs = document.querySelectorAll(".box");
    let elementNum = level;
    let seconds = 0;
    for (let i = 0; i < elements.length; i++){
        seconds = i * 1000;
        boxs.forEach(function(box){
            if (Number(box.dataset.id) === elements[i]){
                setTimeout(function(){
                    changeColor(box);
                    setGuideText(`${elementNum} elements`);
                    elementNum--;
                }, seconds);
            }
        })
    }
    setTimeout(setGuideText, seconds, "YOUR TURN!");
}


function setGuideText(text){
    guideText.innerText = text;
}

function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function clickBox(e){
    clickedBoxNum++;
    changeColor(e.target);
    checkCorrectBox(e.target);
}

function changeColor(box){
    box.style.backgroundColor = "#999";
    setTimeout(function(){
        box.style.backgroundColor = "transparent";
    }, 300);
}

// elements array 값과 box의 id 비교
function checkCorrectBox(box){
    const boxId = Number(box.dataset.id);
    // game over
    if (boxId !== elements[clickedBoxNum - 1]){
        setGuideText("GAME OVER");
        gameOver.classList.remove(HIDDEN_CLASSNAME);
    }
    // 전부 다 맞음
    else if (boxId === elements[clickedBoxNum - 1] && elements.length === clickedBoxNum){
        const boxs = document.querySelectorAll(".box");
        boxs.forEach(function(box){
            changeColor(box);
        })
        setTimeout(showHowToClick, 1000, ++level);
        clickedBoxNum = 0;
    }
}
setBoxArray();