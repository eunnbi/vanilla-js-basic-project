const navBtn = document.querySelector(".nav-btn");
const closeBtn = document.querySelector(".close-btn");
const sideBar = document.querySelector(".side-bar");


navBtn.addEventListener("click", function(){
    sideBar.classList.remove("side-bar");
    sideBar.classList.remove("close-side-bar");
    sideBar.classList.add("show-side-bar");
});


closeBtn.addEventListener("click", function(){
    sideBar.classList.remove("show-side-bar");
    sideBar.classList.add("close-side-bar");
});
