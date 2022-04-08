let deckId;
const newDeckBtn = document.querySelector("#new-deck");
const drawCardsBtn = document.querySelector("#draw-cards");
const remainingCards = document.querySelector("#remaining-cards");
const winnerEle = document.querySelector("#winner-msg");
const cardsContainer = document.querySelector("#container-cards");

let userScore = 0;
let computerScore = 0;

function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id;
            drawCardsBtn.disabled = false;
            drawCardsBtn.classList.remove('disabled');
            remainingCards.innerHTML = `Remaining cards: <span>${data.remaining}</span>`;

            resetGame();
        })
}

function resetGame() {
    userScore = 0;
    computerScore = 0;


    winnerEle.textContent = "Game of War"
    document.querySelector("#computer-score").textContent = computerScore;
    document.querySelector("#user-score").textContent = userScore;

    for (let i = 0; i < cardsContainer.children.length; i ++) {
        cardsContainer.children[i].innerHTML = ``
    }

}


function drawCards() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(response => response.json())
        .then(data => {
            remainingCards.innerHTML = `Remaining cards: <span>${data.remaining}</span>`


            for (let i = 0; i < cardsContainer.children.length; i ++) {
                cardsContainer.children[i].innerHTML = `
                    <img src=${data.cards[i].image} />
                `
            }
            const winnerText = handleCards(data.cards[0], data.cards[1])
            winnerEle.textContent = winnerText

            if (data.remaining === 0) {
                if (userScore > computerScore) {
                    winnerEle.textContent = 'You won the game of war!'
                } else if (userScore < computerScore) {
                    winnerEle.textContent = "The computer has won the game of war!"
                } else {
                    winnerEle.textContent = 'The game ends in a tie!'
                }
                drawCardsBtn.disabled = true;
                drawCardsBtn.classList.add('disabled');
            }
        })
}

newDeckBtn.addEventListener("click", handleClick);
drawCardsBtn.addEventListener("click", drawCards);

function handleCards(card1, card2) {
    const cardValuesArr = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];

    const card1Value = cardValuesArr.indexOf(card1.value);
    const card2Value = cardValuesArr.indexOf(card2.value);
 
    if (card1Value > card2Value) {
        computerScore++
        console.log(computerScore)
        document.querySelector("#computer-score").textContent = computerScore;
        return 'Computer wins!';
    } else if (card1Value < card2Value) {
        userScore++
        document.querySelector("#user-score").textContent = userScore
        return 'You win!';
    } else {
        return 'War!';
    }
}
