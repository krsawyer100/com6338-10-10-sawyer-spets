
/*Facts Section */
const factsContainer = document.querySelector("main__pet__facts_container")
const factsDiv = document.getElementById("factsDiv")
const URL = "https://api.thedogapi.com/v1/images/search?limit=20&api_key=live_0gO5LSOr86SNLIxqAzjOLsieKJfbl8LNsCBZJ9foUHXFANbfMBWcW2XIVthwqGAE&";

const ranDogFacts = document.getElementById(main__facts)
console.log("start");
console.log(URL)

var data = data

document.body.onload = function(e) {
    e.preventDefault()
    const res = fetch(URL)  
    
    .then (function(res) {
            if (res.status !== 200) {
            throw new Error('picture not found')
            }
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

factsDiv.innerHTML = ""

    var h3 = document.createElement('h3')
        h3.textContent = ("Did you Know?")
        factsDiv.appendChild(h3)

    factsDiv.appendChild(document.createElement('br'))
    var h4 = document.createElement('h4')
        h4.textContent = ("Breed Name: " + " " + data[0].breeds[0].name)
        factsDiv.appendChild(h4)

    factsDiv.appendChild(document.createElement('br'))
    
    var h4 = document.createElement('h4')
        h4.textContent = ("Bred For: " + data[0].breeds[0].bred_for)
        factsDiv.appendChild(h4)
    
    factsDiv.appendChild(document.createElement('br'))   
        var h4 = document.createElement('h4')
        h4.textContent = ("Temperament:")
        factsDiv.appendChild(h4)  

    
    var h4 = document.createElement('h4')
        h4.textContent = (data[0].breeds[0].temperament)
        factsDiv.appendChild(h4)  
   
})}
const formDiv = document.querySelector("footer__content_form")
const form = document.getElementById()((form))
const inputEl = document.getElementById("subscription")

ondeyup = function subscribe(e) {
    e.preventDefault()
    var userEmail = inputEl
    if (! userEmail .includes("@")) {
        throw new (err) ("try again")
    } else {
        throw new (err) ("please Enter Your Email")
    }
}
console.log("Thank you for Subscribing")
