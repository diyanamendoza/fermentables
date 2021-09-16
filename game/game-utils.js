import { fermsTemplate } from '../fermentables-template.js';
import { displayMessage, reRenderGamePage } from './game-render-utils.js';
import { addToMistakePoints, addXP, deactivateFerm, getActiveFermById, getActiveFerms, getFermNameById, setActiveFerms, setFermToAdultById, updateAction, updateActiveFerm } from '../local-storage-utils.js';
import { updateNavXP } from '../render-utils.js';

//Determines what mood and aliveness the ferm
//should have based on mistake points
export function evaluateMistakePoints(fermID) {
    const ferm = getActiveFermById(fermID);
    let mood = 'happy';
    if (ferm.mistakePoints > 0 && ferm.mistakePoints <= 10) {
        mood = 'neutral';
    } else if (ferm.mistakePoints > 10 && ferm.mistakePoints <= 20) {
        mood = 'sad';
    } else if (ferm.mistakePoints > 20) {
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
        if (ferm.age >= ferm.endDay) {
            if (!ferm.completed) {
                ferm.completed = true;
                displayMessage(ferm.successMessage + ` You gained ${ferm.maxXP} xp.`);
                addXP(ferm.maxXP);
                setTimeout(() => {
                    deactivateFerm(ferm.id);
                    reRenderGamePage();
                }, 2000);
            }
        }
        //find missed actions
        for (const action of ferm.actions) {
            if (ferm.age >= action.endDay && !action.completed && !action.missed) {
                //missed action
                if (action.required) {
                    //kill
                    if (!ferm.isDead) {
                        ferm.isDead = true;
                        ferm.mood = 'sad';
                        const fermName = getFermNameById(ferm.id);
                        displayMessage(`Your ${fermName} is now dead.`);
                    }
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
    // rerender nav to show updated XP
    updateNavXP();
}

//checkAction handles the user selecting an action for a ferm. It does the
//following:
//--applies 10 mistake points if the action doesn't exist for the ferm
//--applies 5 mistake points if the action was already completed
//--applies any care points the action gives if the correct action was
//    chosen
//--makes the ferm an adult if the correct action was selected and it makes the
//    ferm an adult
//--applies 5 mistake points if action exists but it was done on the wrong day
//--updates the mood of the ferm to reflect the new mistakePoints value
//--returns true if it was a correct action, returns false if it wasn't
export function checkAction(actionName, fermID) {
    // get the actions for the ferm
    const ferm = getActiveFermById(fermID);
    const actions = ferm.actions;
    let result = true;
    // see if the action is in the list
    const doesActionExist = actions.find(entry => entry.action === actionName);
    if (!doesActionExist) {
        //the action doesn't exist for this ferm, apply 10 mistake points
        addToMistakePoints(fermID, 10);
        //signal that this was an incorrect action
        result = false;
    } else {
        //the action does exist for this ferm
        const correctActions = actions.filter(entry => entry.action === actionName);
        let anyCorrectTimes = false;
        //loop through all instances of actions that match actionName
        for (let entry of correctActions) {
            //check if this action is on the correct day
            if (ferm.age >= entry.startDay && ferm.age < entry.endDay) {
                //this action entry was specified for this day
                //store that there was a correct action found for other penalties
                anyCorrectTimes = true;
                if (entry.completed) {
                    //apply 5 mistake points if the action was already completed
                    addToMistakePoints(fermID, 5);
                    //signal that this was an incorrect action
                    result = false;
                } else {
                    //action was clicked on correct day and it hasn't
                    //been completed yet.

                    //add the negative care points that were set on the action.
                    //these should counteract minor mistakes
                    ferm.mistakePoints += entry.carePoints;
                    //signal that this was a correct action
                    entry.completed = true;

                    //change the ferm to adult if this step makes
                    //the ferm an adult
                    if (entry.makesAdult) {
                        setFermToAdultById(fermID);
                    }
                    //store the change to entry.completed
                    updateAction(fermID, entry);
                    updateActiveFerm(ferm);
                }
            }
        }
        //check if no matching actions were found for this day
        if (!anyCorrectTimes) {
            //apply 5 mistake points if action exists but it was done on the wrong day
            addToMistakePoints(fermID, 5);
            //signal that this was an incorrect ation;
            result = false;
        }
    }
    //update mood
    evaluateMistakePoints(ferm.id);
    return result;
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
