const switchBtn = document.querySelector(".switch-btn");
const video = document.querySelector("video");

switchBtn.addEventListener("click", function(){
    if (switchBtn.classList.contains("slide")){
        switchBtn.classList.remove("slide");
        video.play();
    }
    else{
        switchBtn.classList.add("slide");
        video.pause();
    }
})