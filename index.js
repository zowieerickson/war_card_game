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
setTimeout(() => console.log(deckId), 5000)
document.querySelector("#new-deck").addEventListener("click", handleClick)