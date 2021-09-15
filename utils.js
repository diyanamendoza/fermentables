import { fermsTemplate } from './fermentables-template.js';
import { addToMistakePoints, getActiveFermById, getActiveFerms, setActiveFerms, updateAction, updateActiveFerm } from './local-storage-utils.js';


export function createFerm(baby, fermsTemplate) {
    const template = fermsTemplate.find(entry => entry.baby === baby);
    const newFerm = {};
    Object.assign(newFerm, template);
    newFerm.id = Math.ceil(Math.random() * 1000);
    return newFerm;
}

//Determines what mood and aliveness the ferm
//should have based on mistake points
export function evaluateMistakePoints(fermID) {
    const ferm = getActiveFermById(fermID);
    let mood = 'happy';
    if (mood > 0 && mood <= 10) {
        mood = 'neutral';
    } else if (mood > 10 && mood <= 20) {
        mood = 'sad';
    } else if (mood > 20) {
        mood = 'sad';
        ferm.isDead = true;
    }
    ferm.mood = mood;
    updateActiveFerm(ferm);
}

//This function should be called after a fast
//forward button is used. It will loop through
//all active ferms and check for missed actions,
//apply mistakePoints and update the mood, if the
//missed action was required, isDead will be set
//to true. 
export function updateState() {
    const ferms = getActiveFerms();
    //loop through each active ferm
    for (const ferm of ferms) {
        //find missed actions
        for (const action of ferm.actions) {
            if (ferm.age >= action.endDay && !action.completed && !action.missed) {
                //missed action
                if (action.required) {
                    //kill
                    ferm.isDead = true;
                    ferm.mood = 'sad';
                } else {
                    //dock points
                    ferm.mistakePoints += action.mistakePoints;
                }
                //ensure user isn't affected by missing an action multiple times.
                action.missed = true;
            }
        }
        //update mood
        evaluateMistakePoints(ferm.id);
    }
    // save
    setActiveFerms(ferms);
}

//update isAdult
export function checkAction(action, fermID) {
    // get the actions for the ferm
    const ferm = getActiveFermById(fermID);
    const actions = ferm.actions;
    // see if the action is in the list
    const doesActionExist = actions.find(entry => entry.action === action);
    if (!doesActionExist) {
        addToMistakePoints(fermID, 10);
    } else {
        const correctActions = actions.filter(entry => entry.action === action);
        let anyCorrectTimes = false;
        for (let entry of correctActions) {
            if (ferm.age >= entry.startDay && ferm.age < entry.endDay) {
                anyCorrectTimes = true;
                if (entry.completed) {
                    addToMistakePoints(fermID, 5);
                } else {
                    //action was clicked on correct day and it hasn't
                    //been completed yet.

                    //add the negative care points that were set on the action.
                    //these should counteract minor mistakes
                    ferm.mistakePoints += action.carePoints;
                    entry.completed = true;

                    //change the ferm to adult if this step makes
                    //the ferm an adult
                    if (action.makesAdult) {
                        ferm.isAdult = true;
                    }
                    updateAction(fermID, entry);
                }
            }
        }
        if (!anyCorrectTimes) {
            addToMistakePoints(fermID, 5);
        }
    }
    //update mood
    evaluateMistakePoints(ferm.id);
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


