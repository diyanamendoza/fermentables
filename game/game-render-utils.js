import { getAllActionNames } from '../utils.js';

export function renderActionButtons() {
    const actionsDiv = document.createElement('div');
    actionsDiv.id = 'action-buttons-div';
    const actionNames = getAllActionNames();
    for (const actionName of actionNames) {
        const newButton = document.createElement('button');
        newButton.value = actionName;
        newButton.className = 'action-button';
        // eslint-disable-next-line no-unused-vars
        newButton.addEventListener('click', (e) => {
            //TODO: set up a way to get the current game time.
            //TODO: set up a way to get the currently selected ferm.
            //checkAction(e.target.value, getGameTime(), selectedFerm.id)
        });
        actionsDiv.append(newButton);
    }
    return actionsDiv;
}
