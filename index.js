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
        })
}

setTimeout(() => console.log(deckId), 5000)
document.querySelector("#new-deck").addEventListener("click", handleClick)
document.querySelector("#draw-cards").addEventListener("click", drawCards)