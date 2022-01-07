const colorText = document.querySelector(".color");
const colorBtn = document.querySelector(".container button");
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];

function generateHexColor(){
    let colorHexNum = Math.floor(Math.random()*16777216).toString(16);
    if (colorHexNum.length < 6){
        const diff = 6 - colorHexNum.length;
        for (let i = 0; i < diff; i++){
            colorHexNum = "0" + colorHexNum;
        }
    }
    const colorCode = "#" + colorHexNum;
    colorText.innerText = colorCode;
    document.body.style.backgroundColor = colorCode;
}

function generateHexColor2(){
    let colorCode = "#";
    for (let i = 0; i < 6; i++){
        const index = Math.floor(Math.random() * hex.length);
        colorCode += hex[index].toString();
    }
    colorText.innerText = colorCode;
    document.body.style.backgroundColor = colorCode;
}

colorBtn.addEventListener("click", generateHexColor2);