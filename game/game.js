
import { deactivateFerm, getActiveFerms } from '../local-storage-utils.js';
import { renderActionButtons, renderActiveFerms, renderFFOneDayButton, renderFFOneWeekButton, reRenderGamePage } from './game-render-utils.js';

const actionsDiv = renderActionButtons();
const dayButton = renderFFOneDayButton();
const weekButton = renderFFOneWeekButton();
const activeFermsDiv = renderActiveFerms();
const actionsBarEl = document.getElementById('actions-bar');
const timeButtonsEl = document.getElementById('time-buttons');
const fermGalleryEl = document.getElementById('ferm-gallery');

actionsBarEl.append(actionsDiv);
timeButtonsEl.append(dayButton, weekButton);
fermGalleryEl.append(activeFermsDiv);

//TODO add event listener to toilet that clears the dead
const toiletDiv = document.getElementById('toilet');
toiletDiv.addEventListener('click', () => {
    const activeFerms = getActiveFerms();
    const deadFerms = activeFerms.filter(ferm => ferm.isDead === true);
    const deadFermIDs = deadFerms.map(ferm => ferm.id);
    for (let entry of deadFermIDs) {
        deactivateFerm(entry);
    }
    const newActiveArray = getActiveFerms();

    const fermGalleryEl = document.getElementById('ferm-gallery');
    const fermInfoEl = document.getElementById('ferm-info');

    if (newActiveArray.length === 0) {
        fermGalleryEl.textContent = '';
        fermInfoEl.textContent = '';
    } else {
        reRenderGamePage();
    }
});


