//===================//
// DOCUMENT ELEMENTS //
//===================//

const body = document.querySelector("body");
// Buttons
const navButton_aPropos = document.getElementById("nav-button-1");
const navButton_projets = document.getElementById("nav-button-2");
const navButton_competences = document.getElementById("nav-button-3");
const navButton_blog = document.getElementById("nav-button-4");

//=============//
// OTHER STUFF //
//=============//

let pageCache_aPropos = null;
let pageCache_competences = null;

//======================//
// FUNCTION DEFINITIONS //
//======================//

function initBackgroundMovement() {
    document.addEventListener("mousemove", (data) => {
        body.style.backgroundPositionX = `${-data.clientX / 20}px`
        body.style.backgroundPositionY = `${-data.clientY / 20}px`
    })
}

// A PROPOS  --  FETCHING AND CACHING
navButton_aPropos.addEventListener("click", () => {

    let container = document.getElementById("right-main-container")

    if (pageCache_aPropos !== null) {
        container.innerHTML = pageCache_aPropos
    } else {
        fetch("content/a-propos.html").then(response => {

            console.log("Loading...");
    
            if(response.ok) {
                return response.text()
            }
            console.log("Failed to retrieve data");
        }).then(html => {
            pageCache_aPropos = html
            container.innerHTML = html
        })
    }
})

// COMPETENCES  --  FETCHING AND CACHING
navButton_competences.addEventListener("click", () => {

    let container = document.getElementById("right-main-container")

    if (pageCache_competences !== null) {
        container.innerHTML = pageCache_competences
    } else {
        fetch("content/competences.html").then(response => {

            console.log("Loading...");
    
            if(response.ok) {
                return response.text()
            }
            console.log("Failed to retrieve data");
        }).then(html => {
            pageCache_competences = html
            container.innerHTML = html
        })
    }
})

//======//
// INIT //
//======//

initBackgroundMovement()