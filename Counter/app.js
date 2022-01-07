const number = document.querySelector(".number");
const btns = document.querySelectorAll(".btn");
let currentNum = 0;


btns.forEach(function (btn){
    btn.addEventListener("click", function (e){
        const name = e.target.classList;
        if (name.contains("decrease")){
            currentNum--;
        }
        else if (name.contains("increase")){
            currentNum++;
        }
        else{
            currentNum = 0;
        }
        number.innerText = currentNum;
        setColor();
    });
});


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