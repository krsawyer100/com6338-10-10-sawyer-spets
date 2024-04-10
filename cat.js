const page = querySelector("html")
const catCardsContainer = querySelector(".main__cat-cards-container")

page.onload = async e => {
    try {
        //Fetch API info
        const res = await fetch(`https://api.rescuegroups.org/v5?limit=24&filterRadius=postalcode&distance=miles&key=1xbUifbS`)
        //Transform to JSON
        const catData = await res.json()
        //Display cat cards
        renderCats(catData)
    }
}

const renderCats = ({
    //getting specific data from api for use

}) => {
    //cat information & reset
    catCardsContainer.innerHTML = ``
}