const form = querySelector(".main__location_form")
const catCardsContainer = querySelector(".main__cat-cards-container")

form.onsubmit = async e => {
    //Prevemt default form function
    e.preventDefault()
    //Grab user input
    const searchTerm = form.search.value.trim()
    //Check for a user input
    if(!searchTerm) return
    //reset form
    form.search.value = ""
    try {
        //Fetch API info
        const res = await fetch(`https://api.rescuegroups.org/public/animals/search/available/cats/haspic?key=1xbUifbS`)
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