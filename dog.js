const form = document.querySelector(".main__location_form")
const dogCardsContainer = document.querySelector(".main__cards-container")
const dogPageTitleContainer = document.querySelector(".main__page-title")

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

form.onsubmit = function(e) {
    //Prevent default form function
    e.preventDefault()
    //Grab user input
    const searchTerm = form.location.value.trim()
    //Check for user input and if it is in zipcode format and tells user if it isn't
    if(!searchTerm || !(checkZipcodeFormat(searchTerm))) {
        form.location.value = ""
        dogCardsContainer.innerHTML = `<h5> Location not found... Please try another zipcode</h5>`
        dogPageTitleContainer.innerHTML = ""
        return
    }
    //reset form
    form.location.value = ""
    //fetch API info
    fetch(`https://api.rescuegroups.org/v5/public/animals/search/available/dogs?limit=24&key=1xbUifbS`, {
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
    }).then(renderDogs)
    .catch(function(err) {
        console.log(err.message)
    })
}

function renderDogs (dogData) {
    //Converts data into an array
    const dogDataArray = Array.from(dogData.data)
    console.log(dogDataArray)
    //reset dog cards
    dogPageTitleContainer.innerHTML = ""
    dogCardsContainer.innerHTML = ""

    //add page title
    var dogPageTitle = document.createElement('h3')
    dogPageTitle.textContent = "Dogs Available Near You"
    dogPageTitleContainer.appendChild(dogPageTitle)

    //Card creation
    for (let dogNum = 0; dogNum < dogDataArray.length; dogNum++) {
        //creates divs for each cat
        var card = dogDataArray[dogNum];
        card = document.createElement('div')
        card.className = "main__cards-container_card flex"
        dogCardsContainer.appendChild(card)

        var dogName = document.createElement('h5')
        dogName.textContent = dogDataArray[dogNum].attributes.name
        dogName.className = "main__cards-container_card-name"
        card.appendChild(dogName)

        //creates imgs for each
        var dogPic = document.createElement('img')
        dogPic.className = "main__cards-container_card-img"
        dogPic.src = dogDataArray[dogNum].attributes.pictureThumbnailUrl
        dogPic.alt = dogDataArray[dogNum].attributes.name
        card.appendChild(dogPic)

        //creates p tag for age group
        var dogAgeGroup = document.createElement('p')
        dogAgeGroup.textContent = "Age Group: " + dogDataArray[dogNum].attributes.ageGroup
        dogAgeGroup.className = "main__cards-container_card-info"
        card.appendChild(dogAgeGroup)

        //creates p tag for age group
        var dogGender = document.createElement('p')
        dogGender.textContent = "Gender: " + dogDataArray[dogNum].attributes.sex
        dogGender.className = "main__cards-container_card-info"
        card.appendChild(dogGender)
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

const validateUserEmail = (userEmail) => {
    return userEmail.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}