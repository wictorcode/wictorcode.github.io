//==================================================================================================================//
//== CONSTANTS  CONSTANTS  CONSTANTS  CONSTANTS  CONSTANTS  CONSTANTS  CONSTANTS  CONSTANTS  CONSTANTS  CONSTANTS  
//==================================================================================================================//

import { skills } from "./data.js"

const SKILL_LIST = skills

const $DOCUMENT = document
const $BODY = document.body
const $BACKGROUND = document.querySelector("#internal-background")

// On augmente le nombre d'espaces.
const CHARACTERS_BASE = [
    //== SPACES ==//
    " "," "," "," ", " "," "," "," ", " "," "," "," ", 
    //== SMALL CHARACTERS + REPEAT ==//
    "°", ".", "-", "~", "°", ".", "-", "~", 
    //== BIG CHARACTERS ==//
     "+", "*", "x", "o",
]

// NE PAS UTILISER
// Je crois qu'ils sont plus grands que de l'ascii donc ça pète le système de drag/mouse move
const CHARACTERS_BRAILLE = [
"⠀",	"⠁",	"⠂",	"⠃",	"⠄",	"⠅",	"⠆",	"⠇",	"⠈",	"⠉",	"⠊",	"⠋",	"⠌",	"⠍",	"⠎",	"⠏",
"⠐",	"⠑",	"⠒",	"⠓",	"⠔",	"⠕",	"⠖",	"⠗",	"⠘",	"⠙",	"⠚",	"⠛",	"⠜",	"⠝",	"⠞",	"⠟",
"⠠",	"⠡",	"⠢",	"⠣",	"⠤",	"⠥",	"⠦",	"⠧",	"⠨",	"⠩",	"⠪",	"⠫",	"⠬",	"⠭",	"⠮",	"⠯",
"⠰",	"⠱",	"⠲",	"⠳",	"⠴",	"⠵",	"⠶",	"⠷",	"⠸",	"⠹",	"⠺",	"⠻",	"⠼",	"⠽",	"⠾",	"⠿",
]

const CHARACTERS_BINARY= [
    " ", "0", "1",
]

const CHARACTERS = CHARACTERS_BINARY

//==================================================================================================================//
//== MISC/UTIL/HELPERS  MISC/UTIL/HELPERS  MISC/UTIL/HELPERS  MISC/UTIL/HELPERS  MISC/UTIL/HELPERS  
//==================================================================================================================//

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getCharsToFillViewport() {
   const testSpan = document.createElement('span');
   testSpan.style.visibility = 'hidden';
   testSpan.style.position = 'absolute';
   testSpan.style.fontFamily = 'monospace';
   testSpan.style.fontSize = `${getAdaptiveFontSize()}px`;
   testSpan.textContent = 'M'; // M car c'est le plus grand
   
   document.body.appendChild(testSpan);
   const charWidth = testSpan.getBoundingClientRect().width;
   document.body.removeChild(testSpan);
   
   const viewportWidth = window.innerWidth;
   return Math.floor(viewportWidth / charWidth);
}

function getLinesToFillViewport() {
    const fontSize = getAdaptiveFontSize(); // px
    const lineHeight = 1.2; // from your CSS
    const actualLineHeight = fontSize * lineHeight; // 19.2px
    
    return Math.ceil(window.innerHeight / actualLineHeight) + 1;
}

function getAdaptiveFontSize() {
    const width = window.innerWidth;
    if (width > 3440) return 38; // Ultra-wide: bigger font = fewer chars
    if (width > 2560) return 30;
    if (width > 1920) return 26;
    return 16;
}

function updateFontSize() {
    const fontSize = getAdaptiveFontSize();
    document.documentElement.style.setProperty('--font-size', fontSize + 'px');
}


//==================================================================================================================//
//== BACKGROUND  BACKGROUND  BACKGROUND  BACKGROUND  BACKGROUND  BACKGROUND  BACKGROUND  BACKGROUND  BACKGROUND  
//==================================================================================================================//

let amountOfSpans = 0
let maxCharsPerSpan = 0

let characterPool = [];
let poolIndex = 0;
const POOL_SIZE = 10000;

function generateCharacterPool() {
    characterPool = [];
    for (let i = 0; i < POOL_SIZE; i++) {
        const characterSetSize = CHARACTERS.length;
        characterPool.push(CHARACTERS[getRandomInt(0, characterSetSize - 1)]);
    }
    poolIndex = 0;
}

function getRandomCharacterFromPool() {
    if (poolIndex >= characterPool.length) {
        poolIndex = 0; // Reset to beginning
    }
    return characterPool[poolIndex++];
}

function createSpan() {
    const newSpanLine = $DOCUMENT.createElement("span");
    newSpanLine.className = "background-span-line";
    // Build string first
    let content = '';
    for (let i = 0; i < maxCharsPerSpan; i++) {
        content += getRandomCharacterFromPool();
    }
    newSpanLine.textContent = content;
    
    return newSpanLine;
}

function flushBackground() {
    $BACKGROUND.innerHTML = ""
}

function generateBackground() {
    const fragment = $DOCUMENT.createDocumentFragment();
    for (let spanCount = 0; spanCount < amountOfSpans; spanCount++) {
        const newLine = createSpan()
        fragment.appendChild(newLine)
    }
    $BACKGROUND.appendChild(fragment)
}


function regenWave() {
    const lines = Array.from($BACKGROUND.childNodes);
    let currentLine = 0;

    setInterval(() => {

        const elt = lines[currentLine];
        if (elt) {
            let content = '';
            for (let i = 0; i < maxCharsPerSpan; i++) {
                content += getRandomCharacterFromPool();
            }
            elt.textContent = content;
        }
        
        currentLine = (currentLine + 1) % lines.length;
    }, 66);
}



//==================================================================================================================//
//== SKILLS  SKILLS  SKILLS  SKILLS  SKILLS  SKILLS  SKILLS  SKILLS  SKILLS  SKILLS  SKILLS  SKILLS  SKILLS  SKILLS
//==================================================================================================================//

function getSkillLabel(level) {
    console.log(level);
    
    switch (level) {
        case 1:
            return "Débutant"
        case 2:
            return "Intermédiaire"
        case 3:
            return "Avancé"
        default:
            break;
    }
}

function generateSkills() {
    const skillContainer = $DOCUMENT.querySelector(".skill-list")
    SKILL_LIST.forEach((skillInfo) => {
        console.log(skillInfo);
        const skillLine = $DOCUMENT.createElement("div")
        skillLine.classList = `skill-container base-container white-outline margin-s`

        const skillLabel = $DOCUMENT.createElement("p")
        skillLabel.className = "skill-name"
        skillLabel.innerText = skillInfo.name

        const skillLevel = $DOCUMENT.createElement("p")
        skillLevel.classList = `skill-xp base-container side-outlines margin-s skill-level${skillInfo.xp}`
        skillLevel.innerText = getSkillLabel(skillInfo.xp)

        skillLine.appendChild(skillLabel)
        skillLine.appendChild(skillLevel)

        skillContainer.appendChild(skillLine)

    })
}

//==================================================================================================================//
//== EVENTS  EVENTS  EVENTS  EVENTS  EVENTS  EVENTS  EVENTS  EVENTS  EVENTS  EVENTS  EVENTS  EVENTS  EVENTS  EVENTS  
//==================================================================================================================//

window.addEventListener("resize", () => {
    updateFontSize()
    maxCharsPerSpan = getCharsToFillViewport() + 1
    amountOfSpans = getLinesToFillViewport()
    flushBackground()
    generateBackground()
    regenWave()
})


// $BACKGROUND.addEventListener('mousemove', handleInteraction);
// $BACKGROUND.addEventListener('touchmove', handleInteraction);

// Généré par chatgpt car franchement nsm ce genre de truc
// ça change le contenu du background quand tu bouge la souris et drag sur mobile
function handleInteraction(e) {
    if (!e.target.classList.contains('background-span-line')) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const allLines = Array.from(document.querySelectorAll('.background-span-line'));
    const radius = 2; // number of characters to each side
    const lineRadius = 2; // number of lines above/below to affect

    allLines.forEach(line => {
        setTimeout(() => {

            const rect = line.getBoundingClientRect();

        // Check if the line is within vertical brush radius
        if (clientY >= rect.top - lineRadius * rect.height &&
            clientY <= rect.bottom + lineRadius * rect.height) {

            const content = line.textContent;
            const charWidth = rect.width / content.length;
            const x = clientX - rect.left;
            const charIndex = Math.floor(x / charWidth);

            if (charIndex >= 0 && charIndex < content.length) {
                let newContent = content.split('');

                // Apply brush horizontally
                for (let i = charIndex - radius; i <= charIndex + radius; i++) {
                    if (i >= 0 && i < newContent.length) {
                        newContent[i] = getRandomCharacterFromPool();
                    }
                }

                line.textContent = newContent.join('');
            }
        }

        }, 30)
    });
}


function scaleAsciiArt() {
            const asciiElements = document.querySelectorAll('.ascii-transform');
            
            asciiElements.forEach(ascii => {
                const container = ascii.closest('.demo-container');
                const containerWidth = container.clientWidth - 40; // Account for padding
                const asciiWidth = ascii.scrollWidth;
                const scale = Math.min(1, containerWidth / asciiWidth);
                
                ascii.style.transform = `scale(${scale})`;
                ascii.style.transformOrigin = 'top left';
                
                // Adjust container height to accommodate scaled content
                const scaledHeight = ascii.scrollHeight * scale;
                ascii.style.marginBottom = `${scaledHeight - ascii.scrollHeight}px`;
            });
        }



//==================================================================================================================//
//== STARTUP STARTUP STARTUP STARTUP STARTUP STARTUP STARTUP STARTUP STARTUP STARTUP STARTUP STARTUP STARTUP  
//==================================================================================================================//
generateCharacterPool()
maxCharsPerSpan = getCharsToFillViewport() + 1
amountOfSpans = getLinesToFillViewport() - 1
flushBackground()
generateBackground()
regenWave()
scaleAsciiArt()

//generateSkills()