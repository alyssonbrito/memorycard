
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard () {
    if (lockBoard) return;

    this.classList.toggle('flip');
    if (!hasFlippedCard){
	hasFlippedCard = true;
	firstCard = this;
	return;
    }
    hasFlippedCard = false;
    secondCard = this;
    if (this === firstCard)
	return;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework ===
		secondCard.dataset.framework;
    if (isMatch){
	//bingo
	disableCards();
	totalMatches++;
    }
    else {
	unflipCards();
    }
}
function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    lockBoard = false;
    },1500);
}

function disableCards(){
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
    resetBoard();
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false,false];
    [firstCard,secondCard] = [null,null]
}

//IIF
(function shuffle() {
    cards.forEach(card => {
	let randomPos = Math.floor(Math.random() * 12);
	card.style.order = randomPos;
    });

})();

function onKey(evt) {
    console.log('evt:',evt);

}

cards.forEach(card => card.addEventListener('click',flipCard));
