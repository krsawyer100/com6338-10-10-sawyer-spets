const form = document.querySelector(".main__location_form")
const catCardsContainer = document.querySelector(".main__cards-container")
const catPageTitleContainer = document.querySelector(".main__page-title")

//Grabbing footer info
var footerFormDiv = document.querySelector(".footer__content_form-container")
var footerForm = document.querySelector(".footer__content_form")

//display user email if in storage
document.body.onload = function(e) {
    e.preventDefault()
    userEmail = localStorage.getItem('user-email')
    if (userEmail !== null) {
        footerFormDiv.innerHTML = `<p>Thanks for subscribing, ${userEmail}`
    }
}

//Location form
form.onsubmit = function(e) {
    //Prevent default form function
    e.preventDefault()
    //Grab user input
    const searchTerm = form.location.value.trim()
    //Check for user input and if it is in zipcode format and tells user if it isn't
    if(!searchTerm || !(checkZipcodeFormat(searchTerm))) {
        form.location.value = ""
        catCardsContainer.innerHTML = `<h5> Location not found... Please try another zipcode</h5>`
        catPageTitleContainer.innerHTML = ""
        return
    }
    //reset form
    form.location.value = ""
    //fetch API info
    fetch(`https://api.rescuegroups.org/v5/public/animals/search/available/cats?limit=24&key=1xbUifbS`, {
        method: "GET",
        headers: {
            "Content-Type": "application/vnd.api+json",
            "Authorization": "1xbUifbS"
        },
        data: {
            "data": {
                "filterRadius": {
                    "miles": 25,
                    "postalcode": searchTerm
                }
            }
        }
    })
    .then(function(res)  {
        if (res.status !== 200) {
            throw new Error('No Data Found')
        } else {
            console.log(res)
            return res.json()
        }
    }).then(renderCats)
    .catch(function(err) {
        console.log(err.message)
    })
}

function renderCats (catData) {
    //Converts data into an array
    const catDataArray = Array.from(catData.data)
    console.log(catDataArray)
    //reset cat cards
    catPageTitleContainer.innerHTML = ""
    catCardsContainer.innerHTML = ""

    //add page title
    var catPageTitle = document.createElement('h3')
    catPageTitle.textContent = `Cats Available Near You`
    catPageTitleContainer.appendChild(catPageTitle)

    //Card creation
    for (let catNum = 0; catNum < catDataArray.length; catNum++) {
        //creates divs for each cat
        var card = catDataArray[catNum];
        card = document.createElement('div')
        card.className = "main__cards-container_card flex"
        catCardsContainer.appendChild(card)

        var catName = document.createElement('h5')
        catName.textContent = catDataArray[catNum].attributes.name
        catName.className = "main__cards-container_card-name"
        card.appendChild(catName)

        //creates imgs for each
        var catPic = document.createElement('img')
        catPic.className = "main__cards-container_card-img"
        catPic.src = catDataArray[catNum].attributes.pictureThumbnailUrl
        catPic.alt = catDataArray[catNum].attributes.name
        card.appendChild(catPic)

        //creates p tag for age group
        var catAgeGroup = document.createElement('p')
        catAgeGroup.textContent = "Age Group: " + catDataArray[catNum].attributes.ageGroup
        catAgeGroup.className = "main__cards-container_card-info"
        card.appendChild(catAgeGroup)

        //creates p tag for age group
        var catGender = document.createElement('p')
        catGender.textContent = "Gender: " + catDataArray[catNum].attributes.sex
        catGender.className = "main__cards-container_card-info"
        card.appendChild(catGender)
    }
}

//Footer Form functionality
footerForm.onsubmit = function(e) {
    //Prevent default form function
    e.preventDefault()
    //grab user email
    var userEmail = footerForm.subscription.value.trim()
    //display if user has subscribed
    if (validateUserEmail(userEmail)) {
        localStorage.setItem('user-email', userEmail)
        footerFormDiv.innerHTML = `<p>Thanks for subscribing, ${userEmail}`
    }
}

//check zipcode format
const checkZipcodeFormat = (str) => {
    return /^\d{5}(-\d{4})?$/.test(str);
}

const validateUserEmail = (userEmail) => {
    return userEmail.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}