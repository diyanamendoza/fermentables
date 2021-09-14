
import { renderActionButtons, renderActiveFerms, renderFFOneDayButton, renderFFOneWeekButton } from './game-render-utils.js';

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



