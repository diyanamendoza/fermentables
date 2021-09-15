import { fastForwardGame, getActiveFermById, getActiveFerms } from '../local-storage-utils.js';
import { getAllActionNames, updateState } from '../utils.js';

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
            //TODO: set up a way to get the currently selected ferm.
            //checkAction(e.target.value, selectedFerm.age, selectedFerm.id)
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

        // Will need to include a function here that determines which img to retrieve from the ferm
        fermImg.src = `../assets/${ferm.images.babyHappy}`;
        fermImg.setAttribute('value', `${ferm.id}`);
        fermImg.className = 'ferm-img';
        fermInput.type = 'radio';
        fermInput.name = 'ferm';

        fermLabel.append(fermInput, fermImg);
        fermDiv.append(fermLabel);
    }
    
    return fermDiv;
}


export function renderFermInfo(fermId) {
    const ferm = getActiveFermById(fermId);
    let name = ferm.baby;
    if (ferm.age >= ferm.endDay) {
        name = ferm.adult;
    }
    const qualityPercentage = Math.round((1 - (ferm.mistakePoints / 20) * 100));
    const qualityString = `Quality: ${qualityPercentage}%`;
    const tempString = '70&176;';
    const ageString = `${ferm.age} days old`;

    const infoDiv = document.createElement('div');
    const nameHeading = document.createElement('h2');
    const qualitySpan = document.createElement('span');
    const tempSpan = document.createElement('span');
    const ageSpan = document.createElement('span');

    infoDiv.id = 'info-div';
    nameHeading.id = 'info-name';
    qualitySpan.id = 'info-quality';
    tempSpan.id = 'info-temp';
    ageSpan.id = 'info-age';

    nameHeading.textContent = name;
    qualitySpan.textContent = qualityString;
    tempSpan.textContent = tempString;
    ageSpan.textContent = ageString;

    infoDiv.append(nameHeading, qualitySpan, tempSpan, ageSpan);
    return infoDiv;
}
