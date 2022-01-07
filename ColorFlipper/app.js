const simpleColor = ["green", "red", "purple", "yellow", "blue", "gray", "rgba(133, 122, 200)", "#800000",
    "#ff00ff", "#00ff00", "#808000", "#000080", "#008080", "#00ffff", "#ffa500", "#f5f5dc"];
const colorText = document.querySelector(".color");
const colorBtn = document.querySelector(".container button");

function generateSimpleColor(){
    const index = Math.floor(Math.random()*simpleColor.length);
    const color = simpleColor[index];
    colorText.innerText = color;
    document.body.style.backgroundColor = color;
}

colorBtn.addEventListener("click", generateSimpleColor);