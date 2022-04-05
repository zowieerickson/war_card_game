let deckId;

function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
            console.log(deckId)
        })
}


function drawCards() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(response => response.json())
        .then(data => {
            let html = ''
            let cardsArr = data.cards
            cardsArr.map(card => {
                html += `
                <img src=${card.image}>
                `
            })
            document.querySelector("#container-cards").innerHTML = html
            console.log(data.cards)
        })
}

setTimeout(() => console.log(deckId), 5000)
document.querySelector("#new-deck").addEventListener("click", handleClick)
document.querySelector("#draw-cards").addEventListener("click", drawCards)