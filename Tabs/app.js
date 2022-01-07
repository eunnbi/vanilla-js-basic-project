const btns = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".content");

btns.forEach(function(btn){
    btn.addEventListener("click", function(e){
        contents.forEach(function(content){
            if (content.dataset.id === btn.dataset.id){
                content.classList.add("active");
            }
            else{
                content.classList.remove("active");
            }
        });
        btns.forEach(function(item){
            item.classList.remove("active");
        });
        btn.classList.add("active");
    })
})