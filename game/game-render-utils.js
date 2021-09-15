import { fastForwardGame, getActiveFerms } from '../local-storage-utils.js';
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
        // eslint-disable-next-line no-unused-vars
        newButton.addEventListener('click', (e) => {
            const selectedFerm = document.querySelector('input:checked');
            const fermId = Number(selectedFerm.value);
            checkAction(actionName, fermId);
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
        
        // if dead add dead to classlist
        // if alive add an alive to classlist
        // stretchy AF: if complete, add a complete to classlist

        fermLabel.append(fermInput, fermImg);
        fermDiv.append(fermLabel);
    }
    
    return fermDiv;
}


// export function renderFermInfo(fermId) {
    // const ferm = getActiveFermById(fermId);
    // let name = ferm.baby;
    // if (ferm.age >= ferm.endDay) {
    //     name = ferm.adult;
    // }
    // need function to determine quality and temp.
    // const qualityPercentage = Math.round((1 - (ferm.mistakePoints / 20) * 100));
    // const qualityString = `Quality: ${qualityPercentage}%`;
    // const tempString = '70&176;';
    // const ageString = `${ferm.age} days old`;

    // const infoDiv = document.createElement('div');
    // const nameHeading = document.createElement('h2');
    // const qualitySpan = document.createElement('span');
    // const tempSpan = document.createElement('span');
    // const ageSpan = document.createElement('span');

    // infoDiv.id = 'info-div';
    // nameHeading.id = 'info-name';
    // qualitySpan.id = 'info-quality';
    // tempSpan.id = 'info-temp';
    // ageSpan.id = 'info-age';

    // nameHeading.textContent = name;
    // // qualitySpan.textContent = qualityString;
    // // tempSpan.textContent = tempString;
    // ageSpan.textContent = ageString;
    // // readd temp and quality
    // infoDiv.append(nameHeading, ageSpan);
    // return infoDiv;
// }


// Update once renderFermInfo() is functioning again
export function reRenderGamePage(){
    // const selectedFerm = document.querySelector('input:checked');
    // const fermId = Number(selectedFerm.value);

    const actionsDiv = renderActionButtons();
    const activeFermsDiv = renderActiveFerms();
    // const activeFermsInfo = renderFermInfo(fermId);
    const actionsBarEl = document.getElementById('actions-bar');
    const fermGalleryEl = document.getElementById('ferm-gallery');
    // const fermInfoEl = document.getElementById('ferm-info');
    fermGalleryEl.textContent = '';
    // fermInfoEl.append(activeFermsInfo);
    actionsBarEl.append(actionsDiv);
    fermGalleryEl.append(activeFermsDiv);
}
