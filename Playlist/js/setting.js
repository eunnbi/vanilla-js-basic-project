const musicList = document.querySelector(".playlist__musics");
window.addEventListener("DOMContentLoaded", function(){
    musics.forEach(function(music){
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
    musicItem.addEventListener("click", function(e){
        console.log(e.target);
        musicItem.classList.add("playing");
    }, false);
    musicList.appendChild(musicItem);
    });
})