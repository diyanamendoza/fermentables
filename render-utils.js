import { addToActiveFerms } from './local-storage-utils.js';
import { createFerm } from './utils.js';
import { fermsTemplate } from './fermentables-template.js';

const containerDiv = document.getElementById('container');
const welcomeDiv = document.getElementById('welcome');


export function renderFerms(fermsTemplate) {
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
    firstP.textContent = `Ready to ferment?`;
    secondP.textContent = `Select a fermentable below and click play.`;

    welcomeDiv.append(titleEl, firstP, secondP);
}




export function renderPlayButton() {

    const mainEl = document.getElementById('main');

  


    const playButton = document.createElement('button');
    playButton.className = 'play-button';
    playButton.textContent = 'Play';
    playButton.addEventListener('click', () => {

        const selectedFerm = document.querySelector('input:checked');
        const selectedFermName = selectedFerm.value;

        const fermObject = createFerm(selectedFermName, fermsTemplate);
        addToActiveFerms(fermObject);
        window.location = './game';
    });
    mainEl.append(playButton);
}
