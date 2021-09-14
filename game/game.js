
import { renderActionButtons } from './game-render-utils.js';

const actionsDiv = renderActionButtons();
const main = document.querySelector('main');

main.append(actionsDiv);

