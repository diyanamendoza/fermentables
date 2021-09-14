import { fermsTemplate } from './fermentables-template.js';
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
        let anyCorrectTimes = false;
        for (let entry of correctActions) {
            if (time >= entry.startDay && time < entry.endDay) {
                anyCorrectTimes = true;
                if (entry.completed) {
                    addToMistakePoints(fermID, 5);
                }
                else {
                    entry.completed = true;
                    updateAction(fermID, entry);
                }
            }
        }
        if (!anyCorrectTimes) {
            addToMistakePoints(fermID, 5);
        }
    }
}

let fermData;

//this is just a wrapper to make testing easier.
export function getAllActionNames() {
    if (!fermData) {
        fermData = fermsTemplate;
    }
    return getAllActionNamesForFerms(fermData);
}

//hacky way to inject different data for testing
export function setDataForGetAllActionNames(data) {
    fermData = data;
}

//Returns an array of all action names with no duplicates.
//Currently it only pulls actions from activeFerms.
export function getAllActionNamesForFerms(arrayOfFerms) {
    let actionNames = [];
    for (const ferm of arrayOfFerms) {
        for (const action of ferm.actions) {
            const existingEntry = actionNames.find(name => name === action.action);
            if (!existingEntry) {
                actionNames.push(action.action);
            }
        }
    }
    return actionNames;
}


