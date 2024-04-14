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

const validateUserEmail = (userEmail) => {
    return userEmail.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}