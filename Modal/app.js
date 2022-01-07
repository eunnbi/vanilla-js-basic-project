const openBtn = document.querySelector(".open-btn");
const closeBtn = document.querySelector(".close-btn");
const modalOverLay = document.querySelector(".modal-overlay");

openBtn.addEventListener("click", function(){
    modalOverLay.classList.add("show-modal-overlay");
});

closeBtn.addEventListener("click", function(){
    modalOverLay.classList.remove("show-modal-overlay");
});