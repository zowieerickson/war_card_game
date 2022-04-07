let deckId;
const newDeckBtn = document.querySelector("#new-deck")
const drawCardsBtn = document.querySelector("#draw-cards");
const remainingCards = document.querySelector("#remaining-cards");

function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id
            drawCardsBtn.disabled = false;
            drawCardsBtn.classList.remove('disabled')
            remainingCards.innerHTML = `Remaining cards: <span>${data.remaining}</span>`
        })
}


function drawCards() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(response => response.json())
        .then(data => {
            remainingCards.innerHTML = `Remaining cards: <span>${data.remaining}</span>`
            if (data.remaining === 0) {
                drawCardsBtn.disabled = true;
                drawCardsBtn.classList.add('disabled')
            }

            const cardsContainer = document.querySelector("#container-cards");
            for (let i = 0; i < cardsContainer.children.length; i ++) {
                cardsContainer.children[i].innerHTML = `
                    <img src=${data.cards[i].image} />
                `
            }
            handleCards(data.cards[0], data.cards[1])
            const winnerText = handleCards(data.cards[0], data.cards[1])
            document.querySelector("#winner-msg").textContent = winnerText
        })
}

newDeckBtn.addEventListener("click", handleClick)
drawCardsBtn.addEventListener("click", drawCards)

function handleCards(card1, card2) {
    const cardValuesArr = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE']

    const card1Value = cardValuesArr.indexOf(card1.value)
    const card2Value = cardValuesArr.indexOf(card2.value)
 
    if (card1Value > card2Value) {
        return 'Computer wins!'
    } else if (card1Value < card2Value) {
        return 'You win!'
    } else {
        return 'War!'
    }
}
