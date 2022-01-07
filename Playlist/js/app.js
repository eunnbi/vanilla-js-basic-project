const audio = document.querySelector(".music__audio");
const musicTitle = document.querySelector(".music__title");
const musicSinger = document.querySelector(".music__singer");
const musicDuration = document.querySelector(".music-duration");
const musicImg = document.querySelector(".playing__image");

const playBtns = document.querySelectorAll(".play-btn");
const pauseBtns = document.querySelectorAll(".pause-btn");
const backwardBtns = document.querySelectorAll(".backward-btn");
const forwardBtns = document.querySelectorAll(".forward-btn");

const currentTime = document.querySelector(".current-time");
const seekSlider = document.querySelector(".seek-slider");
const LOWER_COLOR = "#fff";
const UPPER_COLOR = "#d0d0d0";
let currentMusicIndex = 0;

window.addEventListener("DOMContentLoaded", setPlaylist);
audio.addEventListener("loadedmetadata", function(){
    musicDuration.innerText = calculateTime(audio.duration);
    seekSlider.max = Math.floor(audio.duration);
})
audio.addEventListener("timeupdate", function(){
    seekSlider.value = Math.floor(audio.currentTime);
    currentTime.innerText = calculateTime(audio.currentTime);
    changeSilderColor();

    if (audio.currentTime === audio.duration){
        playNextMusic();
    }
})

seekSlider.addEventListener("input", function(){
    changeSilderColor();
});

seekSlider.addEventListener("change", function(){
    audio.currentTime = seekSlider.value;
    currentTime.innerText = calculateTime(audio.currentTime);
})

playBtns.forEach(function(playBtn){
    playBtn.addEventListener("click", function(){
        playMusic();
    })
})

pauseBtns.forEach(function(pauseBtn){
    pauseBtn.addEventListener("click", function(){
        pauseMusic();
    })
})

forwardBtns.forEach(function(forwardBtn){
    forwardBtn.addEventListener("click", function(){
        playNextMusic();
    })
})

backwardBtns.forEach(function(backwardBtn){
    backwardBtn.addEventListener("click", function(){
        playPreviousMusic();
    })
})


function setPlaylist(){
    audio.src = `musics/${musics[currentMusicIndex].title}.mp3`;
    musicTitle.innerText = `${musics[currentMusicIndex].title}`;
    musicSinger.innerText = `${musics[currentMusicIndex].singer}`;
    musicImg.src = `images/${musics[currentMusicIndex].title}.jpg`;
}

function playMusic(){
    audio.play();
    playBtns.forEach(function(playBtn){
        playBtn.classList.add("hidden");
    });
    pauseBtns.forEach(function(pauseBtn){
        pauseBtn.classList.remove("hidden");
    });
}

function pauseMusic(){
    audio.pause();
    playBtns.forEach(function(playBtn){
        playBtn.classList.remove("hidden");
    });
    pauseBtns.forEach(function(pauseBtn){
        pauseBtn.classList.add("hidden");
    });
}

function playNextMusic(){
    currentMusicIndex = (currentMusicIndex + 1) % musics.length;
    setPlayingBox();
    setPlaylist();
    playMusic();
}

function playPreviousMusic(){
    currentMusicIndex = (currentMusicIndex - 1 + musics.length) % musics.length;
    setPlayingBox();
    setPlaylist();
    playMusic();
}

function setPlayingBox(){
    const musicTitle = musics[currentMusicIndex].title;
    musicItems.forEach(function(music){
        if (music.dataset.title !== musicTitle){
            music.classList.remove("playing");
        }
        else{
            music.classList.add("playing");
        }
    });
    playingImage.src = `images/${musicTitle}.jpg`;
    playingTitle.innerText = `${musicTitle}`;
    playingSinger.innerText = `${musics[currentMusicIndex].singer}`;
}

function calculateTime(secs){
    const minute = Math.floor(secs / 60);
    const second = Math.floor(secs % 60).toString(10).padStart(2, "0");
    return `${minute}:${second}`;
}

function changeSilderColor(){
    const percentage = (seekSlider.value - seekSlider.min) / (seekSlider.max - seekSlider.min) * 100;
    seekSlider.style.background = `linear-gradient(to right, ${LOWER_COLOR} 0%, ${LOWER_COLOR} ${percentage}%, ${UPPER_COLOR} ${percentage}%, ${UPPER_COLOR} 100%)`
}