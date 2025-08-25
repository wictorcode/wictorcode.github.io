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



let amountOfSpans = 0
let maxCharsPerSpan = 0

let characterPool = [];
let poolIndex = 0;
const POOL_SIZE = 10000;

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

window.addEventListener("resize", () => {
    updateFontSize()
    maxCharsPerSpan = getCharsToFillViewport() + 1
    amountOfSpans = getLinesToFillViewport()
    flushBackground()
    generateBackground()
    regenWave()
})



export function initBackground() {


    window.addEventListener("resize", () => {
        updateFontSize()
        maxCharsPerSpan = getCharsToFillViewport() + 1
        amountOfSpans = getLinesToFillViewport()
        flushBackground()
        generateBackground()
        regenWave()
    })

    generateCharacterPool()
    maxCharsPerSpan = getCharsToFillViewport() + 1
    amountOfSpans = getLinesToFillViewport() - 1
    flushBackground()
    generateBackground()
    regenWave()


}