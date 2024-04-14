//Grabbing navigation bar info
var navBtn = document.querySelector(".nav__btn")
var navMenu = document.querySelector(".nav__menu")
var navBtnImg = document.querySelector(".nav__btn_img")

//Grabbing Pet Facts Section info
const factsContainer = document.querySelector(".main__pet__facts_container")
const factsDiv = document.getElementById("factsDiv")
const URL = "https://api.thedogapi.com/v1/images/search?limit=20&api_key=live_0gO5LSOr86SNLIxqAzjOLsieKJfbl8LNsCBZJ9foUHXFANbfMBWcW2XIVthwqGAE&";

const ranDogFacts = document.getElementById(main__facts)
console.log("start");
console.log(URL)

var data = data

//Grabbing footer info
var footerFormDiv = document.querySelector(".footer__content_form-container")
var footerForm = document.querySelector(".footer__content_form")

document.body.onload = function(e) {
    e.preventDefault()
    //display user email if in storage
    userEmail = localStorage.getItem('user-email')
    if (userEmail !== null) {
        footerFormDiv.innerHTML = `<p>Thanks for subscribing, ${userEmail}`
    }
    //api information
    const res = fetch(URL)  
    
    .then (function(res) {
            if (res.status !== 200) {
            throw new Error('picture not found')
            }
            console.log(" after 200 check") 
            return res.json()
    })

    .then(function(data) {

console.log("got data")
console.log("datac",data)
console.log("mdog name", data[0].breeds[0].name)
console.log("mbred for", data[0].breeds[0].bred_for)
console.log("mtemperament", data[0].breeds[0].temperament)

const renderData = data => {
console.log("data",data)
   
    const {name} = data[0].breeds[0].name
    console.log("dog name", data[0].breeds[0].name)
    const {bred_for} = data[0].breeds[0].bred_for
    console.log("bred for", data[0].breeds[0].bred_for)
    const {temperament} = data[0].breeds[0].temperament
    console.log("temperament", data[0].breeds[0].temperament)
    const {id} = data[0].breeds[0].id
    console.log('dog id', data[0].breeds[0].id)
}


console.log('print data')
    //reset facts div
    factsDiv.innerHTML = ""

    //create facts title
    var h3 = document.createElement('h3')
    h3.textContent = ("Did you Know?")
    factsDiv.appendChild(h3)
    
    factsDiv.appendChild(document.createElement('br'))
    var h5 = document.createElement('h5')
        h5.textContent = ("Breed:" + " " + data[0].breeds[0].name)
        factsDiv.appendChild(h5)

    factsDiv.appendChild(document.createElement('br'))
    
    var h5 = document.createElement('h5')
        h5.textContent = ("Bred For: " + data[0].breeds[0].bred_for)
        factsDiv.appendChild(h5)
    
    factsDiv.appendChild(document.createElement('br'))   
        var h5 = document.createElement('h5')
        h5.textContent = ("Temperament:")
        factsDiv.appendChild(h5)  

    
    var h5 = document.createElement('h5')
        h5.textContent = (data[0].breeds[0].temperament)
        factsDiv.appendChild(h5)  
})}

//nav menu functionality
function toggleMenu() {
    var isOpen = navMenu.classList.toggle('show-menu')
    navBtn.setAttribute('aria-expanded', isOpen)
    if (isOpen) {
        navBtn.focus()
        navBtnImg.style.content = "url(images/navBtn-blue.png)"
        navBtnImg.style.hover.content = "url(images/navBtn-blue.png)"
    } else {
        navBtnImg.style.content = "url(images/navBtn.png)"
    }
}

navBtn.addEventListener("click", function(e) {
    e.stopPropagation()
    toggleMenu()
    console.log("clicked")
})

document.addEventListener("click", function(e) {
    if(navMenu.classList.contains('show-menu') && !navMenu.contains(e.target)) {
        toggleMenu()
        console.log("clicked")
    }
})

document.addEventListener("keyup", function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        toggleMenu()
        console.log("clicked")
    }
})

//Footer form functionality
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

//Email validation
const validateUserEmail = (userEmail) => {
    return userEmail.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}