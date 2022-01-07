const number = document.querySelector(".number");
const resetBtn = document.querySelector(".reset");
const decreaseBtn = document.querySelector(".decrease");
const increaseBtn = document.querySelector(".increase");
let currentNum = 0;

function reset(){
    currentNum = 0;
    number.textContent = currentNum;
    setColor();
}

function increase(){
    currentNum += 1;
    number.textContent = currentNum;
    setColor();
}

function decrease(){
    currentNum -= 1;
    number.textContent = currentNum;
    setColor();
}

function setColor(){
    if (currentNum == 0){
        number.style.color = "#000";
    }
    else if (currentNum > 0){
        number.style.color = "green";
    }
    else{
        number.style.color = "red";
    }
}

resetBtn.addEventListener("click", reset);
decreaseBtn.addEventListener("click", decrease);
increaseBtn.addEventListener("click", increase);
