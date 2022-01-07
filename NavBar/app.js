const navBtn = document.querySelector(".nav-btn");
const links = document.querySelector(".links");

navBtn.addEventListener("click", function(){
    links.classList.toggle("show-links");
});