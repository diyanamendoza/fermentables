import { fastForwardGame, getActiveFerms, getRemainingActionsCount, getFermNameById, getActiveFermById, getSelectedFermIndex, getActiveFermIndex, setSelectedFermIndex, getHintsRemaining, setHintsRemaining } from '../local-storage-utils.js';
import { getImageForFerm } from '../render-utils.js';
import { checkAction, getAllActionNames, updateState } from './game-utils.js';

// ***tested ✔
export function renderActionButtons() {
    const actionsDiv = document.createElement('div');
    actionsDiv.id = 'action-buttons-div';
    const actionNames = getAllActionNames();
    for (const actionName of actionNames) {
        const newButton = document.createElement('button');
        newButton.value = actionName;
        newButton.textContent = actionName;
        newButton.className = 'action-button';
        newButton.addEventListener('click', () => {
            const selectedFerm = document.querySelector('input:checked');
            if (!selectedFerm) {
                alert('Please select a fermentable.');
                return;
            }
            const fermId = Number(selectedFerm.value);
            const result = checkAction(actionName, fermId);
            displayActionMessage(result, actionName, fermId);
        });
        actionsDiv.append(newButton);
    }
    return actionsDiv;
}

// ***tested ✔
export function renderFFOneDayButton() {
    const button = document.createElement('button');
    button.id = 'ff-one-day-button';
    button.className = 'ff-button';
    button.textContent = 'fast forward one day';
    button.addEventListener('click', () => {
        fastForwardGame(1);
        updateState();
        reRenderGamePage();
    });
    return button;
}

// ***tested ✔
export function renderFFOneWeekButton() {
    const button = document.createElement('button');
    button.id = 'ff-one-week-button';
    button.className = 'ff-button';
    button.textContent = 'fast forward one week';
    button.addEventListener('click', () => {
        fastForwardGame(7);
        updateState();
        reRenderGamePage();
    });
    return button;
}


export function renderActiveFerms() {
    const activeFerms = getActiveFerms();
    const fermDiv = document.createElement('div');
    if (activeFerms.length === 0) {
        fermDiv.textContent = 'Head back to the pantry to get a fermentable!';
    }
    
    for (let i = 0; i < activeFerms.length; i++){
        const ferm = activeFerms[i];
        const fermLabel = document.createElement('label');
        const fermImg = document.createElement('img');
        const fermInput = document.createElement('input');
        const selectedFermIndex = getSelectedFermIndex();

        fermImg.src = getImageForFerm(ferm.id);
        fermImg.className = 'ferm-img';
        fermInput.type = 'radio';
        fermInput.setAttribute('value', `${ferm.id}`);
        fermInput.name = 'ferm';
        if (i === selectedFermIndex) {
            fermInput.checked = true;
        }
        
        if (ferm.isDead){
            fermImg.classList.add('dead');
            fermInput.disabled = 'true';
        } else {
            fermImg.classList.add('alive');
        }
        // stretchy AF: if complete, add a complete to classlist

        fermInput.addEventListener('click', () => {
            const selectedFerm = document.querySelector('input:checked');
            const fermId = Number(selectedFerm.value);
            const fermIndex = getActiveFermIndex(fermId);
            setSelectedFermIndex(fermIndex);
            const fermInfoEl = document.getElementById('ferm-info');
            fermInfoEl.textContent = '';
            const activeFermsInfo = renderFermInfo(fermId);

            fermInfoEl.append(activeFermsInfo);
        });

        fermLabel.append(fermInput, fermImg);
        fermDiv.append(fermLabel);
    }
    
    return fermDiv;
}

//Renders a div containing info about the ferm.
//if fermId is undefined, only nameHeading will be
//be rendered, with "Select a Fermentable" as the text.
export function renderFermInfo(fermId) {
    const ferm = getActiveFermById(fermId);
    let nameString = '';
    let ageString = '';
    let daysLeftString = '';
    let stepsLeftString = '';
    if (ferm) {
        nameString = ferm.baby;
        if (ferm.isAdult) {
            nameString = ferm.adult;
        }
        ageString = `${ferm.age} days old.`;
        if (ferm.age === 1) {
            ageString = `1 day old.`;
        }

        const daysLeft = ferm.endDay - ferm.age;
        daysLeftString = `${daysLeft} days remaining.`;
        if (daysLeft === 1) {
            daysLeftString = '1 day remaining.';
        }

        const stepsLeft = getRemainingActionsCount(fermId);
        stepsLeftString = `${stepsLeft} steps remaining`;
        if (daysLeft === 1) {
            stepsLeftString = '1 step remaining';
        }
    }

    const infoDiv = document.createElement('div');
    const nameHeading = document.createElement('h2');
    const ageP = document.createElement('p');
    const daysLeftP = document.createElement('p');
    const stepsLeftP = document.createElement('p');

    infoDiv.id = 'info-div';
    nameHeading.id = 'info-name';
    ageP.id = 'info-age';
    daysLeftP.id = 'info-quality';
    stepsLeftP.id = 'info-temp';

    ageP.textContent = ageString;
    nameHeading.textContent = nameString;
    daysLeftP.textContent = daysLeftString;
    stepsLeftP.textContent = stepsLeftString;
    infoDiv.append(nameHeading, ageP, daysLeftP, stepsLeftP);
    return infoDiv;
}

// Can't be tested?
export function reRenderGamePage(){
    const selectedFerm = document.querySelector('input:checked');
    let fermId = undefined;
    if (selectedFerm) {
        fermId = Number(selectedFerm.value);
    }
    const activeFermsDiv = renderActiveFerms();
    const activeFermsInfo = renderFermInfo(fermId);
    const hintButton = renderHintButton(fermId);
    const fermGalleryEl = document.getElementById('ferm-gallery');
    const fermInfoEl = document.getElementById('ferm-info');
    const hintContainer = document.getElementById('hint-container');
    fermGalleryEl.textContent = '';
    fermInfoEl.textContent = '';
    fermInfoEl.append(activeFermsInfo);
    fermGalleryEl.append(activeFermsDiv);
    hintContainer.append(hintButton);
}

// Can't be tested?
export function displayMessage(message) {
    const textDisplayEl = document.getElementById('chat-box');
    const newLineEl = document.createElement('p');
    newLineEl.textContent = message;
    textDisplayEl.prepend(newLineEl);
}

export function displayActionMessage(successful, action, fermId){
    const ferm = getFermNameById(fermId);
    let message = '';
    if (successful){
        message = `You selected ${action} for ${ferm}. Good Job!`;
    }
    if (!successful){
        message = `You selected ${action} for ${ferm}. Wrong action!`;
    }
    displayMessage(message);
}

export function showHint(fermId) {
    const hintsRemaining = getHintsRemaining(fermId);
    if (hintsRemaining > 0) {
        setHintsRemaining(hintsRemaining - 1);
    }
}

export function renderHintButton(selectedFermId) {
    const ferm = getActiveFermById(selectedFermId);
    const hintButton = document.createElement('button');
    hintButton.id = 'hint-button';
    if (ferm) {
        hintButton.textContent = `Give Hint (${ferm.hintsRemaining} left)`;
        hintButton.addEventListener('click', () => {
            console.log(ferm.id);
            showHint(ferm.id);
        });
    } else {
        hintButton.textContent = `Select Ferm.`;
    }
    return hintButton;
}
