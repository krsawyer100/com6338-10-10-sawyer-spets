const form = document.querySelector(".main__location_form")
const catCardsContainer = document.querySelector(".main__cards-container")
const catPageTitle = document.querySelector("main__cat-title")

form.onsubmit = async e => {
    //Prevent default form function
    e.preventDefault()
    //Grab user input
    const searchTerm = form.location.value.trim()
    //Check for a user input
    if(!searchTerm || !(checkZipcodeFormat(searchTerm))) {
        form.location.value = ""
        form.location.placeholder = "Please enter a valid zipcode"
    }
    //reset form
    form.location.value = ""
    try {
        //Fetch API info
        const res = await fetch(`https://api.rescuegroups.org/v5/public/animals/search/available/cats?limit=24&key=1xbUifbS`, {
            method: "GET",
            headers: {
                "Content-Type": "application/vnd.api+json",
                "Authorization": "1xbUifbS"
            },
            data: {
                "data": {
                    "filterRadius": {
                        "miles": 25,
                        "postalcode": "27909"
                    }
                }
            }
        })
        //Display error
        if (res.status !== 200) throw new Error('No Data')
        //Transform to JSON
        const catData = await res.json()
        const catDataArray = Array.from(catData.data)
        console.log(catDataArray)
        //Display cat cards
        console.log(renderCats(catDataArray))
    } catch (err){
        console.log()
    }
}

const renderCats = ({
    //getting specific data from api for use
    attributes: [{
        ageGroup,
        name,
        sex,
        pictureThumbnailUrl
    }]
}) => {
   renderCats.forEach(catDataArray => {
        catCardsContainer.innerHTML =+ `
            <div class=main__cards-container_card>
                <img src="${pictureThumbnailUrl}" alt="${name}" class=main__cards-container_card-img>
                <div class=main__cards-container_card-info>
                    <p>${name}<p>
                    <p>${ageGroup}<p>
                    <p>${sex}<p>
                </div>
            </div>
        `
    });
}

//check zipcode format
const checkZipcodeFormat = (str) => {
    return /^\d{5}(-\d{4})?$/.test(str);
}