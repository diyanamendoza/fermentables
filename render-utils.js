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
        imageEl.src = `./assets/${ferm.images.babyHappy}`;
        imageEl.classList.add('ferm-image');

        if (XP < ferm.unlockXP) {
            inputEl.disabled = 'true';
            imageEl.classList.add('locked');
        }

        const instructionsP = document.createElement('div');
        instructionsP.textContent = `${ferm.instructions}`;
        instructionsP.className = 'instructions';
        
        // instructionsP.style.display = 'none';
        
        // inputEl.addEventListener('click', () => {
        //     instructionsP.style.display = 'block';
            
            // instructionsP.classList.remove('instructions');
            // instructionsP.classList.add('after');
            // instructionsP.style.display = 'block'; 
            // welcomeDiv.style.display = 'none';
        // });

        labelEl.append(inputEl, imageEl, instructionsP);
        containerDiv.append(labelEl);
    }
}

export function renderWelcome() {
    const titleEl = document.createElement('h3');
    const firstP = document.createElement('p');
    const secondP = document.createElement('p');
    titleEl.textContent = 'Welcome!';
    firstP.textContent = `Fermentables is a cutting edge fermentation simulator utilizing the latest technologies in Javascript and Local Storage.`;
    secondP.textContent = `To master fermentation, one must carefully memorize the recipes of their craft. One wrong move could kill your adorable little friend. Prove your worth by completing a fermentation to unlock more recipes. For the brave, return to this page to start additional fermentations.`;

    welcomeDiv.append(titleEl, firstP, secondP);
}

export function renderPlayButton() {

    const mainEl = document.getElementById('main');

    const playButton = document.createElement('button');
    playButton.className = 'play-button';
    playButton.textContent = 'play';
    playButton.addEventListener('click', () => {

        const selectedFerm = document.querySelector('input:checked');
        const selectedFermName = selectedFerm.value;

        const fermObject = createFerm(selectedFermName, fermsTemplate);
        addToActiveFerms(fermObject);
        window.location = './game';
    });
    mainEl.append(playButton);
}


export function getImageForFerm(fermID){
    const ferm = getActiveFermById(fermID);
    if (ferm.isAdult){
        if (ferm.mood === 'sad'){
            return `../assets/${ferm.images.adultSad}`;
        }
        if (ferm.mood === 'neutral'){
            return `../assets/${ferm.images.adultNeutral}`;
        }
        return `../assets/${ferm.images.adultHappy}`;
    }
    if (!ferm.isAdult){
        if (ferm.mood === 'sad'){
            return `../assets/${ferm.images.babySad}`;
        }
        if (ferm.mood === 'neutral'){
            return `../assets/${ferm.images.babyNeutral}`;
        }
        return `../assets/${ferm.images.babyHappy}`;
    }
}

export function renderNav() {
    const header = document.querySelector('header');
    const navDiv = document.createElement('nav');
    const storeLink = document.createElement('a');
    const aboutLink = document.createElement('a');
    const userXP = document.createElement('span');

    const gameData = getGameData();
    const XP = gameData.xp;

    navDiv.className = 'menu';
    storeLink.textContent = 'Store';
    aboutLink.textContent = 'About';
    storeLink.href = '../index.html';
    aboutLink.href = '../about/index.html';
    userXP.id = 'user-xp';
    userXP.textContent = `You've got ${XP} XP`;

    navDiv.append(storeLink, aboutLink, userXP);
    header.append(navDiv);
}

export function updateNavXP() {
    const gameData = getGameData();
    const XP = gameData.xp;
    const userXP = document.getElementById('user-xp');
    userXP.textContent = `You've got ${XP} XP`;
}
