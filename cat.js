const page = querySelector("html")
const catCardsContainer = querySelector(".main__cat-cards-container")

page.onload = async e => {
    try {
        //Fetch API info
        const res = await fetch(``)
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