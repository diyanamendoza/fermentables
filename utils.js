import { addToMistakePoints, getActionsForFermID, updateAction } from './local-storage-utils.js';


export function createFerm(baby, fermsTemplate) {
    const template = fermsTemplate.find(entry => entry.baby === baby);
    const newFerm = {};
    Object.assign(newFerm, template);
    newFerm.id = Math.ceil(Math.random() * 1000);
    return newFerm;
}

export function checkAction(action, time, fermID) {
    // get the actions for the ferm
    const actions = getActionsForFermID(fermID);
    // see if the action is in the list
    const doesActionExist = actions.find(entry => entry.action === action);
    if (!doesActionExist) {
        addToMistakePoints(fermID, 10);
    } else {
        const correctActions = actions.filter(entry => entry.action === action);
        for (let entry of correctActions) {
            if (time >= entry.startDay && time < entry.endDay) {
                if (entry.completed) {
                    addToMistakePoints(fermID, 5);
                }
                else {
                    entry.completed = true;
                    updateAction(fermID, entry);
                }
            }
        }
    }
    // if not, lose points, return; if so, move on to check time

    // if time is correct 

    // 
}
