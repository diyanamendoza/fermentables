import { addToActiveFerms, getActiveFermById, getGameData } from './local-storage-utils.js';
import { createFerm } from './home-utils.js';
import { fermsTemplate } from './fermentables-template.js';

const containerDiv = document.getElementById('container');
const welcomeDiv = document.getElementById('welcome');

export function renderFerms(fermsTemplate) {

    const gameData = getGameData();
    const XP = gameData.xp;

    for (let ferm of fermsTemplate) {
        const labelEl = document.createElement('label');
        const inputEl = document.createElement('input');
        const imageEl = document.createElement('img');
        labelEl.classList.add('ferm-label');
        inputEl.setAttribute('type', 'radio');
        inputEl.setAttribute('name', 'ferm');
        inputEl.setAttribute('value', `${ferm.baby}`);
        imageEl.src = `../assets/${ferm.images.babyHappy}`;
        imageEl.classList.add('ferm-image');

        // such a cool way to handle this! nice work :-D
        if (XP < ferm.unlockXP) {
            inputEl.disabled = 'true';
            imageEl.classList.add('locked');
        }

        const instructionsP = document.createElement('div');
        instructionsP.textContent = `${ferm.instructions}`;
        instructionsP.className = 'instructions';
        labelEl.append(inputEl, imageEl, instructionsP);
        containerDiv.append(labelEl);
    }
}

export function renderWelcome() {
    const firstP = document.createElement('p');
    const secondP = document.createElement('p');
    firstP.textContent = `Welcome! Fermentables is a cutting edge fermentation simulator utilizing the latest technologies in Javascript and Local Storage.`;
    secondP.textContent = `To master fermentation, one must carefully memorize the recipes of their craft. One wrong move could kill your adorable little friend. Prove your worth by completing a fermentation to unlock more recipes. Head to the pantry get started.`;

    const goToPantry = document.createElement('button');
    goToPantry.textContent = `go to pantry`;
    goToPantry.addEventListener('click', () => {
        window.location = './pantry';
    });

    welcomeDiv.append(firstP, secondP, goToPantry);
}

export function renderPlayButton() {

    const mainEl = document.getElementById('main');

    const playButton = document.createElement('button');
    playButton.className = 'play-button';
    playButton.textContent = 'play';
    playButton.addEventListener('click', () => {

        const selectedFerm = document.querySelector('input:checked');
        if (!selectedFerm) {
            alert('Click on your fermentable and then play!');
        }
        const selectedFermName = selectedFerm.value;

        const fermObject = createFerm(selectedFermName, fermsTemplate);
        addToActiveFerms(fermObject);
        window.location = '../game';
    });
    mainEl.append(playButton);
}


// not sure about this, I might have gone a bit overboard here
export function getImageForFerm(fermID){
    const { isAdult, mood, images } = getActiveFermById(fermID);

    const adultOrBaby = isAdult ? 'adult' : 'baby';
    const capitalizedMood = `${mood.charAt(0).toUpperCase()}${mood.slice(1)}`;

    return `../assets/${images[`${adultOrBaby}${capitalizedMood}`]}`;
}


export function updateNavXP() {
    const gameData = getGameData();
    const XP = gameData.xp;
    const userXP = document.getElementById('user-xp');
    userXP.textContent = `You've got ${XP} XP`;
}

export function renderFooter() {
    const footer = document.querySelector('footer');
    footer.textContent = 'Fermentables drawn by @vietnguyenart';
}
