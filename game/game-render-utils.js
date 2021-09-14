import { fastForwardGame } from '../local-storage-utils.js';
import { getAllActionNames } from '../utils.js';

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
    });
    return button;
}

export function renderFFOneWeekButton() {
    //pointless change to make ci/cd run
    const button = document.createElement('button');
    button.id = 'ff-one-week-button';
    button.className = 'ff-button';
    button.textContent = 'Fast Forward One Week';
    button.addEventListener('click', () => {
        fastForwardGame(7);
    });
    return button;
}
