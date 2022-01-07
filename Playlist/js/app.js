const musics = [
    {
        title: "eastside",
        singer: "benny blanco, Halsey & Khalid",
    },
    {
        title: "밤하늘의 별을...",
        singer: "KCM & No Noo",
    },
    {
        title: "to be young",
        singer: "Anne marie feat. Doja cat",
    },
    {
        title: "sweet melody",
        singer: "little mix",
    },
    {
        title: "I want you",
        singer: "Shinee",
    },
    {
        title: "girls like you",
        singer: "maroon 5",
    },
    {
        title: "psycho",
        singer: "red velvet",
    },
    {
        title: "naked",
        singer: "ellamai",
    },
    {
        title: "memories",
        singer: "maroon 5",
    }
];

const audio = document.querySelector(".music__audio");
const musicTitle = document.querySelector(".music__title");
const musicSinger = document.querySelector(".music__singer");
const musicDuration = document.querySelector(".music-duration");
const musicImg = document.querySelector(".playing__image");

const playBtn = document.querySelector(".play-btn");
const pauseBtn = document.querySelector(".pause-btn");
const backwardBtn = document.querySelector(".backward-btn");
const forwardBtn = document.querySelector(".forward-btn");

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

playBtn.addEventListener("click", function(){
    playMusic();
})

pauseBtn.addEventListener("click", function(){
    pauseMusic();
})

forwardBtn.addEventListener("click", function(){
    playNextMusic();
})

backwardBtn.addEventListener("click", function(){
    playPreviousMusic();
})

function setPlaylist(){
    audio.src = `musics/${musics[currentMusicIndex].title}.mp3`;
    musicTitle.innerText = `${musics[currentMusicIndex].title}`;
    musicSinger.innerText = `${musics[currentMusicIndex].singer}`;
    musicImg.src = `images/${musics[currentMusicIndex].title}.jpg`;
}

function playMusic(){
    audio.play();
    playBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
}

function pauseMusic(){
    audio.pause();
    playBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
}

function playNextMusic(){
    currentMusicIndex = (currentMusicIndex + 1) % musics.length;
    setPlaylist();
    playMusic();
}

function playPreviousMusic(){
    currentMusicIndex = (currentMusicIndex - 1 + musics.length) % musics.length;
    setPlaylist();
    playMusic();
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