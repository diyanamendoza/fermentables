import { fastForwardGame, getActiveFerms, getRemainingActionsCount, getFermNameById, getActiveFermById } from '../local-storage-utils.js';
import { getImageForFerm } from '../render-utils.js';
import { checkAction, getAllActionNames, updateState } from '../utils.js';



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
            updateDisplayText(result, actionName, fermId);
        });
        actionsDiv.append(newButton);
    }
    return actionsDiv;
}

export function renderFFOneDayButton() {
    const button = document.createElement('button');
    button.id = 'ff-one-day-button';
    button.className = 'ff-button';
    button.textContent = 'Fast Forward One Day';
    button.addEventListener('click', () => {
        fastForwardGame(1);
        updateState();
        reRenderGamePage();
    });
    return button;
}

export function renderFFOneWeekButton() {
    const button = document.createElement('button');
    button.id = 'ff-one-week-button';
    button.className = 'ff-button';
    button.textContent = 'Fast Forward One Week';
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

    for (let ferm of activeFerms){
        const fermLabel = document.createElement('label');
        const fermImg = document.createElement('img');
        const fermInput = document.createElement('input'); 

        fermImg.src = getImageForFerm(ferm.id);
        fermImg.className = 'ferm-img';
        fermInput.type = 'radio';
        fermInput.setAttribute('value', `${ferm.id}`);
        fermInput.name = 'ferm';
        
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
            const fermInfoEl = document.getElementById('ferm-info');
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
        daysLeftString = `${(ferm.endDay - ferm.age)} days left.`;
        stepsLeftString = `${(getRemainingActionsCount(fermId))} steps remaining`;
    } else {
        nameString = 'Select a Fermentable';
    }

    const infoDiv = document.createElement('div');
    const nameHeading = document.createElement('h2');
    const ageSpan = document.createElement('span');
    const daysLeftSpan = document.createElement('span');
    const stepsLeftSpan = document.createElement('span');

    infoDiv.id = 'info-div';
    nameHeading.id = 'info-name';
    ageSpan.id = 'info-age';
    daysLeftSpan.id = 'info-quality';
    stepsLeftSpan.id = 'info-temp';

    ageSpan.textContent = ageString;
    nameHeading.textContent = nameString;
    daysLeftSpan.textContent = daysLeftString;
    stepsLeftSpan.textContent = stepsLeftString;
    infoDiv.append(nameHeading, ageSpan, daysLeftSpan, stepsLeftSpan);
    return infoDiv;
}


// Update once renderFermInfo() is functioning again
export function reRenderGamePage(){
    const selectedFerm = document.querySelector('input:checked');
    const fermId = Number(selectedFerm.value);
    const activeFermsDiv = renderActiveFerms(fermId);
    const activeFermsInfo = renderFermInfo(fermId);
    const fermGalleryEl = document.getElementById('ferm-gallery');
    const fermInfoEl = document.getElementById('ferm-info');
    fermGalleryEl.textContent = '';
    fermInfoEl.textContent = '';
    fermInfoEl.append(activeFermsInfo);
    fermGalleryEl.append(activeFermsDiv);
}

export function updateDisplayText(successful, action, fermId){
    const ferm = getFermNameById(fermId);
    const textDisplayEl = document.getElementById('chat-box');
    const newLineEl = document.createElement('p');

    if (successful){
        newLineEl.textContent = `You selected ${action} for ${ferm}. Good Job!`;
    }
    if (!successful){
        newLineEl.textContent = `You selected ${action} for ${ferm}. Wrong action!`;
    }
    textDisplayEl.prepend(newLineEl);
}
