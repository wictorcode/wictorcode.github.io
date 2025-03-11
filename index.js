//===================//
// DOCUMENT ELEMENTS //
//===================//

const body = document.querySelector("body");
const button_competences = document.getElementById("nav-button-3");

//======================//
// FUNCTION DEFINITIONS //
//======================//

function initBackgroundMovement() {
    document.addEventListener("mousemove", (data) => {
        body.style.backgroundPositionX = `${-data.clientX / 20}px`
        body.style.backgroundPositionY = `${-data.clientY / 20}px`
    })
}


button_competences.addEventListener("click", () => {
    fetch("content/competences.html").then(response => {
        if(response.ok) {
            return response.text()
        }
        console.log("Failed to retrieve data");
    }).then(html => {
        document.getElementById("right-main-container").innerHTML = html
    })
})


initBackgroundMovement()