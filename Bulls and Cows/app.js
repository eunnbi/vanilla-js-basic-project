const compNums = document.querySelectorAll(".computer-number");
const userInputs = document.querySelector(".user-inputs tbody");
let compNumbers = [];
let userNumbers = [];
let strike;
let ball;
const cnt = 3;

function setCompNumber(){
    const temp = [];
    while(true){
        const number = getRandomNumber(1, 10);
        temp.push(number);
        compNumbers = temp.reduce(function(values, item){
            if (!values.includes(item)){
                values.push(item);
            }
            return values;
        }, []);
        if (compNumbers.length === cnt) {break;}
    }
}


function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max- min)) + min;
}

const form = document.querySelector(".user-form");
const alert = document.querySelector(".alert__text");
const success = document.querySelector(".result-success");
form.addEventListener("submit", function(e){
    e.preventDefault();
    alert.className = "alert";
    alert.innerText = "";
    const input = form.querySelector("input");
    const value = input.value;
    // 숫자가 아닌 값이 입력된 경우
    if (isNaN(parseInt(value, 10)) | isNaN(Number(value))){
        alert.innerText = "Please Enter Number";
        alert.classList.add("warning");
    }
    // 3자리 이상의 숫자가 입력된 경우
    else if (value.length !== cnt){
        alert.innerText = "Please Enter Three-Digit Number";
        alert.classList.add("warning");
    }
    else{
        const temp = [];
        for (let i = 0 ; i < cnt; i++){
            temp.push(value.slice(i, i + 1));
        }
        userNumbers = temp.reduce(function(values, item){
            if (!values.includes(Number(item))){
                values.push(Number(item));
            }
            return values;
        }, []);
        // 숫자가 중복으로 입력된 경우
        if (userNumbers.length !== cnt){
            alert.innerText = "Please Enter Number Without Duplicate.";
            alert.classList.add("warning");
        }
        // 제대로 입력된 경우
        else{
            strike = 0;
            ball = 0;
            // 사용자 숫자와 컴퓨터 숫자 비교
            compNumbers.forEach(function(compNumber, compIndex){
                userNumbers.forEach(function(userNumber, userIndex){
                    if (userNumber === compNumber && userIndex === compIndex){
                        strike++;
                    }
                    else if (userNumber === compNumber && userIndex !== compIndex){
                        ball++;
                    }
                })
            })
            alert.innerText = `${strike} Strike   ${ball} Ball`;
            alert.classList.add("success");
            updateUserInputs(value, strike, ball);
            if (strike === 3){
                showAnswer();
                setTimeout(function(){
                    success.classList.remove("hidden");    
                }, 2000); 
            }
        }
    }
    input.value = "";
})

function updateUserInputs(input, strike, ball){
    row = userInputs.insertRow();
    numberCell = row.insertCell(0);
    resultCell = row.insertCell(1);
    numberCell.innerText = `${input}`;
    numberCell.classList.add("number");
    resultCell.innerText = `${strike} Strike ${ball} Ball`;
    resultCell.classList.add("result");
    if (strike === 3){
        numberCell.classList.add("correct");
        resultCell.classList.add("correct");
    }
}

function showAnswer(){
    compNums.forEach(function(compNum, index){
        compNum.classList.add("show-answer");
        setTimeout(function(){
            compNum.innerText = compNumbers[index];    
        }, 500);
    })
}
setCompNumber();