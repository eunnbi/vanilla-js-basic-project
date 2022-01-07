const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
let currentImgIndex = 0;

slides.forEach(function(slide, index){
    slide.style.left = `${index * 100}%`;
});

nextBtn.addEventListener("click", function(){
    currentImgIndex++;
    if (currentImgIndex == slides.length - 1){
        nextBtn.classList.add("hidden");
    }
    if (currentImgIndex != 0){
        prevBtn.classList.remove("hidden");
    }
    imgSlide(currentImgIndex);
})

prevBtn.addEventListener("click", function(){
    currentImgIndex--;
    if (currentImgIndex == 0){
        prevBtn.classList.add("hidden");
    }
    if (currentImgIndex != slides.length - 1){
        nextBtn.classList.remove("hidden");
    }
    imgSlide(currentImgIndex);
})



function imgSlide(currentImgIndex){
    slides.forEach(function(slide){
        slide.style.transform = `translateX(${-currentImgIndex * 100}%)`;
    })
}