// set date
const date = document.querySelector(".date");
date.innerText = new Date().getFullYear();


// show menu
const navBtn = document.querySelector(".nav-btn");
const header = document.querySelector("header");
navBtn.addEventListener("click", function(e){
    e.preventDefault();
    header.classList.toggle("show-menu");
});


// window scroll
const topBtn = document.querySelector(".top-btn");
window.addEventListener("scroll", function(){
    // fixed header
    if (window.scrollY === 0){
        header.classList.remove("fixed-header");
    }
    else{
        header.classList.add("fixed-header"); 
    }

    // show top button
    if (document.documentElement.scrollTop + document.documentElement.clientHeight == document.documentElement.scrollHeight){
        topBtn.classList.remove("hidden");
    }
    else{
        topBtn.classList.add("hidden");
    }
});



// go-to-top
topBtn.addEventListener("click", function(){
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
})


// smooth scroll
const menuLinks = document.querySelectorAll(".menu-link");
const menu = document.querySelector(".menu");
menuLinks.forEach(function(current){
    const link = current.querySelector("a");
    link.addEventListener("click", function(e){
        const className = e.currentTarget.getAttribute("href").slice(1);
        const element = document.querySelector(`.${className}`);
        const headerHeight = header.getBoundingClientRect().height;
        const menuHeight = menu.getBoundingClientRect().height;
        let position;
        if (headerHeight == menuHeight){
            position = element.offsetTop - headerHeight;
        }
        else{
            position = element.offsetTop - headerHeight + menuHeight;
        }
        if (position < 0){
            position = 0;
        }
        console.log(position);
        window.scrollTo({
            top: position,
            behavior: "smooth",
        });
        header.classList.remove("show-menu");
    })
});