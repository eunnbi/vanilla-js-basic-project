let cardsInfo = [];
const emoji = ["π", "π", "π", "π", "π", "π", "π", "π", "π", "π"];
const cnt = 10; // emoji.length
const HIDDEN_CLASSNAME = "hidden";
const mainCards = document.querySelector(".cards");
const result = document.querySelector(".result__text");
let openedCardNum = 0;
let matchedCardNum = 0;

// μμ±μ ν¨μ
function createCard(emoji, id) {
    this.emoji = emoji;
    this.isMatched = false;
    this.isOpen = false;
    this.id = id;
}

// cards μμ±νκ³  cardsInfoμ push
function createCards(cnt){
    let id = new Date().getTime();
    for (let i = 0; i < cnt; i++){
        for (let j = 0; j < 2; j++){
            const card = new createCard(emoji[i], id++);
            cardsInfo.push(card);            
        }
    }
    // shuffle cards
    shuffleCards();
}

function shuffleCards(){
    cardsInfo.sort(() => Math.random() - 0.5);
}

// cardλ€μ νλ©΄μ νμ¬
function setCards(){
    for (let index = 0; index < cnt * 2; index++){
        const card = document.createElement("div"); 
        card.classList.add("card");
        card.classList.add("card__image");
        card.dataset.id = cardsInfo[index].id;  //id
        card.innerText = `${cardsInfo[index].emoji}`;
        card.addEventListener("click", clickCard);
        mainCards.appendChild(card);
    }
}

// μΉ΄λλ₯Ό ν΄λ¦­νμ λ νΈμΆλλ ν¨μ
function clickCard(e){
    openedCardNum++;
    openCard(e.target);
    if (openedCardNum == 2){
        checkOpenedCard();
    }
    if (matchedCardNum === cnt){
        setTimeout(function(){
            result.innerText = "Success π₯";
        }, 1500);
    }

}

function openCard(card){
    card.classList.add("open__card");
    card.classList.remove("close__card");
    const id = Number(card.dataset.id);
    cardsInfo = cardsInfo.map(function(cardInfo){
        if (cardInfo.id === id){
            cardInfo.isOpen = true;
            setTimeout(function(){
                card.classList.remove("card__question");
                card.classList.add("card__image");
                card.innerText = `${cardInfo.emoji}`;  
            }, 500);
        }
        return cardInfo;
    })
}

function closeCard(card){
    card.classList.add("close__card");
    card.classList.remove("open__card");
    setTimeout(function(){
        card.classList.add("card__question");
        card.classList.remove("card__image");
        card.innerText = `?`;  
    }, 500);
}

function checkOpenedCard(){
    // νμ¬ openλμ΄ μλ μΉ΄λ
    const currentCards = cardsInfo.reduce(function(currentCard, card){
        if (card.isOpen){
            currentCard.push(card);
        }
        return currentCard;
    }, []);
    console.log(currentCards);
    // not match
    if (currentCards[0].emoji !== currentCards[1].emoji){
        // close card
        const items = document.querySelectorAll(".card");
        items.forEach(function(item){
            const id = Number(item.dataset.id);
            if (id === currentCards[0].id || id === currentCards[1].id){
                setTimeout(function(){
                    closeCard(item);
                    setTimeout(function(){
                        result.innerText = "Not Matched π₯";
                    }, 500); 
                }, 1000)
            }
        })        
    }
    // match!!
    else{
        matchedCardNum++;
        // update cards info
        cardsInfo = cardsInfo.map(function(card){
            if (card.id === currentCards[0].id || card.id === currentCards[1].id){
                card.isMatched = true;
            }
            return card;
        }) 
        setTimeout(function(){
            result.innerText = "Matched π";
        }, 1000); 
    }

    // set default
    openedCardNum = 0;
    cardsInfo = cardsInfo.map(function(card){
        if (card.id === currentCards[0].id || card.id === currentCards[1].id){
            card.isOpen = false;
        }
        return card;
    })
}

createCards(cnt);
setCards();
const cards = document.querySelectorAll(".card");
setTimeout(function(){
    cards.forEach(function(card){
        closeCard(card);
    })
}, 1000);
