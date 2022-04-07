let deckId;

function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id
            document.querySelector("#draw-cards").disabled = false;
        })
}


function drawCards() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(response => response.json())
        .then(data => {
            const cardsContainer = document.querySelector("#container-cards");
            for (let i = 0; i < cardsContainer.children.length; i ++) {
                cardsContainer.children[i].innerHTML = `
                    <img src=${data.cards[i].image} />
                `
            }
            handleCards(data.cards[0], data.cards[1])
            document.querySelector("#winner-msg").innerHTML = handleCards(data.cards[0], data.cards[1])
        })
}

document.querySelector("#new-deck").addEventListener("click", handleClick)
document.querySelector("#draw-cards").addEventListener("click", drawCards)

function handleCards(card1, card2) {
    const cardValuesArr = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE']

    const card1Value = cardValuesArr.indexOf(card1.value)
    const card2Value = cardValuesArr.indexOf(card2.value)

    console.log(`Card 1 Value: ${card1Value}`)
    console.log(`Card 2 Value: ${card2Value}`)

    let text = ''
    if (card1Value > card2Value) {
        text = 'Computer wins!'
        return text
    } else if (card1Value < card2Value) {
        text = 'You win!'
        return text
    } else {
        text = 'War!'
        return text
    }
}

const card1Obj = {
    value: 'ACE'
}

const card2Obj = {
    value: 'JACK'
}

handleCards(card1Obj, card2Obj)