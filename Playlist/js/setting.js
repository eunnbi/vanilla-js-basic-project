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
const musicList = document.querySelector(".playlist__musics");
function setMusics(){
    musics.forEach(function(music, index){
        const musicItem = document.createElement("li");
        musicItem.classList.add("playlist__music");
        musicItem.dataset.title = `${music.title}`;
        musicItem.innerHTML = `
        <div class="playlist__music-column">
        <div class="playlist__music-image">
            <img src="images/${music.title}.jpg" alt="" class="playlist__music-image">
            <div class="playing-bar-wrap">
                <div class="playing-bar">
                    <div class="playing-bar__bar"></div>
                    <div class="playing-bar__bar"></div>
                    <div class="playing-bar__bar"></div> 
                </div>    
            </div>
        </div>
        <div class="playlist__content-info">
            <span class="playlist__music-singer">${music.singer}</span>
            <span class="playlist__music-title">${music.title}</span>
        </div>
        </div>
        <div class="playlist__music-column">
            <button>
                <i class="fas fa-ellipsis-v fa-lg"></i>
            </button>
        </div>`;
        if (index === 0){
            musicItem.classList.add("playing");
        }
    musicList.appendChild(musicItem);
    });
}

setMusics();
const musicItems = document.querySelectorAll(".playlist__music");
const playingImage = document.querySelector(".playlist__music-image.playing");
const playingTitle = document.querySelector(".playlist__music-title.playing");
const playingSinger = document.querySelector(".playlist__music-singer.playing");
musicItems.forEach(function(musicItem){
    musicItem.addEventListener("click", function(e){
        const musicTitle = e.currentTarget.dataset.title;
        musicItems.forEach(function(music){
            if (music.dataset.title !== musicTitle){
                music.classList.remove("playing");
            }
        });
        musicItem.classList.add("playing");
        musics.forEach(function(music, index){
            if (music.title === musicTitle){
                currentMusicIndex = index;
                playingImage.src = `images/${music.title}.jpg`;
                playingTitle.innerText = `${music.title}`;
                playingSinger.innerText = `${music.singer}`;
                setPlaylist();
                playMusic();
            }
        })
    })
})