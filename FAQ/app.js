const questions = document.querySelectorAll(".FAQ-content li");

const HIDDEN_CLASSNAME = "hidden";

questions.forEach(function(question){
    const showBtn = question.querySelector(".show-btn");
    const closeBtn = question.querySelector(".close-btn");
    showBtn.addEventListener("click", function(){
        questions.forEach(function(item){
            const showBtn = item.querySelector(".show-btn");
            const closeBtn = item.querySelector(".close-btn");
            if (item !== question){
                item.classList.remove("show-answer");
                showBtn.classList.remove(HIDDEN_CLASSNAME);
                closeBtn.classList.add(HIDDEN_CLASSNAME);
            }
        });
        question.classList.add("show-answer");
        showBtn.classList.add(HIDDEN_CLASSNAME);
        closeBtn.classList.remove(HIDDEN_CLASSNAME);
    });
    closeBtn.addEventListener("click", function(){
        question.classList.remove("show-answer");
        showBtn.classList.remove(HIDDEN_CLASSNAME);
        closeBtn.classList.add(HIDDEN_CLASSNAME);
    })
})