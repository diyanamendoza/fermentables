
import { renderActionButtons, renderFFOneDayButton, renderFFOneWeekButton } from './game-render-utils.js';

const actionsDiv = renderActionButtons();
const dayButton = renderFFOneDayButton();
const weekButton = renderFFOneWeekButton();
const actionsBarEl = document.getElementById('actions-bar');
const timeButtonsEl = document.getElementById('time-buttons');

actionsBarEl.append(actionsDiv);
timeButtonsEl.append(dayButton, weekButton);


