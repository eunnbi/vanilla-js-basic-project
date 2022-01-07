const icons = ["✊", "✌", "🖐"];
const icon = document.querySelector(".icon");
const rockBtn = document.querySelector(".rock");
const scissorBtn = document.querySelector(".scissor");
const paperBtn = document.querySelector(".paper");
const restartBtn = document.querySelector(".restart");

const score = document.querySelector(".score__content");


const CLASS_ROCK = "rock";
const CLASS_SCISSOR = "scissor";
const CLASS_PAPER = "paper";
const HIDDEN_CLASSNAME = "hidden";

let current = 0;
let timerId;
let userScore = 0;
let compScore = 0;

window.addEventListener("DOMContentLoaded", function(){
    updateScore(userScore, compScore);
})

function chooseIcon(){
    icon.innerText = icons[current];
    current = (current + 1) % 3;
}

function showIcon(){ 
    rockBtn.classList.remove(HIDDEN_CLASSNAME);
    scissorBtn.classList.remove(HIDDEN_CLASSNAME);
    paperBtn.classList.remove(HIDDEN_CLASSNAME);
    restartBtn.classList.add(HIDDEN_CLASSNAME);
    chooseIcon();
    timerId = setInterval(chooseIcon, 100);
}

function stop(e){
    clearInterval(timerId);
    IsUserWins(icon.innerText, e.target.className);
    restartBtn.classList.remove(HIDDEN_CLASSNAME);
    rockBtn.classList.add(HIDDEN_CLASSNAME);
    scissorBtn.classList.add(HIDDEN_CLASSNAME);
    paperBtn.classList.add(HIDDEN_CLASSNAME);
}

function IsUserWins (program, user){
    if (program == "✊"){
        if (user == CLASS_ROCK){
            alert("Tie");
        }
        else if (user == CLASS_SCISSOR){
            compScore++;
            alert("Lose :(");
        }
        else{
            increaseUserScore();
            alert("Win :)");
        }
    }
    else if (program == "✌"){
        if (user == CLASS_ROCK){
            userScore++;
            alert("Win :)");
        }
        else if (user == CLASS_SCISSOR){
            alert("Tie");
        }
        else{
            compScore++;
            alert("Lose :(");
        }
    }
    else{
        if (user == CLASS_ROCK){
            compScore++;
            alert("Lose :(");
        }
        else if (user == CLASS_SCISSOR){
            userScore++;
            alert("Win :)");
        }
        else{
            alert("Tie");
        }
    }
    updateScore(userScore, compScore);
}

function updateScore(userScore, compScore){
    score.innerText = `${userScore} : ${compScore}`;
}

rockBtn.addEventListener('click', stop);
scissorBtn.addEventListener('click', stop);
paperBtn.addEventListener('click', stop);
restartBtn.addEventListener("click", showIcon);

showIcon();