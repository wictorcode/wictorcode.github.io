//===================//
// DOCUMENT ELEMENTS //
//===================//

const body = document.querySelector("body");
// Buttons
const navButton_aPropos     = document.getElementById("nav-button-1");
const navButton_projets     = document.getElementById("nav-button-2");
const navButton_competences = document.getElementById("nav-button-3");
const navButton_blog        = document.getElementById("nav-button-4");
const contentContainer      = document.getElementById("right-main-container")

//=============//
// OTHER STUFF //
//=============//

let pageCache_aPropos     = null;
let pageCache_projets     = null;
let pageCache_competences = null;
let pageCache_blog        = null;

//======================//
// FUNCTION DEFINITIONS //
//======================//

function initBackgroundMovement() {
    document.addEventListener("mousemove", (data) => {
        body.style.backgroundPositionX = `${-data.clientX / 20}px`
        body.style.backgroundPositionY = `${-data.clientY / 20}px`
    })
}

function route() {
    
}

// A PROPOS  --  FETCHING AND CACHING
navButton_aPropos.addEventListener("click", () => {

    if (pageCache_aPropos !== null) {
        contentContainer.innerHTML = pageCache_aPropos
    } else {
        fetch("content/a-propos.html").then(response => {

            console.log("Loading...");
    
            if(response.ok) {
                return response.text()
            }
            console.log("Failed to retrieve data");
        }).then(html => {
            pageCache_aPropos = html
            contentContainer.innerHTML = html
        })
    }
})

// COMPETENCES  --  FETCHING AND CACHING
navButton_competences.addEventListener("click", () => {

    if (pageCache_competences !== null) {
        contentContainer.innerHTML = pageCache_competences
    } else {
        fetch("content/competences.html").then(response => {

            console.log("Loading...");
    
            if(response.ok) {
                return response.text()
            }
            console.log("Failed to retrieve data");
        }).then(html => {
            pageCache_competences = html
            contentContainer.innerHTML = html
        })
    }
})

// PROJETS  --  FETCHING AND CACHING
navButton_projets.addEventListener("click", () => {

    if (pageCache_projets !== null) {
        contentContainer.innerHTML = pageCache_projets
    } else {
        fetch("content/projets.html").then(response => {

            console.log("Loading...");
    
            if(response.ok) {
                return response.text()
            }
            console.log("Failed to retrieve data");
        }).then(html => {
            pageCache_projets = html
            contentContainer.innerHTML = html
        })
    }
})

// BLOG  --  FETCHING AND CACHING
navButton_blog.addEventListener("click", () => {

    if (pageCache_blog !== null) {
        contentContainer.innerHTML = pageCache_blog
    } else {
        fetch("content/blog.html").then(response => {

            console.log("Loading...");
    
            if(response.ok) {
                return response.text()
            }
            console.log("Failed to retrieve data");
        }).then(html => {
            pageCache_blog = html
            contentContainer.innerHTML = html
        })
    }
})

//======//
// INIT //
//======//

initBackgroundMovement()